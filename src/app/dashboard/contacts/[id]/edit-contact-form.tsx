"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateContact } from "@/lib/actions";

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
        className="text-xs text-[#c4826e] hover:underline"
      >
        編集する
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
    <form action={handleSubmit} className="bg-[#fef8f3] rounded-xl border border-[#f5ede5] p-4 space-y-3">
      <div className="space-y-2">
        <Label className="text-[#3a2519] text-xs">名前</Label>
        <Input
          name="name"
          defaultValue={contact.name}
          required
          className="border-[#e8ddd0] rounded-xl"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-[#3a2519] text-xs">関係</Label>
          <Input
            name="relationship"
            defaultValue={contact.relationship ?? ""}
            placeholder="親戚・職場・友人"
            className="border-[#e8ddd0] rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#3a2519] text-xs">性別</Label>
          <select
            name="gender"
            defaultValue={contact.gender ?? ""}
            className="w-full h-10 rounded-xl border border-[#e8ddd0] bg-white px-3 text-sm text-[#3a2519] focus:outline-none focus:ring-2 focus:ring-[#c4826e]/30"
          >
            <option value="">選択しない</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-[#3a2519] text-xs">メモ</Label>
        <Textarea
          name="memo"
          defaultValue={contact.memo ?? ""}
          placeholder="備考"
          rows={2}
          className="border-[#e8ddd0] rounded-xl resize-none"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setEditing(false)}
          className="rounded-full border-[#d4c0b0] text-xs"
        >
          キャンセル
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-full text-xs"
        >
          {isPending ? "保存中..." : "保存"}
        </Button>
      </div>
    </form>
  );
}
