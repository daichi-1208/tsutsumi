"use client";

import { useTransition, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteRecord } from "@/lib/actions";
import { GhostLink } from "@/components/editorial";

export function DeleteRecordButton({ recordId }: { recordId: string }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-latin text-[9px] italic uppercase tracking-[0.2em] text-[#b0a090] hover:text-red-600 transition-colors"
      >
        delete
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#faf6f1] border border-[#3a2519]/20 max-w-sm">
          <DialogHeader>
            <DialogTitle>
              <span className="font-display text-lg font-[500] text-[#3a2519]">
                この記録を削除しますか？
              </span>
            </DialogTitle>
          </DialogHeader>
          <p className="font-body text-sm text-[#7a6050] mt-1">
            この操作は、取り消せません。
          </p>
          <div className="flex items-center gap-6 mt-6">
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await deleteRecord(recordId);
                  setOpen(false);
                })
              }
              className="inline-flex items-center gap-2.5 bg-red-600 text-white pl-5 pr-2 py-2 rounded-full hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50"
            >
              {isPending ? "削除中..." : "削除する"}
              <span className="w-6 h-6 rounded-full bg-white text-red-600 flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5">
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
