"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

type Group = {
  id: string;
  name: string;
  members: { user: { name: string } }[];
};

export function ScopeSwitcher({ groups }: { groups: Group[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeGroup = searchParams.get("group");

  if (groups.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#efe5da] p-2 shadow-sm">
      <div className="flex items-center gap-2 mb-2 px-2 pt-1">
        <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#b0a090]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3M10 14H6M10 10H8M16 3l-6 6" />
        </svg>
        <span className="text-[11px] font-medium text-[#b0a090]">表示を切り替え</span>
      </div>
      <div className="flex gap-1.5">
        {/* パーソナル */}
        <Link
          href={pathname}
          className={`flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
            !activeGroup
              ? "bg-[#c4826e] text-white shadow-sm"
              : "bg-[#faf6f1] text-[#7a6050] hover:bg-[#f5ede5]"
          }`}
        >
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
            !activeGroup ? "bg-white/20" : "bg-[#c4826e]/10 text-[#c4826e]"
          }`}>
            私
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">わたしの記録</p>
            <p className={`text-[10px] ${!activeGroup ? "text-white/60" : "text-[#b0a090]"}`}>
              パーソナル
            </p>
          </div>
        </Link>

        {/* グループ */}
        {groups.map((group) => (
          <Link
            key={group.id}
            href={`${pathname}?group=${group.id}`}
            className={`flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
              activeGroup === group.id
                ? "bg-[#6366a0] text-white shadow-sm"
                : "bg-[#faf6f1] text-[#7a6050] hover:bg-[#f5ede5]"
            }`}
          >
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
              activeGroup === group.id ? "bg-white/20" : "bg-[#6366a0]/10 text-[#6366a0]"
            }`}>
              {group.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{group.name}</p>
              <p className={`text-[10px] ${activeGroup === group.id ? "text-white/60" : "text-[#b0a090]"}`}>
                {group.members.length}人で共有
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
