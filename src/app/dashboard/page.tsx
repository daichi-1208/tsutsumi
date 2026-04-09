import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPendingReturns, getRecords, getContacts, getMyGroups } from "@/lib/actions";
import { ReturnStatusToggle } from "./return-status-toggle";
import { EmptyState } from "@/components/empty-state";
import { ScopeSwitcher } from "./scope-switcher";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const isGroup = !!groupId;

  // テーマカラー
  const accent = isGroup ? "#6366a0" : "#c4826e";
  const accentDark = isGroup ? "#4f5280" : "#a0634f";
  const accentBg = isGroup ? "#ededf5" : "#fef0ea";
  const gradientFrom = isGroup ? "#6366a0" : "#c4826e";
  const gradientTo = isGroup ? "#4f5280" : "#a0634f";

  const [pendingReturns, records, contacts, groups] = await Promise.all([
    getPendingReturns(groupId),
    getRecords(groupId),
    getContacts(groupId),
    getMyGroups(),
  ]);

  const recentRecords = records.slice(0, 5);
  const visibleReturns = pendingReturns.slice(0, 5);

  // サマリー計算
  const totalReceived = records
    .filter((r) => r.type === "RECEIVED")
    .reduce((sum, r) => sum + (r.amount ?? 0), 0);
  const totalGiven = records
    .filter((r) => r.type === "GIVEN")
    .reduce((sum, r) => sum + (r.amount ?? 0), 0);
  const totalReturnsNeeded = records.filter(
    (r) => r.type === "RECEIVED" && r.returnStatus !== "NOT_NEEDED"
  ).length;
  const totalReturnsCompleted = records.filter(
    (r) => r.type === "RECEIVED" && r.returnStatus === "COMPLETED"
  ).length;
  const returnRate =
    totalReturnsNeeded > 0
      ? Math.round((totalReturnsCompleted / totalReturnsNeeded) * 100)
      : 100;
  const balanceTotal = totalReceived + totalGiven || 1;
  const receivedRatio = Math.round((totalReceived / balanceTotal) * 100);

  // 品目内訳（現金 / ギフト）
  const receivedRecords = records.filter((r) => r.type === "RECEIVED");
  const receivedCash = receivedRecords.filter((r) => r.itemName === "現金" || !r.itemName).length;
  const receivedGoods = receivedRecords.length - receivedCash;

  const givenRecords = records.filter((r) => r.type === "GIVEN");
  const givenCash = givenRecords.filter((r) => r.itemName === "現金" || !r.itemName).length;
  const givenGoods = givenRecords.length - givenCash;

  return (
    <div className="space-y-6">
      {/* スコープ切り替え（ダッシュボードのみ） */}
      {groups.length > 0 && (
        <Suspense>
          <ScopeSwitcher groups={groups} />
        </Suspense>
      )}

      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#3a2519]">
          {isGroup ? "グループ" : "ダッシュボード"}
        </h1>
        <Link
          href={`/dashboard/records/new${groupId ? `?group=${groupId}` : ""}`}
          className="hidden sm:block"
        >
          <Button
            className="text-white rounded-full px-6"
            style={{ backgroundColor: accent }}
          >
            記録する
          </Button>
        </Link>
      </div>

      {/* サマリー */}
      <div className="grid grid-cols-2 gap-3">
        {/* いただいた — グラデーション背景 */}
        <div
          className="relative overflow-hidden rounded-2xl p-4 text-white"
          style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
        >
          <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-white/10" />
          <div className="absolute -right-1 -bottom-4 w-10 h-10 rounded-full bg-white/5" />
          <div className="relative">
            <div className="flex items-center gap-1.5 mb-2">
              <svg viewBox="0 0 20 20" className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3l-7 7h4v7h6v-7h4z" />
              </svg>
              <p className="text-[10px] font-medium opacity-70 uppercase tracking-wider">いただいた</p>
            </div>
            <p className="text-2xl font-bold">
              ¥{totalReceived.toLocaleString()}
            </p>
            <p className="text-[10px] mt-1 opacity-60">
              {records.filter((r) => r.type === "RECEIVED").length}件
            </p>
            {receivedRecords.length > 0 && (
              <div className="flex gap-1.5 mt-2">
                {receivedCash > 0 && (
                  <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded-full">
                    現金 {receivedCash}
                  </span>
                )}
                {receivedGoods > 0 && (
                  <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded-full">
                    ギフト {receivedGoods}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* お贈りした — グラデーション背景 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5a9e6f] to-[#3d7a52] p-4 text-white">
          <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-white/10" />
          <div className="absolute -right-1 -bottom-4 w-10 h-10 rounded-full bg-white/5" />
          <div className="relative">
            <div className="flex items-center gap-1.5 mb-2">
              <svg viewBox="0 0 20 20" className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 17l7-7h-4V3H7v7H3z" />
              </svg>
              <p className="text-[10px] font-medium opacity-70 uppercase tracking-wider">お贈りした</p>
            </div>
            <p className="text-2xl font-bold">
              ¥{totalGiven.toLocaleString()}
            </p>
            <p className="text-[10px] mt-1 opacity-60">
              {records.filter((r) => r.type === "GIVEN").length}件
            </p>
            {givenRecords.length > 0 && (
              <div className="flex gap-1.5 mt-2">
                {givenCash > 0 && (
                  <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded-full">
                    現金 {givenCash}
                  </span>
                )}
                {givenGoods > 0 && (
                  <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded-full">
                    ギフト {givenGoods}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* バランス + お付き合い人数 */}
        <Card className="border-[#efe5da] rounded-2xl">
          <CardContent className="pt-4 pb-4 px-4">
            <div className="flex items-center gap-1.5 mb-3">
              <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#b0a090]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="8" r="3" />
                <circle cx="13" cy="8" r="3" />
                <path d="M2 17c0-3 2.5-5 5-5s5 2 5 5M8 17c0-3 2.5-5 5-5s5 2 5 5" />
              </svg>
              <p className="text-[10px] font-medium text-[#b0a090] uppercase tracking-wider">お付き合い</p>
            </div>
            <p className="text-2xl font-bold text-[#3a2519]">
              {contacts.length}<span className="text-sm font-normal text-[#b0a090] ml-0.5">人</span>
            </p>
            {/* ミニバランスバー */}
            {records.length > 0 && (
              <div className="mt-3 space-y-1">
                <div className="h-1.5 rounded-full bg-[#efe5da] overflow-hidden flex">
                  <div
                    className="h-full transition-all"
                    style={{ backgroundColor: accent, width: `${receivedRatio}%`, borderRadius: receivedRatio === 100 ? "9999px" : "9999px 0 0 9999px" }}
                  />
                  <div
                    className="h-full bg-[#5a9e6f] transition-all"
                    style={{ width: `${100 - receivedRatio}%`, borderRadius: receivedRatio === 0 ? "9999px" : "0 9999px 9999px 0" }}
                  />
                </div>
                <p className="text-[10px] text-[#b0a090]">
                  {totalReceived > totalGiven
                    ? `¥${(totalReceived - totalGiven).toLocaleString()} 多くいただいています`
                    : totalGiven > totalReceived
                      ? `¥${(totalGiven - totalReceived).toLocaleString()} 多くお贈りしています`
                      : "バランスが取れています"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* お返し達成率 — 大きなリング */}
        <Card className="border-[#efe5da] rounded-2xl">
          <CardContent className="pt-4 pb-4 px-4">
            <div className="flex items-center gap-1.5 mb-2">
              <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#b0a090]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z" />
                <path d="M7 10l2 2 4-4" />
              </svg>
              <p className="text-[10px] font-medium text-[#b0a090] uppercase tracking-wider">お返し達成</p>
            </div>
            <div className="flex items-center gap-3">
              {/* リングチャート */}
              <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#efe5da" strokeWidth="5" />
                <circle
                  cx="28" cy="28" r="22" fill="none"
                  stroke={returnRate === 100 ? "#5a9e6f" : accent}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${returnRate * 1.382} 138.2`}
                  transform="rotate(-90 28 28)"
                />
                <text
                  x="28" y="30"
                  textAnchor="middle"
                  className="text-xs font-bold"
                  fill="#3a2519"
                >
                  {returnRate}%
                </text>
              </svg>
              <div className="text-[10px] text-[#7a6050] space-y-0.5">
                <p>{totalReturnsCompleted} / {totalReturnsNeeded} 件完了</p>
                {pendingReturns.length > 0 && (
                  <p className="text-[#c4826e] font-medium">
                    {pendingReturns.length}件が未済
                  </p>
                )}
                {returnRate === 100 && totalReturnsNeeded > 0 && (
                  <p className="text-[#5a9e6f] font-medium">すべて完了!</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* お返し未済 */}
      <Card className="border-[#efe5da]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-[#3a2519]">
              お返し未済
            </CardTitle>
            <div className="flex items-center gap-2">
              {pendingReturns.length > 0 && (
                <Badge className="text-white" style={{ backgroundColor: accent }}>
                  {pendingReturns.length}件
                </Badge>
              )}
              {pendingReturns.length > 5 && (
                <Link
                  href="/dashboard/returns"
                  className="text-sm text-[#c4826e] hover:underline"
                >
                  すべて見る
                </Link>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {pendingReturns.length === 0 ? (
            <p className="text-sm text-[#7a6050]">
              お返しが必要な記録はありません
            </p>
          ) : (
            <div className="space-y-3">
              {visibleReturns.map((record) => {
                const daysLeft = record.returnDueDate
                  ? Math.ceil(
                      (record.returnDueDate.getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    )
                  : null;

                return (
                  <div
                    key={record.id}
                    className="p-3 bg-[#fef8f3] rounded-xl border border-[#f5ede5]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-[#3a2519] text-sm">
                          {record.contact.name}
                        </p>
                        <p className="text-xs text-[#7a6050] mt-0.5">
                          {record.eventType}
                          {record.amount != null ? ` ・ ¥${record.amount.toLocaleString()}` : ""}
                        </p>
                      </div>
                      {daysLeft !== null && (
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${
                            daysLeft < 0
                              ? "bg-red-100 text-red-700"
                              : daysLeft <= 7
                                ? "bg-orange-100 text-orange-700"
                                : "bg-[#fef0ea] text-[#c4826e]"
                          }`}
                        >
                          {daysLeft < 0
                            ? `${Math.abs(daysLeft)}日超過`
                            : `あと${daysLeft}日`}
                        </span>
                      )}
                    </div>
                    {record.returnAmount && (
                      <p className="text-xs text-[#c4826e] mt-1.5">
                        お返し目安: ¥{record.returnAmount.toLocaleString()}
                      </p>
                    )}
                    {(record.itemName || record.memo) && (
                      <p className="text-xs text-[#b0a090] mt-1">
                        {record.itemName && <>品名: {record.itemName}</>}
                        {record.itemName && record.memo && " ／ "}
                        {record.memo && <>メモ: {record.memo}</>}
                      </p>
                    )}
                    <div className="mt-2 flex justify-end">
                      <ReturnStatusToggle recordId={record.id} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 直近の記録 */}
      <Card className="border-[#efe5da]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-[#3a2519]">
              最近の記録
            </CardTitle>
            {records.length > 5 && (
              <Link
                href="/dashboard/records"
                className="text-sm text-[#c4826e] hover:underline"
              >
                すべて見る
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {recentRecords.length === 0 ? (
            <EmptyState message="まだ贈答記録がありません">
              <Link href={`/dashboard/records/new${groupId ? `?group=${groupId}` : ""}`}>
                <Button
                  variant="outline"
                  className="rounded-full"
                  style={{ borderColor: accent, color: accent }}
                >
                  最初の記録をつける
                </Button>
              </Link>
            </EmptyState>
          ) : (
            <div className="space-y-2">
              {recentRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#fef8f3] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        record.type === "RECEIVED"
                          ? isGroup ? "bg-[#ededf5] text-[#6366a0]" : "bg-[#fef0ea] text-[#c4826e]"
                          : "bg-[#e8f5e9] text-[#4caf50]"
                      }`}
                    >
                      {record.type === "RECEIVED" ? "受" : "贈"}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[#3a2519]">
                        {record.contact.name}
                      </p>
                      <p className="text-xs text-[#7a6050]">
                        {record.eventType} ・{" "}
                        {record.date.toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium text-sm text-[#3a2519]">
                    {record.amount != null ? `¥${record.amount.toLocaleString()}` : "金額不明"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
