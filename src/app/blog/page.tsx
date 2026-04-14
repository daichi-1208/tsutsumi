import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "贈答マナーの読み物 | つつみ",
  description:
    "結婚祝い・出産祝い・香典返しなど、日本の贈答文化における「お返しのマナー」を丁寧に解説する読み物集。",
  alternates: { canonical: "https://tsutsumi.app/blog" },
};

const ARTICLES = [
  {
    slug: "wedding-return",
    chapter: "No. 壱",
    title: "結婚祝いのお返し、金額と作法の完全ガイド。",
    excerpt:
      "半返しが基本。でも相手によって変わる。金額別の早見表と、失礼にならないためのマナーをまとめました。",
    date: "2026.04.14",
    readTime: "8 min",
  },
  {
    slug: "birth-return",
    chapter: "No. 弐",
    title: "出産祝いのお返し、お宮参りまでに準備すること。",
    excerpt:
      "出産内祝いの相場は30〜50%。時期はお宮参り後が目安。忙しい産後でも失礼のない贈り方を。",
    date: "2026.04.14",
    readTime: "7 min",
  },
  {
    slug: "koden-return",
    chapter: "No. 参",
    title: "香典返しの相場と四十九日。知っておくべきマナー。",
    excerpt:
      "半返しが基本、時期は四十九日後。最近増えている「当日返し」の考え方と、品物選びの作法。",
    date: "2026.04.14",
    readTime: "7 min",
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 md:py-24">
      {/* Chapter opener */}
      <div className="mb-16 md:mb-20">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
            Blog
          </span>
          <span className="h-px w-12 bg-[#c4826e]/40" />
          <span className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#7a6050]">
            Journal
          </span>
        </div>
        <h1 className="font-display font-[500] text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em] text-[#3a2519] mb-6">
          贈答マナーの、
          <br />
          <span className="italic text-[#c4826e]">読み物。</span>
        </h1>
        <p className="font-body text-base text-[#7a6050] leading-relaxed max-w-xl">
          半返し、三返し、四十九日後。日本の贈答文化の作法を、
          <br />
          丁寧に紐解いていく読み物です。
        </p>
      </div>

      {/* Articles list */}
      <div className="border-t border-[#3a2519]/20">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-12 border-b border-[#3a2519]/12 hover:bg-[#fef8f3]/60 transition-colors px-2 -mx-2"
          >
            <div className="col-span-3 md:col-span-2">
              <div className="flex flex-col gap-1">
                <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
                  {article.chapter}
                </span>
                <span className="font-latin text-[10px] italic text-[#7a6050] tabular-nums">
                  {article.date}
                </span>
                <span className="font-latin text-[10px] italic text-[#b0a090]">
                  {article.readTime}
                </span>
              </div>
            </div>
            <div className="col-span-9 md:col-span-10">
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-[500] leading-[1.3] text-[#3a2519] group-hover:text-[#c4826e] transition-colors mb-3">
                {article.title}
              </h2>
              <p className="font-body text-sm md:text-base text-[#7a6050] leading-relaxed">
                {article.excerpt}
              </p>
              <span className="inline-block mt-4 font-latin text-[11px] italic text-[#c4826e] group-hover:underline">
                Read the article →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
