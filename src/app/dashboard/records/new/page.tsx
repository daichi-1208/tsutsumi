import Link from "next/link";
import { getContacts } from "@/lib/actions";
import { RecordForm } from "./record-form";
import { PageHeader } from "@/components/editorial";

export default async function NewRecordPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const contacts = await getContacts(groupId);

  return (
    <div>
      {/* モバイル用戻るリンク */}
      <Link
        href={`/dashboard${groupId ? `?group=${groupId}` : ""}`}
        className="md:hidden inline-flex items-center gap-2 font-latin text-[10px] uppercase tracking-[0.2em] text-[#c4826e] mb-6"
      >
        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 8H3M7 4L3 8l4 4" />
        </svg>
        Back to Home
      </Link>

      <PageHeader
        chapter="No. 新"
        eyebrow={groupId ? "Group record" : "Personal record"}
        title="贈答を、"
        accent="書き残す。"
        description="もらった、あげた。現金、ギフト。相手と金額とイベントを。"
      />

      <RecordForm contacts={contacts} groupId={groupId} />
    </div>
  );
}
