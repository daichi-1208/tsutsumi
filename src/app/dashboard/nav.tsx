"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "ホーム", icon: "◉", exact: true },
  { href: "/dashboard/records", label: "記録", icon: "◫", exact: false },
  { href: "/dashboard/contacts", label: "連絡先", icon: "◎", exact: false },
  { href: "/dashboard/settings", label: "設定", icon: "⚙", exact: false },
];

function useGroupParam() {
  const searchParams = useSearchParams();
  return searchParams.get("group");
}

function buildHref(base: string, groupId: string | null) {
  return groupId ? `${base}?group=${groupId}` : base;
}

/* デスクトップ: ヘッダー内の横並びナビ */
export function DashboardNav() {
  const pathname = usePathname();
  const groupId = useGroupParam();

  return (
    <nav className="hidden sm:flex items-center gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={buildHref(item.href, groupId)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              isActive
                ? groupId
                  ? "bg-[#6366a0]/10 text-[#6366a0] font-medium"
                  : "bg-[#c4826e]/10 text-[#c4826e] font-medium"
                : "text-[#7a6050] hover:text-[#3a2519] hover:bg-[#f0e8df]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* モバイル: 画面下部の固定タブバー */
export function MobileTabBar() {
  const pathname = usePathname();
  const groupId = useGroupParam();

  const hideOn = ["/dashboard/records/new"];
  if (hideOn.some((p) => pathname.startsWith(p))) return null;

  const accentColor = groupId ? "#6366a0" : "#c4826e";

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-[#e8ddd0] safe-bottom">
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={buildHref(item.href, groupId)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
                isActive ? "" : "text-[#b0a090]"
              }`}
              style={isActive ? { color: accentColor } : undefined}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <Link
          href={buildHref("/dashboard/records/new", groupId)}
          className="flex flex-col items-center gap-0.5 px-4 py-1"
        >
          <span
            className="w-8 h-8 rounded-full text-white flex items-center justify-center text-lg leading-none shadow-md"
            style={{ backgroundColor: accentColor }}
          >
            +
          </span>
          <span
            className="text-[10px] font-medium"
            style={{ color: accentColor }}
          >
            記録
          </span>
        </Link>
      </div>
    </nav>
  );
}
