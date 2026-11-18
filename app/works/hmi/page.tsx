"use client";

import { motion } from "framer-motion";
import {
  Closing,
  DetailFooter,
  DetailNav,
  Figure,
  Hero,
  Img,
  Placeholder,
  SectionHead,
  StoryBlock,
  fadeUp,
} from "@/components/work-ui";

const sections = [
  { id: "idea", label: "设计思路" },
  { id: "system", label: "系统界面" },
  { id: "modes", label: "深浅双模式" },
  { id: "pages", label: "页面方案" },
  { id: "practice", label: "渲染练习" },
  { id: "author", label: "作者介绍" },
];

/** 页面方案：功能页全稿，深浅成对 */
const pagePairs = [
  {
    title: "空调风调节",
    desc: "风量滑档与出风气流可视化联动，前后排分区控制，温度信息常驻两侧。",
    day: "/images/hmi/pages/page-03.webp",
    night: "/images/hmi/pages/page-04.webp",
  },
  {
    title: "氛围灯调节",
    desc: "车内 / 车外灯光分区切换，色相条直接取色，灯光变化实时反映在 3D 座舱上。",
    day: "/images/hmi/pages/page-05.webp",
    night: "/images/hmi/pages/page-06.webp",
  },
  {
    title: "座椅声音等",
    desc: "俯视整车视角承载座椅、声音与功能设置：点位即控件，点哪调哪。",
    day: "/images/hmi/pages/page-07.webp",
    night: "/images/hmi/pages/page-08.webp",
  },
  {
    title: "方向盘调节",
    desc: "方向盘 3D 模型上直接标注可调节方向，卡片式弹层保持上下文不跳转。",
    day: "/images/hmi/pages/page-09.webp",
    night: "/images/hmi/pages/page-10.webp",
  },
  {
    title: "能量车况",
    desc: "俯视底盘展示电池与能量流，续航、功率与里程数据分层排布，一屏读完整车状态。",
    day: "/images/hmi/pages/page-12.webp",
    night: "/images/hmi/pages/page-13.webp",
  },
];

const duties = [
  {
    n: "01",
    t: "3D 车模与资源",
    d: "车型模型整理、轻量化与材质重建，作为整个车机系统的三维底座",
  },
  {
    n: "02",
    t: "车辆动画",
    d: "车控车况动画：开门、充电、空调风向等功能状态的动态表达",
  },
  {
    n: "03",
    t: "界面与图标系统",
    d: "卡片布局、字阶、图标与控件动效，建立统一的视觉规范",
  },
  {
    n: "04",
    t: "Unity 实时渲染",
    d: "光照、材质与后处理调校，兼顾座舱氛围与车机性能",
  },
];

/** 深浅模式对照：夜间 / 日间两张图并排 */
function Pair({ night, day }: { night: string; day: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="grid grid-cols-2 gap-3"
    >
      <figure>
        <div className="overflow-hidden rounded-lg bg-neutral-900">
          <img src={night} alt="夜间模式" className="w-full object-cover" />
        </div>
        <figcaption className="mt-2 font-mono text-[10px] tracking-[0.2em] text-neutral-400">
          NIGHT · 夜间模式
        </figcaption>
      </figure>
      <figure>
        <div className="overflow-hidden rounded-lg bg-neutral-50">
          <img src={day} alt="日间模式" className="w-full object-cover" />
        </div>
        <figcaption className="mt-2 font-mono text-[10px] tracking-[0.2em] text-neutral-400">
          DAY · 日间模式
        </figcaption>
      </figure>
    </motion.div>
  );
}

export default function HmiPage() {
  return (
    <div className="flex-1">
      <DetailNav sections={sections} />

      <Hero
        tag="个人练习项目 · 以奥迪车型模型为载体的车机系统设计 · 2026"
        title="车机 HMI · 3D 车机显示"
        desc="用一台奥迪车型的 3D 模型当载体，从零设计一套属于自己的车机系统——界面视觉、3D 车控动画、深浅双模式全部自制。"
        tags={["HMI 设计", "3D 车模", "Unity 渲染", "深浅双模式", "个人练习"]}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <Figure cap="3D 车模白模 · 能量车况展示">
            <Img src="/images/hmi/carmodel-white.webp" alt="3D 车模白模" />
          </Figure>
        </div>
      </section>

      {/* 01 设计思路 */}
      <section id="idea" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="01"
            label="设计思路"
            title="车模是载体，系统是作品"
            desc="选一台结构清晰、比例成熟的车型模型作为三维底座，把精力集中在真正要设计的东西上：车机系统本身。"
          />

          <StoryBlock
            title="为什么用现成车模"
            media={
              <Figure cap="座舱白模 · 界面依附的三维空间">
                <Img src="/images/hmi/cabin-overview.webp" alt="座舱白模" />
              </Figure>
            }
          >
            <p>
              车模提供的是<strong className="text-neutral-900">可交互的三维对象</strong>：
              车门能开、车灯能亮、能量流能在车身上流动。
              有了这个底座，界面设计才有真实的对象可依附。
            </p>
            <p>
              界面结构、交互逻辑、图标体系、光照氛围——
              这些才是我的设计内容，也是这套练习真正想验证的能力。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="统一视觉体系"
            media={
              <Figure cap="HMI 视觉方案 · 图标 / 字阶 / 卡片规范">
                <Img src="/images/hmi/ui-system.webp" alt="HMI 视觉方案" />
              </Figure>
            }
          >
            <p>
              先定规范再做页面：主色与中性色阶、标题/正文/数据三档字号、
              卡片圆角与描边规则、图标线性与面性两套风格。
            </p>
            <p>
              规范统一之后，四个功能页面（车辆控制、座椅、氛围灯、空调）
              才能看起来像同一套系统，而不是四张拼贴。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 02 系统界面 */}
      <section id="system" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="02"
            label="系统界面"
            title="四个功能页面 + 一套车控动画"
            desc="界面以卡片承载功能，3D 车模始终在场：每一项设置都能在车上看到对应的变化。"
          />

          <StoryBlock
            title="车辆控制"
            media={
              <Figure cap="车辆控制界面 · 3D 车模 + 卡片式布局">
                <Img src="/images/hmi/ui-control-light.webp" alt="车辆控制界面" />
              </Figure>
            }
          >
            <p>
              首页以 3D 车模为中心，四周环绕车辆状态卡片：
              续航与能量流、车门锁、空调、氛围灯。点按任一卡片，
              车模会给出对应的视觉反馈——屏幕上的操作与车上的状态是同一件事。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="车控动画"
            media={
              <Figure cap="车门开启状态 · 3D 车控动画帧">
                <Img src="/images/hmi/ui-door-open.webp" alt="车门开启动画" />
              </Figure>
            }
          >
            <p>
              开门、充电口开启、空调风向——这些状态都用 3D 动画表达，
              而不是图标＋文字。动画节奏统一在 300–500ms，
              与界面转场共用一套缓动曲线。
            </p>
          </StoryBlock>

          <StoryBlock
            title="实车 3D · 交互控件"
            media={
              <Pair
                night="/images/hmi/control-night.webp"
                day="/images/hmi/control-day.webp"
              />
            }
          >
            <p>
              实车内饰 3D 场景直接承载交互控件：温度、风量、风向滑块浮在真实座舱之上，
              气流可视化实时跟随设置——控件与车模属于同一个三维空间，而不是两张贴图。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 03 深浅双模式 */}
      <section id="modes" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="03"
            label="深浅双模式"
            title="同一套 3D 内容，两套光照"
            desc="所有功能页面都做了日间 / 夜间两套渲染：不只是换配色，而是重新布光——夜间压暗环境、让屏幕与氛围灯成为唯一光源。"
          />

          <div className="mt-14 space-y-20">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <h3 className="text-lg font-medium tracking-tight text-neutral-900">
                座椅舒展
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-500">
                座椅通风、加热与按摩的状态用 3D 座椅直接表达：风道、热区与按摩点位在椅面上可视化，
                夜间模式下高亮更克制，避免刺眼。
              </p>
              <div className="mt-6">
                <Pair
                  night="/images/hmi/seats-night.webp"
                  day="/images/hmi/seats-day.webp"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <h3 className="text-lg font-medium tracking-tight text-neutral-900">
                氛围灯
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-500">
                氛围灯是夜间模式的主角：门板与中控的光带参与环境照明，
                屏幕亮度随之降低，色温偏暖。日间模式则回到材质真实感优先。
              </p>
              <div className="mt-6">
                <Pair
                  night="/images/hmi/ambient-night.webp"
                  day="/images/hmi/ambient-day.webp"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <h3 className="text-lg font-medium tracking-tight text-neutral-900">
                空调风向
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-500">
                出风方向与风量用半透明气流带表达，风向随设置实时弯曲。
                两套模式下气流带的透明度与发光强度分别调校，
                保证深色背景不过曝、浅色背景不模糊。
              </p>
              <div className="mt-6">
                <Pair
                  night="/images/hmi/ac-night.webp"
                  day="/images/hmi/ac-day.webp"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 04 页面方案 */}
      <section id="pages" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="04"
            label="页面方案"
            title="功能页全稿 · 深浅成对"
            desc="每个功能页都交付了日间 / 夜间两套完整方案：同一套 3D 场景与控件，随光照重新布光，而不是简单换肤。"
          />

          <div className="mt-14 space-y-20">
            {pagePairs.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
              >
                <h3 className="text-lg font-medium tracking-tight text-neutral-900">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-500">
                  {p.desc}
                </p>
                <div className="mt-6">
                  <Pair night={p.night} day={p.day} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 渲染练习 */}
      <section id="practice" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="05"
            label="渲染练习"
            title="材质、光域与屏幕发光"
          />

          <StoryBlock
            title="座舱氛围练习"
            media={
              <Figure cap="座舱渲染练习 · 夜间氛围">
                <Img src="/images/hmi/cabin-render.png" alt="座舱渲染练习" />
              </Figure>
            }
          >
            <p>
              工作之外的渲染练习：探索座舱材质（皮革、木饰、金属）与
              屏幕发光的层次关系，反哺项目中的光照判断。
            </p>
            <p>
              练习和项目互相喂养——这也是我把 HMI 从「工作」变成
              「持续练习」的原因。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 收尾 · 感谢观看 */}
      <section className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <StoryBlock
            side="left"
            title="把练习放回真实场景"
            media={
              <Figure cap="感谢观看 · 深圳机场实拍（本人拍摄与排版，仅供学习展示）">
                <Img src="/images/hmi/s9-scene.webp" alt="享界 S9T 机场大屏实拍 · 收尾页" />
              </Figure>
            }
          >
            <p>
              这套练习的收尾页：把自己做的内容放进真实场景里再看一遍——
              机场到达通道的车型大屏、来往的人流、实拍的光线，
              都是屏幕之外最好的参照。
            </p>
          </StoryBlock>
          <Closing>
            这套练习最后把我带回真实场景：机场到达通道的大屏、来往的人流、现场的光线——
            设计师的价值不止于屏幕内的像素，也在于对真实环境的观察。
          </Closing>
        </div>
      </section>

      {/* 07 作者介绍 */}
      <section id="author" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="06"
            label="作者介绍"
            title="来自实车项目的交付文档"
            desc="这套页面方案出自智能座舱项目的交付文档：上面的功能页大多已经跟着量产车型上线——这也是把它们按实车标准来整理的原因。"
          />

          <Figure cap="交付文档收尾页 · 作者介绍 / 工作涉及范围 / 部分实车验车拍摄">
            <Img src="/images/hmi/pages/page-20.webp" alt="作者介绍与工作涉及范围" />
          </Figure>
        </div>
      </section>

      <DetailFooter />
    </div>
  );
}
