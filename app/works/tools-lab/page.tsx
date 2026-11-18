"use client";

import {
  Closing,
  DetailFooter,
  DetailNav,
  Figure,
  Hero,
  Img,
  SectionHead,
  StoryBlock,
} from "@/components/work-ui";
import PaintShader from "@/components/PaintShader";

const sections = [
  { id: "why", label: "为什么" },
  { id: "paint", label: "车漆材质" },
  { id: "light", label: "灯光棚" },
  { id: "film", label: "演示片" },
  { id: "next", label: "进行中" },
];

const paints = [
  {
    n: "01",
    t: "金属漆 Metallic",
    d: "色漆层 + 铝粉闪片 + 清漆层。Clear Coat 双层着色模型，闪粉用法线贴图在强光下呈现细密颗粒感",
  },
  {
    n: "02",
    t: "珠光漆 Pearl",
    d: "云母珠光粉的干涉变色：随观察角度在两个色相之间流动（如蓝→紫），用菲涅尔插值实现",
  },
  {
    n: "03",
    t: "哑光漆 Matte",
    d: "高粗糙度保留极浅的边缘高光，克制但高级——电动汽车上的主流选择",
  },
  {
    n: "04",
    t: "清漆层 Clear Coat",
    d: "所有亮光漆的「玻璃感」来源：单独控制清漆粗糙度与反射强度，是车漆质感的第一决定因素",
  },
];

const shots = [
  { n: "S1", t: "0–5s · 开场", d: "黑场中一道光带扫过，车漆轮廓渐显" },
  { n: "S2", t: "5–15s · 转台展示", d: "整车 360° 旋转，金属漆在光带下流动" },
  { n: "S3", t: "15–27s · 涂装切换", d: "同机位实时切换 4 种涂装，带工艺名称标注" },
  { n: "S4", t: "27–37s · 细节特写", d: "logo / 轮毂 / 漆面微距，闪粉颗粒可见" },
  { n: "S5", t: "37–47s · 昼夜切换", d: "日光棚 → 夜间氛围灯，Lumen 全局光照实时切换" },
  { n: "S6", t: "47–55s · 收尾", d: "回到整车正面，标题淡入，配乐卡点" },
];

export default function ToolsLabPage() {
  return (
    <div className="flex-1">
      <DetailNav sections={sections} />

      <Hero
        tag="技术项目 · 汽车涂装 × UE 实时渲染 · 进行中"
        title="涂装实验室 PAINT LAB"
        desc="车漆是实时渲染的「天花板考题」：多层材质、随角度流动的高光、清漆下的细节。这个项目用 UE5 从零搭一套灯光棚和四种车漆材质，做成一部可实时切换涂装的展示片——CMF 出身的设计师，用引擎把涂装讲透。"
        tags={["UE5", "车漆材质", "灯光棚", "Sequencer", "CMF"]}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <Figure cap="一种车型，四套车漆">
                <Img src="/images/tools-lab/paint-hero.webp" alt="一种车型，四套车漆" />
              </Figure>
        </div>
      </section>

      {/* 01 为什么 */}
      <section id="why" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="01"
            label="为什么做涂装"
            title="CMF 出身，引擎补全另一半"
            desc="涂装是我最有发言权的材质：从工业设计的 CMF 标注，到用 UE5 把它实时渲出来。"
          />

          <StoryBlock
            title="从标注表到材质球"
            media={
              <Figure cap="从 CMF 标注表到材质球">
                <Img src="/images/tools-lab/cmf-to-material.webp" alt="从 CMF 标注表到材质球" />
              </Figure>
            }
          >
            <p>
              做巡检机器人项目时，我输出过完整的 CMF 标注：色号、材质、工艺。
              但标注表只是一张纸——<strong className="text-neutral-900">
              用引擎把工艺「渲出来」，才算真正理解它</strong>。
            </p>
            <p>
              车漆是所有产品材质里最复杂的一类：色漆、闪粉、清漆三层叠加，
              高光随角度流动。把它在 UE5 里做对，等于把实时材质系统整个打通。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 02 车漆材质 */}
      <section id="paint" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="02"
            label="车漆材质体系"
            title="四种漆，四套参数"
            desc="基于 UE5 Clear Coat 着色模型，每种涂装都是一组可切换的材质参数，而非一张贴图。"
          />

          <StoryBlock
            title="材质定义"
            media={
              <div className="space-y-4">
                {paints.map((p) => (
                  <div key={p.n} className="border-t border-neutral-200 pt-4">
                    <p className="text-sm">
                      <span className="mr-3 font-mono text-xs text-neutral-300">
                        {p.n}
                      </span>
                      <strong className="text-neutral-900">{p.t}</strong>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      {p.d}
                    </p>
                  </div>
                ))}
              </div>
            }
          >
            <p>
              材质不做成「一个好看的球」，而是做成<strong className="text-neutral-900">
              一套可切换的系统</strong>：同一车型、同一机位，参数切换即换涂装。
            </p>
            <p>四种车漆的同机位对比渲染（待补充）：</p>
          </StoryBlock>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <Figure cap="同机位 · 同灯光 · 四涂装">
                <Img src="/images/tools-lab/paint-compare.webp" alt="同机位 · 同灯光 · 四涂装" />
              </Figure>
            <Figure cap="一套可切换的参数">
                <Img src="/images/tools-lab/material-params.webp" alt="一套可切换的参数" />
              </Figure>
          </div>

          {/* 网页实时车漆 Shader */}
          <div className="mt-20">
            <h3 className="text-lg font-medium tracking-tight text-neutral-900">
              浏览器里直接试：实时车漆 Shader
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">
              同一套思路的网页版——不依赖引擎，用 WebGL 手写着色器复现四种漆的物理结构：
              金属漆的高频闪粉、珠光的菲涅尔干涉变色、哑光的粗糙度压平、清漆的独立第二高光。
              与 UE5 材质一一对应，切换涂装、换颜色、拖动光源，材质表现实时变化。
            </p>
            <div className="mt-8">
              <PaintShader />
            </div>
            <p className="mt-4 text-xs leading-6 text-neutral-400">
              注：Demo 为单个材质球（球体近似），UE5 项目里的车漆落在真实车型曲面上，
              还包含清漆厚度、法线贴图闪粉与 Lumen 全局光照的叠加表现。
            </p>
          </div>
        </div>
      </section>

      {/* 03 灯光棚 */}
      <section id="light" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="03"
            label="灯光棚"
            title="车漆的唯一主角是光"
            desc="黑棚 + 三条顶部光带 + 微反射地面——车漆高光的「拉丝流动」全部来自灯光设计。"
          />

          <StoryBlock
            title="棚内布置"
            media={
              <Figure cap="灯光棚俯视：三条顶光 + 反射地面">
                <Img src="/images/tools-lab/light-stage.webp" alt="灯光棚俯视：三条顶光 + 反射地面" />
              </Figure>
            }
          >
            <p>
              纯黑棚 HDRI 打底，顶部三条长条形 Area Light 制造车漆上连续的高光拉丝；
              三组光源做相位差动画，让光带在转台旋转时<strong className="text-neutral-900">
              慢速流动</strong>——这是汽车 CG 质感的核心。
            </p>
            <p>
              地面用微反射材质，车影交给 Lumen 全局光照自然生成，不贴假阴影。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 04 演示片 */}
      <section id="film" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="04"
            label="演示片"
            title="55 秒，六镜头，可切换涂装"
            desc="对标行业级汽车 CG 展示片的分镜节奏，但不只展示成品——核心镜头是同机位实时切换四种涂装，展示的是系统能力。"
          />

          <StoryBlock
            title="分镜脚本"
            media={
              <Figure cap="55 秒 · 六镜头分镜">
                <Img src="/images/tools-lab/storyboard.webp" alt="55 秒 · 六镜头分镜" />
              </Figure>
            }
          >
            <div className="space-y-3">
              {shots.map((s) => (
                <div key={s.n} className="border-t border-neutral-200 pt-3">
                  <p className="text-sm">
                    <span className="mr-3 font-mono text-xs text-neutral-300">
                      {s.n}
                    </span>
                    <strong className="text-neutral-900">{s.t}</strong>
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">{s.d}</p>
                </div>
              ))}
            </div>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="制作 Breakdown"
            media={
              <Figure cap="Sequencer 时间线：相机 / 涂装 / 灯光轨道">
                <Img src="/images/tools-lab/sequencer.webp" alt="Sequencer 时间线：相机 / 涂装 / 灯光轨道" />
              </Figure>
            }
          >
            <p>
              每个镜头都会附制作过程：材质节点怎么连、灯光怎么布、
              涂装切换用什么参数驱动——过程和结果一样重要。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 05 进行中 */}
      <section id="next" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead no="05" label="进行中" title="当前进度与下一步" />

          <StoryBlock
            title="进度"
            media={
              <Figure cap="当前进度：已完成 / 进行中 / 下一步">
                <Img src="/images/tools-lab/progress.webp" alt="当前进度：已完成 / 进行中 / 下一步" />
              </Figure>
            }
          >
            <ul className="list-none space-y-2">
              <li>
                <span className="mr-2 font-mono text-xs text-neutral-300">✓</span>
                对标分析与分镜脚本定稿
              </li>
              <li>
                <span className="mr-2 font-mono text-xs text-neutral-300">✓</span>
                网页实时车漆 Shader（WebGL 复现四种漆的物理结构）
              </li>
              <li>
                <span className="mr-2 font-mono text-xs text-neutral-300">→</span>
                UE5 场景搭建与灯光棚（进行中）
              </li>
              <li>
                <span className="mr-2 font-mono text-xs text-neutral-300">○</span>
                四种车漆材质 → Sequencer 分镜 → 成片
              </li>
              <li>
                <span className="mr-2 font-mono text-xs text-neutral-300">○</span>
                后续：3DGS 实拍重建进入涂装展示流程
              </li>
            </ul>
          </StoryBlock>

          <Closing>
            我对这个岗位的理解：实时渲染不是「会软件」，是懂材质、懂光、还懂约束。涂装实验室就是这三个词的练习场。
          </Closing>
        </div>
      </section>

      <DetailFooter />
    </div>
  );
}
