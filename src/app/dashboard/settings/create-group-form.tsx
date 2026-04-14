"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createGroup } from "@/lib/actions";
import { FieldLabel, PrimaryButton } from "@/components/editorial";

export function CreateGroupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createGroup(formData);
      router.refresh();
    });
  }

  return (
    <div className="bg-white/60 border border-[#3a2519]/15 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
          Create group
        </span>
        <span className="h-px flex-1 bg-[#3a2519]/10" />
      </div>
      <form action={handleSubmit} className="space-y-5">
        <div>
          <FieldLabel>グループ名</FieldLabel>
          <input
            name="name"
            placeholder="例: 鈴木家"
            required
            className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
          />
        </div>
        <PrimaryButton
          type="submit"
          disabled={isPending}
          variant="dark"
          size="md"
        >
          {isPending ? "作成中..." : "グループを作る"}
        </PrimaryButton>
      </form>
    </div>
  );
}
