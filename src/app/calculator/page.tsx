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
    <div className="min-h-screen bg-[#faf6f1]">
      {/* ヘッダー */}
      <header className="border-b border-[#e8ddd0]">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.webp" alt="つつみ" width={28} height={28} className="w-7 h-7 rounded-lg" />
            <span className="text-lg font-bold tracking-tight text-[#4a3228]">つつみ</span>
          </Link>
          <Link href="/sign-up" className="text-sm text-[#c4826e] hover:underline">
            無料で登録
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#3a2519] mb-3">
            お返し計算ツール
          </h1>
          <p className="text-[#7a6050]">
            イベントと金額を選ぶだけで、お返しの目安がわかります
          </p>
        </div>

        <Calculator />

        {/* CTA */}
        <div className="mt-12 bg-white rounded-2xl border border-[#efe5da] p-6 text-center">
          <p className="font-bold text-[#3a2519] mb-2">
            お返しの管理をもっと楽に
          </p>
          <p className="text-sm text-[#7a6050] mb-4">
            つつみなら記録するだけで、お返し時期にリマインドメールが届きます。パートナーとの共有も。
          </p>
          <Link
            href="/sign-up"
            className="inline-block bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-full px-8 py-3 text-sm font-medium transition-colors"
          >
            無料ではじめる
          </Link>
        </div>

        {/* SEO用テキスト */}
        <div className="mt-12 space-y-6 text-sm text-[#7a6050] leading-relaxed">
          <h2 className="text-lg font-bold text-[#3a2519]">お返しの基本ルール</h2>
          <p>
            日本の贈答文化では、お祝いやお見舞いをいただいた際に「お返し」をするのがマナーです。
            一般的に「半返し」と呼ばれる、いただいた金額の半分をお返しする慣習が広く知られていますが、
            イベントや相手との関係性によって適切な金額や時期は異なります。
          </p>
          <h3 className="font-bold text-[#3a2519]">半返しが基本のイベント</h3>
          <p>
            結婚祝い、香典、快気祝いなどは半返し（50%）が基本です。
            ただし目上の方からいただいた場合は、1/3返しでも問題ありません。
          </p>
          <h3 className="font-bold text-[#3a2519]">お返しが不要なイベント</h3>
          <p>
            お年玉や入学祝いは、一般的にお返しは不要とされています。
            ただし、お礼状を送るのがマナーです。
          </p>
          <h3 className="font-bold text-[#3a2519]">お返しの時期</h3>
          <p>
            結婚祝いは挙式後1ヶ月以内、出産祝いはお宮参り後（生後1ヶ月）、
            香典は四十九日後が目安です。遅れると失礼にあたる場合があるため、
            記録して期限を管理することが大切です。
          </p>
        </div>
      </main>

      {/* フッター */}
      <footer className="py-8 px-5 border-t border-[#e8ddd0] bg-[#f5ede5]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#7a6050]">
          <div className="flex items-center gap-2">
            <Image src="/logo.webp" alt="つつみ" width={20} height={20} className="w-5 h-5 rounded" />
            <span className="font-bold text-[#3a2519]">つつみ</span>
            <span>— 贈り物を、大切に包む。</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-[#3a2519] transition-colors">利用規約</Link>
            <Link href="/privacy" className="hover:text-[#3a2519] transition-colors">プライバシーポリシー</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
