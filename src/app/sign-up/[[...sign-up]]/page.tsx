import Link from "next/link";
import Image from "next/image";
import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const { redirect_url } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <div className="px-5 pt-5">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#c4826e] hover:underline">
          <Image src="/logo.png" alt="つつみ" width={20} height={20} className="w-5 h-5 rounded" />
          トップに戻る
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <SignUp fallbackRedirectUrl={redirect_url || "/dashboard"} />
      </div>
    </div>
  );
}
