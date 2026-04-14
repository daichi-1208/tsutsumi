"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EVENT_TYPE_LIST, EVENT_TYPES, calcReturnAmount } from "@/lib/return-rules";

export function Calculator() {
  const [eventType, setEventType] = useState("");
  const [amount, setAmount] = useState("");

  const rule = eventType ? EVENT_TYPES[eventType] : null;
  const amountNum = parseInt(amount, 10);
  const result = eventType && amountNum ? calcReturnAmount(eventType, amountNum) : null;

  return (
    <div className="space-y-6">
      <Card className="border-[#efe5da]">
        <CardContent className="pt-6 space-y-5">
          {/* イベント選択 */}
          <div className="space-y-2">
            <Label className="text-[#3a2519]">イベント</Label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full h-10 rounded-xl border border-[#e8ddd0] bg-white px-3 text-sm text-[#3a2519] focus:outline-none focus:ring-2 focus:ring-[#c4826e]/30"
            >
              <option value="">選択してください</option>
              {EVENT_TYPE_LIST.map((et) => (
                <option key={et} value={et}>{et}</option>
              ))}
            </select>
          </div>

          {/* 金額入力 */}
          <div className="space-y-2">
            <Label className="text-[#3a2519]">いただいた金額</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#7a6050]">¥</span>
              <Input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="30000"
                className="pl-7 border-[#e8ddd0] rounded-xl"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 結果 */}
      {rule && (
        <Card className="border-[#efe5da] overflow-hidden">
          <div className="bg-gradient-to-r from-[#c4826e] to-[#a0634f] p-4 text-white">
            <p className="text-sm font-medium opacity-80">計算結果</p>
            <p className="text-xl font-bold mt-1">{eventType}</p>
          </div>
          <CardContent className="pt-5 space-y-4">
            {/* お返し率 */}
            <div className="flex justify-between items-center p-3 bg-[#fef8f3] rounded-xl">
              <span className="text-sm text-[#7a6050]">お返し率</span>
              <span className="font-bold text-[#3a2519]">
                {rule.returnRate !== null
                  ? `${Math.round(rule.returnRate * 100)}%${rule.returnRateMax ? `〜${Math.round(rule.returnRateMax * 100)}%` : ""}`
                  : "不要"}
              </span>
            </div>

            {/* お返し金額 */}
            {result && (
              <div className="flex justify-between items-center p-3 bg-[#fef8f3] rounded-xl">
                <span className="text-sm text-[#7a6050]">お返し目安金額</span>
                <span className="font-bold text-[#c4826e] text-lg">
                  ¥{result.min.toLocaleString()}
                  {result.max !== result.min && `〜¥${result.max.toLocaleString()}`}
                </span>
              </div>
            )}

            {/* お返し時期 */}
            <div className="flex justify-between items-center p-3 bg-[#fef8f3] rounded-xl">
              <span className="text-sm text-[#7a6050]">お返し時期</span>
              <span className="font-bold text-[#3a2519]">
                {rule.dueDays ? `${rule.dueDays}日以内` : rule.returnRate !== null ? "時期任意" : "—"}
              </span>
            </div>

            {/* 備考 */}
            {rule.note && (
              <p className="text-xs text-[#8b5e3c] bg-[#fef8f3] px-3 py-2 rounded-lg">
                {rule.note}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* 結果直下の強いCTA */}
      {rule && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#c4826e] to-[#a0634f] p-6 text-white shadow-lg shadow-[#c4826e]/20">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-white/5" />
          <div className="relative">
            {/* 警告アイコン */}
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 2L2 16h16L10 2z" />
                <path d="M10 8v4M10 14h.01" />
              </svg>
              <p className="text-xs font-bold uppercase tracking-wider opacity-90">重要</p>
            </div>
            <p className="text-xl font-bold mb-2">この計算結果、どこかにメモしましたか？</p>
            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              ブラウザを閉じると消えます。
              <br />
              つつみに保存すれば、お返し期限が近づくと<span className="font-bold">メールでお知らせ</span>。
              <br />
              パートナーとの共有もできます。
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 bg-white text-[#c4826e] rounded-full px-8 py-3.5 text-base font-bold hover:bg-[#fef8f3] transition-colors shadow-md"
            >
              30秒で保存する
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 8h8M9 5l3 3-3 3" />
              </svg>
            </Link>
            <p className="text-[11px] opacity-80 mt-3 flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.7 6.3L7 11l-2.7-2.7 1.4-1.4L7 8.2l3.3-3.3 1.4 1.4z" />
              </svg>
              完全無料・Googleログイン対応・いつでも削除OK
            </p>
          </div>
        </div>
      )}

      {/* 未入力時のガイド */}
      {!rule && (
        <div className="text-center py-8 text-[#b0a090] text-sm">
          イベントを選択すると、お返しの目安が表示されます
        </div>
      )}
    </div>
  );
}
