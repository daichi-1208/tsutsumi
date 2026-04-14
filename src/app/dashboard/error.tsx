"use client";

import Link from "next/link";
import { PrimaryButton, GhostLink } from "@/components/editorial";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20 text-center">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          <span className="h-px w-16 bg-[#c4826e]/40" />
          <span className="font-display text-2xl text-[#c4826e] italic">!</span>
          <span className="h-px w-16 bg-[#c4826e]/40" />
        </div>
      </div>
      <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e] mb-3">
        Error
      </p>
      <h1 className="font-display text-2xl md:text-3xl font-[500] text-[#3a2519] mb-3">
        すこし、ずれています。
      </h1>
      <p className="font-body text-sm text-[#7a6050] leading-relaxed mb-8 max-w-sm mx-auto">
        データの読み込みに失敗しました。
        <br />
        少し経ってから、もう一度お試しください。
      </p>
      <div className="flex items-center justify-center gap-6">
        <PrimaryButton onClick={reset} variant="dark">
          もう一度試す
        </PrimaryButton>
        <GhostLink href="/dashboard">ホームへ戻る</GhostLink>
      </div>
    </div>
  );
}
