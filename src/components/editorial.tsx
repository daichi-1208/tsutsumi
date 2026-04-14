/**
 * Editorial UI primitives — dashboard shared components
 *
 * LPと同じEditorial Japanese Craft style をダッシュボードで再利用するための
 * 軽量プリミティブ集。タイポ・スペーシング・ボーダーの流儀を統一する。
 */

import type { ReactNode } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────
   PageHeader — ページの章扉
   ────────────────────────────────────────────── */
export function PageHeader({
  chapter,
  eyebrow,
  title,
  accent,
  description,
  action,
}: {
  chapter?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-12">
      {(chapter || eyebrow) && (
        <div className="flex items-center gap-3 mb-4">
          {chapter && (
            <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
              {chapter}
            </span>
          )}
          {chapter && eyebrow && (
            <span className="h-px w-10 bg-[#c4826e]/40" />
          )}
          {eyebrow && (
            <span className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#7a6050]">
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <h1 className="font-display font-[500] text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.01em] text-[#3a2519]">
          {title}
          {accent && (
            <>
              <br />
              <span className="italic text-[#c4826e]">{accent}</span>
            </>
          )}
        </h1>
        {action}
      </div>
      {description && (
        <p className="font-body text-sm md:text-base text-[#7a6050] leading-relaxed mt-5 max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   SectionHeader — サブセクションの扉
   ────────────────────────────────────────────── */
export function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 pb-4 border-b border-[#3a2519]/15">
      <div>
        {eyebrow && (
          <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e] mb-1.5">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-lg md:text-xl font-[500] text-[#3a2519] leading-tight">
          {title}
        </h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ──────────────────────────────────────────────
   PrimaryButton — 角丸+アイコン付き
   ────────────────────────────────────────────── */
export function PrimaryButton({
  children,
  href,
  type,
  disabled,
  onClick,
  variant = "dark",
  size = "md",
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  variant?: "dark" | "light" | "terracotta";
  size?: "sm" | "md" | "lg";
}) {
  const variantClasses = {
    dark: "bg-[#3a2519] text-[#faf6f1] hover:bg-[#c4826e]",
    terracotta: "bg-[#c4826e] text-[#faf6f1] hover:bg-[#a0634f]",
    light: "bg-[#faf6f1] text-[#3a2519] hover:bg-[#c4826e] hover:text-[#faf6f1] border border-[#3a2519]/20",
  };

  const sizeClasses = {
    sm: "pl-5 pr-2 py-2 text-xs",
    md: "pl-6 pr-2.5 py-2.5 text-sm",
    lg: "pl-7 pr-3 py-3 text-sm",
  };

  const iconSize = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-9 h-9",
  };

  const body = (
    <span
      className={`group inline-flex items-center gap-2.5 rounded-full font-medium tracking-wider transition-all duration-500 ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <span>{children}</span>
      <span
        className={`${iconSize[size]} rounded-full bg-[#faf6f1] text-[#3a2519] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500 ${variant === "light" ? "bg-[#3a2519] text-[#faf6f1] group-hover:bg-[#faf6f1] group-hover:text-[#3a2519]" : ""}`}
      >
        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </span>
  );

  if (href) {
    return <Link href={href}>{body}</Link>;
  }

  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className="inline-block">
      {body}
    </button>
  );
}

/* ──────────────────────────────────────────────
   GhostLink — シンプルな下線ホバーリンク
   ────────────────────────────────────────────── */
export function GhostLink({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const className =
    "inline-block font-body text-sm text-[#7a6050] link-grow hover:text-[#c4826e] transition-colors";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

/* ──────────────────────────────────────────────
   EditorialCard — ボーダーのみの控えめカード
   ────────────────────────────────────────────── */
export function EditorialCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-white/60 border border-[#3a2519]/15 ${className}`}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   DataRow — 贈答一覧・連絡先一覧で使う編集風の行
   ────────────────────────────────────────────── */
export function DataRow({
  index,
  primary,
  secondary,
  right,
  href,
  onClick,
}: {
  index?: number;
  primary: ReactNode;
  secondary?: ReactNode;
  right?: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <div className="group grid grid-cols-12 gap-3 md:gap-4 py-5 md:py-6 border-b border-[#3a2519]/12 hover:bg-[#fef8f3]/70 transition-colors px-1 -mx-1">
      {index !== undefined && (
        <div className="col-span-1 font-latin text-[11px] text-[#7a6050] pt-1.5 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </div>
      )}
      <div className={index !== undefined ? "col-span-8" : "col-span-9"}>
        <div className="font-body text-[#3a2519] font-medium text-sm md:text-base leading-snug">
          {primary}
        </div>
        {secondary && (
          <div className="mt-1 font-body text-xs text-[#7a6050] leading-relaxed">
            {secondary}
          </div>
        )}
      </div>
      {right && (
        <div className="col-span-3 flex items-start justify-end gap-2">
          {right}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  if (onClick) {
    return <button type="button" onClick={onClick} className="block w-full text-left">{inner}</button>;
  }
  return inner;
}

/* ──────────────────────────────────────────────
   EditorialInput — 本文付きで使う入力フィールド
   ────────────────────────────────────────────── */
export function FieldLabel({
  children,
  optional,
}: {
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="block font-body text-xs font-medium text-[#3a2519] mb-2 tracking-wide">
      {children}
      {optional && (
        <span className="ml-2 font-latin italic text-[10px] text-[#b0a090] normal-case">
          optional
        </span>
      )}
    </label>
  );
}

/* ──────────────────────────────────────────────
   Page marker — 編集誌風のページ番号
   ────────────────────────────────────────────── */
export function PageMarker({ current, total }: { current: string; total: string }) {
  return (
    <div className="hidden md:flex absolute bottom-8 right-8 items-center gap-3 font-latin text-[11px] text-[#7a6050]/60 pointer-events-none">
      <span className="h-px w-8 bg-[#7a6050]/30" />
      <span className="tracking-[0.2em] tabular-nums">
        {current} / {total}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   EmptyState — 編集風の空状態
   ────────────────────────────────────────────── */
export function EditorialEmpty({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="py-16 md:py-20 text-center">
      {/* 水引風の円 */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          <span className="h-px w-16 bg-[#c4826e]/30" />
          <div className="w-2.5 h-2.5 rounded-full border border-[#c4826e] bg-[#faf6f1]" />
          <span className="h-px w-16 bg-[#c4826e]/30" />
        </div>
      </div>
      <p className="font-display text-xl md:text-2xl font-[500] text-[#3a2519] mb-3 leading-relaxed">
        {title}
      </p>
      {description && (
        <p className="font-body text-sm text-[#7a6050] leading-relaxed max-w-md mx-auto mb-8">
          {description}
        </p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
