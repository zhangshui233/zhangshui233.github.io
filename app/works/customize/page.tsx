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

const sections = [
  { id: "why", label: "概念" },
  { id: "wrap", label: "车衣换色" },
  { id: "wheels", label: "轮毂换造型" },
  { id: "poster", label: "主视觉" },
  { id: "unfold", label: "展开合拢" },
];

export default function CustomizePage() {
  return (
    <div className="flex-1">
      <DetailNav sections={sections} />

      <Hero
        tag="概念短片 · 车衣换色 × 轮毂替换 × 形态变化"
        title="数字改装 Digital Customization"
        desc="把改装店里的换色、换轮毂压缩成一段可实时预览的视觉演示：车衣颜色在单镜头内流动渐变，轮毂造型同屏切换，配合车辆的展开与合拢——换一辆车的样子，不需要撕膜、喷漆和等待。"
        tags={["车衣换色", "轮毂替换", "主视觉", "AI 生成 + 后期合成"]}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <Figure cap="车漆渐变 · 蓝 → 紫 → 品红（单镜头）">
            <div className="overflow-hidden rounded-lg bg-neutral-900">
              <video
                src="/videos/customize/paint-gradient.mp4"
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

      {/* 01 概念 */}
      <section id="why" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="01"
            label="概念"
            title="换一种颜色，为什么要等一周"
            desc="实体改装是重工艺：贴膜要手工对边，喷漆要打磨烤漆，轮毂换型要动平衡。而在数字世界，这些都是一次参数替换。"
          />

          <StoryBlock
            title="从「改装作业」到「改装预览」"
            media={
              <Figure cap="原片 → AI 生成 → 合成（三联对比）">
                <div className="overflow-hidden rounded-lg bg-neutral-900">
                  <video
                    src="/videos/customize/paint-process.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover"
                  />
                </div>
              </Figure>
            }
            side="left"
          >
            <p>
              这条短片的规则很严格：<strong className="text-neutral-900">
              镜头不切、车不换位，只让颜色和部件变</strong>——
              观众一眼就能读懂「改装」发生在同一台车上。
            </p>
            <p>
              制作上是生成 + 合成的混合管线：AI 生成车漆渐变的运动中间帧，
              再逐帧合成回原片，保住车身结构、轮毂造型和水面倒影不动。
              修整阶段做了去 UI 标注、背景细节重建与 4× 超分出 2K。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 02 车衣换色 */}
      <section id="wrap" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="02"
            label="车衣换色"
            title="颜色是流动的，不是贴上去的"
            desc="蓝 → 紫 → 品红的渐变在单镜头内完成：车衣颜色沿着车身随镜头移动慢慢流过去，像液体一样可预览、可回退。"
          />

          <StoryBlock
            title="渐变的三个要求"
            media={
              <Figure cap="渐变中途帧：三种色相同时在车身上">
                <Img
                  src="/images/customize/frame-clean.png"
                  alt="渐变中途帧"
                />
              </Figure>
            }
          >
            <ul className="list-none space-y-2">
              <li>
                <span className="mr-2 font-mono text-xs text-neutral-300">✓</span>
                分界不生硬：色带沿车身曲面过渡，门缝和钣金缝不被色块盖住
              </li>
              <li>
                <span className="mr-2 font-mono text-xs text-neutral-300">✓</span>
                材质不跑偏：渐变只换色相，金属漆的闪片、反射和清漆层保持一致
              </li>
              <li>
                <span className="mr-2 font-mono text-xs text-neutral-300">✓</span>
                环境要接得住：倒影里的颜色和车身同步变化，水面不能穿帮
              </li>
            </ul>
            <p>
              这三条让渐变换色在任何镜头角度都经得起暂停检查——
              颜色变了，但「这是一台金属漆的车」这件事从头到尾没变。
            </p>
          </StoryBlock>

          <StoryBlock
            side="left"
            title="材质说明"
            media={
              <Figure cap="金属漆的三个层次：闪粉层 / 色相层 / 清漆层">
                <Img
                  src="/images/customize/poster-gold.jpg"
                  alt="车漆材质细节"
                />
              </Figure>
            }
          >
            <p>
              车漆的质感来自三个层次：
              <strong className="text-neutral-900">闪粉层</strong>随角度闪烁、
              <strong className="text-neutral-900">色相层</strong>决定颜色、
              <strong className="text-neutral-900">清漆层</strong>提供镜面反射。
              换色只动中间的色相层，上下两层原样保留——所以渐变再夸张，漆面看起来依然是「真的漆」。
            </p>
            <p>
              判断的标准也很朴素：轮毂、玻璃、镀铬件这些非车漆部分的反射
              不跟着变；车身高光的位置只随视角移动，不随颜色移动。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 03 轮毂换造型 */}
      <section id="wheels" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="03"
            label="轮毂换造型"
            title="同屏四款轮毂，一键换型"
            desc="画面左侧常驻四款轮毂缩略选项：多辐条运动款、密辐商务款、五辐镂空款、封闭低阻款——同一台车，四种性格。"
          />

          <StoryBlock
            title="配置器视角"
            media={
              <Figure cap="成片帧：左侧轮毂选项与主画面联动">
                <Img
                  src="/images/customize/frame-wheels.jpg"
                  alt="轮毂替换配置器帧"
                />
              </Figure>
            }
            side="left"
          >
            <p>
              轮毂是车辆形象里换装成本最低、感知差异最大的部件。短片中轮毂
              选项和主画面同屏出现，选项被选中时轮毂造型与车身状态同步切换。
            </p>
            <p>
              替换时控制了两件事：轮心位置与轮胎外径严格对齐（不然车身会
              「跳」一下），辐条造型与刹车卡钳的遮挡关系保持正确。
            </p>
          </StoryBlock>
        </div>
      </section>

      {/* 04 主视觉 */}
      <section id="poster" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="04"
            label="主视觉"
            title="从成片里长出来的海报"
            desc="两条主视觉都从成片关键帧出发做后期：去标注与光标、背景四周外扩补细节、渐入云絮空气感、4× 超分出 2K。"
          />

          <div className="mt-14 space-y-10">
            <Figure cap="主视觉一 · 金色车（2048×1572）">
              <Img
                src="/images/customize/poster-gold.jpg"
                alt="金色车主视觉 2K"
              />
            </Figure>
            <Figure cap="主视觉二 · 蓝紫渐变车（2048×1208）">
              <Img
                src="/images/customize/poster-blue.jpg"
                alt="蓝紫车主视觉 2K"
              />
            </Figure>
          </div>
        </div>
      </section>

      {/* 05 展开合拢 */}
      <section id="unfold" className="border-t border-neutral-100 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            no="05"
            label="展开合拢"
            title="车是可以变形的"
            desc="第三组镜头在讲形态：车辆展开露出结构、轮毂同屏可换，再收拢回整车——改装不止是换皮，也是让用户看见里面。"
          />

          <Figure cap="完整段落 · 闭合 → 展开 → 轮毂 / 涂装配置器 → 合拢收尾">
            <div className="overflow-hidden rounded-lg bg-neutral-900">
              <video
                src="/videos/customize/unfold.mp4"
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full object-cover"
              />
            </div>
          </Figure>

          <div className="mt-14 max-w-2xl space-y-4 text-sm leading-7 text-neutral-500">
            <p>
              展开合拢镜头复用车辆结构分解的资产逻辑：覆盖件按装配关系
              反向拆出，运动曲线用先慢后快的「吸气」节奏，收拢时留一次
              轻微的回弹，让金属件有重量感。
            </p>
            <p>
              展开过程中轮毂与车身分离悬浮、仍与轮拱保持对位——
              收拢瞬间轮毂对齐轮心复位，误差控制在一帧之内。
            </p>
          </div>

          <Closing>
            数字改装的终点不是一条短片，而是一套可交互的预览系统：颜色、轮毂、形态都是参数。这条片子是它的预告。
          </Closing>
        </div>
      </section>

      <DetailFooter />
    </div>
  );
}
