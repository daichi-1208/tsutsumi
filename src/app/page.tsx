import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MizuhikiDivider,
  AsanohaPattern,
  FloatingGifts,
  CtaDecoration,
  WaveBackground,
} from "@/components/illustrations";

/* ─── データ ─── */

const FEATURES = [
  {
    title: "かんたん記録",
    description:
      "「もらった」「あげた」を選んで、現金かギフトかを選択。相手・金額・イベントを入れるだけ。",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="4" width="22" height="26" rx="2" />
        <path d="M10 10h12M10 15h8M10 20h10" />
      </svg>
    ),
  },
  {
    title: "お返しリマインド",
    description:
      "半返し？三返し？金額も時期も自動で計算。うっかり忘れをゼロに。",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 6a9 9 0 0 1 9 9v4l2 3H5l2-3v-4a9 9 0 0 1 9-9z" />
        <path d="M13 25a3 3 0 0 0 6 0" />
      </svg>
    ),
  },
  {
    title: "グループで共有",
    description:
      "パーソナルで自分の記録を管理。グループを作れば、パートナーと一緒に管理もできる。",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="4" />
        <circle cx="21" cy="11" r="4" />
        <path d="M4 26c0-4 3.5-7 7-7 1.5 0 3 .5 5 2 2-1.5 3.5-2 5-2 3.5 0 7 3 7 7" />
      </svg>
    ),
  },
  {
    title: "相手別の履歴",
    description:
      "人物ごとに贈答のやりとりを時系列で一覧表示。お付き合いの全体像がひと目でわかる。",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4v24M8 8l8 4 8-4M8 16l8 4 8-4M8 24l8 4 8-4" />
      </svg>
    ),
  },
];

const RETURN_RULES = [
  { event: "結婚祝い", rate: "半返し（50%）", timing: "挙式後1ヶ月以内" },
  { event: "出産祝い", rate: "30〜50%", timing: "お宮参りの頃" },
  { event: "香典", rate: "半返し（50%）", timing: "四十九日後" },
  { event: "新築祝い", rate: "1/3〜半返し", timing: "入居後1〜2ヶ月" },
  { event: "お歳暮・お中元", rate: "同額程度", timing: "受領後2週間" },
  { event: "快気祝い", rate: "半返し（50%）", timing: "退院後1ヶ月" },
  { event: "入学祝い", rate: "不要", timing: "お礼のみ" },
];

const STEPS = [
  {
    num: "一",
    title: "記録する",
    desc: "現金かギフトかを選んで、相手・金額・イベントを入力するだけ",
  },
  {
    num: "二",
    title: "共有する",
    desc: "グループを作ってパートナーを招待。2人で一緒に管理できる",
  },
  {
    num: "三",
    title: "忘れない",
    desc: "お返し時期が近づいたらメールでお知らせ。金額も自動計算",
  },
];

/* ─── ページ ─── */

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf6f1]/85 backdrop-blur-md border-b border-[#e8ddd0]">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="つつみ" width={32} height={32} className="w-8 h-8 rounded-xl" />
            <span className="text-lg font-bold tracking-tight text-[#4a3228]">
              つつみ
            </span>
          </div>
          <Link href="/sign-up">
            <Button className="bg-[#c4826e] hover:bg-[#a0634f] text-white shadow-sm rounded-full px-6" size="sm">
              無料ではじめる
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* 背景装飾 */}
        <AsanohaPattern className="inset-0 text-[#8b5e3c] opacity-[0.025]" />
        <FloatingGifts className="inset-0" />
        <WaveBackground className="bottom-0 left-0 w-full h-48" />

        <div className="relative max-w-6xl mx-auto px-5 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* テキスト */}
            <div className="text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#e8ddd0] rounded-full px-4 py-1.5 mb-8 text-sm text-[#8b5e3c] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4826e]" />
                完全無料ではじめられます
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-[#3a2519]">
                <span className="inline-block">贈り物を、</span>
                <br />
                <span className="inline-block bg-gradient-to-r from-[#c4826e] to-[#d4a088] bg-clip-text text-transparent">
                  大切に包む。
                </span>
              </h1>

              <p className="text-lg text-[#7a6050] mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
                「誰に何をもらった？」「お返しいつ？いくら？」
                もう迷わない。現金もギフトも、記録するだけでお返しの時期と金額を教えてくれます。
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-[#c4826e] hover:bg-[#a0634f] text-white shadow-lg shadow-[#c4826e]/20 rounded-full text-base px-10 h-13">
                    無料ではじめる
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="border-[#d4c0b0] text-[#7a6050] hover:bg-[#f0e8df] rounded-full text-base px-10 h-13">
                    くわしく見る
                  </Button>
                </a>
              </div>

              {/* SNSログイン案内 */}
              <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
                <span className="text-xs text-[#b0a090]">かんたんログイン</span>
                <div className="flex items-center gap-2">
                  {/* Google */}
                  <div className="w-8 h-8 rounded-full bg-white border border-[#e0d5c8] flex items-center justify-center shadow-sm" title="Googleでログイン">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09A6.68 6.68 0 0 1 5.5 12c0-.72.12-1.42.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.42 3.46 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  </div>
                  {/* Mail */}
                  <div className="w-8 h-8 rounded-full bg-white border border-[#e0d5c8] flex items-center justify-center shadow-sm" title="メールでログイン">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8b5e3c]" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* メインビジュアル */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-[420px] md:max-w-[480px]">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#c4826e]/20 to-[#d4a088]/10 rounded-[2rem] blur-3xl" />
                <div className="absolute -inset-1 bg-gradient-to-br from-[#c4826e]/15 to-transparent rounded-2xl" />
                <Image
                  src="/hero-furoshiki.png"
                  alt="風呂敷に丁寧に包まれた贈り物"
                  width={920}
                  height={518}
                  priority
                  className="relative rounded-2xl shadow-2xl shadow-[#3a2519]/15 ring-1 ring-[#c4826e]/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MizuhikiDivider />

      {/* Pain Point */}
      <section className="px-5 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-[#c4826e] tracking-widest mb-3">
            PAIN
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-[#3a2519]">
            こんな経験、ありませんか？
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                text: "結婚祝いのお返し、もう1ヶ月過ぎてた…",
                sub: "期限を忘れる",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
              },
              {
                text: "「あの人にいくらもらったっけ？」とパートナーに聞くたび気まずい",
                sub: "記録がバラバラ",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path d="M9 14l2 2 4-4" opacity="0.3" />
                  </svg>
                ),
              },
              {
                text: "半返し？三返し？いくら返せばいいの…？",
                sub: "ルールがわからない",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
                  </svg>
                ),
              },
            ].map((pain) => (
              <div
                key={pain.sub}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-[#efe5da] text-left group hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fef0ea] flex items-center justify-center text-[#c4826e] mb-4">
                  {pain.icon}
                </div>
                <p className="text-xs font-semibold text-[#c4826e] tracking-wider mb-2 uppercase">
                  {pain.sub}
                </p>
                <p className="text-[#5a4535] leading-relaxed text-sm">
                  {pain.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution - ダークセクション */}
      <section className="relative bg-gradient-to-b from-[#3a2519] to-[#4a3228] text-white py-20 px-5 overflow-hidden">
        <AsanohaPattern className="inset-0 text-white opacity-[0.02]" />

        <div className="relative max-w-5xl mx-auto">
          {/* ソリューション導入: テキスト + カップル写真 */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-[#d4a088] tracking-widest mb-3">
                SOLUTION
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                記録するだけで、
                <br />
                全部解決。
              </h2>
              <p className="text-[#c4b0a0] max-w-lg leading-relaxed">
                現金もギフトも、記録すれば日本の慣習に沿ったお返し金額と時期を自動で計算。
                パーソナルで自分用に。グループを作ればパートナーと共有も。
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#c4826e]/15 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/30">
                <Image
                  src="/couple-wrapping.png"
                  alt="パートナーと一緒に贈り物を包む"
                  width={920}
                  height={518}
                  className="block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3a2519]/30 to-transparent" />
              </div>
            </div>
          </div>

          {/* Mock UI - 2カラム */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* ダッシュボード */}
            <div className="bg-white/[0.07] backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#c4826e]/30 flex items-center justify-center">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#d4a088]" fill="currentColor">
                      <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zM7 5h2v3.5l2.5 1.5-.5 1L8 9V5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white/80">お返し未済</span>
                </div>
                <span className="text-xs bg-[#c4826e] rounded-full px-3 py-1 font-medium">2件</span>
              </div>
              {[
                { name: "田中太郎さん", event: "結婚祝い", amount: "30,000", returnAmount: "15,000", days: "あと12日" },
                { name: "佐藤花子さん", event: "出産祝い", amount: "10,000", returnAmount: "5,000", days: "あと25日" },
              ].map((item) => (
                <div key={item.name} className="bg-white/5 rounded-xl p-4 mb-3 last:mb-0 border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{item.event}</p>
                    </div>
                    <span className="text-xs bg-white/10 rounded-full px-2.5 py-0.5 text-[#d4a088] font-medium">
                      {item.days}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50 mt-2">
                    <span>¥{item.amount}</span>
                    <svg viewBox="0 0 16 16" className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 8h8M9 5l3 3-3 3" />
                    </svg>
                    <span className="text-[#d4a088] font-medium">¥{item.returnAmount}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 贈答登録フォーム風 */}
            <div className="bg-white/[0.07] backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded bg-[#c4826e]/30 flex items-center justify-center">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#d4a088]" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white/80">贈答を記録</span>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#c4826e]/30 rounded-lg px-3 py-2 text-sm text-center font-medium text-white border border-[#c4826e]/40">
                    もらった
                  </div>
                  <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-sm text-center text-white/40 border border-white/5">
                    あげた
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg px-3 py-2.5 text-sm text-white/30 border border-white/5">
                  相手の名前
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white/15 rounded-lg px-3 py-2 text-sm text-center font-medium text-white/70 border border-white/10">
                    現金
                  </div>
                  <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-sm text-center text-white/30 border border-white/5">
                    ギフト
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg px-3 py-2.5 text-sm text-white/30 border border-white/5">
                  ¥ 金額
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white/5 rounded-lg px-3 py-2.5 text-sm text-white/30 border border-white/5">
                    結婚祝い
                  </div>
                  <div className="flex-1 bg-white/5 rounded-lg px-3 py-2.5 text-sm text-white/30 border border-white/5">
                    2026/04/09
                  </div>
                </div>
                <div className="bg-[#c4826e] rounded-lg px-3 py-2.5 text-sm text-center text-white font-medium">
                  記録する
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-20 px-5 overflow-hidden scroll-mt-20">
        <WaveBackground className="top-0 left-0 w-full h-48 rotate-180" />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#c4826e] tracking-widest mb-3">
              FEATURES
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3a2519]">
              つつみの機能
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                className="bg-white border-[#efe5da] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fef0ea] to-[#fce4da] flex items-center justify-center text-[#c4826e] mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-[#3a2519]">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed text-[#7a6050]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <MizuhikiDivider />

      {/* Return Rules Table */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-[#c4826e] tracking-widest mb-3">
              KNOWLEDGE
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3a2519] mb-3">
              お返しのルール、知ってますか？
            </h2>
            <p className="text-[#7a6050]">
              つつみが日本の贈答慣習を自動で判定します。
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#efe5da] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#efe5da] bg-[#fef8f3]">
                    <th className="text-left py-4 px-5 font-medium text-[#8b5e3c] text-xs tracking-wider uppercase">
                      イベント
                    </th>
                    <th className="text-left py-4 px-5 font-medium text-[#8b5e3c] text-xs tracking-wider uppercase">
                      お返し率
                    </th>
                    <th className="text-left py-4 px-5 font-medium text-[#8b5e3c] text-xs tracking-wider uppercase">
                      時期の目安
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RETURN_RULES.map((rule, i) => (
                    <tr
                      key={rule.event}
                      className={`border-b border-[#f5ede5] last:border-none ${i % 2 === 1 ? "bg-[#fdfaf7]" : ""}`}
                    >
                      <td className="py-3.5 px-5 font-medium text-[#3a2519]">
                        {rule.event}
                      </td>
                      <td className="py-3.5 px-5 text-[#7a6050]">
                        {rule.rate}
                      </td>
                      <td className="py-3.5 px-5 text-[#7a6050]">
                        {rule.timing}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-xs text-[#b0a090] mt-4">
            他にも餞別・七五三・長寿祝い（還暦等）・お年玉・誕生日など全13種に対応
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-20 px-5 bg-[#f5ede5] overflow-hidden">
        <AsanohaPattern className="inset-0 text-[#8b5e3c] opacity-[0.02]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-[#c4826e] tracking-widest mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-14 text-[#3a2519]">
            つつみの使い方
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-6">
            {STEPS.map((item, i) => (
              <div key={item.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6 border-t border-dashed border-[#c4826e]/30" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#efe5da] flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-bold text-[#c4826e] font-serif">
                    {item.num}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#3a2519]">
                  {item.title}
                </h3>
                <p className="text-[#7a6050] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 px-5 overflow-hidden">
        {/* 水彩画像を全幅背景に — しっかり見せる */}
        <div className="absolute inset-0">
          <Image
            src="/watercolor-gift.png"
            alt=""
            fill
            className="object-cover scale-110"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#faf6f1]/60 backdrop-blur-[2px]" />
        </div>

        {/* グラスモーフィズムカード */}
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#3a2519]/8 border border-white/80 text-center">
            <Image src="/logo.png" alt="つつみ" width={80} height={80} className="w-20 h-20 mx-auto mb-6 rounded-3xl drop-shadow-lg" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3a2519] leading-tight">
              大切な人とのお付き合いを、
              <br />
              つつみが包みます。
            </h2>
            <p className="text-[#7a6050] mb-8 text-base md:text-lg max-w-md mx-auto">
              完全無料。登録は30秒。パートナーとの共有もかんたん。
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-[#c4826e] hover:bg-[#a0634f] text-white shadow-lg shadow-[#c4826e]/25 rounded-full text-base px-12 h-14">
                無料ではじめる
              </Button>
            </Link>

            {/* SNSログイン案内 */}
            <div className="flex items-center gap-3 mt-5 justify-center">
              <span className="text-xs text-[#b0a090]">かんたんログイン</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white border border-[#e0d5c8] flex items-center justify-center shadow-sm" title="Googleでログイン">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09A6.68 6.68 0 0 1 5.5 12c0-.72.12-1.42.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.42 3.46 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-[#e0d5c8] flex items-center justify-center shadow-sm" title="メールでログイン">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8b5e3c]" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 border-t border-[#e8ddd0] bg-[#f5ede5]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="つつみ" width={28} height={28} className="w-7 h-7 rounded-lg" />
              <div>
                <span className="font-bold text-[#3a2519]">つつみ</span>
                <span className="text-sm text-[#7a6050] ml-2">
                  — 贈り物を、大切に包む。
                </span>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-[#7a6050]">
              <Link href="/terms" className="hover:text-[#3a2519] transition-colors">
                利用規約
              </Link>
              <Link href="/privacy" className="hover:text-[#3a2519] transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/contact" className="hover:text-[#3a2519] transition-colors">
                お問い合わせ
              </Link>
            </div>
          </div>
          <p className="text-xs text-[#b0a090] text-center mt-8">
            &copy; 2026 つつみ All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
