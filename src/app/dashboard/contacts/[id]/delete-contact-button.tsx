"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteContact } from "@/lib/actions";

export function DeleteContactButton({ contactId }: { contactId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-xs text-[#b0a090] hover:text-red-500 transition-colors"
      >
        この連絡先を削除
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-red-50 rounded-xl px-3 py-2">
      <p className="text-xs text-red-600">
        関連する贈答記録もすべて削除されます。よろしいですか？
      </p>
      <Button
        size="sm"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await deleteContact(contactId);
            router.push("/dashboard/contacts");
          })
        }
        className="bg-red-500 hover:bg-red-600 text-white rounded-full text-xs shrink-0"
      >
        {isPending ? "削除中..." : "削除"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setConfirming(false)}
        className="rounded-full text-xs shrink-0"
      >
        キャンセル
      </Button>
    </div>
  );
}
