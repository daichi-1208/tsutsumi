"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f1] px-5">
      <div className="text-center">
        <Image
          src="/logo.webp"
          alt="つつみ"
          width={64}
          height={64}
          className="w-16 h-16 rounded-2xl mx-auto mb-6 opacity-30"
        />
        <h1 className="text-xl font-bold text-[#3a2519] mb-2">
          エラーが発生しました
        </h1>
        <p className="text-sm text-[#7a6050] mb-8">
          申し訳ございません。しばらくしてからもう一度お試しください。
        </p>
        <Button
          onClick={reset}
          className="bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-full"
        >
          もう一度試す
        </Button>
      </div>
    </div>
  );
}
