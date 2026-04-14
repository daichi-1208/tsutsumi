"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Group = {
  id: string;
  name: string;
};

export function ScopeBadge({ groups }: { groups: Group[] }) {
  const searchParams = useSearchParams();
  const activeGroupId = searchParams.get("group");
  const activeGroup = groups.find((g) => g.id === activeGroupId);

  if (!activeGroup) return null;

  return (
    <Link
      href="/dashboard"
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#6366a0]/30 text-[#6366a0] hover:bg-[#6366a0]/5 transition-colors"
      title="ダッシュボードで切り替え"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#6366a0]" />
      <span className="font-latin text-[9px] italic uppercase tracking-widest">Group</span>
      <span className="h-4 w-px bg-[#6366a0]/30" />
      <span className="font-body text-xs font-medium">{activeGroup.name}</span>
    </Link>
  );
}
