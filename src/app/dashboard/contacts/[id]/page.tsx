import Link from "next/link";
import { notFound } from "next/navigation";
import { getContact } from "@/lib/actions";
import { EditContactForm } from "./edit-contact-form";
import { DeleteContactButton } from "./delete-contact-button";
import { PageHeader, PrimaryButton, SectionHeader } from "@/components/editorial";

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

  const genderLabel =
    contact.gender === "male"
      ? "男性"
      : contact.gender === "female"
        ? "女性"
        : null;
  const metaParts = [contact.relationship, genderLabel].filter(Boolean);

  return (
    <div className="space-y-12">
      {/* 戻る */}
      <Link
        href="/dashboard/contacts"
        className="inline-flex items-center gap-2 font-latin text-[10px] uppercase tracking-[0.2em] text-[#c4826e]"
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
        Back to contacts
      </Link>

      <PageHeader
        chapter="Profile"
        eyebrow={metaParts.join(" ・ ") || "Contact"}
        title={contact.name}
        description={contact.memo || undefined}
        action={
          <PrimaryButton href="/dashboard/records/new" variant="dark">
            記録する
          </PrimaryButton>
        }
      />

      {/* サマリー */}
      <section>
        <SectionHeader eyebrow="Summary" title="やりとりの、合計。" />
        <div className="grid grid-cols-2 gap-px bg-[#3a2519]/10">
          <div className="bg-[#faf6f1] p-5 md:p-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-1 rounded-full bg-[#c4826e]" />
              <span className="font-latin text-[9px] uppercase tracking-[0.25em] text-[#7a6050]">
                Received
              </span>
            </div>
            <p className="font-display text-xs text-[#7a6050] mb-1">いただいた</p>
            <p className="font-latin text-2xl md:text-3xl font-[500] text-[#c4826e] tabular-nums">
              ¥{totalReceived.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#faf6f1] p-5 md:p-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-1 rounded-full bg-[#5a9e6f]" />
              <span className="font-latin text-[9px] uppercase tracking-[0.25em] text-[#7a6050]">
                Given
              </span>
            </div>
            <p className="font-display text-xs text-[#7a6050] mb-1">お贈りした</p>
            <p className="font-latin text-2xl md:text-3xl font-[500] text-[#5a9e6f] tabular-nums">
              ¥{totalGiven.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* 編集フォーム */}
      <section>
        <SectionHeader eyebrow="Edit" title="情報を、整える。" />
        <EditContactForm contact={contact} />
      </section>

      {/* やりとり履歴 */}
      <section>
        <SectionHeader
          eyebrow={`History · ${contact.records.length}`}
          title="やりとりの、歴史。"
        />
        {contact.records.length === 0 ? (
          <p className="font-display text-sm italic text-[#7a6050] text-center py-10">
            まだ、記録がありません。
          </p>
        ) : (
          <div className="border-t border-[#3a2519]/20">
            {contact.records.map((record, i) => {
              const isReturn = !!record.returnForId; // お返し記録かどうか
              return (
              <div
                key={record.id}
                className={`grid grid-cols-12 gap-3 py-5 border-b border-[#3a2519]/12 ${isReturn ? "pl-6 md:pl-8 bg-[#fef8f3]/30" : ""}`}
              >
                <div className="col-span-1 font-latin text-[11px] text-[#7a6050] pt-1 tabular-nums">
                  {isReturn ? "↳" : String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-7 flex items-start gap-3">
                  <span
                    className={`font-display text-xs font-medium px-2 py-0.5 mt-0.5 shrink-0 ${
                      record.type === "RECEIVED"
                        ? "bg-[#c4826e]/10 text-[#c4826e]"
                        : "bg-[#5a9e6f]/10 text-[#5a9e6f]"
                    }`}
                  >
                    {record.type === "RECEIVED" ? "受" : "贈"}
                  </span>
                  <div>
                    <p className="font-display text-sm md:text-base font-[500] text-[#3a2519]">
                      {isReturn && (
                        <span className="font-latin text-[10px] italic uppercase tracking-wider text-[#c4826e] mr-2">
                          Return ·
                        </span>
                      )}
                      {record.eventType}
                      {isReturn && (
                        <span className="font-body text-xs text-[#7a6050] ml-1">
                          のお返し
                        </span>
                      )}
                      {record.itemName && (
                        <span className="font-body text-xs text-[#7a6050] ml-2">
                          {record.itemName}
                        </span>
                      )}
                    </p>
                    <p className="font-latin text-[10px] italic text-[#7a6050] mt-0.5">
                      {record.date.toLocaleDateString("ja-JP")}
                      {!isReturn && record.returnStatus === "PENDING" && " ・ pending"}
                      {!isReturn && record.returnStatus === "COMPLETED" && " ・ returned"}
                    </p>
                  </div>
                </div>
                <div className="col-span-4 flex items-start justify-end">
                  <span className="font-latin text-sm font-[500] text-[#3a2519] tabular-nums">
                    {record.amount != null
                      ? `¥${record.amount.toLocaleString()}`
                      : "—"}
                  </span>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 削除 */}
      <section className="pt-6 border-t border-[#3a2519]/15 flex justify-end">
        <DeleteContactButton contactId={contact.id} />
      </section>
    </div>
  );
}
