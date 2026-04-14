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

  function buildHref(groupId: string | null) {
    if (pathname.startsWith("/dashboard/settings")) return pathname;
    if (!groupId) return pathname;
    return `${pathname}?group=${groupId}`;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
          Switch view
        </span>
        <span className="h-px flex-1 bg-[#3a2519]/10" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* パーソナル */}
        <Link
          href={buildHref(null)}
          className={`group relative flex items-center gap-3 px-4 py-3.5 border transition-all duration-300 ${
            !activeGroup
              ? "border-[#c4826e] bg-[#c4826e]/5"
              : "border-[#3a2519]/15 bg-white/60 hover:border-[#3a2519]/30"
          }`}
        >
          <span
            className={`w-8 h-8 flex items-center justify-center font-display text-sm font-[500] shrink-0 ${
              !activeGroup ? "bg-[#c4826e] text-[#faf6f1]" : "bg-[#3a2519]/5 text-[#3a2519]"
            }`}
          >
            私
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-body text-sm font-medium text-[#3a2519] truncate">
              わたしの記録
            </p>
            <p className="font-latin text-[10px] italic text-[#7a6050] mt-0.5">
              Personal
            </p>
          </div>
          {!activeGroup && (
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#c4826e]" />
          )}
        </Link>

        {/* グループ */}
        {groups.map((group) => (
          <Link
            key={group.id}
            href={`${pathname}?group=${group.id}`}
            className={`group relative flex items-center gap-3 px-4 py-3.5 border transition-all duration-300 ${
              activeGroup === group.id
                ? "border-[#6366a0] bg-[#6366a0]/5"
                : "border-[#3a2519]/15 bg-white/60 hover:border-[#3a2519]/30"
            }`}
          >
            <span
              className={`w-8 h-8 flex items-center justify-center font-display text-sm font-[500] shrink-0 ${
                activeGroup === group.id ? "bg-[#6366a0] text-[#faf6f1]" : "bg-[#3a2519]/5 text-[#3a2519]"
              }`}
            >
              {group.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm font-medium text-[#3a2519] truncate">
                {group.name}
              </p>
              <p className="font-latin text-[10px] italic text-[#7a6050] mt-0.5">
                {group.members.length} members
              </p>
            </div>
            {activeGroup === group.id && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#6366a0]" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
