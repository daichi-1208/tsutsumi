import type { ReactNode } from "react";
import Link from "next/link";

type ArticleLink = {
  slug: string;
  title: string;
};

export function BlogArticle({
  chapter,
  date,
  readTime,
  title,
  accent,
  leading,
  children,
  related,
}: {
  chapter: string;
  date: string;
  readTime: string;
  title: string;
  accent: string;
  leading: string;
  children: ReactNode;
  related: ArticleLink[];
}) {
  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-24">
      {/* Breadcrumb */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-latin text-[10px] uppercase tracking-[0.2em] text-[#c4826e] mb-10"
      >
        <svg
          viewBox="0 0 16 16"
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M13 8H3M7 4L3 8l4 4" />
        </svg>
        Back to journal
      </Link>

      {/* Header */}
      <header className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
            {chapter}
          </span>
          <span className="h-px w-10 bg-[#c4826e]/40" />
          <span className="font-latin text-[10px] italic text-[#7a6050] tabular-nums">
            {date}
          </span>
          <span className="font-latin text-[10px] italic text-[#b0a090]">
            · {readTime}
          </span>
        </div>
        <h1 className="font-display font-[500] text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.01em] text-[#3a2519] mb-6">
          {title}
          <br />
          <span className="italic text-[#c4826e]">{accent}</span>
        </h1>
        <p className="font-display text-lg md:text-xl text-[#5a4535] leading-[1.9] max-w-2xl">
          {leading}
        </p>
      </header>

      {/* Article body */}
      <div className="prose-tsutsumi">{children}</div>

      {/* Inline CTA */}
      <div className="mt-20 bg-[#3a2519] text-[#faf6f1] p-8 md:p-10 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-12 -top-12 pointer-events-none select-none"
        >
          <span className="font-display text-[15rem] leading-none text-[#faf6f1]/[0.05] font-black">
            結
          </span>
        </div>
        <div className="relative max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-latin text-[10px] italic uppercase tracking-[0.3em] text-[#d4a088]">
              Save this knowledge
            </span>
            <span className="h-px w-10 bg-[#d4a088]/40" />
          </div>
          <p className="font-display text-2xl md:text-3xl font-[500] leading-[1.3] mb-4">
            作法だけでなく、
            <br />
            <span className="italic text-[#d4a088]">記録まで丁寧に。</span>
          </p>
          <p className="font-body text-sm text-[#c4b0a0] leading-relaxed mb-6">
            つつみは、誰にいくらもらったか・何をお返ししたかを対で記録できる
            贈答管理アプリ。お返し金額の自動計算と、期限前のメール通知付き。
            完全無料。
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href="/sign-up"
              className="group inline-flex items-center gap-3 bg-[#faf6f1] text-[#3a2519] pl-6 pr-2.5 py-2.5 rounded-full hover:bg-[#d4a088] transition-all duration-500"
            >
              <span className="text-sm font-medium tracking-wider">
                30秒ではじめる
              </span>
              <span className="w-8 h-8 rounded-full bg-[#3a2519] text-[#faf6f1] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                <svg
                  viewBox="0 0 16 16"
                  className="w-3 h-3"
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
              className="font-latin text-xs italic text-[#d4a088] link-grow"
            >
              まず計算だけ試す
            </Link>
          </div>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-20 pt-10 border-t border-[#3a2519]/15">
          <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e] mb-6">
            Related reading
          </p>
          <div className="space-y-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="block py-3 border-b border-[#3a2519]/10 hover:bg-[#fef8f3]/60 transition-colors px-2 -mx-2 group"
              >
                <p className="font-display text-base md:text-lg font-[500] text-[#3a2519] group-hover:text-[#c4826e] transition-colors">
                  {item.title}
                </p>
                <p className="font-latin text-[10px] italic text-[#7a6050] mt-1">
                  Read →
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
