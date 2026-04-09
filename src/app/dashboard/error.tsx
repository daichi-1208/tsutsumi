"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-16">
      <p className="text-4xl font-bold text-[#e8ddd0] mb-2">!</p>
      <h1 className="text-lg font-bold text-[#3a2519] mb-2">
        エラーが発生しました
      </h1>
      <p className="text-sm text-[#7a6050] mb-6">
        データの読み込みに失敗しました。
      </p>
      <div className="flex gap-3 justify-center">
        <Button
          onClick={reset}
          variant="outline"
          className="border-[#d4c0b0] text-[#7a6050] rounded-full"
        >
          もう一度試す
        </Button>
        <Link href="/dashboard">
          <Button className="bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-full">
            ダッシュボードへ
          </Button>
        </Link>
      </div>
    </div>
  );
}
