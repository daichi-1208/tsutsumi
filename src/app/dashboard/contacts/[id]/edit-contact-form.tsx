"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { updateContact } from "@/lib/actions";
import { FieldLabel, PrimaryButton, GhostLink } from "@/components/editorial";

type Contact = {
  id: string;
  name: string;
  relationship: string | null;
  gender: string | null;
  memo: string | null;
};

export function EditContactForm({ contact }: { contact: Contact }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="w-full text-left bg-white/60 border border-[#3a2519]/15 p-6 hover:border-[#c4826e] transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-sm text-[#3a2519] font-[500] mb-1">
              情報を編集する
            </p>
            <p className="font-body text-xs text-[#7a6050]">
              名前・関係・性別・メモを変更できます
            </p>
          </div>
          <span className="font-latin text-[10px] uppercase tracking-[0.2em] text-[#c4826e] group-hover:text-[#a0634f]">
            Edit →
          </span>
        </div>
      </button>
    );
  }

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateContact(contact.id, formData);
      setEditing(false);
      router.refresh();
    });
  }

  return (
    <div className="bg-white/60 border border-[#3a2519]/15 p-6 md:p-8">
      <form action={handleSubmit} className="space-y-5">
        <div>
          <FieldLabel>名前</FieldLabel>
          <input
            name="name"
            defaultValue={contact.name}
            required
            className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <FieldLabel optional>関係</FieldLabel>
            <input
              name="relationship"
              defaultValue={contact.relationship ?? ""}
              placeholder="親戚・職場・友人"
              className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
            />
          </div>
          <div>
            <FieldLabel optional>性別</FieldLabel>
            <select
              name="gender"
              defaultValue={contact.gender ?? ""}
              className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
            >
              <option value="">選択しない</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
        </div>
        <div>
          <FieldLabel optional>メモ</FieldLabel>
          <textarea
            name="memo"
            defaultValue={contact.memo ?? ""}
            rows={2}
            placeholder="備考があれば"
            className="w-full bg-white border border-[#3a2519]/20 px-4 py-3 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors resize-none"
          />
        </div>
        <div className="flex items-center gap-6 pt-2">
          <PrimaryButton
            type="submit"
            disabled={isPending}
            variant="dark"
            size="md"
          >
            {isPending ? "保存中..." : "保存する"}
          </PrimaryButton>
          <GhostLink onClick={() => setEditing(false)}>キャンセル</GhostLink>
        </div>
      </form>
    </div>
  );
}
