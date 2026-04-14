import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calculator } from "./calculator";

export const metadata: Metadata = {
  title: "お返し計算 — いくら返す？自動計算ツール | つつみ",
  description:
    "結婚祝い・出産祝い・香典など、お返しの金額と時期を自動計算。イベントと金額を入れるだけで、日本の慣習に沿った半返し・三返しの目安がわかります。",
  openGraph: {
    title: "お返し計算 — いくら返す？自動計算ツール | つつみ",
    description:
      "結婚祝い・出産祝い・香典など、お返しの金額と時期を自動計算。無料で使えます。",
  },
};

export default function CalculatorPage() {
  return (
    <div className="relative min-h-screen bg-[#faf6f1] text-[#3a2519] font-body">
      {/* 紙目グレイン */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-multiply paper-grain"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#faf6f1]/80 border-b border-[#3a2519]/10">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
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
          <Link
            href="/sign-up"
            className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#c4826e] hover:text-[#a0634f] transition-colors"
          >
            → 無料で登録
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-24">
        {/* Chapter opener */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
              Tool
            </span>
            <span className="h-px w-12 bg-[#c4826e]/40" />
            <span className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#7a6050]">
              Calculator
            </span>
          </div>
          <h1 className="font-display font-[500] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em] text-[#3a2519] mb-6">
            お返し、
            <br />
            <span className="italic text-[#c4826e]">いくら返す？</span>
          </h1>
          <p className="font-body text-base text-[#7a6050] leading-relaxed max-w-xl">
            イベントと金額を入れるだけで、
            <br />
            日本の慣習に沿ったお返しの目安がわかります。
          </p>
        </div>

        {/* Calculator */}
        <Calculator />

        {/* SEO content section */}
        <article className="mt-20 md:mt-24 pt-16 border-t border-[#3a2519]/15 space-y-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
              Knowledge
            </span>
            <span className="h-px w-12 bg-[#c4826e]/40" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-[500] text-[#3a2519] leading-[1.2] -mt-8">
            お返しの、基本ルール。
          </h2>

          <div className="space-y-10 font-body text-sm md:text-base text-[#5a4535] leading-[2]">
            <section>
              <p>
                日本の贈答文化では、お祝いやお見舞いをいただいた際に「お返し」をするのがマナーです。
                一般的に「半返し」と呼ばれる、いただいた金額の半分をお返しする慣習が広く知られていますが、
                イベントや相手との関係性によって適切な金額や時期は異なります。
              </p>
            </section>
            <section>
              <h3 className="font-display text-lg font-[500] text-[#3a2519] mb-3">
                半返しが基本のイベント
              </h3>
              <p>
                結婚祝い、香典、快気祝いなどは半返し(50%)が基本です。
                ただし目上の方からいただいた場合は、1/3返しでも問題ありません。
              </p>
            </section>
            <section>
              <h3 className="font-display text-lg font-[500] text-[#3a2519] mb-3">
                お返しが不要なイベント
              </h3>
              <p>
                お年玉や入学祝いは、一般的にお返しは不要とされています。
                ただし、お礼状を送るのがマナーです。
              </p>
            </section>
            <section>
              <h3 className="font-display text-lg font-[500] text-[#3a2519] mb-3">
                お返しの時期
              </h3>
              <p>
                結婚祝いは挙式後1ヶ月以内、出産祝いはお宮参り後(生後1ヶ月)、
                香典は四十九日後が目安です。遅れると失礼にあたる場合があるため、
                記録して期限を管理することが大切です。
              </p>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3a2519]/15 bg-[#f5ede5] mt-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.webp"
              alt="つつみ"
              width={24}
              height={24}
              className="w-6 h-6 rounded"
            />
            <span className="font-display text-sm text-[#3a2519]">つつみ</span>
            <span className="font-latin text-[10px] italic text-[#7a6050]">
              — 贈り物を、大切に包む。
            </span>
          </div>
          <div className="flex gap-6 font-latin text-[10px] italic text-[#7a6050]">
            <Link href="/terms" className="hover:text-[#c4826e] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[#c4826e] transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-[#c4826e] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
