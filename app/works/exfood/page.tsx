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
  { id: "concept", label: "概念" },
  { id: "detail", label: "结构" },
  { id: "usage", label: "流程" },
  { id: "card", label: "兑换" },
  { id: "energy", label: "能量" },
];

const wins = [
  {
    who: "消费者",
    what: "骑行积累时长，兑换免费食品",
    note: "运动 + 省钱，两件事同时完成",
  },
  {
    who: "超市",
    what: "单车发电并入超市用电",
    note: "把客流变成清洁能源",
  },
  {
    who: "企业 / 社会",
    what: "提升品牌形象，促进可持续与健康氛围",
    note: "三方共赢的循环设计",
  },
];

const cards = [
  { name: "骑行 10 分钟", reward: "小份免费食品", level: "入门" },
  { name: "骑行 10–30 分钟", reward: "标准兑换", level: "进阶" },
  { name: "骑行 30 分钟以上", reward: "大额兑换", level: "满额" },
];

export default function ExfoodPage() {
  return (
    <div className="flex-1">
      <DetailNav sections={sections} />

      <Hero
        tag="毕业设计 · 可持续产品系统"
        title="eXfood 超市循环设计探索"
        desc="把健身单车放进超市：消费者骑车运动积累时长换取免费食品，踏板发电为超市供电，企业提升品牌形象、促进可持续与健康的社会氛围——一个三方共赢的循环设计。"
        tags={["产品系统", "服务设计", "可持续", "毕业设计"]}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <Figure cap="eXfood · 超市场景渲染">
            <Img src="/images/prod-exfood.webp" alt="eXfood 超市场景渲染" />
          </Figure>
        </div>
      </section>

      {/* 01 概念 */}
      <section id="concept" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="01"
            label="设计概念"
            title="骑一次车，三方都赢"
            desc="一个把「运动、能源、消费」接进同一个循环的系统设计。"
          />

          <StoryBlock
            title="三方共赢"
            media={
              <Figure cap="消费者 · 超市 · 社会 三方循环">
                <Img src="/images/exfood/win-win.webp" alt="消费者 · 超市 · 社会 三方循环" />
              </Figure>
            }
          >
            <div className="space-y-4">
              {wins.map((w, i) => (
                <div key={w.who} className="border-t border-neutral-200 pt-3">
                  <p className="text-sm">
                    <span className="mr-3 font-mono text-xs text-neutral-300">
                      0{i + 1}
                    </span>
                    <strong className="text-neutral-900">{w.who}</strong>
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">{w.what}</p>
                  <p className="mt-0.5 text-xs text-neutral-400">{w.note}</p>
                </div>
              ))}
            </div>
          </StoryBlock>
        </div>
      </section>

      {/* 02 结构 */}
      <section id="detail" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="02"
            label="产品结构"
            title="为超市场景重新设计的单车"
          />

          <StoryBlock
            title="结构标注"
            media={
              <Figure cap="单车结构与超市适配件标注">
                <Img src="/images/exfood/exploded-bike.webp" alt="单车结构与超市适配件标注" />
              </Figure>
            }
          >
            <p>
              在标准健身单车基础上增加超市适配件：屏幕显示运动数据与兑换信息，
              急停按钮保障公共场景安全，防滑垫与固定连接件应对地面平整度差异。
            </p>
            <p>
              灯条随发电功率变化亮度，让「发电」这件事被周围的人看见。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="传动与发电"
            media={
              <Figure cap="脚踏 · 传动 · 发电结构与光效">
                <Img src="/images/exfood/detail-lines.webp" alt="脚踏 · 传动 · 发电结构与光效" />
              </Figure>
            }
          >
            <p>
              踏板动力一路驱动飞轮，一路带动发电机；
              结构上保持与传统健身单车一致的骑行手感，发电模块集成于底座内。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 03 使用流程 */}
      <section id="usage" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="03"
            label="使用流程"
            title="从骑行到兑换"
          />
          <StoryBlock
            title="三步完成"
            media={
              <Figure cap="骑行 → 结算 → 兑换">
                <Img src="/images/exfood/flow-cards.webp" alt="骑行 → 结算 → 兑换" />
              </Figure>
            }
          >
            <div className="space-y-3">
              {[
                ["① 骑上单车", "自由骑行，系统累计时长与发电量"],
                ["② 结束结算", "结束骑行，时长自动结算到会员卡"],
                ["③ 刷卡兑换", "刷卡换取购物篮，凭卡兑换免费食品"],
              ].map(([t, d]) => (
                <div key={t} className="border-t border-neutral-200 pt-3">
                  <p className="text-sm font-medium text-neutral-900">{t}</p>
                  <p className="mt-1 text-sm text-neutral-500">{d}</p>
                </div>
              ))}
            </div>
          </StoryBlock>
        </div>
      </section>

      {/* 04 卡片体系 */}
      <section id="card" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="04"
            label="兑换体系"
            title="时长决定兑换档位"
            desc="原方案以三张主题卡片区分档位；优化后简化为统一视觉，用颜色深浅表达等级。"
          />

          <StoryBlock
            title="档位设计"
            media={
              <Figure cap="三档兑换卡版式">
                <Img src="/images/exfood/card-design.webp" alt="三档兑换卡版式" />
              </Figure>
            }
          >
            <div className="space-y-3">
              {cards.map((c) => (
                <div key={c.name} className="flex gap-4 border-t border-neutral-200 pt-3">
                  <p className="w-40 shrink-0 text-sm font-medium text-neutral-900">
                    {c.name}
                  </p>
                  <p className="text-sm text-neutral-500">{c.reward}</p>
                </div>
              ))}
            </div>
          </StoryBlock>
        </div>
      </section>

      {/* 05 能量链路 */}
      <section id="energy" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="05"
            label="能量链路"
            title="每一脚踩下去都在发电"
          />

          <StoryBlock
            title="能量从哪来，到哪去"
            media={
              <div className="rounded-lg bg-neutral-50 p-8">
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="flex flex-wrap items-center gap-2"
                >
                  {["健身单车", "储能电池", "超市电网"].map((t, i) => (
                    <motion.div
                      key={t}
                      variants={fadeUp}
                      className="flex items-center gap-2"
                    >
                      <div className="rounded-lg border border-neutral-200 px-6 py-4 text-center">
                        <p className="text-sm font-medium text-neutral-900">{t}</p>
                      </div>
                      {i < 2 && (
                        <span aria-hidden="true" className="text-neutral-300">
                          →
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
                <p className="mt-6 text-xs leading-5 text-neutral-400">
                  优化说明：原方案的「储气装置」在技术上不成立，已修正为「发电 → 储能电池 → 超市电网」，动效流程图重绘后替换。
                </p>
              </div>
            }
          >
            <p>
              单车产生的电力先存入储能电池，再平滑并入超市电网，
              供冷柜与照明使用——顾客在冷柜前骑的那辆车，可能正在给冷柜供电。
            </p>
          </StoryBlock>

          <Closing>
            毕业设计教会我的：好系统不是单点创意，而是让参与者各自有动力留下来。
          </Closing>
        </div>
      </section>

      <DetailFooter />
    </div>
  );
}
