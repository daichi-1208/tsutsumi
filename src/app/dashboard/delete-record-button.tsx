"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteRecord } from "@/lib/actions";

export function DeleteRecordButton({ recordId }: { recordId: string }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[10px] text-[#b0a090] hover:text-red-500 transition-colors"
      >
        削除
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#faf6f1] border-[#efe5da] max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-[#3a2519]">
              記録を削除しますか？
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#7a6050]">
            この操作は取り消せません。
          </p>
          <div className="flex gap-2 justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              className="rounded-full border-[#d4c0b0]"
            >
              キャンセル
            </Button>
            <Button
              size="sm"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await deleteRecord(recordId);
                  setOpen(false);
                })
              }
              className="bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              {isPending ? "削除中..." : "削除する"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
