"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteContact } from "@/lib/actions";
import { PrimaryButton, GhostLink } from "@/components/editorial";

export function DeleteContactButton({ contactId }: { contactId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#b0a090] hover:text-red-600 transition-colors"
      >
        Delete this contact
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#faf6f1] border border-[#3a2519]/20 max-w-md">
          <DialogHeader>
            <DialogTitle>
              <span className="font-display text-xl font-[500] text-[#3a2519]">
                この連絡先を削除しますか？
              </span>
            </DialogTitle>
          </DialogHeader>
          <p className="font-body text-sm text-[#7a6050] leading-relaxed mt-2">
            関連するすべての贈答記録も、一緒に削除されます。
            <br />
            この操作は取り消せません。
          </p>
          <div className="flex items-center gap-6 mt-6">
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await deleteContact(contactId);
                  router.push("/dashboard/contacts");
                })
              }
              className="inline-flex items-center gap-2.5 bg-red-600 text-white pl-6 pr-2.5 py-2.5 rounded-full hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isPending ? "削除中..." : "削除する"}
              <span className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </button>
            <GhostLink onClick={() => setOpen(false)}>キャンセル</GhostLink>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
