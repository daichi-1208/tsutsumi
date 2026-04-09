"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createGroup } from "@/lib/actions";

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
    <form action={handleSubmit} className="flex gap-3 pt-2">
      <Input
        name="name"
        placeholder="グループ名（例: 鈴木家）"
        required
        className="border-[#e8ddd0] rounded-xl"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-xl shrink-0"
      >
        {isPending ? "作成中..." : "グループ作成"}
      </Button>
    </form>
  );
}
