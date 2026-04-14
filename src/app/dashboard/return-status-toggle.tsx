"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createReturnRecord } from "@/lib/actions";
import { FieldLabel, PrimaryButton, GhostLink } from "@/components/editorial";

const GIFT_TAGS = [
  "カタログギフト",
  "商品券",
  "タオルセット",
  "食品・スイーツ",
  "お酒",
  "花束",
  "食器",
  "日用品",
  "ベビー用品",
];

export function ReturnStatusToggle({ recordId }: { recordId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [itemCategory, setItemCategory] = useState<"cash" | "goods">("cash");

  async function handleSubmit(formData: FormData) {
    formData.set("itemCategory", itemCategory);
    startTransition(async () => {
      await createReturnRecord(recordId, formData);
      setOpen(false);
      router.refresh();
    });
  }

  const segmentBase =
    "flex-1 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 border";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#c4826e] hover:text-[#a0634f] transition-colors whitespace-nowrap"
      >
        お返しを記録 →
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#faf6f1] border border-[#3a2519]/20 max-w-md">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e]">
                  Record return
                </span>
                <span className="h-px flex-1 bg-[#c4826e]/40" />
              </div>
              <span className="font-display text-xl font-[500] text-[#3a2519]">
                お返しを、書き残す。
              </span>
            </DialogTitle>
          </DialogHeader>

          <form action={handleSubmit} className="space-y-5 mt-2">
            {/* 現金 or ギフト */}
            <div>
              <FieldLabel>種類</FieldLabel>
              <div className="flex gap-0">
                <button
                  type="button"
                  onClick={() => setItemCategory("cash")}
                  className={`${segmentBase} ${
                    itemCategory === "cash"
                      ? "bg-[#3a2519] text-[#faf6f1] border-[#3a2519]"
                      : "bg-transparent text-[#7a6050] border-[#3a2519]/20"
                  }`}
                >
                  現金
                </button>
                <button
                  type="button"
                  onClick={() => setItemCategory("goods")}
                  className={`${segmentBase} -ml-px ${
                    itemCategory === "goods"
                      ? "bg-[#3a2519] text-[#faf6f1] border-[#3a2519]"
                      : "bg-transparent text-[#7a6050] border-[#3a2519]/20"
                  }`}
                >
                  ギフト
                </button>
              </div>
              {itemCategory === "goods" && (
                <div className="mt-3 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {GIFT_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const input =
                            document.querySelector<HTMLInputElement>(
                              'input[name="itemName"]'
                            );
                          if (input) input.value = tag;
                        }}
                        className="px-2.5 py-1 font-body text-[11px] text-[#7a6050] border border-[#3a2519]/15 hover:border-[#c4826e] hover:text-[#c4826e] transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <input
                    name="itemName"
                    placeholder="選択するか、自由に入力"
                    className="w-full h-10 bg-white border border-[#3a2519]/20 px-3 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
                  />
                </div>
              )}
            </div>

            {/* 金額 */}
            <div>
              <FieldLabel>金額</FieldLabel>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-latin text-base text-[#7a6050]">
                  ¥
                </span>
                <input
                  name="amount"
                  type="number"
                  min="0"
                  placeholder="10000"
                  className="w-full h-11 bg-white border border-[#3a2519]/20 pl-9 pr-4 font-latin text-base text-[#3a2519] tabular-nums focus:outline-none focus:border-[#c4826e] transition-colors"
                />
              </div>
            </div>

            {/* 日付 */}
            <div>
              <FieldLabel>お返しした日</FieldLabel>
              <input
                name="date"
                type="date"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
                className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
              />
            </div>

            {/* メモ */}
            <div>
              <FieldLabel optional>メモ</FieldLabel>
              <textarea
                name="memo"
                rows={2}
                placeholder="備考があれば"
                className="w-full bg-white border border-[#3a2519]/20 px-4 py-2.5 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <PrimaryButton
                type="submit"
                disabled={isPending}
                variant="dark"
                size="md"
              >
                {isPending ? "記録中..." : "お返しとして記録"}
              </PrimaryButton>
              <GhostLink onClick={() => setOpen(false)}>キャンセル</GhostLink>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
