import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContact } from "@/lib/actions";
import { EditContactForm } from "./edit-contact-form";
import { DeleteContactButton } from "./delete-contact-button";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await getContact(id);

  if (!contact) notFound();

  const totalReceived = contact.records
    .filter((r) => r.type === "RECEIVED")
    .reduce((sum, r) => sum + (r.amount ?? 0), 0);
  const totalGiven = contact.records
    .filter((r) => r.type === "GIVEN")
    .reduce((sum, r) => sum + (r.amount ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/contacts"
            className="text-xs text-[#c4826e] hover:underline"
          >
            ← 連絡先一覧
          </Link>
          <h1 className="text-2xl font-bold text-[#3a2519] mt-1">
            {contact.name}
          </h1>
          <p className="text-sm text-[#7a6050]">
            {[
              contact.relationship,
              contact.gender === "male" ? "男性" : contact.gender === "female" ? "女性" : null,
            ].filter(Boolean).join(" ・ ") || ""}
          </p>
          {contact.memo && (
            <p className="text-xs text-[#b0a090] mt-1">メモ: {contact.memo}</p>
          )}
        </div>
        <Link href="/dashboard/records/new">
          <Button className="bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-full px-6">
            記録する
          </Button>
        </Link>
      </div>

      {/* 編集 */}
      <EditContactForm contact={contact} />

      {/* サマリー */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-[#efe5da]">
          <CardContent className="pt-5 text-center">
            <p className="text-xs text-[#7a6050] mb-1">いただいた合計</p>
            <p className="text-xl font-bold text-[#c4826e]">
              ¥{totalReceived.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#efe5da]">
          <CardContent className="pt-5 text-center">
            <p className="text-xs text-[#7a6050] mb-1">お贈りした合計</p>
            <p className="text-xl font-bold text-[#4caf50]">
              ¥{totalGiven.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* やりとり履歴 */}
      <Card className="border-[#efe5da]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-[#3a2519]">
            やりとり履歴
          </CardTitle>
        </CardHeader>
        <CardContent>
          {contact.records.length === 0 ? (
            <p className="text-sm text-[#7a6050] text-center py-6">
              まだ記録がありません
            </p>
          ) : (
            <div className="space-y-2">
              {contact.records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#fef8f3] border border-[#f5ede5]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        record.type === "RECEIVED"
                          ? "bg-[#fef0ea] text-[#c4826e]"
                          : "bg-[#e8f5e9] text-[#4caf50]"
                      }`}
                    >
                      {record.type === "RECEIVED" ? "受" : "贈"}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[#3a2519]">
                        {record.eventType}
                        {record.itemName ? ` — ${record.itemName}` : ""}
                      </p>
                      <p className="text-xs text-[#7a6050]">
                        {record.date.toLocaleDateString("ja-JP")}
                        {record.returnStatus === "PENDING" &&
                          " ・ お返し未済"}
                        {record.returnStatus === "COMPLETED" &&
                          " ・ お返し済"}
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

      {/* 削除 */}
      <div className="flex justify-end">
        <DeleteContactButton contactId={contact.id} />
      </div>
    </div>
  );
}
