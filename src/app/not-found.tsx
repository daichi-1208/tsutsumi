import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f1] px-5">
      <div className="text-center">
        <Image
          src="/logo.png"
          alt="つつみ"
          width={64}
          height={64}
          className="w-16 h-16 rounded-2xl mx-auto mb-6 opacity-30"
        />
        <p className="text-6xl font-bold text-[#e8ddd0] mb-2">404</p>
        <h1 className="text-xl font-bold text-[#3a2519] mb-2">
          ページが見つかりません
        </h1>
        <p className="text-sm text-[#7a6050] mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="outline" className="border-[#d4c0b0] text-[#7a6050] rounded-full">
              トップへ
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-full">
              ダッシュボードへ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
