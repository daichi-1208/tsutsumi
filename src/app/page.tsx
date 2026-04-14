import Link from "next/link";
import Image from "next/image";

/* ──────────────────────────────────────────────
   Editorial Japanese Craft — LP for つつみ
   Chaptered magazine-style layout
   ────────────────────────────────────────────── */

const RETURN_RULES = [
  { event: "結婚祝い", rate: "半返し", timing: "1ヶ月以内" },
  { event: "出産祝い", rate: "30〜50%", timing: "お宮参り頃" },
  { event: "香典", rate: "半返し", timing: "四十九日後" },
  { event: "新築祝い", rate: "1/3〜半返し", timing: "入居後1〜2ヶ月" },
  { event: "お歳暮", rate: "同額", timing: "2週間以内" },
  { event: "快気祝い", rate: "半返し", timing: "退院後1ヶ月" },
  { event: "入学祝い", rate: "不要", timing: "お礼状のみ" },
];

const PERSONAS = [
  "結婚式を終えて、お返しの準備をこれから始める方",
  "出産のお祝いをたくさんいただいて、誰に何を返すか迷っている方",
  "両家からのお祝いで、パートナーと情報共有したい方",
  "ご両親の還暦・法事など、親戚づきあいで悩んでいる方",
  "毎年のお歳暮・お中元のやりとりを忘れたくない方",
  "贈答ルールに自信がない方(半返し？三返し？)",
];

const FEATURES = [
  {
    label: "No. 壱",
    title: "記録は、三十秒。",
    body: "もらった / あげた を選んで、相手と金額とイベント種別を入れるだけ。現金でもギフトでも、品物でもカタログでも。",
  },
  {
    label: "No. 弐",
    title: "お返しの作法を、自動で。",
    body: "結婚祝いは半返し、出産祝いは三十から半返し、目上の方からは三分の一。全十三種の作法を内蔵。",
  },
  {
    label: "No. 参",
    title: "忘れた頃に、お知らせ。",
    body: "期限の七日前と一日前に、メールで静かに思い出す。バタバタの中でも、失礼を避けられる。",
  },
  {
    label: "No. 肆",
    title: "ふたりで、同じ帳面を。",
    body: "招待リンクひとつでパートナーと共有。「あの人にいくらもらったっけ?」を、もう二度と言わない。",
  },
];

export default function LandingPage() {
  return (
    <div className="relative bg-[#faf6f1] text-[#3a2519] font-body overflow-x-hidden">
      {/* 紙目のグレインをページ全体に薄く乗せる */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-multiply paper-grain"
      />

      {/* ──────────── NAVIGATION ──────────── */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-[#faf6f1]/75 border-b border-hairline border-[#3a2519]/10">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.webp"
              alt="つつみ"
              width={32}
              height={32}
              className="w-8 h-8 rounded-md"
            />
            <span className="font-display text-lg tracking-[0.18em] text-[#3a2519] group-hover:text-[#c4826e] transition-colors">
              つつみ
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 font-latin text-[10px] uppercase tracking-[0.3em] text-[#7a6050]">
            <a href="#problem" className="link-grow hover:text-[#c4826e] transition-colors">
              Problem
            </a>
            <a href="#reason" className="link-grow hover:text-[#c4826e] transition-colors">
              Reason
            </a>
            <a href="#solution" className="link-grow hover:text-[#c4826e] transition-colors">
              Solution
            </a>
            <a href="#rules" className="link-grow hover:text-[#c4826e] transition-colors">
              Rules
            </a>
          </nav>

          <Link
            href="/sign-up"
            className="group inline-flex items-center gap-2.5 text-sm font-medium text-[#3a2519] hover:text-[#c4826e] transition-colors"
          >
            <span className="hidden sm:inline tracking-wide">はじめる</span>
            <span className="w-9 h-9 rounded-full border border-hairline border-[#3a2519]/25 group-hover:border-[#c4826e] group-hover:bg-[#c4826e] group-hover:text-[#faf6f1] flex items-center justify-center transition-all duration-300">
              <svg
                viewBox="0 0 16 16"
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </div>
      </header>

      {/* ════════════════════════════════════════
          CHAPTER 序 — HERO
          ════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] pt-28 pb-20 overflow-hidden">
        {/* Massive faded 包 kanji as backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none animate-kanji-reveal"
        >
          <span className="font-display text-[55vw] md:text-[42vw] lg:text-[32vw] leading-none text-[#3a2519] font-black">
            包
          </span>
        </div>

        {/* Vertical Japanese text — decorative left edge */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 items-center gap-4">
          <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#7a6050]/60 vertical-rl">
            Tsutsumi — since 2026
          </span>
        </div>

        {/* Vertical text right edge */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 z-10">
          <div className="font-display text-xs tracking-[0.6em] text-[#3a2519]/50 vertical-rl">
            贈答のお付き合い、丁寧に結ぶ。
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 grid md:grid-cols-12 gap-8 md:gap-10 items-center min-h-[80svh]">
          {/* LEFT: Text content */}
          <div className="md:col-span-7 lg:col-span-7">
            {/* Chapter marker */}
            <div className="flex items-center gap-4 mb-10 animate-fade-rise" style={{ animationDelay: "0.1s" }}>
              <span className="font-latin text-xs tracking-[0.3em] uppercase text-[#c4826e]">
                No. 序
              </span>
              <span className="h-px w-16 bg-[#c4826e]/50 animate-draw-line" style={{ animationDelay: "0.3s" }} />
              <span className="font-latin text-xs tracking-[0.15em] italic text-[#7a6050]">
                Prologue
              </span>
            </div>

            {/* Massive display headline */}
            <h1
              className="font-display font-[500] text-[3.25rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.92] tracking-[-0.02em] text-[#3a2519] mb-10 animate-fade-rise"
              style={{ animationDelay: "0.25s" }}
            >
              お返しで、
              <br />
              <span className="italic text-[#c4826e]">悩まない。</span>
            </h1>

            {/* Horizontal divider */}
            <div
              className="w-28 h-px bg-[#3a2519]/30 mb-8 animate-draw-line"
              style={{ animationDelay: "0.5s" }}
            />

            {/* Subtitle */}
            <p
              className="font-body text-base md:text-lg lg:text-xl text-[#5a4535] leading-[1.9] max-w-lg mb-12 animate-fade-rise"
              style={{ animationDelay: "0.6s" }}
            >
              「誰にいくらもらったっけ?」「もうお返しした?」
              <br />
              結婚式や出産の忙しい時期、
              <br />
              <span className="text-[#3a2519] font-medium">
                つつみが全部、覚えておきます。
              </span>
            </p>

            {/* CTA */}
            <div
              className="flex items-center gap-6 flex-wrap animate-fade-rise"
              style={{ animationDelay: "0.8s" }}
            >
              <Link
                href="/sign-up"
                className="group inline-flex items-center gap-3 bg-[#3a2519] text-[#faf6f1] pl-7 pr-3 py-3 rounded-full hover:bg-[#c4826e] transition-all duration-500"
              >
                <span className="text-sm font-medium tracking-wider">
                  30秒ではじめる
                </span>
                <span className="w-9 h-9 rounded-full bg-[#faf6f1] text-[#3a2519] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/calculator"
                className="text-sm text-[#7a6050] link-grow"
              >
                まず計算だけ試す
              </Link>
            </div>

            {/* Trust markers */}
            <div
              className="mt-16 flex items-center gap-6 font-latin text-[10px] uppercase tracking-[0.3em] text-[#7a6050]/70 animate-fade-rise"
              style={{ animationDelay: "1s" }}
            >
              <span>完全無料</span>
              <span className="w-1 h-1 rounded-full bg-[#c4826e]/50" />
              <span>登録30秒</span>
              <span className="w-1 h-1 rounded-full bg-[#c4826e]/50" />
              <span>Partner share</span>
            </div>
          </div>

          {/* RIGHT: Image as editorial photo with layered frames */}
          <div
            className="md:col-span-5 lg:col-span-5 relative animate-fade-rise"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative aspect-[4/5] max-w-sm ml-auto">
              {/* Back offset frame */}
              <div className="absolute inset-0 border border-hairline border-[#3a2519]/15 -translate-x-3 -translate-y-3" />
              {/* Accent offset frame */}
              <div className="absolute inset-0 border border-hairline border-[#c4826e]/40 translate-x-3 translate-y-3" />
              {/* Image */}
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/hero-furoshiki.webp"
                  alt="風呂敷に包まれた贈り物"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Caption */}
              <div className="absolute -bottom-10 left-0 right-0 flex items-center gap-3 px-1">
                <span className="font-latin text-[10px] italic text-[#7a6050]">
                  fig. 壱
                </span>
                <span className="h-px flex-1 bg-[#3a2519]/15" />
                <span className="font-latin text-[9px] uppercase tracking-[0.25em] text-[#7a6050]">
                  Furoshiki
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page marker bottom right */}
        <div className="hidden md:flex absolute bottom-10 right-12 items-center gap-3 font-latin text-xs text-[#7a6050]/70">
          <span className="h-px w-8 bg-[#7a6050]/30" />
          <span className="tracking-[0.2em]">01 / 07</span>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHAPTER 壱 — THE PROBLEM (Before / After)
          ════════════════════════════════════════ */}
      <section id="problem" className="relative py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          {/* Chapter opener */}
          <div className="grid md:grid-cols-12 gap-8 mb-20 md:mb-28 items-end">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-latin text-[11px] uppercase tracking-[0.3em] text-[#c4826e]">
                  No. 壱
                </span>
                <span className="h-px w-12 bg-[#c4826e]/40" />
              </div>
              <p className="font-latin text-[11px] italic uppercase tracking-[0.2em] text-[#7a6050]">
                The Problem
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display font-[500] text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.01em] text-[#3a2519]">
                結婚・出産の後、
                <br />
                <span className="italic text-[#c4826e]">こうなっていませんか。</span>
              </h2>
            </div>
          </div>

          {/* Before / After editorial spread */}
          <div className="grid md:grid-cols-2 gap-px md:gap-0 bg-[#3a2519]/10">
            {/* BEFORE — monochrome */}
            <div className="bg-[#f5f0eb] p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-3 mb-10">
                <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#7a6050]">
                  Before
                </span>
                <span className="h-px flex-1 bg-[#7a6050]/20 max-w-[80px]" />
              </div>

              <p className="font-display text-xl md:text-2xl leading-[1.6] text-[#7a6050] mb-10 font-[400]">
                「え、田中さんっていくらもらったっけ?」
              </p>

              <ul className="space-y-6">
                {[
                  "Excelやノートに殴り書き。すぐ続かない",
                  "気づいたら期限を1ヶ月過ぎている",
                  "半返し?三返し?調べるたびに違う答え",
                  "「送ってくれたと思ってた」で小さな喧嘩",
                ].map((text, i) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="font-latin text-[10px] text-[#7a6050]/50 pt-1 tabular-nums">
                      0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-[#7a6050] line-through decoration-[#7a6050]/30">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* AFTER — warm */}
            <div className="bg-gradient-to-br from-[#fef8f3] via-[#fef0ea] to-[#fce4da] p-8 md:p-12 lg:p-16 relative">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-hairline border-[#c4826e]/40" />

              <div className="flex items-center gap-3 mb-10">
                <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
                  After
                </span>
                <span className="h-px flex-1 bg-[#c4826e]/30 max-w-[80px]" />
              </div>

              <p className="font-display text-xl md:text-2xl leading-[1.6] text-[#3a2519] mb-10 font-[500]">
                「全部つつみが覚えてる」
                <br />
                <span className="text-[#c4826e] italic">という安心。</span>
              </p>

              <ul className="space-y-6">
                {[
                  "30秒で記録完了。スマホでサッと",
                  "期限の7日前と1日前にメールで通知",
                  "13種のイベントを自動判定して金額計算",
                  "パートナーと同じ画面で管理できる",
                ].map((text, i) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="font-latin text-[10px] text-[#c4826e] pt-1 tabular-nums font-medium">
                      0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-[#3a2519] font-medium">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Page marker */}
        <div className="hidden md:flex absolute bottom-10 right-12 items-center gap-3 font-latin text-xs text-[#7a6050]/70">
          <span className="h-px w-8 bg-[#7a6050]/30" />
          <span className="tracking-[0.2em]">02 / 07</span>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHAPTER 弐 — THE REASON (Developer Story)
          ════════════════════════════════════════ */}
      <section
        id="reason"
        className="relative py-32 md:py-40 bg-[#f5ede5] overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          {/* Chapter opener */}
          <div className="grid md:grid-cols-12 gap-8 mb-20 md:mb-28 items-end">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-latin text-[11px] uppercase tracking-[0.3em] text-[#c4826e]">
                  No. 弐
                </span>
                <span className="h-px w-12 bg-[#c4826e]/40" />
              </div>
              <p className="font-latin text-[11px] italic uppercase tracking-[0.2em] text-[#7a6050]">
                The Reason
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display font-[500] text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.01em] text-[#3a2519]">
                作った人も、
                <br />
                <span className="italic text-[#c4826e]">同じ悩みを抱えていました。</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT: Image */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5]">
                <div className="absolute inset-0 border border-hairline border-[#3a2519]/15 translate-x-3 translate-y-3" />
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/couple-wrapping.webp"
                    alt="パートナーと一緒に贈り物を包む"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 left-0 right-0 flex items-center gap-3 px-1">
                  <span className="font-latin text-[10px] italic text-[#7a6050]">
                    fig. 弐
                  </span>
                  <span className="h-px flex-1 bg-[#3a2519]/15" />
                  <span className="font-latin text-[9px] uppercase tracking-[0.25em] text-[#7a6050]">
                    Together
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Editorial copy with drop cap */}
            <div className="md:col-span-7 md:pl-8 lg:pl-16">
              <p className="font-body text-base md:text-lg leading-[2] text-[#5a4535] mb-8">
                <span className="float-left font-display text-[5.5rem] leading-[0.85] mt-2 mr-3 mb-1 text-[#c4826e] font-[700]">
                  こ
                </span>
                こ数年で、結婚と出産を経験しました。ありがたいことに、親戚・職場・友人…いろんなところからお祝いをいただきました。しかも自分の側だけじゃなくて、妻の側にも。両家合わせて、もう何が何だかわからない。
              </p>

              <div className="my-10 border-l-2 border-[#c4826e] pl-6 py-2">
                <p className="font-display text-lg md:text-xl leading-[1.9] text-[#3a2519] italic font-[500]">
                  「田中さんからいくらもらったっけ?」
                  <br />
                  「それ、私の叔母からだよ? 別の田中さん」
                  <br />
                  「お返し、いくらにする?」
                </p>
                <p className="font-latin text-[10px] uppercase tracking-[0.2em] text-[#7a6050] mt-4">
                  — 毎回この会話を繰り返していた。
                </p>
              </div>

              <p className="font-body text-base md:text-lg leading-[2] text-[#5a4535] mb-6">
                僕も妻もエンジニアなので、すぐにスプレッドシートを作って共有しました。これで一応は管理できました。でも冷静に考えると、
                <span className="text-[#3a2519] font-medium">
                  スプシで管理しようってなるのはエンジニアだから
                </span>
                であって、普通の人はこんなことしません。
              </p>

              <p className="font-body text-base md:text-lg leading-[2] text-[#5a4535] mb-10">
                母親に「お祝い管理どうしてる?」と聞いたら、
                <span className="text-[#3a2519] font-medium">
                  「ノートに手書きしてる」
                </span>
                と言われました。令和なのに。これが普通の家庭のリアルだと思います。
              </p>

              {/* Signature */}
              <div className="flex items-center gap-4 pt-8 border-t border-hairline border-[#3a2519]/15">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c4826e] to-[#a0634f] text-[#faf6f1] flex items-center justify-center font-display font-bold">
                  D
                </div>
                <div>
                  <p className="font-display text-sm text-[#3a2519] font-medium">
                    開発者
                  </p>
                  <p className="font-latin text-[10px] uppercase tracking-[0.2em] text-[#7a6050]">
                    Engineer · Writer · User
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page marker */}
        <div className="hidden md:flex absolute bottom-10 right-12 items-center gap-3 font-latin text-xs text-[#7a6050]/70">
          <span className="h-px w-8 bg-[#7a6050]/30" />
          <span className="tracking-[0.2em]">03 / 07</span>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHAPTER 参 — THE SOLUTION (Dark editorial spread)
          ════════════════════════════════════════ */}
      <section
        id="solution"
        className="relative py-32 md:py-44 bg-[#2d1c13] text-[#faf6f1] overflow-hidden"
      >
        {/* Faded kanji backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="font-display text-[50vw] md:text-[28vw] leading-none text-[#faf6f1]/[0.025] font-black">
            結
          </span>
        </div>

        {/* Vertical text decoration */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 z-10">
          <div className="font-latin text-[10px] uppercase tracking-[0.4em] text-[#faf6f1]/30 vertical-rl">
            Solution — 四つの作法
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          {/* Chapter opener */}
          <div className="grid md:grid-cols-12 gap-8 mb-20 md:mb-28 items-end">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-latin text-[11px] uppercase tracking-[0.3em] text-[#d4a088]">
                  No. 参
                </span>
                <span className="h-px w-12 bg-[#d4a088]/50" />
              </div>
              <p className="font-latin text-[11px] italic uppercase tracking-[0.2em] text-[#faf6f1]/60">
                The Solution
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display font-[500] text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.01em]">
                もう迷わない。
                <br />
                <span className="italic text-[#d4a088]">もう喧嘩しない。</span>
              </h2>
            </div>
          </div>

          {/* Features as editorial numbered list */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-20 max-w-5xl">
            {FEATURES.map((feature, i) => (
              <div key={feature.label} className="relative group">
                {/* Huge faded number behind */}
                <div
                  aria-hidden
                  className="absolute -top-8 -left-4 font-display text-[8rem] leading-none text-[#faf6f1]/[0.04] select-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#d4a088]">
                      {feature.label}
                    </span>
                    <span className="h-px w-10 bg-[#d4a088]/40" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-[500] leading-[1.3] mb-4 text-[#faf6f1]">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm md:text-base leading-[1.9] text-[#c4b0a0]">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline CTA in dark section */}
          <div className="mt-24 md:mt-32 pt-12 border-t border-hairline border-[#faf6f1]/15 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#d4a088] mb-3">
                Begin here
              </p>
              <p className="font-display text-2xl md:text-3xl text-[#faf6f1] leading-[1.4] max-w-md">
                今すぐ記録すれば、
                <br />
                <span className="italic text-[#d4a088]">一ヶ月後に救われる。</span>
              </p>
            </div>
            <Link
              href="/sign-up"
              className="group inline-flex items-center gap-3 bg-[#faf6f1] text-[#2d1c13] pl-7 pr-3 py-3 rounded-full hover:bg-[#d4a088] transition-all duration-500"
            >
              <span className="text-sm font-medium tracking-wider">
                アカウントをつくる
              </span>
              <span className="w-9 h-9 rounded-full bg-[#2d1c13] text-[#faf6f1] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Page marker */}
        <div className="hidden md:flex absolute bottom-10 right-12 items-center gap-3 font-latin text-xs text-[#faf6f1]/50">
          <span className="h-px w-8 bg-[#faf6f1]/25" />
          <span className="tracking-[0.2em]">04 / 07</span>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHAPTER 肆 — THE RULES (Return rules sidebar)
          ════════════════════════════════════════ */}
      <section id="rules" className="relative py-32 md:py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
            {/* LEFT: Intro */}
            <div className="md:col-span-5 md:sticky md:top-32 self-start">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-latin text-[11px] uppercase tracking-[0.3em] text-[#c4826e]">
                  No. 肆
                </span>
                <span className="h-px w-12 bg-[#c4826e]/40" />
                <span className="font-latin text-[11px] italic uppercase tracking-[0.2em] text-[#7a6050]">
                  The Rules
                </span>
              </div>
              <h2 className="font-display font-[500] text-4xl md:text-5xl leading-[1.1] tracking-[-0.01em] text-[#3a2519] mb-8">
                お返しの、
                <br />
                <span className="italic text-[#c4826e]">作法帳。</span>
              </h2>
              <p className="font-body text-sm md:text-base leading-[2] text-[#5a4535] mb-8">
                結婚祝いは半返し。出産祝いは三十から半返し。
                <br />
                香典は半返し、四十九日後。
                <br />
                <br />
                「半返し」と一言で片づけるけれど、
                <br />
                本当はもっと細かい。つつみは全十三種の作法を内蔵して、
                <br />
                自動で判定します。
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 text-sm text-[#c4826e] link-grow"
              >
                計算ツールを試す
                <svg
                  viewBox="0 0 16 16"
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>

            {/* RIGHT: Rules table, editorial style */}
            <div className="md:col-span-7">
              <div className="relative">
                {/* Decorative "保存推奨" vertical label */}
                <div className="hidden lg:block absolute -left-16 top-0 bottom-0">
                  <div className="font-display text-[10px] tracking-[0.4em] text-[#c4826e] vertical-rl">
                    保存推奨
                  </div>
                </div>

                <div className="border-t border-hairline border-[#3a2519]/20">
                  {RETURN_RULES.map((rule, i) => (
                    <div
                      key={rule.event}
                      className="group grid grid-cols-12 gap-4 py-6 border-b border-hairline border-[#3a2519]/15 hover:bg-[#fef8f3] transition-colors px-2 -mx-2"
                    >
                      <div className="col-span-1 font-latin text-xs text-[#7a6050] pt-1 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="col-span-4">
                        <p className="font-display text-base md:text-lg text-[#3a2519] font-[500]">
                          {rule.event}
                        </p>
                      </div>
                      <div className="col-span-3 flex items-start">
                        <p className="text-sm text-[#c4826e] font-medium pt-0.5">
                          {rule.rate}
                        </p>
                      </div>
                      <div className="col-span-4 flex items-start">
                        <p className="text-sm text-[#7a6050] pt-0.5">
                          {rule.timing}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-latin text-[11px] italic text-[#7a6050] mt-6">
                  * 他にも餞別・七五三・長寿祝いなど、全13種に対応しています。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-10 right-12 items-center gap-3 font-latin text-xs text-[#7a6050]/70">
          <span className="h-px w-8 bg-[#7a6050]/30" />
          <span className="tracking-[0.2em]">05 / 07</span>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHAPTER 伍 — FOR YOU (Target personas)
          ════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40 bg-[#f5ede5] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid md:grid-cols-12 gap-8 mb-20 items-end">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-latin text-[11px] uppercase tracking-[0.3em] text-[#c4826e]">
                  No. 伍
                </span>
                <span className="h-px w-12 bg-[#c4826e]/40" />
              </div>
              <p className="font-latin text-[11px] italic uppercase tracking-[0.2em] text-[#7a6050]">
                For You
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-display font-[500] text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.01em] text-[#3a2519]">
                こんな方へ、
                <br />
                <span className="italic text-[#c4826e]">おすすめします。</span>
              </h2>
            </div>
          </div>

          <div className="max-w-4xl">
            {PERSONAS.map((persona, i) => (
              <div
                key={persona}
                className="group grid grid-cols-12 gap-6 py-8 border-b border-hairline border-[#3a2519]/15 hover:bg-[#fef8f3]/60 transition-colors px-2 -mx-2"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-latin text-xl md:text-2xl italic text-[#c4826e] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-11 pt-1">
                  <p className="font-display text-base md:text-xl text-[#3a2519] leading-relaxed font-[400] group-hover:text-[#c4826e] transition-colors">
                    {persona}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-10 right-12 items-center gap-3 font-latin text-xs text-[#7a6050]/70">
          <span className="h-px w-8 bg-[#7a6050]/30" />
          <span className="tracking-[0.2em]">06 / 07</span>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHAPTER 結 — BEGIN (Final CTA)
          ════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        {/* Watercolor backdrop, more present */}
        <div className="absolute inset-0 -z-0">
          <Image
            src="/watercolor-gift.webp"
            alt=""
            fill
            className="object-cover opacity-[0.35]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f1]/80 via-[#faf6f1]/70 to-[#faf6f1]/90" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-latin text-[11px] uppercase tracking-[0.3em] text-[#c4826e]">
                No. 結
              </span>
              <span className="h-px w-12 bg-[#c4826e]/40" />
              <span className="font-latin text-[11px] italic uppercase tracking-[0.2em] text-[#7a6050]">
                Begin
              </span>
            </div>

            <h2 className="font-display font-[500] text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-[-0.02em] text-[#3a2519] mb-10">
              さあ、
              <br />
              <span className="italic text-[#c4826e]">はじめましょう。</span>
            </h2>

            <p className="font-body text-base md:text-lg leading-[2] text-[#5a4535] mb-12 max-w-xl">
              大切な人とのお付き合いを、
              <br />
              丁寧に、正直に、忘れずに。
              <br />
              <span className="text-[#3a2519] font-medium">
                完全無料。登録は30秒で済みます。
              </span>
            </p>

            <div className="flex items-center gap-6 flex-wrap mb-16">
              <Link
                href="/sign-up"
                className="group inline-flex items-center gap-3 bg-[#3a2519] text-[#faf6f1] pl-8 pr-3 py-3.5 rounded-full hover:bg-[#c4826e] transition-all duration-500"
              >
                <span className="text-sm font-medium tracking-wider">
                  つつみをはじめる
                </span>
                <span className="w-10 h-10 rounded-full bg-[#faf6f1] text-[#3a2519] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
              <Link href="/calculator" className="text-sm text-[#7a6050] link-grow">
                まず計算だけ試す
              </Link>
            </div>

            {/* Signature line */}
            <div className="pt-10 border-t border-hairline border-[#3a2519]/20 flex items-center justify-between max-w-xl">
              <div>
                <p className="font-display text-lg text-[#3a2519] font-[500]">
                  つつみ
                </p>
                <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#7a6050] mt-1">
                  贈り物を、大切に包む
                </p>
              </div>
              <p className="font-latin text-xs italic text-[#7a6050]">
                tsutsumi.app
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-10 right-12 items-center gap-3 font-latin text-xs text-[#7a6050]/70">
          <span className="h-px w-8 bg-[#7a6050]/30" />
          <span className="tracking-[0.2em]">07 / 07</span>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════ */}
      <footer className="relative border-t border-hairline border-[#3a2519]/15 bg-[#f5ede5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.webp"
                  alt="つつみ"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-md"
                />
                <span className="font-display text-xl tracking-[0.18em] text-[#3a2519]">
                  つつみ
                </span>
              </div>
              <p className="font-body text-sm text-[#7a6050] leading-relaxed max-w-sm">
                贈り物を、大切に包む。
                <br />
                贈答のお返しを、丁寧に管理するためのウェブアプリ。
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e] mb-4">
                Explore
              </p>
              <ul className="space-y-2.5 text-sm text-[#5a4535]">
                <li>
                  <Link href="/calculator" className="link-grow hover:text-[#c4826e] transition-colors">
                    計算ツール
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="link-grow hover:text-[#c4826e] transition-colors">
                    アカウント作成
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in" className="link-grow hover:text-[#c4826e] transition-colors">
                    ログイン
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e] mb-4">
                Legal
              </p>
              <ul className="space-y-2.5 text-sm text-[#5a4535]">
                <li>
                  <Link href="/terms" className="link-grow hover:text-[#c4826e] transition-colors">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="link-grow hover:text-[#c4826e] transition-colors">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="link-grow hover:text-[#c4826e] transition-colors">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-hairline border-[#3a2519]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-latin text-[10px] uppercase tracking-[0.25em] text-[#7a6050]">
              © 2026 Tsutsumi — All rights reserved
            </p>
            <p className="font-latin text-[10px] italic text-[#7a6050]">
              Made with 心 in Japan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
