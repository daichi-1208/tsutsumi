import { Suspense } from "react";
import Link from "next/link";
import { getContacts } from "@/lib/actions";
import { NewContactForm } from "./new-contact-form";
import { PageHeader, EditorialEmpty } from "@/components/editorial";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const contacts = await getContacts(groupId);

  return (
    <div>
      <PageHeader
        chapter="No. 参"
        eyebrow="Contacts"
        title="大切な人の、"
        accent="名簿。"
        description={`全${contacts.length}名との、お付き合い。`}
      />

      {/* 新規追加 */}
      <div className="mb-12">
        <Suspense>
          <NewContactForm />
        </Suspense>
      </div>

      {/* 一覧 */}
      {contacts.length === 0 ? (
        <EditorialEmpty
          title="連絡先が、ありません。"
          description="上のフォームから、大切な方を加えましょう。"
        />
      ) : (
        <div className="border-t border-[#3a2519]/20">
          {contacts.map((contact, i) => (
            <Link
              key={contact.id}
              href={`/dashboard/contacts/${contact.id}${groupId ? `?group=${groupId}` : ""}`}
              className="group grid grid-cols-12 gap-3 py-5 md:py-6 border-b border-[#3a2519]/12 hover:bg-[#fef8f3]/60 transition-colors"
            >
              <div className="col-span-1 font-latin text-[11px] text-[#7a6050] pt-1.5 tabular-nums">
                {String(i + 1).padStart(3, "0")}
              </div>
              <div className="col-span-8">
                <p className="font-display text-base md:text-lg font-[500] text-[#3a2519] group-hover:text-[#c4826e] transition-colors">
                  {contact.name}
                </p>
                {(contact.relationship || contact.gender) && (
                  <p className="font-body text-[11px] md:text-xs text-[#7a6050] mt-1">
                    {[
                      contact.relationship,
                      contact.gender === "male"
                        ? "男性"
                        : contact.gender === "female"
                          ? "女性"
                          : null,
                    ]
                      .filter(Boolean)
                      .join(" ・ ")}
                  </p>
                )}
              </div>
              <div className="col-span-3 flex items-start justify-end">
                <span className="font-latin text-[10px] italic text-[#7a6050] tabular-nums">
                  {contact._count.records} records
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
