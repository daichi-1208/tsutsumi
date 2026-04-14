import Link from "next/link";
import { getPendingReturns } from "@/lib/actions";
import { ReturnStatusToggle } from "../return-status-toggle";
import { PageHeader, EditorialEmpty } from "@/components/editorial";

export default async function ReturnsPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const pendingReturns = await getPendingReturns(groupId);

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 font-latin text-[10px] uppercase tracking-[0.2em] text-[#c4826e] mb-6"
      >
        <svg
          viewBox="0 0 16 16"
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M13 8H3M7 4L3 8l4 4" />
        </svg>
        Back to dashboard
      </Link>

      <PageHeader
        chapter={`No. 返 · ${pendingReturns.length}`}
        eyebrow="Pending returns"
        title="お返し、"
        accent="未済の方々。"
        description="期限が近づいたものから順に並んでいます。"
      />

      {pendingReturns.length === 0 ? (
        <EditorialEmpty
          title="未済は、ございません。"
          description="すべてのお付き合いが、整っています。"
        />
      ) : (
        <div className="border-t border-[#3a2519]/20">
          {pendingReturns.map((record, i) => {
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
                className="grid grid-cols-12 gap-3 md:gap-4 py-5 md:py-7 border-b border-[#3a2519]/12"
              >
                <div className="col-span-1 font-latin text-[11px] text-[#7a6050] pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-7 md:col-span-8">
                  <p className="font-display text-lg md:text-xl font-[500] text-[#3a2519]">
                    {record.contact.name}
                  </p>
                  <p className="font-body text-xs text-[#7a6050] mt-1">
                    {record.eventType}
                    {record.amount != null
                      ? ` ・ ¥${record.amount.toLocaleString()}`
                      : ""}
                  </p>
                  {record.returnAmount && (
                    <p className="font-latin text-xs italic text-[#c4826e] mt-1">
                      お返し目安 ¥{record.returnAmount.toLocaleString()}
                    </p>
                  )}
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
                      className={`font-latin text-xs italic tabular-nums ${daysColor}`}
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
    </div>
  );
}
