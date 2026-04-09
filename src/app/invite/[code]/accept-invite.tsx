"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { joinGroup } from "@/lib/actions";

export function AcceptInvite({ inviteCode }: { inviteCode: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleAccept() {
    startTransition(async () => {
      await joinGroup(inviteCode);
      router.push("/dashboard");
    });
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleAccept}
        disabled={isPending}
        className="w-full bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-xl h-12"
      >
        {isPending ? "参加中..." : "参加する"}
      </Button>
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard")}
        className="w-full border-[#d4c0b0] text-[#7a6050] rounded-xl"
      >
        スキップ
      </Button>
    </div>
  );
}
