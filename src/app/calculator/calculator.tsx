"use client";

import Link from "next/link";
import { useState } from "react";
import {
  EVENT_TYPE_LIST,
  EVENT_TYPES,
  calcReturnAmount,
} from "@/lib/return-rules";
import { FieldLabel } from "@/components/editorial";

export function Calculator() {
  const [eventType, setEventType] = useState("");
  const [amount, setAmount] = useState("");

  const rule = eventType ? EVENT_TYPES[eventType] : null;
  const amountNum = parseInt(amount, 10);
  const result =
    eventType && amountNum ? calcReturnAmount(eventType, amountNum) : null;

  return (
    <div className="space-y-10">
      {/* 入力 */}
      <div className="space-y-8">
        <div>
          <FieldLabel>イベント</FieldLabel>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full h-12 bg-white border border-[#3a2519]/20 px-4 font-body text-sm text-[#3a2519] focus:outline-none focus:border-[#c4826e] transition-colors"
          >
            <option value="">選択してください</option>
            {EVENT_TYPE_LIST.map((et) => (
              <option key={et} value={et}>
                {et}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel>いただいた金額</FieldLabel>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-latin text-base text-[#7a6050]">
              ¥
            </span>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="30000"
              className="w-full h-12 bg-white border border-[#3a2519]/20 pl-9 pr-4 font-latin text-base text-[#3a2519] tabular-nums focus:outline-none focus:border-[#c4826e] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 結果 */}
      {rule && (
        <div className="border-t-2 border-[#c4826e] bg-white/60">
          {/* ヘッダー */}
          <div className="px-6 md:px-8 py-5 border-b border-[#3a2519]/10 flex items-center justify-between">
            <div>
              <p className="font-latin text-[10px] italic uppercase tracking-[0.25em] text-[#c4826e] mb-1">
                Result
              </p>
              <p className="font-display text-lg font-[500] text-[#3a2519]">
                {eventType}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c4826e]/40" />
              <span className="font-latin text-[10px] italic text-[#7a6050]">
                fig. 壱
              </span>
            </div>
          </div>

          {/* データ行 */}
          <div className="divide-y divide-[#3a2519]/10">
            <div className="flex items-center justify-between px-6 md:px-8 py-5">
              <span className="font-body text-xs text-[#7a6050]">お返し率</span>
              <span className="font-display text-base font-[500] text-[#3a2519]">
                {rule.returnRate !== null
                  ? `${Math.round(rule.returnRate * 100)}%${
                      rule.returnRateMax
                        ? `〜${Math.round(rule.returnRateMax * 100)}%`
                        : ""
                    }`
                  : "不要"}
              </span>
            </div>

            {result && (
              <div className="flex items-center justify-between px-6 md:px-8 py-5">
                <span className="font-body text-xs text-[#7a6050]">
                  お返し目安金額
                </span>
                <span className="font-latin text-xl md:text-2xl font-[500] text-[#c4826e] tabular-nums">
                  ¥{result.min.toLocaleString()}
                  {result.max !== result.min && (
                    <span className="text-base text-[#7a6050]">
                      〜¥{result.max.toLocaleString()}
                    </span>
                  )}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between px-6 md:px-8 py-5">
              <span className="font-body text-xs text-[#7a6050]">お返し時期</span>
              <span className="font-display text-base text-[#3a2519]">
                {rule.dueDays
                  ? `${rule.dueDays}日以内`
                  : rule.returnRate !== null
                    ? "時期任意"
                    : "—"}
              </span>
            </div>

            {rule.note && (
              <div className="px-6 md:px-8 py-4 bg-[#fef8f3]/60">
                <p className="font-body text-xs text-[#7a6050] italic leading-relaxed">
                  — {rule.note}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 結果直下の強いCTA */}
      {rule && (
        <div className="relative overflow-hidden bg-[#3a2519] text-[#faf6f1] p-8 md:p-10">
          {/* 巨大kanji背景 */}
          <div
            aria-hidden
            className="absolute -right-12 -top-12 pointer-events-none select-none"
          >
            <span className="font-display text-[15rem] leading-none text-[#faf6f1]/[0.05] font-black">
              結
            </span>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-latin text-[10px] italic uppercase tracking-[0.3em] text-[#d4a088]">
                Important
              </span>
              <span className="h-px w-10 bg-[#d4a088]/40" />
            </div>
            <p className="font-display text-2xl md:text-3xl font-[500] leading-[1.3] mb-4">
              この結果、
              <br />
              <span className="italic text-[#d4a088]">忘れないように。</span>
            </p>
            <p className="font-body text-sm text-[#c4b0a0] leading-relaxed mb-8 max-w-md">
              ブラウザを閉じると消えます。
              つつみに保存すれば、お返し期限が近づくとメールでお知らせ。
              パートナーとの共有もできます。
            </p>
            <Link
              href="/sign-up"
              className="group inline-flex items-center gap-3 bg-[#faf6f1] text-[#3a2519] pl-7 pr-3 py-3 rounded-full hover:bg-[#d4a088] transition-all duration-500"
            >
              <span className="text-sm font-medium tracking-wider">
                30秒で保存する
              </span>
              <span className="w-9 h-9 rounded-full bg-[#3a2519] text-[#faf6f1] flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
            <p className="font-latin text-[10px] italic text-[#c4b0a0] mt-4">
              — 完全無料 · Googleログイン対応 · いつでも削除OK
            </p>
          </div>
        </div>
      )}

      {/* 未入力時 */}
      {!rule && (
        <div className="py-16 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4826e]/30" />
              <div className="w-2 h-2 rounded-full border border-[#c4826e]" />
              <span className="h-px w-12 bg-[#c4826e]/30" />
            </div>
          </div>
          <p className="font-display text-base italic text-[#7a6050]">
            イベントを選ぶと、お返しの目安が表示されます。
          </p>
        </div>
      )}
    </div>
  );
}
