"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "ホーム", latin: "Home", num: "壱", exact: true },
  { href: "/dashboard/records", label: "贈答", latin: "Records", num: "弐", exact: false },
  { href: "/dashboard/contacts", label: "連絡先", latin: "Contacts", num: "参", exact: false },
  { href: "/dashboard/settings", label: "設定", latin: "Settings", num: "肆", exact: false },
];

function useGroupParam() {
  const searchParams = useSearchParams();
  return searchParams.get("group");
}

function buildHref(base: string, groupId: string | null) {
  return groupId ? `${base}?group=${groupId}` : base;
}

/* デスクトップ: 水平ナビ(編集誌的な見出し並び) */
export function DashboardNav() {
  const pathname = usePathname();
  const groupId = useGroupParam();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={buildHref(item.href, groupId)}
            className={`group relative px-4 py-2 text-sm transition-colors ${
              isActive
                ? "text-[#3a2519]"
                : "text-[#7a6050] hover:text-[#3a2519]"
            }`}
          >
            <span className="font-body tracking-wide">{item.label}</span>
            {/* アクティブインジケーター */}
            <span
              className={`absolute left-4 right-4 -bottom-px h-px transition-all duration-500 ${
                isActive
                  ? groupId
                    ? "bg-[#6366a0] scale-x-100"
                    : "bg-[#c4826e] scale-x-100"
                  : "bg-transparent scale-x-0"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

/* モバイル: 下部タブバー */
export function MobileTabBar() {
  const pathname = usePathname();
  const groupId = useGroupParam();

  const hideOn = ["/dashboard/records/new"];
  if (hideOn.some((p) => pathname.startsWith(p))) return null;

  const accentColor = groupId ? "#6366a0" : "#c4826e";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#faf6f1]/95 backdrop-blur-md border-t border-[#3a2519]/10 safe-bottom">
      <div className="grid grid-cols-5 items-center h-16">
        {NAV_ITEMS.slice(0, 2).map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={buildHref(item.href, groupId)}
              className="flex flex-col items-center justify-center gap-1 h-full"
              style={isActive ? { color: accentColor } : { color: "#7a6050" }}
            >
              <span className="font-latin text-[9px] italic">{item.latin}</span>
              <span className="font-body text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* 中央: 記録ボタン */}
        <Link
          href={buildHref("/dashboard/records/new", groupId)}
          className="flex flex-col items-center justify-center gap-0.5 h-full"
        >
          <span
            className="w-11 h-11 rounded-full text-white flex items-center justify-center shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 3v10M3 8h10" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-latin text-[9px] italic" style={{ color: accentColor }}>
            new
          </span>
        </Link>

        {NAV_ITEMS.slice(2).map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={buildHref(item.href, groupId)}
              className="flex flex-col items-center justify-center gap-1 h-full"
              style={isActive ? { color: accentColor } : { color: "#7a6050" }}
            >
              <span className="font-latin text-[9px] italic">{item.latin}</span>
              <span className="font-body text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
