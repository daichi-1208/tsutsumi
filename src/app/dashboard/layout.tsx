import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { DashboardNav, MobileTabBar } from "./nav";
import { ScopeBadge } from "./scope-badge";
import { getMyGroups } from "@/lib/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groups = await getMyGroups();

  return (
    <div className="min-h-screen bg-[#faf6f1]">
      <header className="sticky top-0 z-50 bg-[#faf6f1]/85 backdrop-blur-md border-b border-[#e8ddd0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="つつみ"
                width={28}
                height={28}
                className="w-7 h-7 rounded-lg"
              />
              <span className="text-lg font-bold tracking-tight text-[#4a3228]">
                つつみ
              </span>
            </Link>
            <Suspense>
              <DashboardNav />
            </Suspense>
          </div>
          <div className="flex items-center gap-3">
            {groups.length > 0 && (
              <Suspense>
                <ScopeBadge groups={groups} />
              </Suspense>
            )}
            <UserButton />
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-5 py-6 sm:py-8 pb-20 sm:pb-8">
        {children}
      </main>
      <Suspense>
        <MobileTabBar />
      </Suspense>
    </div>
  );
}
