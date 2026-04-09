"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createRecord, createContact } from "@/lib/actions";
import { EVENT_TYPE_LIST, EVENT_TYPES } from "@/lib/return-rules";

type Contact = {
  id: string;
  name: string;
  relationship: string | null;
  _count: { records: number };
};

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

  return (
    <>
      <Card className="border-[#efe5da]">
        <CardContent className="pt-6">
          <form action={handleSubmit} className="space-y-5">
            {/* もらった / あげた */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType("received")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  type === "received"
                    ? "bg-[#c4826e] text-white"
                    : "bg-[#f5ede5] text-[#7a6050]"
                }`}
              >
                もらった
              </button>
              <button
                type="button"
                onClick={() => setType("given")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  type === "given"
                    ? "bg-[#4caf50] text-white"
                    : "bg-[#f5ede5] text-[#7a6050]"
                }`}
              >
                あげた
              </button>
            </div>

            {/* 相手 */}
            <div className="space-y-2">
              <Label className="text-[#3a2519]">相手</Label>
              <select
                name="contactId"
                value={contactId}
                onChange={(e) => setContactId(e.target.value)}
                required
                className="w-full h-10 rounded-xl border border-[#e8ddd0] bg-white px-3 text-sm text-[#3a2519] focus:outline-none focus:ring-2 focus:ring-[#c4826e]/30"
              >
                <option value="">選択してください</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.relationship ? ` (${c.relationship})` : ""}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="text-xs text-[#c4826e] hover:underline"
              >
                + 新しい相手を追加
              </button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-[#faf6f1] border-[#efe5da]">
                  <DialogHeader>
                    <DialogTitle className="text-[#3a2519]">
                      新しい相手を追加
                    </DialogTitle>
                  </DialogHeader>
                  <form action={handleNewContact} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[#3a2519]">名前</Label>
                      <Input
                        name="name"
                        placeholder="田中太郎"
                        required
                        className="border-[#e8ddd0] rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#3a2519]">関係</Label>
                      <Input
                        name="relationship"
                        placeholder="親戚・職場・友人など"
                        className="border-[#e8ddd0] rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#3a2519]">性別</Label>
                      <select
                        name="gender"
                        defaultValue=""
                        className="w-full h-10 rounded-xl border border-[#e8ddd0] bg-white px-3 text-sm text-[#3a2519] focus:outline-none focus:ring-2 focus:ring-[#c4826e]/30"
                      >
                        <option value="">選択しない</option>
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#3a2519]">メモ</Label>
                      <Input
                        name="memo"
                        placeholder="任意"
                        className="border-[#e8ddd0] rounded-xl"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-xl"
                    >
                      {isPending ? "追加中..." : "追加する"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* イベント種別 */}
            <div className="space-y-2">
              <Label className="text-[#3a2519]">イベント</Label>
              <select
                name="eventType"
                value={eventType}
                onChange={(e) => { setEventType(e.target.value); setForceReturn(false); }}
                required
                className="w-full h-10 rounded-xl border border-[#e8ddd0] bg-white px-3 text-sm text-[#3a2519] focus:outline-none focus:ring-2 focus:ring-[#c4826e]/30"
              >
                <option value="">選択してください</option>
                {EVENT_TYPE_LIST.map((et) => (
                  <option key={et} value={et}>
                    {et}
                  </option>
                ))}
              </select>
              {rule && type === "received" && (
                <div className="text-xs bg-[#fef8f3] px-3 py-2 rounded-lg space-y-2">
                  <p className="text-[#8b5e3c]">
                    {rule.returnRate !== null
                      ? `お返し目安: ${Math.round(rule.returnRate * 100)}%${rule.returnRateMax ? `〜${Math.round(rule.returnRateMax * 100)}%` : ""} / ${rule.dueDays ? `${rule.dueDays}日以内` : "時期任意"}`
                      : "お返し不要"}
                    {rule.note ? ` — ${rule.note}` : ""}
                  </p>
                  {isReturnNotNeeded && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={forceReturn}
                        onChange={(e) => setForceReturn(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-[#d4c0b0] accent-[#c4826e]"
                      />
                      <span className="text-[#7a6050]">それでもお返しを管理する</span>
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* 金額 */}
            <div className="space-y-2">
              <Label className="text-[#3a2519]">
                金額 <span className="text-xs text-[#b0a090]">わからなければ空欄でOK</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#7a6050]">
                  ¥
                </span>
                <Input
                  name="amount"
                  type="number"
                  min="0"
                  placeholder="10000"
                  className="pl-7 border-[#e8ddd0] rounded-xl"
                />
              </div>
              {itemCategory === "goods" && (
                <p className="text-xs text-[#b0a090]">
                  推定金額を入れるとお返し目安が計算されます
                </p>
              )}
            </div>

            {/* 日付 */}
            <div className="space-y-2">
              <Label className="text-[#3a2519]">日付</Label>
              <Input
                name="date"
                type="date"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
                className="border-[#e8ddd0] rounded-xl"
              />
            </div>

            {/* 現金 or ギフト */}
            <div className="space-y-2">
              <Label className="text-[#3a2519]">種類</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setItemCategory("cash")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    itemCategory === "cash"
                      ? "bg-[#3a2519] text-white"
                      : "bg-[#f5ede5] text-[#7a6050]"
                  }`}
                >
                  現金
                </button>
                <button
                  type="button"
                  onClick={() => setItemCategory("goods")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    itemCategory === "goods"
                      ? "bg-[#3a2519] text-white"
                      : "bg-[#f5ede5] text-[#7a6050]"
                  }`}
                >
                  ギフト
                </button>
              </div>
              {itemCategory === "goods" && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {["カタログギフト", "商品券", "タオルセット", "食品・スイーツ", "お酒", "花束", "食器", "日用品", "ベビー用品"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          const input = document.querySelector<HTMLInputElement>('input[name="itemName"]');
                          if (input) input.value = item;
                        }}
                        className="px-2.5 py-1 text-xs rounded-full border border-[#e8ddd0] text-[#7a6050] hover:bg-[#fef8f3] hover:border-[#c4826e] hover:text-[#c4826e] transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <Input
                    name="itemName"
                    placeholder="選択するか自由に入力"
                    className="border-[#e8ddd0] rounded-xl"
                  />
                </div>
              )}
            </div>

            {/* メモ（任意） */}
            <div className="space-y-2">
              <Label className="text-[#3a2519]">
                メモ <span className="text-xs text-[#b0a090]">任意</span>
              </Label>
              <Textarea
                name="memo"
                placeholder="備考があれば"
                rows={2}
                className="border-[#e8ddd0] rounded-xl resize-none"
              />
            </div>

            {/* 送信 */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-xl h-12 text-base"
            >
              {isPending ? "記録中..." : "記録する"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
