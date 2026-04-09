import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecords } from "@/lib/actions";
import { ReturnStatusToggle } from "../return-status-toggle";
import { DeleteRecordButton } from "../delete-record-button";
import { EmptyState } from "@/components/empty-state";

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const records = await getRecords(groupId);
  const accent = groupId ? "#6366a0" : "#c4826e";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#3a2519]">贈答一覧</h1>
        <Link href={`/dashboard/records/new${groupId ? `?group=${groupId}` : ""}`} className="hidden sm:block">
          <Button className="text-white rounded-full px-6" style={{ backgroundColor: accent }}>
            記録する
          </Button>
        </Link>
      </div>

      {records.length === 0 ? (
        <Card className="border-[#efe5da]">
          <CardContent>
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
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#efe5da]">
          <CardContent className="pt-4">
            <div className="space-y-1">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#fef8f3] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        record.type === "RECEIVED"
                          ? groupId ? "bg-[#ededf5] text-[#6366a0]" : "bg-[#fef0ea] text-[#c4826e]"
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
                        {record.eventType}
                        {record.itemName ? ` ・ ${record.itemName}` : ""} ・{" "}
                        {record.date.toLocaleDateString("ja-JP")}
                      </p>
                      {record.memo && (
                        <p className="text-xs text-[#b0a090] mt-0.5">
                          メモ: {record.memo}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium text-sm text-[#3a2519]">
                        {record.amount != null ? `¥${record.amount.toLocaleString()}` : "金額不明"}
                      </p>
                      {record.returnStatus === "COMPLETED" && (
                        <p className="text-xs text-[#4caf50]">お返し済</p>
                      )}
                    </div>
                    {record.returnStatus === "PENDING" && (
                      <ReturnStatusToggle recordId={record.id} />
                    )}
                    <DeleteRecordButton recordId={record.id} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
