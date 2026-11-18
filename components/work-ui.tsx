"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ---------- 页面骨架 ---------- */

export type NavItem = { id: string; label: string };

export function DetailNav({ sections }: { sections: NavItem[] }) {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/#works" className="text-base font-medium tracking-tight">
          ← 张清华
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-neutral-500 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="transition-colors hover:text-neutral-900"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function DetailFooter() {
  return (
    <footer className="border-t border-neutral-100 px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-neutral-400">
        <Link
          href="/#works"
          className="transition-colors hover:text-neutral-900"
        >
          ← 返回作品列表
        </Link>
        <span>© 2026 张清华</span>
      </div>
    </footer>
  );
}

export function Hero({
  tag,
  title,
  desc,
  tags,
}: {
  tag: string;
  title: string;
  desc: string;
  tags: string[];
}) {
  return (
    <section className="px-6 pb-16 pt-20">
      <motion.div
        className="mx-auto max-w-5xl"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} className="mb-4 text-sm text-neutral-400">
          {tag}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg leading-8 text-neutral-500"
        >
          {desc}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap gap-3 text-xs text-neutral-500"
        >
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-neutral-200 px-3 py-1"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- 小节标题 ---------- */

export function SectionHead({
  no,
  label,
  title,
  desc,
}: {
  no: string;
  label: string;
  title: string;
  desc?: string;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-neutral-400"
      >
        <span>{no}</span>
        <span aria-hidden="true" className="h-px w-8 bg-neutral-300" />
        <span>{label}</span>
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="mt-4 text-2xl font-medium tracking-tight text-neutral-900 md:text-3xl"
      >
        {title}
      </motion.h2>
      {desc && (
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-2xl text-base leading-8 text-neutral-600"
        >
          {desc}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ---------- 图 ---------- */

export function Figure({
  children,
  cap,
}: {
  children: ReactNode;
  cap?: string;
}) {
  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      {children}
      {cap && (
        <figcaption className="mt-3 font-mono text-[11px] tracking-wide text-neutral-400">
          {cap}
        </figcaption>
      )}
    </motion.figure>
  );
}

export function Img({
  src,
  alt,
  dark = false,
}: {
  src: string;
  alt: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg ${dark ? "bg-neutral-900" : "bg-neutral-50"}`}
    >
      <img src={src} alt={alt} className="w-full object-cover" />
    </div>
  );
}

/**
 * 占位符：图片还没优化好时先占位。
 * label = 要放什么图（会显示在占位框里），hint = 补充说明
 */
export function Placeholder({
  label,
  hint,
  ratio = "aspect-[16/10]",
}: {
  label: string;
  hint?: string;
  ratio?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center ${ratio}`}
    >
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-400">
        待补图 · IMAGE TO ADD
      </p>
      <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-neutral-600">
        {label}
      </p>
      {hint && (
        <p className="mt-2 max-w-sm text-xs leading-5 text-neutral-400">
          {hint}
        </p>
      )}
    </motion.div>
  );
}

/* ---------- 图文块：一张图（或占位符）配一段文字，左右交替 ---------- */

export function StoryBlock({
  title,
  children,
  media,
  side = "right",
}: {
  title?: string;
  children: ReactNode;
  media: ReactNode;
  side?: "left" | "right";
}) {
  const text = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      {title && (
        <h3 className="text-lg font-medium tracking-tight text-neutral-900">
          {title}
        </h3>
      )}
      <div className="mt-3 space-y-4 text-sm leading-7 text-neutral-500">
        {children}
      </div>
    </motion.div>
  );
  return (
    <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
      {side === "left" ? (
        <>
          <div className="order-2 md:order-1">{media}</div>
          <div className="order-1 md:order-2">{text}</div>
        </>
      ) : (
        <>
          <div className="order-1 md:order-1">{text}</div>
          <div className="order-2 md:order-2">{media}</div>
        </>
      )}
    </div>
  );
}

/* ---------- 数据条 ---------- */

export function Bar({
  label,
  v,
  max,
  unit = "%",
}: {
  label: string;
  v: number;
  max: number;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-20 shrink-0 text-xs text-neutral-500">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          className="h-full rounded-full bg-neutral-800"
          initial={{ width: 0 }}
          whileInView={{ width: `${(v / max) * 100}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
      <span className="w-14 shrink-0 text-right font-mono text-xs text-neutral-400">
        {v}
        {unit}
      </span>
    </div>
  );
}

/* ---------- 引用结语 ---------- */

export function Closing({ children }: { children: ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mt-16 max-w-2xl border-l-2 border-neutral-900 pl-6 text-base leading-8 text-neutral-600"
    >
      {children}
    </motion.p>
  );
}
