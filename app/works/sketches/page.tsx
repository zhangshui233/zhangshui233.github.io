"use client";

import { motion } from "framer-motion";
import {
  Closing,
  DetailFooter,
  DetailNav,
  Figure,
  Hero,
  SectionHead,
  StoryBlock,
  fadeUp,
} from "@/components/work-ui";

const sections = [
  { id: "cover", label: "开篇" },
  { id: "process", label: "推敲过程" },
  { id: "final", label: "成品表现" },
];

const total = 23;

function SketchCard({ n, caption }: { n: number; caption: string }) {
  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-hidden rounded-lg bg-white">
        <img
          src={`/images/sketches-gallery/sketch-${String(n).padStart(2, "0")}.webp`}
          alt={`手绘练习 ${n}`}
          loading="lazy"
          className="w-full object-cover"
        />
      </div>
      <figcaption className="mt-2 flex items-baseline gap-3 font-mono text-[10px] tracking-[0.2em] text-neutral-400">
        <span>{String(n).padStart(2, "0")}</span>
        <span className="text-neutral-300">/</span>
        <span className="normal-case tracking-normal">{caption}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function SketchesPage() {
  return (
    <div className="flex-1">
      <DetailNav sections={sections} />

      <Hero
        tag="日常练习 · 手绘 / 马克笔"
        title="手绘与草图"
        desc={`产品造型推敲的完整手绘记录，共 ${total} 页：从发散线稿到马克笔成品——保持手感和形体敏感度的日常练习。`}
        tags={["手绘", "马克笔", "造型推敲", `${total} 页全收录`]}
      />

      {/* 01 开篇成品 */}
      <section id="cover" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="01"
            label="开篇"
            title="一张成品定调"
            desc="练习集以一张完整的马克笔表现开篇：吸尘器产品，两点透视 + 马克笔上色。"
          />
          <div className="mt-12">
            <SketchCard n={1} caption="开篇 · 吸尘器马克笔表现" />
          </div>
        </div>
      </section>

      {/* 02 推敲过程 */}
      <section id="process" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="02"
            label="推敲过程"
            title="19 页发散与收敛"
            desc="从自在的发散线稿，到形体收敛、结构推敲，再到带场景的方案草图——手绘的价值在于想得快，而不是画得好看。"
          />
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
              (n) => (
                <SketchCard key={n} n={n} caption="推敲草图" />
              )
            )}
          </div>
        </div>
      </section>

      {/* 03 成品表现 */}
      <section id="final" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="03"
            label="成品表现"
            title="收尾的两张完整表现"
            desc="推敲收敛之后，用马克笔完成两张最终方案：绿黑配色的手持吸尘器与卧式机型。"
          />
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
            <SketchCard n={21} caption="成品 · 手持吸尘器" />
            <SketchCard n={22} caption="成品 · 卧式机型" />
          </div>

          <Closing>
            手绘不为了好看，为了想得快——这些纸上的线条，是我所有项目的第一步。
          </Closing>
        </div>
      </section>

      <DetailFooter />
    </div>
  );
}
