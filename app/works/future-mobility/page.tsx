"use client";

import { motion } from "framer-motion";
import {
  Bar,
  Closing,
  DetailFooter,
  DetailNav,
  Figure,
  Hero,
  Img,
  SectionHead,
  StoryBlock,
  fadeUp,
  stagger,
} from "@/components/work-ui";

const sections = [
  { id: "background", label: "背景" },
  { id: "research", label: "研究" },
  { id: "design", label: "定义" },
  { id: "process", label: "推敲" },
  { id: "interaction", label: "交互" },
  { id: "structure", label: "结构" },
  { id: "final", label: "成果" },
];

const stats = [
  { value: "95%", text: "车辆约 95% 的时间停放在停车场，未被使用" },
  { value: "60%", text: "道路上行驶的车辆中，约 60% 只有驾驶员一人" },
  { value: "<2%", text: "整个交通系统的平均利用效率不足设计效率的 2%" },
];

const painPoints = [
  {
    title: "出行模式分散",
    text: "交通规划不便、拥堵频发，导航系统有待优化，多种方式之间缺乏衔接。",
  },
  {
    title: "出行方式单一",
    text: "缺少灵活的中间形态，难以覆盖「最后一公里」这类碎片化场景。",
  },
  {
    title: "成本仍然偏高",
    text: "共享出行的价格与流程门槛，让高频用户难以长期依赖。",
  },
];

const competitors = [
  {
    name: "MaaS 出行即服务",
    pros: "利用多元出行方式与大数据调度，资源利用率高",
    cons: "定制化服务导致价格偏高，受众面窄",
  },
  {
    name: "出租车 / 网约车",
    pros: "可按需选择服务模式，价格相对合理",
    cons: "司机素质参差，存在安全隐患与体验波动",
  },
];

const interviewees = ["Stiven · 21 · 职员", "Bob · 29 · 教练", "Lily · 21 · 学生"];

const qa = [
  { q: "出行频率高吗？", a: "一周约 3 次 / 每天开车上下班 / 不高，以公共交通为主" },
  { q: "出行的主要目的？", a: "通勤与自驾出行 / 工作需要 / 上学与周末出游" },
  { q: "经历过哪些不便？", a: "地铁体验差 / 停车不便、车位紧张 / 车内气味导致晕车" },
  { q: "常用的共享方式？", a: "短途骑共享单车 / 看路线系统再选择 / 学校与社区共享单车" },
  { q: "共享出行的问题？", a: "停车费偏高 / 使用流程繁琐 / 车辆有损坏" },
  { q: "最舒服的方式是？", a: "自己开车 / 自驾的自由感 / 被动放松的乘坐体验" },
];

const timeData = [
  { label: "0–6 点", v: 3.4 },
  { label: "6–12 点", v: 31.0 },
  { label: "12–18 点", v: 45.6 },
  { label: "18–24 点", v: 31.9 },
  { label: "不定时", v: 15.5 },
];

const factorData = [
  { label: "性能", v: 58.1 },
  { label: "安全", v: 53.2 },
  { label: "价格", v: 32.3 },
  { label: "外观", v: 30.6 },
  { label: "驾驶感受", v: 29.2 },
  { label: "品牌", v: 29.0 },
];

const journey = [
  {
    stage: "需求",
    act: "通勤上学、去商场、旅行",
    pain: "出行方式不够灵活",
    chance: "一体化的出行工具",
  },
  {
    stage: "规划",
    act: "确定目的地、选地铁站、带好钥匙公交卡",
    pain: "频繁堵车、车厢拥挤",
    chance: "实时路况分析与最优路线",
  },
  {
    stage: "寻找",
    act: "骑行 / 地铁 / 打车组合",
    pain: "不愿挤公共交通，住处附近只有自行车",
    chance: "车辆自动接驾",
  },
  {
    stage: "乘坐",
    act: "共享汽车解锁、清洁、线上约租",
    pain: "座位不舒适、受天气影响、缺少私人空间",
    chance: "优化车辆内饰与座舱体验",
  },
  {
    stage: "到达",
    act: "换乘、提前下车步行",
    pain: "落点离目的地远",
    chance: "灵活的落客点",
  },
  {
    stage: "支付",
    act: "单次 / 月卡结算、线上支付",
    pain: "手机没信号时很尴尬",
    chance: "开放多平台支付",
  },
];

const steps = [
  { n: "01", t: "确定所在及目的地", d: "定位当前位置，输入或选择目的地" },
  { n: "02", t: "选择出行方案", d: "按时间与成本推荐组合方案" },
  { n: "03", t: "接驾确认", d: "车辆自动抵达接驾点，确认上车" },
  { n: "04", t: "支付", d: "行程结束自动结算，支持多平台" },
];

const layers = [
  { n: "L1", t: "座舱框架 + 座椅", d: "环形框架结构，四人座布局" },
  { n: "L2", t: "车身覆盖件", d: "前后覆盖件独立拆装" },
  { n: "L3", t: "底部模块化轮组", d: "轮组与动力舱集成于底盘" },
];

export default function FutureMobilityPage() {
  return (
    <div className="flex-1">
      <DetailNav sections={sections} />

      {/* Hero */}
      <Hero
        tag="设计竞赛作品 · 2023"
        title="cycle-00 共享出行概念车"
        desc="针对城市出行效率低、模式单一、停车难等痛点，设计的一款模块化低底盘共享概念车，覆盖「研究 → 草图 → 原型 → 建模 → App 交互 → 结构 → 3D 打印实物」完整闭环。"
        tags={["独立完成", "用户研究", "3D 建模", "原型验证", "App UI", "3D 打印"]}
      />

      {/* Hero 视频 */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <Figure cap="cycle-00 · 车门开启动态展示">
            <div className="overflow-hidden rounded-lg bg-neutral-50">
              <video
                src="/images/future-mobility/cycle00-door-open.mp4"
                poster="/images/future-mobility/door-poster.webp"
                autoPlay
                loop
                muted
                playsInline
                className="w-full object-cover"
              />
            </div>
          </Figure>
        </div>
      </section>

      {/* 01 背景与洞察 */}
      <section id="background" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="01"
            label="背景与洞察"
            title="城市出行的效率困境"
            desc="未来城市出行需要解决「有限的基础设施与服务能力」和「快速增长的需求」之间的矛盾。"
          />

          <StoryBlock
            title="三个数字背后的矛盾"
            media={
              <Figure cap="城市出行背景 · 现状与竞品分析">
                <Img
                  src="/images/future-mobility/02-background.webp"
                  alt="城市出行背景 · 现状与竞品分析"
                />
              </Figure>
            }
          >
            <p>
              车辆约 <strong className="text-neutral-900">95%</strong> 的时间停放在停车场；道路上约{" "}
              <strong className="text-neutral-900">60%</strong> 的车只有驾驶员一人；整个交通系统的平均利用效率不足设计效率的{" "}
              <strong className="text-neutral-900">2%</strong>。
            </p>
            <p>资源闲置与需求错配同时存在——这是本项目的出发点。</p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="问题归纳"
            media={
              <Figure cap="数据调查 · 出行时段与关注因素">
                <Img
                  src="/images/future-mobility/04-data.webp"
                  alt="数据调查 · 出行时段与关注因素"
                />
              </Figure>
            }
          >
            <p>通过桌面研究与观察，把现状问题收敛为三类：</p>
            <ul className="space-y-2">
              {painPoints.map((p, i) => (
                <li key={p.title} className="flex gap-3">
                  <span className="font-mono text-xs text-neutral-300">
                    0{i + 1}
                  </span>
                  <span>
                    <strong className="text-neutral-900">{p.title}</strong>
                    <span className="mx-2 text-neutral-300">·</span>
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
          </StoryBlock>

          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-20 text-lg font-medium tracking-tight text-neutral-900"
          >
            竞品分析
          </motion.h3>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-6 grid gap-6 md:grid-cols-2"
          >
            {competitors.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                className="rounded-lg border border-neutral-200 p-6"
              >
                <p className="text-sm font-medium text-neutral-900">{c.name}</p>
                <p className="mt-4 flex gap-3 text-sm leading-6 text-neutral-500">
                  <span className="shrink-0 font-mono text-[10px] text-neutral-900">
                    优势
                  </span>
                  {c.pros}
                </p>
                <p className="mt-2 flex gap-3 text-sm leading-6 text-neutral-500">
                  <span className="shrink-0 font-mono text-[10px] text-neutral-400">
                    短板
                  </span>
                  {c.cons}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500">
            两者都无法同时满足「低成本 + 高灵活 + 可信赖」。这正是共享概念车的机会空间。
          </p>
        </div>
      </section>

      {/* 02 用户研究 */}
      <section id="research" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="02"
            label="用户研究"
            title="谁在为出行痛点买单"
          />

          <StoryBlock
            title="深度访谈"
            media={
              <Figure cap="深度访谈 · 3 位受访者记录">
                <Img
                  src="/images/future-mobility/03-interview.webp"
                  alt="深度访谈 · 3 位受访者记录"
                />
              </Figure>
            }
          >
            <p>
              选取 3 位不同身份的典型用户进行深度访谈，围绕频率、目的、不便、共享方式、问题与理想方式 6 个问题展开。
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {interviewees.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600"
                >
                  {p}
                </span>
              ))}
            </div>
          </StoryBlock>

          <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {qa.map((item, i) => (
              <motion.div
                key={item.q}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="border-t border-neutral-200 pt-5"
              >
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-neutral-300">
                    Q{i + 1}
                  </span>
                  <span className="text-sm font-medium text-neutral-900">
                    {item.q}
                  </span>
                </p>
                <p className="mt-2 pl-8 text-sm leading-6 text-neutral-500">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 rounded-lg bg-neutral-50 p-8"
          >
            <p className="text-sm font-medium text-neutral-900">访谈小结</p>
            <div className="mt-4 grid gap-4 text-sm leading-6 text-neutral-600 md:grid-cols-3">
              <p>
                <span className="mr-2 font-mono text-[10px] text-neutral-900">
                  痛点
                </span>
                停车不便、共享用车流程繁琐
              </p>
              <p>
                <span className="mr-2 font-mono text-[10px] text-neutral-400">
                  痒点
                </span>
                信用体系不完善，损坏责任难界定
              </p>
              <p>
                <span className="mr-2 font-mono text-[10px] text-neutral-400">
                  爽点
                </span>
                共享经济下，出行成本可以更低
              </p>
            </div>
          </motion.div>

          <StoryBlock
            side="left"
            title="问卷数据验证"
            media={
              <div className="space-y-5">
                {timeData.map((d) => (
                  <Bar key={d.label} label={d.label} v={d.v} max={50} />
                ))}
              </div>
            }
          >
            <p>
              访谈之外补充发放问卷。<strong className="text-neutral-900">使用时段</strong>上，
              12–18 点占比最高（45.6%），6–12 点与 18–24 点接近，出行需求呈明显双峰。
            </p>
            <p>高峰集中意味着共享车辆需要更强的调度能力，也印证了「自动接驾」的价值。</p>
          </StoryBlock>

          <StoryBlock
            title="用户更在意什么"
            media={
              <div className="space-y-5">
                {factorData.map((d) => (
                  <Bar key={d.label} label={d.label} v={d.v} max={60} />
                ))}
              </div>
            }
          >
            <p>
              在注重因素中，<strong className="text-neutral-900">性能（58.1%）与安全（53.2%）</strong>
              显著领先于价格与外观。
            </p>
            <p>
              这决定了设计重心：先给用户一个「可靠、安全」的产品印象，再谈造型与性价比。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="典型用户画像"
            media={
              <Figure cap="PERSONA · Xu · 20 · 大学生">
                <Img
                  src="/images/future-mobility/persona-board.webp"
                  alt="典型用户画像"
                />
              </Figure>
            }
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-400">
              PERSONA
            </p>
            <p className="text-xl font-medium text-neutral-900">Xu · 20 · 大学生</p>
            <p>
              住处距学校 5km，月生活费 2k。上下学高峰出行，周末逛街；体质较弱，长时间通勤消耗大。
            </p>
            <p>
              <strong className="text-neutral-900">挫败与期望：</strong>
              通勤耗时长、经常迟到并损失睡眠；期望一种经济、快速的出行方式。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 03 设计定义 */}
      <section id="design" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="03"
            label="设计定义"
            title="从旅程图到机会点"
            desc="拆解「需求 → 规划 → 寻找 → 乘坐 → 到达 → 支付」六阶段用户旅程：情绪在规划与寻找阶段跌至最低，对应得到设计机会点。"
          />

          <StoryBlock
            title="用户旅程图"
            media={
              <Figure cap="用户旅程图 · 六阶段行为与痛点">
                <Img
                  src="/images/future-mobility/05-journey-map.webp"
                  alt="用户旅程图 · 六阶段行为与痛点"
                />
              </Figure>
            }
          >
            <p>
              把访谈与问卷结论放进旅程图：每阶段的用户行为与痛点被逐条列出，
              痛点最集中的四个环节，就是设计的四个机会点。
            </p>
          </StoryBlock>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-14 overflow-x-auto"
          >
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="w-20 py-3 pr-4 font-mono text-[10px] tracking-[0.2em] text-neutral-400">
                    阶段
                  </th>
                  <th className="py-3 pr-4 font-mono text-[10px] tracking-[0.2em] text-neutral-400">
                    用户行为
                  </th>
                  <th className="py-3 pr-4 font-mono text-[10px] tracking-[0.2em] text-neutral-400">
                    痛点
                  </th>
                  <th className="py-3 font-mono text-[10px] tracking-[0.2em] text-neutral-900">
                    机会点
                  </th>
                </tr>
              </thead>
              <tbody>
                {journey.map((j) => (
                  <motion.tr
                    key={j.stage}
                    variants={fadeUp}
                    className="border-b border-neutral-100 align-top"
                  >
                    <td className="py-5 pr-4 text-sm font-medium text-neutral-900">
                      {j.stage}
                    </td>
                    <td className="py-5 pr-4 text-sm leading-6 text-neutral-500">
                      {j.act}
                    </td>
                    <td className="py-5 pr-4 text-sm leading-6 text-neutral-500">
                      {j.pain}
                    </td>
                    <td className="py-5 text-sm leading-6 text-neutral-900">
                      {j.chance}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <StoryBlock
            side="left"
            title="设计定义"
            media={
              <Figure cap="cycle-00 · 概念渲染">
                <Img
                  src="/images/future-mobility/01-hero-cycle00.webp"
                  alt="cycle-00 · 概念渲染"
                />
              </Figure>
            }
          >
            <p>
              综合四个机会点，定义出一款
              <strong className="text-neutral-900">
                模块化低底盘共享概念车 cycle-00
              </strong>
              ：一体化出行工具，支持实时路况规划与自动接驾，
              座舱体验针对短途乘坐优化，落客点灵活，支付开放多平台。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 04 造型推敲 */}
      <section id="process" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="04"
            label="造型推敲"
            title="草图 → 原型 → 数字模型"
          />

          <StoryBlock
            title="手绘推敲"
            media={
              <Figure cap="造型推敲草图">
                <Img src="/images/future-mobility/sketch-sheet.webp" alt="造型推敲草图" />
              </Figure>
            }
          >
            <p>
              先用大量手绘推敲比例关系：低底盘带来更低的重心与更大的乘坐空间，
              四轮四角的布局让轮组可以模块化独立拆装。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="确定概念方向"
            media={
              <Figure cap="低底盘概念方向">
                <Img src="/images/future-mobility/concept-sketch.webp" alt="低底盘概念方向草图" />
              </Figure>
            }
          >
            <p>
              收敛出低底盘环舱概念：全景舱盖向上掀起，座舱与底盘完全解耦，
              为后续模块化结构打下基础。
            </p>
          </StoryBlock>

          <StoryBlock
            title="原型验证"
            media={
              <Figure cap="Arduino 履带验证小车">
                <Img src="/images/future-mobility/arduino-1.webp" alt="Arduino 履带验证小车" />
              </Figure>
            }
          >
            <p>
              在进入 3D 建模前，用 Arduino 制作履带验证小车，实车验证避障、
              牵引与超声波控制逻辑——让「自动接驾」在早期就经过物理验证。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="控制与传动"
            media={
              <Figure cap="避障 / 牵引 / 超声波控制模块">
                <Img src="/images/future-mobility/arduino-top.webp" alt="控制模块细节" />
              </Figure>
            }
          >
            <p>
              顶层布置控制模块：超声波避障 + 牵引控制双系统并行，
              验证了小尺度下的路径跟随能力。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 05 交互流程 */}
      <section id="interaction" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="05"
            label="交互流程"
            title="App 端四步闭环"
            desc="App 端四步完成一次出行预约，车端配合平衡车接驳，形成十步完整使用循环。"
          />

          <StoryBlock
            title="预约流程"
            media={
              <Figure cap="App 界面 · 确定地点 → 选择方案 → 接驾确认 → 支付">
                <Img src="/images/future-mobility/app-screens.webp" alt="App 界面演示" />
              </Figure>
            }
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {steps.map((s) => (
                <motion.div
                  key={s.n}
                  variants={fadeUp}
                  className="rounded-lg border border-neutral-200 p-4"
                >
                  <p className="font-mono text-xs text-neutral-300">{s.n}</p>
                  <p className="mt-2 text-sm font-medium text-neutral-900">{s.t}</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">{s.d}</p>
                </motion.div>
              ))}
            </motion.div>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="完整使用循环"
            media={
              <Figure cap="cycle-usage · 十步使用循环">
                <Img src="/images/future-mobility/cycle-usage.webp" alt="十步使用循环图" />
              </Figure>
            }
          >
            <p>
              从「发起需求」到「车辆归位」，车端与 App 端咬合成十步循环；
              平衡车作为最后一公里接驳工具与车身集成，归还后自动进入充电待命。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 06 工程结构 */}
      <section id="structure" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="06"
            label="工程结构"
            title="模块化拆解"
            desc="整车按三层结构拆解，模块之间独立装配，便于共享场景下的维护与更换。"
          />

          <StoryBlock
            title="三层结构"
            media={
              <Figure cap="产品结构爆炸图">
                <Img src="/images/future-mobility/exploded.webp" alt="产品结构爆炸图" />
              </Figure>
            }
          >
            <div className="space-y-4">
              {layers.map((l) => (
                <div key={l.n} className="flex gap-4 border-t border-neutral-200 pt-4">
                  <span className="font-mono text-xs text-neutral-300">{l.n}</span>
                  <p className="text-sm">
                    <strong className="text-neutral-900">{l.t}</strong>
                    <span className="mx-2 text-neutral-300">·</span>
                    <span className="text-neutral-500">{l.d}</span>
                  </p>
                </div>
              ))}
            </div>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="细节设计"
            media={
              <Figure cap="细节特写 · 轮组 / 灯带 / 前脸 / 尾部 / 座舱">
                <Img src="/images/future-mobility/details-circle.webp" alt="细节特写" />
              </Figure>
            }
          >
            <p>
              灯带沿轮组环绕，夜间行驶时兼具识别性与安全警示；
              前脸保持极简开口，座舱内部以环屏承载全部交互。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 07 落地成果 */}
      <section id="final" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="07"
            label="落地成果"
            title="从数字模型到 3D 打印实物"
          />

          <StoryBlock
            title="场景渲染"
            media={
              <Figure cap="最终场景渲染">
                <Img src="/images/future-mobility/final-render.webp" alt="最终场景渲染" />
              </Figure>
            }
          >
            <p>
              最终场景渲染验证产品气质：低底盘车身在城市街景中的存在感、
              灯带在夜间的识别度，都通过渲染确认。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="3D 打印实物"
            media={
              <Figure cap="3D 打印实物模型 · 多角度验证">
                <Img src="/images/future-mobility/print-grid.webp" alt="3D 打印实物" />
              </Figure>
            }
          >
            <p>
              3D 打印 1:12 缩比模型，从多角度验证比例与细节，
              完成「概念 → 数字 → 实物」的完整闭环。
            </p>
          </StoryBlock>

          <Closing>
            这个项目让我完整走了一遍「研究 → 定义 → 造型 → 验证 → 落地」的设计流程，也让我确认了自己对出行产品与 3D
            表达的兴趣方向。
          </Closing>
        </div>
      </section>

      <DetailFooter />
    </div>
  );
}
