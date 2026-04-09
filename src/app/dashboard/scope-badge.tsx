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
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ededf5] text-[#6366a0] text-xs font-medium hover:bg-[#ddddf0] transition-colors"
      title="ダッシュボードで切り替え"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#6366a0]" />
      {activeGroup.name}
    </Link>
  );
}
