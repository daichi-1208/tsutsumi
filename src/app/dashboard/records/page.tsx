import { getRecords } from "@/lib/actions";
import { ReturnStatusToggle } from "../return-status-toggle";
import { DeleteRecordButton } from "../delete-record-button";
import {
  PageHeader,
  PrimaryButton,
  EditorialEmpty,
} from "@/components/editorial";

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const records = await getRecords(groupId);

  return (
    <div>
      <PageHeader
        chapter="No. 弐"
        eyebrow="Records"
        title="贈答、"
        accent="すべての記録。"
        description={`全${records.length}件のやりとりが記されています。`}
        action={
          <PrimaryButton
            href={`/dashboard/records/new${groupId ? `?group=${groupId}` : ""}`}
            variant="dark"
          >
            記録する
          </PrimaryButton>
        }
      />

      {records.length === 0 ? (
        <EditorialEmpty
          title="まだ、記録がありません。"
          description="最初の贈答を、丁寧に記しましょう。"
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
        <div className="border-t border-[#3a2519]/20">
          {records.map((record, i) => {
            const isReturn = !!record.returnForId;
            return (
            <div
              key={record.id}
              className={`group grid grid-cols-12 gap-3 md:gap-4 py-5 md:py-6 border-b border-[#3a2519]/12 hover:bg-[#fef8f3]/60 transition-colors ${isReturn ? "bg-[#fef8f3]/30" : ""}`}
            >
              <div className="col-span-1 font-latin text-[11px] text-[#7a6050] pt-1 tabular-nums">
                {isReturn ? "↳" : String(i + 1).padStart(3, "0")}
              </div>
              <div className={`col-span-7 md:col-span-6 flex items-start gap-3 ${isReturn ? "md:pl-4" : ""}`}>
                <span
                  className={`font-display text-xs font-medium px-2 py-0.5 mt-0.5 shrink-0 ${
                    record.type === "RECEIVED"
                      ? "bg-[#c4826e]/10 text-[#c4826e]"
                      : "bg-[#5a9e6f]/10 text-[#5a9e6f]"
                  }`}
                >
                  {record.type === "RECEIVED" ? "受" : "贈"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base md:text-lg font-[500] text-[#3a2519] leading-snug">
                    {isReturn && (
                      <span className="font-latin text-[10px] italic uppercase tracking-wider text-[#c4826e] mr-2">
                        Return ·
                      </span>
                    )}
                    {record.contact.name}
                  </p>
                  <p className="font-body text-[11px] md:text-xs text-[#7a6050] mt-1">
                    {record.eventType}
                    {isReturn && "のお返し"}
                    {record.itemName ? ` ・ ${record.itemName}` : ""}
                    {" ・ "}
                    <span className="font-latin italic">
                      {record.date.toLocaleDateString("ja-JP")}
                    </span>
                  </p>
                  {record.memo && (
                    <p className="font-body text-[10px] text-[#b0a090] mt-1">
                      メモ: {record.memo}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-4 md:col-span-5 flex items-start justify-end gap-2 md:gap-4">
                <div className="text-right">
                  <p className="font-latin text-sm md:text-base font-[500] text-[#3a2519] tabular-nums">
                    {record.amount != null
                      ? `¥${record.amount.toLocaleString()}`
                      : "金額不明"}
                  </p>
                  {!isReturn && record.returnStatus === "COMPLETED" && (
                    <p className="font-latin text-[10px] italic text-[#5a9e6f] mt-0.5">
                      returned
                    </p>
                  )}
                  {!isReturn && record.returnStatus === "PENDING" && (
                    <p className="font-latin text-[10px] italic text-[#c4826e] mt-0.5">
                      pending
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {!isReturn && record.returnStatus === "PENDING" && (
                    <ReturnStatusToggle recordId={record.id} />
                  )}
                  <DeleteRecordButton recordId={record.id} />
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
