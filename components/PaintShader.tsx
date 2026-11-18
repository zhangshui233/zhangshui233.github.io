"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 浏览器实时车漆 Demo —— WebGL 手写着色器
 * 对应 UE5 Clear Coat 工作流的网页复现：金属漆 / 珠光漆 / 哑光漆 / 清漆层
 * 拖拽画面可移动主光源，观察高光拉丝与闪粉颗粒的变化
 */

type PaintType = {
  n: string;
  t: string;
  d: string;
};

const paintTypes: PaintType[] = [
  {
    n: "01",
    t: "金属漆 Metallic",
    d: "色漆层 + 铝粉闪片 + 清漆层。拖动光源看闪粉颗粒——每一粒都是对法线的高频扰动，强光下呈细密闪光",
  },
  {
    n: "02",
    t: "珠光漆 Pearl",
    d: "云母珠光的干涉变色：视线越掠射（边缘），色相偏移越明显。对应 UE5 里的菲涅尔插值双色混合",
  },
  {
    n: "03",
    t: "哑光漆 Matte",
    d: "高粗糙度压平镜面反射，只留极浅的边缘高光。没有清漆层，质感克制但高级",
  },
  {
    n: "04",
    t: "清漆层 Clear Coat",
    d: "独立的清漆反射层叠在色漆上：「玻璃感」来自低粗糙度的第二层高光，是车漆质感的第一决定因素",
  },
];

const colorPresets = [
  { name: "竞速红", hex: "#b91c1c" },
  { name: "深海蓝", hex: "#1d4ed8" },
  { name: "枪灰银", hex: "#9aa3ad" },
  { name: "松林绿", hex: "#166534" },
  { name: "落日橙", hex: "#ea580c" },
  { name: "曜石黑", hex: "#1c1917" },
];

const vertexShader = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 u_res;
uniform vec2 u_light;   // x: 方位角, y: 仰角
uniform float u_type;   // 0 金属 / 1 珠光 / 2 哑光 / 3 清漆
uniform vec3 u_color;
uniform float u_time;

const float PI = 3.14159265;

vec3 hueShift(vec3 c, float a) {
  const vec3 k = vec3(0.57735);
  float ca = cos(a);
  return c * ca + cross(k, c) * sin(a) + k * dot(k, c) * (1.0 - ca);
}

float hash13(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

// 影棚环境：浅灰渐变 + 顶部柔光带
vec3 envMap(vec3 rd) {
  float up = clamp(rd.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 sky = mix(vec3(0.80, 0.82, 0.85), vec3(0.97, 0.97, 0.96), up);
  // 两条横向柔光带（模拟棚顶 Area Light），随时间极慢漂移
  float drift = sin(u_time * 0.15) * 0.03;
  float band1 = exp(-pow((rd.y - 0.40 - drift) * 7.0, 2.0));
  float band2 = exp(-pow((rd.y - 0.62 - drift) * 16.0, 2.0)) * 0.6;
  float front = 0.35 + 0.65 * clamp(rd.z, 0.0, 1.0);
  vec3 bands = vec3(1.0) * (band1 * 1.1 + band2 * 0.7) * front;
  return sky + bands;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_res) / min(u_res.x, u_res.y);

  vec3 ro = vec3(0.0, 0.0, 3.4);
  vec3 rd = normalize(vec3(uv, -2.6));

  // 单位球求交
  float b = dot(ro, rd);
  float c = dot(ro, ro) - 1.0;
  float disc = b * b - c;

  vec3 col;

  if (disc < 0.0) {
    // 背景
    float up = clamp(rd.y * 0.5 + 0.5, 0.0, 1.0);
    col = mix(vec3(0.955, 0.955, 0.95), vec3(0.87, 0.875, 0.88), up);
    // 球体投在背景上的柔和暗影
    float sh = exp(-max(disc, 0.0) * -3.0);
    col = mix(col, col * 0.93, smoothstep(0.0, 0.35, -rd.y + 0.35) * 0.0);
  } else {
    float t = -b - sqrt(disc);
    vec3 pos = ro + rd * t;
    vec3 n = normalize(pos);
    vec3 v = -rd;

    // 主光源（可拖拽）
    float az = u_light.x;
    float el = u_light.y;
    vec3 L = normalize(vec3(sin(az) * cos(el), sin(el), cos(az) * cos(el)));
    vec3 H = normalize(L + v);

    float NdL = clamp(dot(n, L), 0.0, 1.0);
    float NdV = clamp(dot(n, v), 0.0, 1.0);
    float NdH = clamp(dot(n, H), 0.0, 1.0);

    float type = u_type;
    float metallic = type < 0.5 ? 0.9 : (type < 1.5 ? 0.65 : (type < 2.5 ? 0.0 : 0.3));
    float rough    = type < 0.5 ? 0.38 : (type < 1.5 ? 0.32 : (type < 2.5 ? 0.72 : 0.18));
    float coat     = type < 2.5 ? 1.0 : (type < 3.5 ? 0.0 : 1.0);
    float flakesOn = type < 0.5 ? 1.0 : 0.0;

    // 基础色：珠光随视角掠射做干涉色相偏移
    vec3 albedo = u_color;
    if (type > 0.5 && type < 1.5) {
      float f = pow(1.0 - NdV, 2.2);
      albedo = mix(u_color, hueShift(u_color, 1.25), f);
    }

    // 环境反射
    vec3 refl = reflect(-v, n);
    vec3 envCol = envMap(refl);
    vec3 F0 = mix(vec3(0.04), albedo, metallic);
    float fres = pow(1.0 - NdV, 3.0);
    vec3 specEnv = envCol * (F0 + (1.0 - F0) * fres) * (1.0 - rough * 0.75);

    // 主光直接照明
    float shininess = mix(10.0, 160.0, 1.0 - rough);
    float specDirect = pow(NdH, shininess) * (0.25 + metallic * 0.9) * NdL;
    vec3 diffuse = albedo * NdL * vec3(1.0, 0.99, 0.96) * (1.0 - metallic * 0.85);
    vec3 ambient = albedo * (0.30 - metallic * 0.12) * mix(vec3(1.0), vec3(0.92, 0.94, 0.97), 0.5);

    // 清漆层：独立低粗糙度第二高光
    float coatSpec = pow(NdH, 320.0) * 1.8 * coat + envCol.g * coat * fres * 0.5;

    // 金属闪粉：法线空间高频hash，只在强光方向点亮
    vec3 cell = floor(n * 170.0);
    float h = hash13(cell);
    float glint = step(0.965, h) * pow(NdH, 10.0) * NdL * flakesOn * 2.6;

    col = ambient + diffuse + vec3(specDirect) + specEnv + vec3(coatSpec) + vec3(glint);

    // 菲涅尔边缘补一点环境，防止边缘死黑
    col += vec3(0.9) * fres * 0.08;
  }

  // 轻量 tone mapping + gamma
  col = col / (col + vec3(0.55));
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));

  // 极轻的暗角
  float vig = 1.0 - 0.12 * dot(uv * 0.55, uv * 0.55);
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

export default function PaintShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [type, setType] = useState(0);
  const [color, setColor] = useState(colorPresets[0].hex);
  const [failed, setFailed] = useState(false);
  const stateRef = useRef({ type: 0, color: hexToRgb(colorPresets[0].hex) });
  const lightRef = useRef({ az: -0.55, el: 0.55, dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    stateRef.current.type = type;
  }, [type]);
  useEffect(() => {
    stateRef.current.color = hexToRgb(color);
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl", { antialias: true }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      setFailed(true);
      return;
    }

    function compile(glCtx: WebGLRenderingContext, src: string, shaderType: number) {
      const sh = glCtx.createShader(shaderType)!;
      glCtx.shaderSource(sh, src);
      glCtx.compileShader(sh);
      if (!glCtx.getShaderParameter(sh, glCtx.COMPILE_STATUS)) {
        throw new Error(glCtx.getShaderInfoLog(sh) || "shader compile failed");
      }
      return sh;
    }

    let program: WebGLProgram;
    try {
      const vs = compile(gl, vertexShader, gl.VERTEX_SHADER);
      const fs = compile(gl, fragmentShader, gl.FRAGMENT_SHADER);
      program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "link failed");
      }
    } catch {
      setFailed(true);
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uLight = gl.getUniformLocation(program, "u_light");
    const uType = gl.getUniformLocation(program, "u_type");
    const uColor = gl.getUniformLocation(program, "u_color");
    const uTime = gl.getUniformLocation(program, "u_time");

    let raf = 0;
    const start = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas!.clientWidth;
      const h = Math.round(w * 0.62);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.height = `${h}px`;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function frame() {
      const t = (performance.now() - start) / 1000;
      const s = stateRef.current;
      const l = lightRef.current;
      // 未拖拽时主光源极缓慢摆动，模拟棚内光带流动
      const sway = l.dragging ? 0 : Math.sin(t * 0.25) * 0.12;
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uLight, l.az + sway, l.el);
      gl!.uniform1f(uType, s.type);
      gl!.uniform3f(uColor, s.color[0], s.color[1], s.color[2]);
      gl!.uniform1f(uTime, t);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }
    frame();

    function onDown(e: PointerEvent) {
      const l = lightRef.current;
      l.dragging = true;
      l.lastX = e.clientX;
      l.lastY = e.clientY;
      canvas!.setPointerCapture(e.pointerId);
    }
    function onMove(e: PointerEvent) {
      const l = lightRef.current;
      if (!l.dragging) return;
      l.az = Math.max(-1.3, Math.min(1.3, l.az + (e.clientX - l.lastX) * 0.008));
      l.el = Math.max(0.1, Math.min(1.25, l.el + (e.clientY - l.lastY) * 0.006));
      l.lastX = e.clientX;
      l.lastY = e.clientY;
    }
    function onUp() {
      lightRef.current.dragging = false;
    }
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  if (failed) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-400">
        当前浏览器不支持 WebGL
      </div>
    );
  }

  const active = paintTypes[type];

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {/* 画布 */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="block w-full cursor-grab touch-none select-none active:cursor-grabbing"
          aria-label="实时车漆材质演示，拖拽移动光源"
        />
        <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-white/80 px-2 py-0.5 font-mono text-[10px] tracking-wide text-neutral-400 backdrop-blur">
          WebGL 手写 Shader · 拖拽移动光源
        </span>
      </div>

      {/* 控制区 */}
      <div className="border-t border-neutral-100 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          {paintTypes.map((p, i) => (
            <button
              key={p.n}
              onClick={() => setType(i)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                type === i
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 text-neutral-500 hover:border-neutral-400"
              }`}
            >
              <span className="mr-1.5 font-mono text-[10px] opacity-60">{p.n}</span>
              {p.t.split(" ")[1]}
            </button>
          ))}
          <span className="mx-2 hidden h-4 w-px bg-neutral-200 sm:block" />
          {colorPresets.map((c) => (
            <button
              key={c.hex}
              title={c.name}
              onClick={() => setColor(c.hex)}
              className={`h-6 w-6 rounded-full border transition-transform ${
                color === c.hex
                  ? "scale-110 border-neutral-900 ring-2 ring-neutral-200"
                  : "border-neutral-200 hover:scale-105"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-neutral-500">
          <strong className="text-neutral-900">{active.t}</strong>
          <span className="mx-2 text-neutral-300">·</span>
          {active.d}
        </p>
      </div>
    </div>
  );
}
