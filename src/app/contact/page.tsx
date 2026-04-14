import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "お問い合わせ | つつみ",
  description:
    "つつみ(贈答お付き合い管理アプリ)へのお問い合わせ、ご要望、不具合の報告はXのDMまで。@tsutsumi_app",
  alternates: { canonical: "https://tsutsumi.app/contact" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf6f1]">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#c4826e] hover:underline mb-8">
          <Image src="/logo.webp" alt="つつみ" width={20} height={20} className="w-5 h-5 rounded" />
          トップに戻る
        </Link>
        <h1 className="text-2xl font-bold text-[#3a2519] mb-6">お問い合わせ</h1>
        <div className="bg-white rounded-2xl border border-[#efe5da] p-6 sm:p-8 text-sm text-[#5a4535] leading-relaxed space-y-4">
          <p>つつみに関するご質問・ご要望・不具合の報告は、X（旧Twitter）のDMまでお気軽にご連絡ください。</p>
          <a
            href="https://x.com/tsutsumi_app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#fef8f3] rounded-xl p-4 hover:bg-[#f5ede5] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[#3a2519]">@tsutsumi_app</p>
              <p className="text-xs text-[#b0a090]">DMでお気軽にどうぞ</p>
            </div>
          </a>
          <p className="text-xs text-[#b0a090]">
            通常2〜3営業日以内にご返信いたします。
          </p>
        </div>
      </div>
    </div>
  );
}
