(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,30691,e=>{var t=e.i(43476),a=e.i(21414),r=e.i(71645);let l=[{n:"01",t:"金属漆 Metallic",d:"色漆层 + 铝粉闪片 + 清漆层。拖动光源看闪粉颗粒——每一粒都是对法线的高频扰动，强光下呈细密闪光"},{n:"02",t:"珠光漆 Pearl",d:"云母珠光的干涉变色：视线越掠射（边缘），色相偏移越明显。对应 UE5 里的菲涅尔插值双色混合"},{n:"03",t:"哑光漆 Matte",d:"高粗糙度压平镜面反射，只留极浅的边缘高光。没有清漆层，质感克制但高级"},{n:"04",t:"清漆层 Clear Coat",d:"独立的清漆反射层叠在色漆上：「玻璃感」来自低粗糙度的第二层高光，是车漆质感的第一决定因素"}],s=[{name:"竞速红",hex:"#b91c1c"},{name:"深海蓝",hex:"#1d4ed8"},{name:"枪灰银",hex:"#9aa3ad"},{name:"松林绿",hex:"#166534"},{name:"落日橙",hex:"#ea580c"},{name:"曜石黑",hex:"#1c1917"}],n=`
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`,i=`
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
`;function c(e){let t=parseInt(e.slice(1),16);return[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255]}function o(){let e=(0,r.useRef)(null),[a,o]=(0,r.useState)(0),[d,x]=(0,r.useState)(s[0].hex),[m,h]=(0,r.useState)(!1),u=(0,r.useRef)({type:0,color:c(s[0].hex)}),p=(0,r.useRef)({az:-.55,el:.55,dragging:!1,lastX:0,lastY:0});if((0,r.useEffect)(()=>{u.current.type=a},[a]),(0,r.useEffect)(()=>{u.current.color=c(d)},[d]),(0,r.useEffect)(()=>{let t,a=e.current;if(!a)return;let r=a.getContext("webgl",{antialias:!0})||a.getContext("experimental-webgl");if(!r)return void h(!0);function l(e,t,a){let r=e.createShader(a);if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(r)||"shader compile failed");return r}try{let e=l(r,n,r.VERTEX_SHADER),a=l(r,i,r.FRAGMENT_SHADER);if(t=r.createProgram(),r.attachShader(t,e),r.attachShader(t,a),r.linkProgram(t),!r.getProgramParameter(t,r.LINK_STATUS))throw Error(r.getProgramInfoLog(t)||"link failed")}catch{h(!0);return}let s=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,s),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);let c=r.getAttribLocation(t,"a_pos");r.enableVertexAttribArray(c),r.vertexAttribPointer(c,2,r.FLOAT,!1,0,0),r.useProgram(t);let o=r.getUniformLocation(t,"u_res"),d=r.getUniformLocation(t,"u_light"),x=r.getUniformLocation(t,"u_type"),m=r.getUniformLocation(t,"u_color"),f=r.getUniformLocation(t,"u_time"),v=0,g=performance.now();function j(){let e=Math.min(window.devicePixelRatio||1,2),t=a.clientWidth,l=Math.round(.62*t);a.width=Math.round(t*e),a.height=Math.round(l*e),a.style.height=`${l}px`,r.viewport(0,0,a.width,a.height)}j();let b=new ResizeObserver(j);function N(e){let t=p.current;t.dragging=!0,t.lastX=e.clientX,t.lastY=e.clientY,a.setPointerCapture(e.pointerId)}function w(e){let t=p.current;t.dragging&&(t.az=Math.max(-1.3,Math.min(1.3,t.az+(e.clientX-t.lastX)*.008)),t.el=Math.max(.1,Math.min(1.25,t.el+(e.clientY-t.lastY)*.006)),t.lastX=e.clientX,t.lastY=e.clientY)}function y(){p.current.dragging=!1}return b.observe(a),!function e(){let t=(performance.now()-g)/1e3,l=u.current,s=p.current,n=s.dragging?0:.12*Math.sin(.25*t);r.uniform2f(o,a.width,a.height),r.uniform2f(d,s.az+n,s.el),r.uniform1f(x,l.type),r.uniform3f(m,l.color[0],l.color[1],l.color[2]),r.uniform1f(f,t),r.drawArrays(r.TRIANGLES,0,3),v=requestAnimationFrame(e)}(),a.addEventListener("pointerdown",N),a.addEventListener("pointermove",w),a.addEventListener("pointerup",y),a.addEventListener("pointercancel",y),()=>{cancelAnimationFrame(v),b.disconnect(),a.removeEventListener("pointerdown",N),a.removeEventListener("pointermove",w),a.removeEventListener("pointerup",y),a.removeEventListener("pointercancel",y)}},[]),m)return(0,t.jsx)("div",{className:"flex aspect-[16/10] items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-400",children:"当前浏览器不支持 WebGL"});let f=l[a];return(0,t.jsxs)("div",{className:"overflow-hidden rounded-lg border border-neutral-200 bg-white",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("canvas",{ref:e,className:"block w-full cursor-grab touch-none select-none active:cursor-grabbing","aria-label":"实时车漆材质演示，拖拽移动光源"}),(0,t.jsx)("span",{className:"pointer-events-none absolute bottom-3 left-3 rounded bg-white/80 px-2 py-0.5 font-mono text-[10px] tracking-wide text-neutral-400 backdrop-blur",children:"WebGL 手写 Shader · 拖拽移动光源"})]}),(0,t.jsxs)("div",{className:"border-t border-neutral-100 px-5 py-4",children:[(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[l.map((e,r)=>(0,t.jsxs)("button",{onClick:()=>o(r),className:`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${a===r?"border-neutral-900 bg-neutral-900 text-white":"border-neutral-200 text-neutral-500 hover:border-neutral-400"}`,children:[(0,t.jsx)("span",{className:"mr-1.5 font-mono text-[10px] opacity-60",children:e.n}),e.t.split(" ")[1]]},e.n)),(0,t.jsx)("span",{className:"mx-2 hidden h-4 w-px bg-neutral-200 sm:block"}),s.map(e=>(0,t.jsx)("button",{title:e.name,onClick:()=>x(e.hex),className:`h-6 w-6 rounded-full border transition-transform ${d===e.hex?"scale-110 border-neutral-900 ring-2 ring-neutral-200":"border-neutral-200 hover:scale-105"}`,style:{backgroundColor:e.hex}},e.hex))]}),(0,t.jsxs)("p",{className:"mt-3 text-sm leading-6 text-neutral-500",children:[(0,t.jsx)("strong",{className:"text-neutral-900",children:f.t}),(0,t.jsx)("span",{className:"mx-2 text-neutral-300",children:"·"}),f.d]})]})]})}let d=[{id:"why",label:"为什么"},{id:"paint",label:"车漆材质"},{id:"light",label:"灯光棚"},{id:"film",label:"演示片"},{id:"next",label:"进行中"}],x=[{n:"01",t:"金属漆 Metallic",d:"色漆层 + 铝粉闪片 + 清漆层。Clear Coat 双层着色模型，闪粉用法线贴图在强光下呈现细密颗粒感"},{n:"02",t:"珠光漆 Pearl",d:"云母珠光粉的干涉变色：随观察角度在两个色相之间流动（如蓝→紫），用菲涅尔插值实现"},{n:"03",t:"哑光漆 Matte",d:"高粗糙度保留极浅的边缘高光，克制但高级——电动汽车上的主流选择"},{n:"04",t:"清漆层 Clear Coat",d:"所有亮光漆的「玻璃感」来源：单独控制清漆粗糙度与反射强度，是车漆质感的第一决定因素"}],m=[{n:"S1",t:"0–5s · 开场",d:"黑场中一道光带扫过，车漆轮廓渐显"},{n:"S2",t:"5–15s · 转台展示",d:"整车 360° 旋转，金属漆在光带下流动"},{n:"S3",t:"15–27s · 涂装切换",d:"同机位实时切换 4 种涂装，带工艺名称标注"},{n:"S4",t:"27–37s · 细节特写",d:"logo / 轮毂 / 漆面微距，闪粉颗粒可见"},{n:"S5",t:"37–47s · 昼夜切换",d:"日光棚 → 夜间氛围灯，Lumen 全局光照实时切换"},{n:"S6",t:"47–55s · 收尾",d:"回到整车正面，标题淡入，配乐卡点"}];e.s(["default",0,function(){return(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)(a.k,{sections:d}),(0,t.jsx)(a._,{tag:"技术项目 · 汽车涂装 × UE 实时渲染 · 进行中",title:"涂装实验室 PAINT LAB",desc:"车漆是实时渲染的「天花板考题」：多层材质、随角度流动的高光、清漆下的细节。这个项目用 UE5 从零搭一套灯光棚和四种车漆材质，做成一部可实时切换涂装的展示片——CMF 出身的设计师，用引擎把涂装讲透。",tags:["UE5","车漆材质","灯光棚","Sequencer","CMF"]}),(0,t.jsx)("section",{className:"px-6 pb-20",children:(0,t.jsx)("div",{className:"mx-auto max-w-5xl",children:(0,t.jsx)(a.p,{cap:"一种车型，四套车漆",children:(0,t.jsx)(a.m,{src:"/images/tools-lab/paint-hero.webp",alt:"一种车型，四套车漆"})})})}),(0,t.jsx)("section",{id:"why",className:"border-t border-neutral-100 px-6 py-24",children:(0,t.jsxs)("div",{className:"mx-auto max-w-5xl",children:[(0,t.jsx)(a.P,{no:"01",label:"为什么做涂装",title:"CMF 出身，引擎补全另一半",desc:"涂装是我最有发言权的材质：从工业设计的 CMF 标注，到用 UE5 把它实时渲出来。"}),(0,t.jsxs)(a.N,{title:"从标注表到材质球",media:(0,t.jsx)(a.p,{cap:"从 CMF 标注表到材质球",children:(0,t.jsx)(a.m,{src:"/images/tools-lab/cmf-to-material.webp",alt:"从 CMF 标注表到材质球"})}),children:[(0,t.jsxs)("p",{children:["做巡检机器人项目时，我输出过完整的 CMF 标注：色号、材质、工艺。 但标注表只是一张纸——",(0,t.jsx)("strong",{className:"text-neutral-900",children:"用引擎把工艺「渲出来」，才算真正理解它"}),"。"]}),(0,t.jsx)("p",{children:"车漆是所有产品材质里最复杂的一类：色漆、闪粉、清漆三层叠加， 高光随角度流动。把它在 UE5 里做对，等于把实时材质系统整个打通。"})]})]})}),(0,t.jsx)("section",{id:"paint",className:"border-t border-neutral-100 px-6 py-24",children:(0,t.jsxs)("div",{className:"mx-auto max-w-5xl",children:[(0,t.jsx)(a.P,{no:"02",label:"车漆材质体系",title:"四种漆，四套参数",desc:"基于 UE5 Clear Coat 着色模型，每种涂装都是一组可切换的材质参数，而非一张贴图。"}),(0,t.jsxs)(a.N,{title:"材质定义",media:(0,t.jsx)("div",{className:"space-y-4",children:x.map(e=>(0,t.jsxs)("div",{className:"border-t border-neutral-200 pt-4",children:[(0,t.jsxs)("p",{className:"text-sm",children:[(0,t.jsx)("span",{className:"mr-3 font-mono text-xs text-neutral-300",children:e.n}),(0,t.jsx)("strong",{className:"text-neutral-900",children:e.t})]}),(0,t.jsx)("p",{className:"mt-1 text-sm leading-6 text-neutral-500",children:e.d})]},e.n))}),children:[(0,t.jsxs)("p",{children:["材质不做成「一个好看的球」，而是做成",(0,t.jsx)("strong",{className:"text-neutral-900",children:"一套可切换的系统"}),"：同一车型、同一机位，参数切换即换涂装。"]}),(0,t.jsx)("p",{children:"四种车漆的同机位对比渲染（待补充）："})]}),(0,t.jsxs)("div",{className:"mt-14 grid gap-6 sm:grid-cols-2",children:[(0,t.jsx)(a.p,{cap:"同机位 · 同灯光 · 四涂装",children:(0,t.jsx)(a.m,{src:"/images/tools-lab/paint-compare.webp",alt:"同机位 · 同灯光 · 四涂装"})}),(0,t.jsx)(a.p,{cap:"一套可切换的参数",children:(0,t.jsx)(a.m,{src:"/images/tools-lab/material-params.webp",alt:"一套可切换的参数"})})]}),(0,t.jsxs)("div",{className:"mt-20",children:[(0,t.jsx)("h3",{className:"text-lg font-medium tracking-tight text-neutral-900",children:"浏览器里直接试：实时车漆 Shader"}),(0,t.jsx)("p",{className:"mt-3 max-w-2xl text-sm leading-7 text-neutral-500",children:"同一套思路的网页版——不依赖引擎，用 WebGL 手写着色器复现四种漆的物理结构： 金属漆的高频闪粉、珠光的菲涅尔干涉变色、哑光的粗糙度压平、清漆的独立第二高光。 与 UE5 材质一一对应，切换涂装、换颜色、拖动光源，材质表现实时变化。"}),(0,t.jsx)("div",{className:"mt-8",children:(0,t.jsx)(o,{})}),(0,t.jsx)("p",{className:"mt-4 text-xs leading-6 text-neutral-400",children:"注：Demo 为单个材质球（球体近似），UE5 项目里的车漆落在真实车型曲面上， 还包含清漆厚度、法线贴图闪粉与 Lumen 全局光照的叠加表现。"})]})]})}),(0,t.jsx)("section",{id:"light",className:"border-t border-neutral-100 px-6 py-24",children:(0,t.jsxs)("div",{className:"mx-auto max-w-5xl",children:[(0,t.jsx)(a.P,{no:"03",label:"灯光棚",title:"车漆的唯一主角是光",desc:"黑棚 + 三条顶部光带 + 微反射地面——车漆高光的「拉丝流动」全部来自灯光设计。"}),(0,t.jsxs)(a.N,{title:"棚内布置",media:(0,t.jsx)(a.p,{cap:"灯光棚俯视：三条顶光 + 反射地面",children:(0,t.jsx)(a.m,{src:"/images/tools-lab/light-stage.webp",alt:"灯光棚俯视：三条顶光 + 反射地面"})}),children:[(0,t.jsxs)("p",{children:["纯黑棚 HDRI 打底，顶部三条长条形 Area Light 制造车漆上连续的高光拉丝； 三组光源做相位差动画，让光带在转台旋转时",(0,t.jsx)("strong",{className:"text-neutral-900",children:"慢速流动"}),"——这是汽车 CG 质感的核心。"]}),(0,t.jsx)("p",{children:"地面用微反射材质，车影交给 Lumen 全局光照自然生成，不贴假阴影。"})]})]})}),(0,t.jsx)("section",{id:"film",className:"border-t border-neutral-100 px-6 py-24",children:(0,t.jsxs)("div",{className:"mx-auto max-w-5xl",children:[(0,t.jsx)(a.P,{no:"04",label:"演示片",title:"55 秒，六镜头，可切换涂装",desc:"对标行业级汽车 CG 展示片的分镜节奏，但不只展示成品——核心镜头是同机位实时切换四种涂装，展示的是系统能力。"}),(0,t.jsx)(a.N,{title:"分镜脚本",media:(0,t.jsx)(a.p,{cap:"55 秒 · 六镜头分镜",children:(0,t.jsx)(a.m,{src:"/images/tools-lab/storyboard.webp",alt:"55 秒 · 六镜头分镜"})}),children:(0,t.jsx)("div",{className:"space-y-3",children:m.map(e=>(0,t.jsxs)("div",{className:"border-t border-neutral-200 pt-3",children:[(0,t.jsxs)("p",{className:"text-sm",children:[(0,t.jsx)("span",{className:"mr-3 font-mono text-xs text-neutral-300",children:e.n}),(0,t.jsx)("strong",{className:"text-neutral-900",children:e.t})]}),(0,t.jsx)("p",{className:"mt-1 text-sm text-neutral-500",children:e.d})]},e.n))})}),(0,t.jsx)(a.N,{side:"left",title:"制作 Breakdown",media:(0,t.jsx)(a.p,{cap:"Sequencer 时间线：相机 / 涂装 / 灯光轨道",children:(0,t.jsx)(a.m,{src:"/images/tools-lab/sequencer.webp",alt:"Sequencer 时间线：相机 / 涂装 / 灯光轨道"})}),children:(0,t.jsx)("p",{children:"每个镜头都会附制作过程：材质节点怎么连、灯光怎么布、 涂装切换用什么参数驱动——过程和结果一样重要。"})})]})}),(0,t.jsx)("section",{id:"next",className:"border-t border-neutral-100 px-6 py-24",children:(0,t.jsxs)("div",{className:"mx-auto max-w-5xl",children:[(0,t.jsx)(a.P,{no:"05",label:"进行中",title:"当前进度与下一步"}),(0,t.jsx)(a.N,{title:"进度",media:(0,t.jsx)(a.p,{cap:"当前进度：已完成 / 进行中 / 下一步",children:(0,t.jsx)(a.m,{src:"/images/tools-lab/progress.webp",alt:"当前进度：已完成 / 进行中 / 下一步"})}),children:(0,t.jsxs)("ul",{className:"list-none space-y-2",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"mr-2 font-mono text-xs text-neutral-300",children:"✓"}),"对标分析与分镜脚本定稿"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"mr-2 font-mono text-xs text-neutral-300",children:"✓"}),"网页实时车漆 Shader（WebGL 复现四种漆的物理结构）"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"mr-2 font-mono text-xs text-neutral-300",children:"→"}),"UE5 场景搭建与灯光棚（进行中）"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"mr-2 font-mono text-xs text-neutral-300",children:"○"}),"四种车漆材质 → Sequencer 分镜 → 成片"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"mr-2 font-mono text-xs text-neutral-300",children:"○"}),"后续：3DGS 实拍重建进入涂装展示流程"]})]})}),(0,t.jsx)(a.f,{children:"我对这个岗位的理解：实时渲染不是「会软件」，是懂材质、懂光、还懂约束。涂装实验室就是这三个词的练习场。"})]})}),(0,t.jsx)(a.R,{})]})}],30691)},21414,e=>{var t=e.i(43476),a=e.i(46932),r=e.i(22016);let l={hidden:{opacity:0,y:24},visible:{opacity:1,y:0}},s={hidden:{},visible:{transition:{staggerChildren:.12}}};e.s(["e",0,function({label:e,v:r,max:l,unit:s="%"}){return(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)("span",{className:"w-20 shrink-0 text-xs text-neutral-500",children:e}),(0,t.jsx)("div",{className:"h-2 flex-1 overflow-hidden rounded-full bg-neutral-100",children:(0,t.jsx)(a.f.div,{className:"h-full rounded-full bg-neutral-800",initial:{width:0},whileInView:{width:`${r/l*100}%`},viewport:{once:!0,margin:"-40px"},transition:{duration:.9,ease:"easeOut"}})}),(0,t.jsxs)("span",{className:"w-14 shrink-0 text-right font-mono text-xs text-neutral-400",children:[r,s]})]})},"f",0,function({children:e}){return(0,t.jsx)(a.f.p,{variants:l,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-60px"},className:"mt-16 max-w-2xl border-l-2 border-neutral-900 pl-6 text-base leading-8 text-neutral-600",children:e})},"R",0,function(){return(0,t.jsx)("footer",{className:"border-t border-neutral-100 px-6 py-8",children:(0,t.jsxs)("div",{className:"mx-auto flex max-w-5xl items-center justify-between text-xs text-neutral-400",children:[(0,t.jsx)(r.default,{href:"/#works",className:"transition-colors hover:text-neutral-900",children:"← 返回作品列表"}),(0,t.jsx)("span",{children:"© 2026 张清华"})]})})},"k",0,function({sections:e}){return(0,t.jsx)("header",{className:"sticky top-0 z-10 border-b border-neutral-100 bg-white/80 backdrop-blur",children:(0,t.jsxs)("div",{className:"mx-auto flex max-w-5xl items-center justify-between px-6 py-4",children:[(0,t.jsx)(r.default,{href:"/#works",className:"text-base font-medium tracking-tight",children:"← 张清华"}),(0,t.jsx)("nav",{className:"hidden items-center gap-6 text-sm text-neutral-500 md:flex",children:e.map(e=>(0,t.jsx)("a",{href:`#${e.id}`,className:"transition-colors hover:text-neutral-900",children:e.label},e.id))})]})})},"p",0,function({children:e,cap:r}){return(0,t.jsxs)(a.f.figure,{variants:l,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-60px"},transition:{duration:.55},children:[e,r&&(0,t.jsx)("figcaption",{className:"mt-3 font-mono text-[11px] tracking-wide text-neutral-400",children:r})]})},"_",0,function({tag:e,title:r,desc:n,tags:i}){return(0,t.jsx)("section",{className:"px-6 pb-16 pt-20",children:(0,t.jsxs)(a.f.div,{className:"mx-auto max-w-5xl",variants:s,initial:"hidden",animate:"visible",children:[(0,t.jsx)(a.f.p,{variants:l,className:"mb-4 text-sm text-neutral-400",children:e}),(0,t.jsx)(a.f.h1,{variants:l,className:"text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl",children:r}),(0,t.jsx)(a.f.p,{variants:l,className:"mt-6 max-w-2xl text-lg leading-8 text-neutral-500",children:n}),(0,t.jsx)(a.f.div,{variants:l,className:"mt-8 flex flex-wrap gap-3 text-xs text-neutral-500",children:i.map(e=>(0,t.jsx)("span",{className:"rounded-full border border-neutral-200 px-3 py-1",children:e},e))})]})})},"m",0,function({src:e,alt:a,dark:r=!1}){return(0,t.jsx)("div",{className:`overflow-hidden rounded-lg ${r?"bg-neutral-900":"bg-neutral-50"}`,children:(0,t.jsx)("img",{src:e,alt:a,className:"w-full object-cover"})})},"P",0,function({no:e,label:r,title:n,desc:i}){return(0,t.jsxs)(a.f.div,{variants:s,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-80px"},children:[(0,t.jsxs)(a.f.p,{variants:l,className:"flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-neutral-400",children:[(0,t.jsx)("span",{children:e}),(0,t.jsx)("span",{"aria-hidden":"true",className:"h-px w-8 bg-neutral-300"}),(0,t.jsx)("span",{children:r})]}),(0,t.jsx)(a.f.h2,{variants:l,className:"mt-4 text-2xl font-medium tracking-tight text-neutral-900 md:text-3xl",children:n}),i&&(0,t.jsx)(a.f.p,{variants:l,className:"mt-5 max-w-2xl text-base leading-8 text-neutral-600",children:i})]})},"N",0,function({title:e,children:r,media:s,side:n="right"}){let i=(0,t.jsxs)(a.f.div,{variants:l,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-60px"},transition:{duration:.55},children:[e&&(0,t.jsx)("h3",{className:"text-lg font-medium tracking-tight text-neutral-900",children:e}),(0,t.jsx)("div",{className:"mt-3 space-y-4 text-sm leading-7 text-neutral-500",children:r})]});return(0,t.jsx)("div",{className:"mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12",children:"left"===n?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"order-2 md:order-1",children:s}),(0,t.jsx)("div",{className:"order-1 md:order-2",children:i})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"order-1 md:order-1",children:i}),(0,t.jsx)("div",{className:"order-2 md:order-2",children:s})]})})},"o",0,l,"z",0,s])}])})();