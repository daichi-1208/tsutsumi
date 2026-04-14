"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createRecord, createContact } from "@/lib/actions";
import { EVENT_TYPE_LIST, EVENT_TYPES } from "@/lib/return-rules";
import { FieldLabel, PrimaryButton, GhostLink } from "@/components/editorial";

type Contact = {
  id: string;
  name: string;
  relationship: string | null;
  _count: { records: number };
};

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

export function RecordForm({
  contacts,
  groupId,
}: {
  contacts: Contact[];
  groupId?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [type, setType] = useState<"received" | "given">("received");
  const [contactId, setContactId] = useState("");
  const [eventType, setEventType] = useState("");
  const [itemCategory, setItemCategory] = useState<"cash" | "goods">("cash");
  const [forceReturn, setForceReturn] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const rule = eventType ? EVENT_TYPES[eventType] : null;
  const isReturnNotNeeded = rule && rule.returnRate === null;

  async function handleSubmit(formData: FormData) {
    formData.set("type", type);
    if (groupId) formData.set("groupId", groupId);
    if (forceReturn) formData.set("forceReturn", "true");
    if (itemCategory === "cash" && !formData.get("itemName")) {
      formData.set("itemName", "現金");
    }
    startTransition(async () => {
      await createRecord(formData);
      router.push(`/dashboard${groupId ? `?group=${groupId}` : ""}`);
    });
  }

  async function handleNewContact(formData: FormData) {
    if (groupId) formData.set("groupId", groupId);
    startTransition(async () => {
      const newContact = await createContact(formData);
      setContactId(newContact.id);
      setDialogOpen(false);
      router.refresh();
    });
  }

  const segmentBase =
    "flex-1 py-3 text-sm font-medium tracking-wide transition-all duration-300 border";

  return (
    <>
      <form action={handleSubmit} className="space-y-10 max-w-2xl">
        {/* 種類(もらった/あげた) */}
        <div>
          <FieldLabel>種類</FieldLabel>
          <div className="flex gap-0">
            <button
              type="button"
              onClick={() => setType("received")}
              className={`${segmentBase} ${
                type === "received"
                  ? "bg-[#3a2519] text-[#faf6f1] border-[#3a2519]"
                  : "bg-transparent text-[#7a6050] border-[#3a2519]/20 hover:border-[#3a2519]/50"
              }`}
            >
              いただいた
            </button>
            <button
              type="button"
              onClick={() => setType("given")}
              className={`${segmentBase} -ml-px ${
                type === "given"
                  ? "bg-[#3a2519] text-[#faf6f1] border-[#3a2519]"
                  : "bg-transparent text-[#7a6050] border-[#3a2519]/20 hover:border-[#3a2519]/50"
              }`}
            >
              お贈りした
            </button>
          </div>
        </div>

        {/* 相手 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>相手</FieldLabel>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#c4826e] hover:text-[#a0634f] transition-colors"
            >
              + Add new
            </button>
          </div>
          <select
            name="contactId"
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
            required
            className="w-full h-12 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
          >
            <option value="">選択してください</option>
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.relationship ? ` (${c.relationship})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* イベント */}
        <div>
          <FieldLabel>イベント</FieldLabel>
          <select
            name="eventType"
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
              setForceReturn(false);
            }}
            required
            className="w-full h-12 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
          >
            <option value="">選択してください</option>
            {EVENT_TYPE_LIST.map((et) => (
              <option key={et} value={et}>
                {et}
              </option>
            ))}
          </select>
          {rule && type === "received" && (
            <div className="mt-3 border-l-2 border-[#c4826e] pl-4 py-2">
              <p className="font-display text-xs text-[#c4826e] italic leading-relaxed">
                {rule.returnRate !== null
                  ? `お返し目安: ${Math.round(rule.returnRate * 100)}%${
                      rule.returnRateMax
                        ? `〜${Math.round(rule.returnRateMax * 100)}%`
                        : ""
                    } / ${
                      rule.dueDays ? `${rule.dueDays}日以内` : "時期任意"
                    }`
                  : "お返しは不要です"}
              </p>
              {rule.note && (
                <p className="font-body text-[10px] text-[#7a6050] mt-1">
                  — {rule.note}
                </p>
              )}
              {isReturnNotNeeded && (
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={forceReturn}
                    onChange={(e) => setForceReturn(e.target.checked)}
                    className="w-3.5 h-3.5 border-[#3a2519]/30 accent-[#c4826e]"
                  />
                  <span className="font-body text-xs text-[#7a6050]">
                    それでもお返しを管理する
                  </span>
                </label>
              )}
            </div>
          )}
        </div>

        {/* 現金/ギフト */}
        <div>
          <FieldLabel>種類</FieldLabel>
          <div className="flex gap-0">
            <button
              type="button"
              onClick={() => setItemCategory("cash")}
              className={`${segmentBase} ${
                itemCategory === "cash"
                  ? "bg-[#3a2519] text-[#faf6f1] border-[#3a2519]"
                  : "bg-transparent text-[#7a6050] border-[#3a2519]/20 hover:border-[#3a2519]/50"
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
                  : "bg-transparent text-[#7a6050] border-[#3a2519]/20 hover:border-[#3a2519]/50"
              }`}
            >
              ギフト
            </button>
          </div>
          {itemCategory === "goods" && (
            <div className="mt-4 space-y-3">
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
                    className="px-3 py-1 font-body text-xs text-[#7a6050] border border-[#3a2519]/15 hover:border-[#c4826e] hover:text-[#c4826e] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <input
                name="itemName"
                placeholder="選択するか、自由に入力"
                className="w-full h-12 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
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
              className="w-full h-12 bg-white border border-[#3a2519]/20 pl-9 pr-4 font-latin text-base text-[#3a2519] tabular-nums focus:outline-none focus:border-[#c4826e] transition-colors"
            />
          </div>
          {itemCategory === "goods" && (
            <p className="font-body text-[10px] text-[#b0a090] mt-2">
              推定金額を入れると、お返し目安が計算されます
            </p>
          )}
        </div>

        {/* 日付 */}
        <div>
          <FieldLabel>日付</FieldLabel>
          <input
            name="date"
            type="date"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full h-12 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
          />
        </div>

        {/* メモ */}
        <div>
          <FieldLabel optional>メモ</FieldLabel>
          <textarea
            name="memo"
            rows={2}
            placeholder="備考があれば"
            className="w-full bg-white border border-[#3a2519]/20 px-4 py-3 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors resize-none"
          />
        </div>

        {/* 送信 */}
        <div className="pt-4 flex items-center gap-6 flex-wrap">
          <PrimaryButton
            type="submit"
            disabled={isPending}
            variant="dark"
            size="lg"
          >
            {isPending ? "書き残しています..." : "記録する"}
          </PrimaryButton>
          <GhostLink href={`/dashboard${groupId ? `?group=${groupId}` : ""}`}>
            キャンセル
          </GhostLink>
        </div>
      </form>

      {/* 新規連絡先ダイアログ */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#faf6f1] border border-[#3a2519]/20 max-w-md">
          <DialogHeader>
            <DialogTitle>
              <span className="font-display text-xl font-[500] text-[#3a2519]">
                新しい相手を追加
              </span>
            </DialogTitle>
          </DialogHeader>
          <form action={handleNewContact} className="space-y-5 mt-2">
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
                placeholder="親戚・職場・友人など"
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
            <div>
              <FieldLabel optional>メモ</FieldLabel>
              <input
                name="memo"
                className="w-full h-11 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
              />
            </div>
            <div className="pt-2">
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
        </DialogContent>
      </Dialog>
    </>
  );
}
