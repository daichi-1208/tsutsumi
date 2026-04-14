import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "プライバシーポリシー | つつみ",
  description:
    "つつみ(贈答お付き合い管理アプリ)のプライバシーポリシー。収集する情報、利用目的、第三者提供、データ保管について明示しています。",
  alternates: { canonical: "https://tsutsumi.app/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#faf6f1]">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#c4826e] hover:underline mb-8">
          <Image src="/logo.webp" alt="つつみ" width={20} height={20} className="w-5 h-5 rounded" />
          トップに戻る
        </Link>
        <h1 className="text-2xl font-bold text-[#3a2519] mb-6">プライバシーポリシー</h1>
        <div className="bg-white rounded-2xl border border-[#efe5da] p-6 sm:p-8 text-sm text-[#5a4535] leading-relaxed space-y-6">
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">収集する情報</h2>
            <p>本サービスでは、以下の情報を収集します。</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>アカウント情報（名前、メールアドレス）</li>
              <li>贈答記録（相手名、金額、イベント種別等）</li>
              <li>連絡先情報（名前、関係性等）</li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">情報の利用目的</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>本サービスの提供・運営</li>
              <li>お返しリマインド等の通知送信</li>
              <li>サービス改善のための分析</li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">第三者への提供</h2>
            <p>法令に基づく場合を除き、ユーザーの個人情報を第三者に提供することはありません。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">データの保管</h2>
            <p>データはSupabase（東京リージョン）に暗号化して保管されます。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#3a2519] mb-2">お問い合わせ</h2>
            <p>プライバシーに関するお問い合わせは、<Link href="/contact" className="text-[#c4826e] hover:underline">お問い合わせページ</Link>よりご連絡ください。</p>
          </section>
          <p className="text-xs text-[#b0a090]">制定日: 2026年4月9日</p>
        </div>
      </div>
    </div>
  );
}
