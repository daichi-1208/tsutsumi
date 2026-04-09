import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPendingReturns } from "@/lib/actions";
import { ReturnStatusToggle } from "../return-status-toggle";

export default async function ReturnsPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const pendingReturns = await getPendingReturns(groupId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-xs text-[#c4826e] hover:underline"
          >
            ← ダッシュボード
          </Link>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold text-[#3a2519]">お返し未済</h1>
            {pendingReturns.length > 0 && (
              <Badge className="bg-[#c4826e] text-white">
                {pendingReturns.length}件
              </Badge>
            )}
          </div>
        </div>
      </div>

      {pendingReturns.length === 0 ? (
        <Card className="border-[#efe5da]">
          <CardContent className="py-12 text-center">
            <p className="text-[#7a6050]">
              お返しが必要な記録はありません
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#efe5da]">
          <CardContent className="pt-4">
            <div className="space-y-3">
              {pendingReturns.map((record) => {
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
                          {record.amount != null
                            ? ` ・ ¥${record.amount.toLocaleString()}`
                            : ""}
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
