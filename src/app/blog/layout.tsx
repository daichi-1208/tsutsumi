import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#faf6f1] text-[#3a2519] font-body overflow-x-hidden">
      {/* 紙目のグレイン */}
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
          <div className="flex items-center gap-6">
            <Link
              href="/calculator"
              className="hidden sm:inline font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#7a6050] hover:text-[#c4826e] transition-colors"
            >
              Calculator
            </Link>
            <Link
              href="/sign-up"
              className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#c4826e] hover:text-[#a0634f] transition-colors"
            >
              → 無料で登録
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

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
            <Link href="/blog" className="hover:text-[#c4826e] transition-colors">
              Blog
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#c4826e] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#c4826e] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#c4826e] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
