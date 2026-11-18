"use client";

import { motion } from "framer-motion";
import {
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
  { id: "problems", label: "问题" },
  { id: "solution", label: "方案" },
  { id: "usage", label: "使用" },
  { id: "structure", label: "结构" },
];

const problems = [
  { n: "01", t: "包装垃圾", d: "大量包装拆完即弃，直接成为垃圾" },
  { n: "02", t: "胶带污染", d: "胶带难以回收降解，污染严重" },
  { n: "03", t: "确认低效", d: "取件确认依赖人工，效率低下" },
  { n: "04", t: "包装破损", d: "运输途中挤压破损，商品受损" },
  { n: "05", t: "信息泄露", d: "面单信息暴露，隐私存在风险" },
];

const steps = [
  { n: "01", t: "取下边角", d: "从货架上取下包装边角部件" },
  { n: "02", t: "识别信息", d: "系统自动识别收件人信息" },
  { n: "03", t: "组合解锁", d: "用正确的积木组合开锁取件" },
  { n: "04", t: "取出物品", d: "打开包装取出商品，空盒回收" },
];

function Flow({ items }: { items: { label: string; sub?: string }[] }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-wrap items-center gap-2"
    >
      {items.map((it, i) => (
        <motion.div key={it.label} variants={fadeUp} className="flex items-center gap-2">
          <div className="rounded-lg border border-neutral-200 px-5 py-4 text-center">
            <p className="text-sm font-medium text-neutral-900">{it.label}</p>
            {it.sub && (
              <p className="mt-1 text-xs text-neutral-400">{it.sub}</p>
            )}
          </div>
          {i < items.length - 1 && (
            <span aria-hidden="true" className="text-neutral-300">
              →
            </span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function EcoParcelPage() {
  return (
    <div className="flex-1">
      <DetailNav sections={sections} />

      <Hero
        tag="课程设计 · 可持续包装系统"
        title="Lego Parcel 循环快递包装系统"
        desc="针对快递包装垃圾、胶带污染、破损与信息泄露设计的可循环快递包装系统：模块化「积木式」包装盒 + 主框架 + 锁扣识别结构，覆盖运输、保护、使用优化与可持续四个维度。"
        tags={["系统设计", "结构设计", "可持续", "课程设计"]}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <Figure cap="Lego Parcel · 循环系统概念渲染">
            <Img src="/images/prod-eco.webp" alt="Lego Parcel 概念渲染" dark />
          </Figure>
        </div>
      </section>

      {/* 01 背景 */}
      <section id="background" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="01"
            label="背景调研"
            title="千亿件快递的包装代价"
            desc="快递已成为非常普遍的购物方式，而它的包装几乎都是一次性的。"
          />

          <StoryBlock
            title="规模有多大"
            media={
              <Figure cap="驿站取件与包装废弃物现状">
                <Img src="/images/eco-parcel/packaging-now.webp" alt="驿站取件与包装废弃物现状" />
              </Figure>
            }
          >
            <p>
              根据国家邮政局 2021 年数据，中国快递业务量达{" "}
              <strong className="text-neutral-900">1083 亿件</strong>，同比增长{" "}
              <strong className="text-neutral-900">29.9%</strong>。
            </p>
            <p>
              每一件快递背后，是一层胶带、一只纸箱、一袋缓冲材料——绝大多数在拆开后直接进入垃圾桶。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="技术方向调研"
            media={
              <Figure cap="技术 × 材料 两路调研">
                <Img src="/images/eco-parcel/research-board.webp" alt="技术 × 材料 两路调研" />
              </Figure>
            }
          >
            <p>
              围绕「可循环」目标做两路调研：<strong className="text-neutral-900">技术层面</strong>
              调研识别系统、磁吸连接、稳定框架；
              <strong className="text-neutral-900">材料层面</strong>
              比较钢材、磁铁锁扣与硅胶的耐用性与回收性。
            </p>
            <p>
              结论：磁吸 + 积木卡扣的组合在循环次数与使用门槛之间平衡最好。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 02 问题 */}
      <section id="problems" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="02"
            label="问题定义"
            title="一次性包装的五个痛点"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {problems.map((p) => (
              <motion.div
                key={p.n}
                variants={fadeUp}
                className="rounded-lg border border-neutral-200 p-5"
              >
                <p className="font-mono text-xs text-neutral-300">{p.n}</p>
                <p className="mt-3 text-sm font-medium text-neutral-900">
                  {p.t}
                </p>
                <p className="mt-2 text-xs leading-5 text-neutral-500">
                  {p.d}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-neutral-500">
            五个痛点指向同一个根源：包装被设计为「用一次就扔」。
            要彻底解决，包装必须成为可循环的资产，而不是耗材。
          </p>
        </div>
      </section>

      {/* 03 方案 */}
      <section id="solution" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="03"
            label="设计方案"
            title="积木式循环包装"
            desc="一套覆盖运输、保护、使用优化与可持续四个维度的综合快递包装系统。"
          />

          <StoryBlock
            title="循环逻辑"
            media={
              <div className="rounded-lg bg-neutral-50 p-8">
                <Flow
                  items={[
                    { label: "商家投递", sub: "装入货品" },
                    { label: "用户收货", sub: "组合解锁" },
                    { label: "空盒回收", sub: "投递回收柜" },
                    { label: "清洁复用", sub: "再次投递" },
                  ]}
                />
                <p className="mt-6 text-xs leading-5 text-neutral-400">
                  包装在「投递 → 使用 → 回收 → 再利用」闭环中流转，图片重绘后替换为动效流程图。
                </p>
              </div>
            }
          >
            <p>
              核心思路：把包装做成像积木一样<strong className="text-neutral-900">可拆装、可重组</strong>的标准模块。
              主框架 + 锁扣识别结构承担保护与开启功能，外层软硅胶片承担缓冲与防水。
            </p>
            <p>
              循环柜设在驿站，空盒投入后统一清洁、消毒、再投放，包装寿命以「次数」计。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 04 使用 */}
      <section id="usage" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="04"
            label="使用流程"
            title="四步取件"
          />
          <StoryBlock
            title="用户怎么用"
            media={
              <Figure cap="LegoParcel 组合逻辑与取件流程">
                <Img src="/images/eco-parcel/lego-system.webp" alt="LegoParcel 组合逻辑与取件流程" />
              </Figure>
            }
          >
            <div className="space-y-3">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4 border-t border-neutral-200 pt-3">
                  <span className="font-mono text-xs text-neutral-300">{s.n}</span>
                  <p className="text-sm">
                    <strong className="text-neutral-900">{s.t}</strong>
                    <span className="mx-2 text-neutral-300">·</span>
                    <span className="text-neutral-500">{s.d}</span>
                  </p>
                </div>
              ))}
            </div>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="取件体验"
            media={
              <Figure cap="回收柜解锁取件场景">
                <Img src="/images/eco-parcel/locker-scene.webp" alt="回收柜解锁取件场景" />
              </Figure>
            }
          >
            <p>
              收件人无需出示任何单据——正确的积木组合就是「钥匙」。
              面单信息只存在于系统内部，从物理层面杜绝信息泄露。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 05 结构 */}
      <section id="structure" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="05"
            label="结构设计"
            title="主框架 · 锁扣 · 材料"
          />

          <StoryBlock
            title="结构分解"
            media={
              <Figure cap="结构爆炸：框架 / 锁扣 / 磁铁 / 卡扣">
                <Img src="/images/eco-parcel/exploded.webp" alt="结构爆炸：框架 / 锁扣 / 磁铁 / 卡扣" />
              </Figure>
            }
          >
            <ul className="space-y-2">
              <li>
                <strong className="text-neutral-900">主框架</strong>
                <span className="mx-2 text-neutral-300">·</span>
                软框架 + 锁扣与信息识别核心
              </li>
              <li>
                <strong className="text-neutral-900">验收步骤</strong>
                <span className="mx-2 text-neutral-300">·</span>
                展板陈列 → 识别 → 环扣 → 收入底部
              </li>
              <li>
                <strong className="text-neutral-900">材料结构</strong>
                <span className="mx-2 text-neutral-300">·</span>
                软硅胶片 / 磁铁 / 积木卡扣
              </li>
            </ul>
          </StoryBlock>

          <Closing>
            这个课题让我理解：可持续不是「换个材料」，而是重新设计整个包装的流转方式。
          </Closing>
        </div>
      </section>

      <DetailFooter />
    </div>
  );
}
