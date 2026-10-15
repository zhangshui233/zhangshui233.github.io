"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

type Work = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  image2?: string;
  badge?: string;
};

const works: Work[] = [
  {
    title: "车机 HMI",
    subtitle: "3D 车机显示 · 量产车型落地",
    description:
      "享界 S9 系列、广汽铂金 7 等已上市车型的车机 3D 内容设计：模型资源管理、车辆动画、图标动效与 Unity 渲染调整。",
    image: "/images/hmi-interior-light.webp",
    image2: "/images/hmi-interior-dark.webp",
    badge: "个人学习参考方案",
  },
  {
    title: "未来出行",
    subtitle: "概念车全流程设计",
    description:
      "从用户研究、数据分析到草图、3D 建模与 3D 打印实物的完整设计闭环。",
    image: "/images/fut-cover.webp",
    image2: "/images/fut-model.webp",
  },
  {
    title: "巡检机器人",
    subtitle: "高危环境设备外观与 CMF",
    description:
      "面向电厂等高危环境的巡检机器人外观设计与材质工艺标注。",
    image: "/images/robot-01.webp",
    image2: "/images/robot-cmf.webp",
  },
  {
    title: "产品设计",
    subtitle: "可持续产品系统设计",
    description:
      "可循环快递包装系统、超市健身发电兑换等工业设计课题。",
    image: "/images/prod-eco.webp",
    image2: "/images/prod-exfood.webp",
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
        <motion.div
          className="mx-auto w-full max-w-5xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 text-sm text-neutral-400"
          >
            3D 设计 / 车机 HMI / 技术美术
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
            专注 3D 设计的青年设计师，曾参与多款已上市车型的车机 3D
            内容设计，正在探索 Unity 与技术美术方向。
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
              四个核心方向 · 素材整理完成后陆续更新
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {works.map((work) => (
              <motion.article
                key={work.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer rounded-lg border border-neutral-200 p-6 transition-colors duration-300 hover:border-neutral-400"
              >
                {/* 作品图区 */}
                <div className="mb-6">
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="aspect-video w-full object-cover"
                    />
                    {work.badge && (
                      <span className="absolute left-2 top-2 rounded bg-white/85 px-2 py-0.5 text-[11px] text-neutral-500 backdrop-blur">
                        {work.badge}
                      </span>
                    )}
                  </div>
                  {work.image2 && (
                    <img
                      src={work.image2}
                      alt={`${work.title} 补充图`}
                      className="mt-3 h-24 w-full rounded-md object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    />
                  )}
                </div>
                <h3 className="text-lg font-medium tracking-tight text-neutral-900">
                  {work.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{work.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-neutral-500">
                  {work.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
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
                年在中软国际担任 HMI 智能座舱设计 / TA
                辅助，参与北汽、广汽、日产、东风、阿维塔等车厂项目，负责已上市车型的车机
                3D 显示内容。正在系统学习 Unity 与 C#，向技术美术方向深入。
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
            正在寻找 3D 设计 / 技术美术相关机会，欢迎交流合作。
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
