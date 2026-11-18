"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

type Work = {
  index: string;
  title: string;
  en: string;
  subtitle: string;
  description: string;
  image: string;
  meta: string[];
  badge?: string;
  href?: string;
  videos?: string[];
};

const works: Work[] = [
  {
    index: "01",
    title: "车机 HMI",
    en: "AUTOMOTIVE HMI",
    subtitle: "3D 车机显示 · 量产车型落地",
    description:
      "参与北汽、广汽、日产、东风、阿维塔等车厂项目，负责已上市车型的车机 3D 显示内容：模型资源管理、车辆动画、图标动效与 Unity 渲染调整。",
    image: "/images/hmi/cabin-render.png",
    meta: ["2024 – 2026", "中软国际", "HMI / 3D 内容"],
    badge: "个人学习参考方案",
    href: "/works/hmi",
  },
  {
    index: "02",
    title: "未来出行",
    en: "FUTURE MOBILITY",
    subtitle: "概念车全流程设计",
    description:
      "针对城市出行效率低、模式单一、停车难等痛点，设计模块化低底盘共享概念车 cycle-00：覆盖用户研究、数据分析、草图、3D 建模、App 交互到 3D 打印实物的完整闭环。",
    image: "/images/future-mobility/hero-upgraded.png",
    meta: ["2023", "独立完成", "调研 / 建模 / 渲染 / 原型"],
    href: "/works/future-mobility",
  },
  {
    index: "03",
    title: "数字涂装",
    en: "DIGITAL PAINT",
    subtitle: "车身展开合拢短片",
    description: "一段演示短片：车身部件在同一镜头里展开再合拢复位。",
    image: "/videos/customize/unfold.mp4",
    meta: ["展开合拢"],
    videos: ["/videos/customize/unfold.mp4"],
  },
  {
    index: "04",
    title: "巡检机器人",
    en: "INSPECTION ROBOT",
    subtitle: "高危环境设备外观与 CMF",
    description:
      "面向电厂等高危环境的轮式巡检机器人：在降低人员安全风险的同时提高生产效率，完成整机外观设计与 CMF 材质工艺标注。",
    image: "/images/robot/robot-cover-wide.webp",
    meta: ["外观设计", "CMF 标注"],
    href: "/works/inspection-robot",
  },
  {
    index: "05",
    title: "手绘与草图",
    en: "SKETCHES",
    subtitle: "造型推敲与结构素描写生",
    description:
      "产品造型推敲草图与结构素描写生，保持手感和形体敏感度的日常练习。",
    image: "/images/sketches.webp",
    meta: ["日常练习", "手绘 / 素描"],
    href: "/works/sketches",
  },
];

const tools = [
  "Blender",
  "C4D",
  "Maya",
  "Rhino",
  "SolidWorks",
  "Unity",
  "Unreal",
  "After Effects",
  "Photoshop",
  "Illustrator",
];

const navLinks = [
  { label: "作品", href: "#works" },
  { label: "关于", href: "#about" },
  { label: "联系", href: "#contact" },
];

export default function PortfolioHome() {
  return (
    <div className="flex-1">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-neutral-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-base font-medium tracking-tight">
            张清华
          </a>
          <nav className="flex items-center gap-6 text-sm text-neutral-500">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="flex min-h-[calc(100vh-57px)] flex-col justify-center px-6">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-12 md:gap-16">
          <motion.div
            className="md:col-span-7"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 text-sm text-neutral-400"
            >
              3D 视觉 / 车机 HMI / 实时渲染
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-6xl font-semibold tracking-tight text-neutral-900 md:text-7xl"
            >
              张清华
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-8 text-neutral-500"
            >
              专注 3D 视觉与实时渲染的青年设计师，曾参与多款已上市车型的车机 3D
              内容设计，正在深入 UE5 / Unity 实时渲染方向。
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#works"
              className="mt-12 inline-flex items-center gap-2 text-sm text-neutral-900 transition-colors hover:text-neutral-500"
            >
              查看作品
              <span aria-hidden="true">↓</span>
            </motion.a>
          </motion.div>

          {/* 人像 */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="overflow-hidden rounded-lg bg-neutral-50">
              <img
                src="/images/portrait.webp"
                alt="张清华"
                className="aspect-[3/4] w-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 作品集展示区 */}
      <section id="works" className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
              作品
            </h2>
            <p className="mt-3 text-sm text-neutral-400">
              五项作品 · 一项一档 · 持续更新
            </p>
          </motion.div>

          <div>
            {works.map((work, i) => {
              const body = (
                <motion.article
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  variants={fadeUp}
                  className={`group grid grid-cols-1 items-center gap-8 py-14 md:grid-cols-12 md:gap-12 md:py-20 ${
                    i > 0 ? "border-t border-neutral-200" : ""
                  }`}
                >
                  {/* 文字区 */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-neutral-400">
                      <span>{work.index}</span>
                      <span aria-hidden="true" className="h-px w-6 bg-neutral-300" />
                      <span>{work.en}</span>
                    </div>
                    <h3 className="mt-5 text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
                      {work.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-500">
                      {work.subtitle}
                    </p>
                    <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
                      {work.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-neutral-400">
                      {work.meta.map((m, j) => (
                        <span key={m} className="flex items-center gap-3">
                          {j > 0 && (
                            <span aria-hidden="true" className="h-3 w-px bg-neutral-200" />
                          )}
                          {m}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8">
                      {work.href && (
                        <span className="inline-flex items-center gap-2 text-sm text-neutral-900 transition-colors group-hover:text-neutral-500">
                          查看项目
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 图片 / 视频区 */}
                  <div className="md:col-span-7">
                    {work.videos ? (
                      <div className={work.videos.length > 1 ? "grid grid-cols-2 gap-3" : ""}>
                        {work.videos.map((v) => (
                          <video
                            key={v}
                            src={v}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="aspect-video w-full rounded-lg bg-neutral-50 object-cover"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="relative overflow-hidden rounded-lg bg-neutral-50">
                        <img
                          src={work.image}
                          alt={work.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        {work.badge && (
                          <span className="absolute left-3 top-3 rounded bg-white/85 px-2 py-0.5 font-mono text-[10px] tracking-wide text-neutral-500 backdrop-blur">
                            {work.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              );

              return work.href ? (
                <Link key={work.index} href={work.href} className="block">
                  {body}
                </Link>
              ) : (
                <div key={work.index}>{body}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 软件技能 */}
      <section id="skills" className="border-t border-neutral-100 px-6 py-28">
        <motion.div
          className="mx-auto max-w-5xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            软件技能
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">
            手绘之外的工具栈：建模用 Rhino / C4D / SolidWorks / Alias / Blender，
            渲染用 Keyshot / Blender，平面走 Photoshop / Illustrator，动效与视频合成 After
            Effects。
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-500">
            从纸面到屏幕，这条工具链覆盖了从造型推敲到成品表达的完整流程。
          </p>
          <div className="mt-10 overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50">
            <img
              src="/images/sketches-gallery/skills.webp"
              alt="软件技能 · 建模 / 渲染 / 平面 / 视频"
              className="w-full"
            />
          </div>
        </motion.div>
      </section>

      {/* 关于区 */}
      <section id="about" className="border-t border-neutral-100 px-6 py-28">
        <motion.div
          className="mx-auto max-w-5xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            关于
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="text-base leading-8 text-neutral-600">
                张清华，湖北工业大学工业设计本科。2024–2026
                年在中软国际担任 HMI 智能座舱 3D
                设计，参与北汽、广汽、日产、东风、阿维塔等车厂项目，负责已上市车型的车机
                3D 显示内容（模型资源、车辆动画、图标动效与渲染效果调整）。正在系统学习 UE5
                与实时渲染管线。
              </p>
            </div>
            <div>
              <p className="mb-4 text-sm text-neutral-400">常用工具</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 联系区 */}
      <section id="contact" className="border-t border-neutral-100 px-6 py-28">
        <motion.div
          className="mx-auto max-w-5xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            联系
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600">
            正在寻找 3D 视觉 / 实时渲染相关机会，欢迎交流合作。
          </p>
          <div className="mt-10 flex flex-col gap-4 text-sm md:flex-row md:gap-10">
            <a
              href="mailto:zhangshui555@gmail.com"
              className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
            >
              zhangshui555@gmail.com
            </a>
            <span className="text-neutral-400">189 2344 6065</span>
            <span className="text-neutral-400">深圳</span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-neutral-400">
          <span>© 2026 张清华</span>
          <span>3D 设计作品集</span>
        </div>
      </footer>
    </div>
  );
}
