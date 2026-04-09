import Link from "next/link";
import { getContacts } from "@/lib/actions";
import { RecordForm } from "./record-form";

export default async function NewRecordPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: groupId } = await searchParams;
  const contacts = await getContacts(groupId);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/dashboard${groupId ? `?group=${groupId}` : ""}`}
          className="text-xs text-[#c4826e] hover:underline sm:hidden"
        >
          ← 戻る
        </Link>
        <h1 className="text-2xl font-bold text-[#3a2519] mt-1 sm:mt-0">
          贈答を記録
        </h1>
        {groupId && (
          <p className="text-xs text-[#6366a0] mt-1 bg-[#ededf5] inline-block px-2 py-0.5 rounded-full">
            グループの記録
          </p>
        )}
      </div>
      <RecordForm contacts={contacts} groupId={groupId} />
    </div>
  );
}
