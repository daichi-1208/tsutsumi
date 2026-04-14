"use client";

import { useState, useTransition } from "react";
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
    <div>
      <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e] mb-3">
        Invite link
      </p>
      <p className="font-body text-xs text-[#7a6050] leading-relaxed mb-4">
        パートナーにこのリンクを送って、一緒に管理しましょう。
      </p>

      <div className="flex items-stretch gap-0 mb-3">
        <div className="flex-1 bg-white border border-[#3a2519]/20 px-4 py-2.5 font-latin text-[11px] text-[#7a6050] truncate tabular-nums">
          {inviteUrl}
        </div>
        <button
          onClick={handleCopy}
          className={`shrink-0 px-5 py-2.5 -ml-px border font-body text-xs font-medium transition-colors ${
            copied
              ? "bg-[#5a9e6f] text-[#faf6f1] border-[#5a9e6f]"
              : "bg-[#3a2519] text-[#faf6f1] border-[#3a2519] hover:bg-[#c4826e] hover:border-[#c4826e]"
          }`}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <button
        onClick={handleRegenerate}
        disabled={isPending}
        className="font-latin text-[10px] italic text-[#b0a090] hover:text-[#7a6050] transition-colors"
      >
        {isPending ? "Regenerating..." : "→ Regenerate link"}
      </button>
    </div>
  );
}
