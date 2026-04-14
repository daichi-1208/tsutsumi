import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "利用規約 | つつみ",
  description:
    "つつみ(贈答お付き合い管理アプリ)の利用規約。本サービスの利用条件、アカウント、禁止事項、免責事項などについて定めています。",
  alternates: { canonical: "https://tsutsumi.app/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#faf6f1]">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#c4826e] hover:underline mb-8">
          <Image src="/logo.webp" alt="つつみ" width={20} height={20} className="w-5 h-5 rounded" />
          トップに戻る
        </Link>
        <h1 className="text-2xl font-bold text-[#3a2519] mb-6">利用規約</h1>
        <div className="bg-white rounded-2xl border border-[#efe5da] p-6 sm:p-8 text-sm text-[#5a4535] leading-relaxed space-y-6">
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">第1条（適用）</h2>
            <p>本規約は、つつみ（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、本サービスを利用するものとします。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">第2条（アカウント）</h2>
            <p>ユーザーは正確な情報を登録し、自己の責任においてアカウントを管理するものとします。アカウント情報の管理不備による損害について、当方は責任を負いません。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">第3条（禁止事項）</h2>
            <p>法令に違反する行為、他のユーザーへの迷惑行為、本サービスの運営を妨害する行為、その他当方が不適切と判断する行為を禁止します。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">第4条（サービスの変更・停止）</h2>
            <p>当方は、事前の通知なく本サービスの内容を変更、または提供を停止することがあります。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">第5条（免責事項）</h2>
            <p>本サービスで提供するお返し金額・時期の情報は一般的な慣習に基づくものであり、正確性を保証するものではありません。実際の贈答については、ご自身の判断で行ってください。</p>
          </section>
          <p className="text-xs text-[#b0a090]">制定日: 2026年4月9日</p>
        </div>
      </div>
    </div>
  );
}
