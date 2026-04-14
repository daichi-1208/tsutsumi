import { Suspense } from "react";
import Link from "next/link";
import {
  getPendingReturns,
  getRecords,
  getContacts,
  getMyGroups,
} from "@/lib/actions";
import { ReturnStatusToggle } from "./return-status-toggle";
import { ScopeSwitcher } from "./scope-switcher";
import {
  PageHeader,
  SectionHeader,
  PrimaryButton,
  GhostLink,
  EditorialEmpty,
} from "@/components/editorial";

function formatAmount(value: number | null): string {
  if (value == null) return "—";
  return `¥${value.toLocaleString()}`;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const isGroup = !!groupId;

  // スコープのアクセント
  const accent = isGroup ? "#6366a0" : "#c4826e";

  const [pendingReturns, records, contacts, groups] = await Promise.all([
    getPendingReturns(groupId),
    getRecords(groupId),
    getContacts(groupId),
    getMyGroups(),
  ]);

  const recentRecords = records.slice(0, 5);
  const visibleReturns = pendingReturns.slice(0, 5);

  // サマリー集計
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

  const receivedRecords = records.filter((r) => r.type === "RECEIVED");
  const receivedCash = receivedRecords.filter(
    (r) => r.itemName === "現金" || !r.itemName
  ).length;
  const receivedGoods = receivedRecords.length - receivedCash;

  const givenRecords = records.filter((r) => r.type === "GIVEN");
  const givenCash = givenRecords.filter(
    (r) => r.itemName === "現金" || !r.itemName
  ).length;
  const givenGoods = givenRecords.length - givenCash;

  return (
    <div className="space-y-14 md:space-y-16">
      {/* 章扉 */}
      <PageHeader
        chapter="No. 壱"
        eyebrow="Dashboard"
        title={isGroup ? "ふたりの、" : "わたしの、"}
        accent="お付き合い帳。"
        action={
          <PrimaryButton
            href={`/dashboard/records/new${groupId ? `?group=${groupId}` : ""}`}
            variant="dark"
            size="md"
          >
            記録する
          </PrimaryButton>
        }
      />

      {/* スコープ切り替え (グループがある時のみ) */}
      {groups.length > 0 && (
        <Suspense>
          <ScopeSwitcher groups={groups} />
        </Suspense>
      )}

      {/* サマリー(編集誌のインフォグラ風) */}
      <section>
        <SectionHeader eyebrow="Summary" title="これまでの、やりとり。" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#3a2519]/10">
          {/* いただいた */}
          <div className="bg-[#faf6f1] p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-1 rounded-full bg-[#c4826e]" />
              <span className="font-latin text-[9px] uppercase tracking-[0.25em] text-[#7a6050]">
                Received
              </span>
            </div>
            <p className="font-display text-xs text-[#7a6050] mb-1">いただいた</p>
            <p className="font-latin text-2xl md:text-3xl font-[500] text-[#3a2519] tabular-nums">
              {formatAmount(totalReceived)}
            </p>
            <p className="font-body text-[10px] text-[#7a6050] mt-2">
              {receivedRecords.length} 件 ・ 現金 {receivedCash} / ギフト {receivedGoods}
            </p>
          </div>

          {/* お贈りした */}
          <div className="bg-[#faf6f1] p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-1 rounded-full bg-[#5a9e6f]" />
              <span className="font-latin text-[9px] uppercase tracking-[0.25em] text-[#7a6050]">
                Given
              </span>
            </div>
            <p className="font-display text-xs text-[#7a6050] mb-1">お贈りした</p>
            <p className="font-latin text-2xl md:text-3xl font-[500] text-[#3a2519] tabular-nums">
              {formatAmount(totalGiven)}
            </p>
            <p className="font-body text-[10px] text-[#7a6050] mt-2">
              {givenRecords.length} 件 ・ 現金 {givenCash} / ギフト {givenGoods}
            </p>
          </div>

          {/* お付き合い */}
          <div className="bg-[#faf6f1] p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-1 rounded-full bg-[#3a2519]/50" />
              <span className="font-latin text-[9px] uppercase tracking-[0.25em] text-[#7a6050]">
                Contacts
              </span>
            </div>
            <p className="font-display text-xs text-[#7a6050] mb-1">お付き合い</p>
            <p className="font-latin text-2xl md:text-3xl font-[500] text-[#3a2519] tabular-nums">
              {contacts.length}
              <span className="font-body text-sm text-[#7a6050] ml-1">名</span>
            </p>
          </div>

          {/* お返し達成 */}
          <div className="bg-[#faf6f1] p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span className="font-latin text-[9px] uppercase tracking-[0.25em] text-[#7a6050]">
                Completion
              </span>
            </div>
            <p className="font-display text-xs text-[#7a6050] mb-1">お返し達成</p>
            <div className="flex items-baseline gap-3">
              <p className="font-latin text-2xl md:text-3xl font-[500] text-[#3a2519] tabular-nums">
                {returnRate}
                <span className="font-body text-sm text-[#7a6050] ml-1">%</span>
              </p>
            </div>
            <p className="font-body text-[10px] text-[#7a6050] mt-2">
              {totalReturnsCompleted} / {totalReturnsNeeded} 件完了
            </p>
          </div>
        </div>

        {/* バランスバー */}
        {records.length > 0 && (
          <div className="mt-6 pt-6 border-t border-[#3a2519]/10">
            <div className="flex items-center justify-between gap-4 mb-2 text-xs text-[#7a6050]">
              <span>いただいた {formatAmount(totalReceived)}</span>
              <span>{formatAmount(totalGiven)} お贈りした</span>
            </div>
            <div className="h-[3px] bg-[#3a2519]/10 flex">
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${receivedRatio}%`,
                  backgroundColor: accent,
                }}
              />
              <div
                className="h-full bg-[#5a9e6f] transition-all duration-700"
                style={{ width: `${100 - receivedRatio}%` }}
              />
            </div>
            <p className="mt-3 font-latin text-[10px] italic text-[#7a6050] text-center">
              {totalReceived > totalGiven
                ? `+ ${formatAmount(totalReceived - totalGiven)} 多くいただいています`
                : totalGiven > totalReceived
                  ? `+ ${formatAmount(totalGiven - totalReceived)} 多くお贈りしています`
                  : "balance"}
            </p>
          </div>
        )}
      </section>

      {/* お返し未済 */}
      <section>
        <SectionHeader
          eyebrow={`Pending · ${pendingReturns.length}`}
          title="お返しを、お忘れなく。"
          action={
            pendingReturns.length > 5 ? (
              <GhostLink href="/dashboard/returns">すべて見る</GhostLink>
            ) : null
          }
        />

        {pendingReturns.length === 0 ? (
          <EditorialEmpty
            title="お返し未済は、ございません。"
            description="お付き合いは、すべて整っています。"
          />
        ) : (
          <div className="space-y-0">
            {visibleReturns.map((record, i) => {
              const daysLeft = record.returnDueDate
                ? Math.ceil(
                    (record.returnDueDate.getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24)
                  )
                : null;

              const daysLabel =
                daysLeft === null
                  ? null
                  : daysLeft < 0
                    ? `${Math.abs(daysLeft)}日超過`
                    : `あと${daysLeft}日`;
              const daysColor =
                daysLeft === null
                  ? "text-[#7a6050]"
                  : daysLeft < 0
                    ? "text-red-600"
                    : daysLeft <= 7
                      ? "text-orange-600"
                      : "text-[#c4826e]";

              return (
                <div
                  key={record.id}
                  className="group grid grid-cols-12 gap-3 py-5 border-b border-[#3a2519]/12"
                >
                  <div className="col-span-1 font-latin text-[11px] text-[#7a6050] pt-1 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-7 md:col-span-8">
                    <p className="font-display text-base md:text-lg font-[500] text-[#3a2519] leading-snug">
                      {record.contact.name}
                    </p>
                    <p className="font-body text-xs text-[#7a6050] mt-1">
                      {record.eventType}
                      {record.amount != null
                        ? ` ・ ${formatAmount(record.amount)}`
                        : ""}
                      {record.returnAmount
                        ? ` ・ お返し目安 ${formatAmount(record.returnAmount)}`
                        : ""}
                    </p>
                    {(record.itemName || record.memo) && (
                      <p className="font-body text-[10px] text-[#b0a090] mt-1">
                        {record.itemName && <>品名: {record.itemName}</>}
                        {record.itemName && record.memo && " ／ "}
                        {record.memo && <>メモ: {record.memo}</>}
                      </p>
                    )}
                  </div>
                  <div className="col-span-4 md:col-span-3 flex flex-col items-end justify-center gap-2">
                    {daysLabel && (
                      <span
                        className={`font-latin text-[11px] italic tabular-nums ${daysColor}`}
                      >
                        {daysLabel}
                      </span>
                    )}
                    <ReturnStatusToggle recordId={record.id} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 最近の記録 */}
      <section>
        <SectionHeader
          eyebrow="Recent records"
          title="最近の、記録。"
          action={
            records.length > 5 ? (
              <GhostLink
                href={`/dashboard/records${groupId ? `?group=${groupId}` : ""}`}
              >
                すべて見る
              </GhostLink>
            ) : null
          }
        />

        {recentRecords.length === 0 ? (
          <EditorialEmpty
            title="まだ、記録がありません。"
            description="最初の一件を、丁寧に残しましょう。"
            action={
              <PrimaryButton
                href={`/dashboard/records/new${groupId ? `?group=${groupId}` : ""}`}
                variant="dark"
              >
                最初の記録
              </PrimaryButton>
            }
          />
        ) : (
          <div>
            {recentRecords.map((record, i) => (
              <div
                key={record.id}
                className="group grid grid-cols-12 gap-3 py-5 border-b border-[#3a2519]/12 hover:bg-[#fef8f3]/60 transition-colors"
              >
                <div className="col-span-1 font-latin text-[11px] text-[#7a6050] pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-8 flex items-start gap-3">
                  <span
                    className={`font-display text-xs font-medium px-2 py-0.5 mt-0.5 shrink-0 ${
                      record.type === "RECEIVED"
                        ? "bg-[#c4826e]/10 text-[#c4826e]"
                        : "bg-[#5a9e6f]/10 text-[#5a9e6f]"
                    }`}
                  >
                    {record.type === "RECEIVED" ? "受" : "贈"}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-base font-[500] text-[#3a2519]">
                      {record.contact.name}
                    </p>
                    <p className="font-body text-xs text-[#7a6050] mt-0.5">
                      {record.eventType} ・{" "}
                      <span className="font-latin italic">
                        {record.date.toLocaleDateString("ja-JP")}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-span-3 flex items-center justify-end">
                  <span className="font-latin text-sm font-[500] text-[#3a2519] tabular-nums">
                    {record.amount != null
                      ? formatAmount(record.amount)
                      : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
