"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createContact } from "@/lib/actions";
import { FieldLabel, PrimaryButton } from "@/components/editorial";

export function NewContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    if (groupId) formData.set("groupId", groupId);
    startTransition(async () => {
      await createContact(formData);
      router.refresh();
    });
  }

  return (
    <div className="bg-white/60 border border-[#3a2519]/15 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
          Add new
        </span>
        <span className="h-px flex-1 bg-[#3a2519]/10" />
      </div>
      <form action={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <FieldLabel>名前</FieldLabel>
            <input
              name="name"
              placeholder="田中太郎"
              required
              className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
            />
          </div>
          <div>
            <FieldLabel optional>関係</FieldLabel>
            <input
              name="relationship"
              placeholder="親戚・職場・友人"
              className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
            />
          </div>
          <div>
            <FieldLabel optional>性別</FieldLabel>
            <select
              name="gender"
              defaultValue=""
              className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
            >
              <option value="">選択しない</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <PrimaryButton
            type="submit"
            disabled={isPending}
            variant="dark"
            size="md"
          >
            {isPending ? "追加中..." : "追加する"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
