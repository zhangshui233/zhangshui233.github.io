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
  { id: "background", label: "背景" },
  { id: "design", label: "设计" },
  { id: "cmf", label: "CMF" },
  { id: "scene", label: "场景" },
];

export default function InspectionRobotPage() {
  return (
    <div className="flex-1">
      <DetailNav sections={sections} />

      <Hero
        tag="设备外观与 CMF 设计"
        title="巡检机器人 Inspection Robot"
        desc="用于电厂等高危环境巡逻检测、设备自动检测的轮式巡检机器人——在降低人员安全风险的同时提高生产效率，对数据实时监控、发现隐患及时上报。"
        tags={["外观设计", "CMF 标注", "结构配合", "落地对接"]}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <Figure cap="巡检机器人 · 综合展示（25s）">
            <div className="overflow-hidden rounded-lg bg-neutral-900">
              <video
                src="/videos/robot/showcase.mp4"
                poster="/images/robot/showcase-poster.webp"
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

      {/* 01 背景 */}
      <section id="background" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="01"
            label="项目背景"
            title="让机器替人走进高危区"
            desc="电厂等高危环境中，人工巡检存在安全风险高、效率低、数据记录不连续等问题。"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-14"
          >
            <h3 className="text-lg font-medium tracking-tight text-neutral-900">
              为什么需要巡检机器人
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-500">
              传统人工巡检需要人员近距离接触高温、高压、高粉尘区域，
              且巡检结果依赖个人经验，数据难以实时回传。
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-500">
              巡检机器人以轮式底盘搭载双目云台相机与激光雷达，
              可全天候执行设备自动检测，数据实时监控、隐患及时上报。
            </p>
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-5">
              <Figure cap="人工巡检 · 近距离接触高危区，数据依赖人工记录">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-50">
                  <img
                    src="/images/robot/manual-inspection.webp"
                    alt="人工巡检场景"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Figure>
              <Figure cap="机器人巡检 · 全天候自动检测，数据实时回传">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-50">
                  <img
                    src="/images/robot/robot-scene.webp"
                    alt="机器人巡检场景"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Figure>
            </div>
          </motion.div>

          <StoryBlock
            side="left"
            title="设计目标"
            media={
              <Figure cap="设计目标关键词板 · 安全 / 可靠 / 识别性">
                <Img src="/images/robot/design-goals.webp" alt="设计目标关键词板" />
              </Figure>
            }
          >
            <ul className="list-none space-y-3">
              <li>
                <strong className="text-neutral-900">安全：</strong>
                圆润无锐角的形体语言，降低磕碰与夹伤风险；
              </li>
              <li>
                <strong className="text-neutral-900">可靠：</strong>
                上部一体化外壳保护传感器，底部独立护件耐受粉尘；
              </li>
              <li>
                <strong className="text-neutral-900">识别性：</strong>
                车身条状图案与企业标识丝印，让设备在工业场景中一眼可辨。
              </li>
            </ul>
          </StoryBlock>
        </div>
      </section>

      {/* 02 设计 */}
      <section id="design" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="02"
            label="设计方案"
            title="上部感知 · 下部承载"
            desc="形体按功能分为两层：上部一体化外壳集成感知系统，底部承载模块独立防护。"
          />

          <StoryBlock
            title="造型解读"
            media={
              <Figure cap="侧视渲染 · 白灰涂装">
                <Img src="/images/robot/robot-side.webp" alt="巡检机器人侧视渲染" />
              </Figure>
            }
          >
            <p>
              顶部双目云台相机负责环境感知，激光雷达支撑建图导航，
              天线与指示灯沿中轴布置，保持左右对称的稳定感。
            </p>
            <p>
              车身采用白灰配色，条状图案贴纸打破大面积灰白的单调，
              同时暗示内部功能分区。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="后部设备舱 · 维护开合"
            media={
              <Figure cap="后部设备舱 · 开合动画（双铰链 + 气弹簧，上翻约 105°）">
                <div className="overflow-hidden rounded-lg bg-neutral-50">
                  <video
                    src="/videos/robot/rear-bay-open.mp4"
                    poster="/images/robot/rear-bay-poster.webp"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover"
                  />
                </div>
              </Figure>
            }
          >
            <p>
              后部采用上翻式开盖结构：后缘双铰链加双侧气弹簧，舱盖整体上翻约
              105° 并自持定位，机位不动即可完成整舱维护。
            </p>
            <p>
              舱内以金属隔断分为电池区与计算区，互不遮挡；
              电池包配快拆锁扣与提手，免工具抽换，计算单元滑轨式拆装、
              接口面板朝外——线束沿侧壁线槽走线，检修不误触。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 03 CMF */}
      <section id="cmf" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="03"
            label="CMF 设计"
            title="颜色 · 材质 · 工艺标注"
            desc="按正视 / 后视两套标注板输出，直接对接打样与生产。"
          />

          <StoryBlock
            title="CMF 标注 · 正视"
            media={
              <Figure cap="CMF 标注板 · 正视">
                <Img src="/images/robot/robot-cmf-front.webp" alt="CMF 标注正视" />
              </Figure>
            }
          >
            <ul className="space-y-2">
              <li>
                <strong className="text-neutral-900">主体外壳</strong>
                <span className="mx-2 text-neutral-300">·</span>
                Pantone cool gray 1U / ABS / 光面金属漆
              </li>
              <li>
                <strong className="text-neutral-900">条状图案</strong>
                <span className="mx-2 text-neutral-300">·</span>
                车贴工艺
              </li>
              <li>
                <strong className="text-neutral-900">企业标识</strong>
                <span className="mx-2 text-neutral-300">·</span>
                丝印
              </li>
              <li>
                <strong className="text-neutral-900">指示灯</strong>
                <span className="mx-2 text-neutral-300">·</span>
                透明灯罩
              </li>
              <li>
                <strong className="text-neutral-900">底盘护件</strong>
                <span className="mx-2 text-neutral-300">·</span>
                黑色 / ABS / 哑光磨砂
              </li>
            </ul>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="CMF 标注 · 后视"
            media={
              <Figure cap="CMF 标注板 · 后视">
                <Img src="/images/robot/robot-cmf-rear.webp" alt="CMF 标注后视" />
              </Figure>
            }
          >
            <p>
              后视视角补充标注：上部外壳延续 Pantone cool gray 1U 光面金属漆，
              底部为黑色哑光磨砂 ABS，后部开盖结构以分色线区隔，
              提示操作人员可动部件位置。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 04 场景 */}
      <section id="scene" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="04"
            label="应用场景"
            title="落地价值"
          />

          <StoryBlock
            title="夜间巡检 · 过热检测"
            media={
              <Figure cap="夜间巡检 · 设备过热检测">
                <div className="overflow-hidden rounded-lg bg-neutral-900">
                  <video
                    src="/videos/robot/night-thermal.mp4"
                    poster="/images/robot/robot-side.webp"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover"
                  />
                </div>
              </Figure>
            }
          >
            <p>
              夜间模式下机器人按预设路线巡逻，红外热成像实时扫描设备柜体，
              发现过热点自动标记并上报——把人员从夜间与高危区域中解放出来。
            </p>
          </StoryBlock>

          <Closing>
            这个项目让我第一次完整参与从外观到 CMF 落地的工业设备设计，
            也建立了「造型服务于功能与工艺」的设计习惯。
          </Closing>
        </div>
      </section>

      <DetailFooter />
    </div>
  );
}
