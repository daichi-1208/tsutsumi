import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getContacts } from "@/lib/actions";
import { NewContactForm } from "./new-contact-form";
import { EmptyState } from "@/components/empty-state";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const contacts = await getContacts(groupId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#3a2519]">連絡先</h1>
      </div>

      {/* 新規追加フォーム */}
      <Suspense>
        <NewContactForm />
      </Suspense>

      {/* 連絡先一覧 */}
      {contacts.length === 0 ? (
        <Card className="border-[#efe5da]">
          <CardContent>
            <EmptyState message="まだ連絡先がありません。上のフォームから追加してください。" />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#efe5da]">
          <CardContent className="pt-4">
            <div className="space-y-1">
              {contacts.map((contact) => (
                <Link
                  key={contact.id}
                  href={`/dashboard/contacts/${contact.id}${groupId ? `?group=${groupId}` : ""}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#fef8f3] transition-colors block"
                >
                  <div>
                    <p className="font-medium text-sm text-[#3a2519]">
                      {contact.name}
                    </p>
                    {(contact.relationship || contact.gender) && (
                      <p className="text-xs text-[#7a6050]">
                        {[
                          contact.relationship,
                          contact.gender === "male" ? "男性" : contact.gender === "female" ? "女性" : contact.gender === "other" ? "その他" : null,
                        ].filter(Boolean).join(" ・ ")}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#7a6050]">
                      {contact._count.records}件の記録
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
