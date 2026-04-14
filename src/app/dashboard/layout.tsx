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
    <div className="relative min-h-screen bg-[#faf6f1] text-[#3a2519] font-body">
      {/* 紙目のグレイン */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.04] mix-blend-multiply paper-grain"
      />

      {/* Header: editorial masthead */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#faf6f1]/80 border-b border-[#3a2519]/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-3 group shrink-0">
            <Image
              src="/logo.webp"
              alt="つつみ"
              width={32}
              height={32}
              className="w-8 h-8 rounded-md"
            />
            <span className="font-display text-lg tracking-[0.18em] text-[#3a2519] group-hover:text-[#c4826e] transition-colors">
              つつみ
            </span>
          </Link>

          <Suspense>
            <DashboardNav />
          </Suspense>

          <div className="flex items-center gap-3">
            {groups.length > 0 && (
              <Suspense>
                <ScopeBadge groups={groups} />
              </Suspense>
            )}
            <div className="h-6 w-px bg-[#3a2519]/15 hidden sm:block" />
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-1 ring-[#3a2519]/10",
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-14 pb-28 sm:pb-14">
        {children}
      </main>

      <Suspense>
        <MobileTabBar />
      </Suspense>
    </div>
  );
}
