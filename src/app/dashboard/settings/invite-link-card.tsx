"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { regenerateInviteCode } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function InviteLinkCard({
  inviteCode,
  groupId,
}: {
  inviteCode: string;
  groupId: string;
}) {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const inviteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/invite/${inviteCode}`
      : `/invite/${inviteCode}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRegenerate() {
    startTransition(async () => {
      await regenerateInviteCode(groupId);
      router.refresh();
    });
  }

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium text-[#b0a090] uppercase tracking-wider">
        招待リンク
      </p>
      <p className="text-xs text-[#7a6050]">
        パートナーにこのリンクを送って、一緒に管理しましょう。
      </p>
      <div className="flex gap-2">
        <div className="flex-1 bg-white rounded-lg px-3 py-2 text-xs text-[#7a6050] truncate border border-[#e8ddd0]">
          {inviteUrl}
        </div>
        <Button
          onClick={handleCopy}
          size="sm"
          className={`shrink-0 rounded-xl ${
            copied
              ? "bg-[#5a9e6f] hover:bg-[#5a9e6f] text-white"
              : "bg-[#c4826e] hover:bg-[#a0634f] text-white"
          }`}
        >
          {copied ? "コピー済み" : "コピー"}
        </Button>
      </div>
      <button
        onClick={handleRegenerate}
        disabled={isPending}
        className="text-[10px] text-[#b0a090] hover:text-[#7a6050] transition-colors"
      >
        {isPending ? "再生成中..." : "リンクを再生成する"}
      </button>
    </div>
  );
}
