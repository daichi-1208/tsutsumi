/** つつみ LP用 SVGイラスト・装飾コンポーネント */

/* ─── ヒーロー: 風呂敷に包まれた贈り物 ─── */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 400" fill="none" className={className} aria-hidden>
      {/* 影 */}
      <ellipse cx="240" cy="370" rx="140" ry="16" fill="#3a2519" opacity="0.06" />

      {/* 風呂敷（背面の布） */}
      <path
        d="M120 180 Q100 120 160 100 Q200 85 240 90 Q280 85 320 100 Q380 120 360 180 Q370 250 340 300 Q300 340 240 345 Q180 340 140 300 Q110 250 120 180Z"
        fill="url(#furoshiki-gradient)"
        opacity="0.9"
      />
      {/* 風呂敷の光沢 */}
      <path
        d="M160 130 Q200 110 240 115 Q260 118 270 130 Q240 120 200 125 Q175 130 160 140Z"
        fill="white"
        opacity="0.15"
      />

      {/* 贈り物の箱 */}
      <rect x="170" y="150" width="140" height="110" rx="8" fill="#fff" stroke="#e8ddd0" strokeWidth="2" />
      <rect x="170" y="150" width="140" height="110" rx="8" fill="url(#box-gradient)" opacity="0.5" />

      {/* のし紙の帯 */}
      <rect x="225" y="145" width="30" height="120" fill="#c4826e" rx="2" />
      <rect x="225" y="145" width="30" height="120" fill="url(#noshi-shine)" opacity="0.3" />

      {/* 水引（蝶結び） */}
      <g transform="translate(240, 175)">
        {/* 左の輪 */}
        <path d="M0 0 Q-30 -15 -25 5 Q-20 20 0 10" stroke="#c4826e" strokeWidth="2.5" fill="none" />
        <path d="M0 0 Q-28 -12 -23 7 Q-18 22 0 12" stroke="#d4a088" strokeWidth="1.5" fill="none" />
        {/* 右の輪 */}
        <path d="M0 0 Q30 -15 25 5 Q20 20 0 10" stroke="#c4826e" strokeWidth="2.5" fill="none" />
        <path d="M0 0 Q28 -12 23 7 Q18 22 0 12" stroke="#d4a088" strokeWidth="1.5" fill="none" />
        {/* 垂れ */}
        <path d="M-2 10 L-15 45" stroke="#c4826e" strokeWidth="2" fill="none" />
        <path d="M2 10 L15 45" stroke="#c4826e" strokeWidth="2" fill="none" />
        {/* 中心の結び */}
        <circle cx="0" cy="5" r="4" fill="#c4826e" />
      </g>

      {/* 風呂敷の結び（上部） */}
      <g transform="translate(240, 100)">
        <path d="M-5 0 Q-40 -30 -50 -15 Q-55 -5 -35 0 Q-20 3 -5 0" fill="#b86b56" />
        <path d="M5 0 Q40 -30 50 -15 Q55 -5 35 0 Q20 3 5 0" fill="#c4826e" />
        <path d="M-5 0 Q-15 -40 0 -45 Q15 -40 5 0" fill="#a0634f" />
        {/* 結び目のハイライト */}
        <ellipse cx="0" cy="-25" rx="5" ry="8" fill="white" opacity="0.1" />
      </g>

      {/* 小さな花の装飾 */}
      <g transform="translate(340, 140)" opacity="0.6">
        <circle cx="0" cy="0" r="4" fill="#f0c8b8" />
        <circle cx="8" cy="-4" r="3" fill="#f0c8b8" />
        <circle cx="5" cy="7" r="3" fill="#f0c8b8" />
      </g>
      <g transform="translate(130, 160)" opacity="0.5">
        <circle cx="0" cy="0" r="3" fill="#f0c8b8" />
        <circle cx="-6" cy="4" r="2.5" fill="#f0c8b8" />
        <circle cx="5" cy="5" r="2.5" fill="#f0c8b8" />
      </g>

      {/* グラデーション定義 */}
      <defs>
        <linearGradient id="furoshiki-gradient" x1="120" y1="90" x2="360" y2="345">
          <stop offset="0%" stopColor="#d4a088" />
          <stop offset="50%" stopColor="#c4826e" />
          <stop offset="100%" stopColor="#a0634f" />
        </linearGradient>
        <linearGradient id="box-gradient" x1="170" y1="150" x2="310" y2="260">
          <stop offset="0%" stopColor="#fef8f3" />
          <stop offset="100%" stopColor="#f5ede5" />
        </linearGradient>
        <linearGradient id="noshi-shine" x1="225" y1="145" x2="255" y2="145">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── 水引ディバイダー ─── */
export function MizuhikiDivider() {
  return (
    <div className="flex items-center justify-center py-6" aria-hidden>
      <svg width="240" height="28" viewBox="0 0 240 28" fill="none">
        <path d="M0 14 Q60 0 120 14 T240 14" stroke="#c4826e" strokeWidth="1.5" fill="none" />
        <path d="M0 16 Q60 2 120 16 T240 16" stroke="#d4a088" strokeWidth="1" fill="none" />
        <path d="M0 12 Q60 -2 120 12 T240 12" stroke="#b0735f" strokeWidth="1" fill="none" />
        <circle cx="120" cy="14" r="3.5" fill="#c4826e" opacity="0.7" />
        <circle cx="120" cy="14" r="1.5" fill="#fef0ea" />
      </svg>
    </div>
  );
}

/* ─── 麻の葉文様背景 ─── */
export function AsanohaPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute pointer-events-none ${className}`} width="100%" height="100%" aria-hidden>
      <defs>
        <pattern id="asanoha" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M24 0 L48 24 L24 48 L0 24 Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <path d="M24 0 L24 48 M0 24 L48 24" stroke="currentColor" strokeWidth="0.25" />
          <path d="M0 0 L48 48 M48 0 L0 48" stroke="currentColor" strokeWidth="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#asanoha)" />
    </svg>
  );
}

/* ─── 波紋グラデーション背景 ─── */
export function WaveBackground({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0,160 C360,100 720,220 1080,160 C1260,130 1360,180 1440,160 L1440,320 L0,320Z"
        fill="url(#wave-fill)"
        opacity="0.5"
      />
      <path
        d="M0,200 C360,150 720,250 1080,200 C1260,180 1360,220 1440,200 L1440,320 L0,320Z"
        fill="url(#wave-fill)"
        opacity="0.3"
      />
      <defs>
        <linearGradient id="wave-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4826e" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#c4826e" stopOpacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── 浮遊する贈り物パーティクル ─── */
export function FloatingGifts({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden>
      {/* 小さなギフトボックス群 */}
      <svg viewBox="0 0 600 400" className="w-full h-full" fill="none">
        {/* 封筒1 */}
        <g transform="translate(80, 60) rotate(-12)" opacity="0.12">
          <rect width="50" height="36" rx="3" fill="#c4826e" />
          <path d="M0 0 L25 20 L50 0" stroke="#a0634f" strokeWidth="1.5" fill="none" />
        </g>
        {/* ギフトボックス1 */}
        <g transform="translate(500, 40) rotate(8)" opacity="0.10">
          <rect x="0" y="8" width="40" height="32" rx="3" fill="#d4a088" />
          <rect x="0" y="0" width="40" height="10" rx="2" fill="#c4826e" />
          <rect x="17" y="0" width="6" height="40" fill="#a0634f" opacity="0.4" />
        </g>
        {/* ハート */}
        <g transform="translate(150, 300)" opacity="0.08">
          <path d="M20 8 Q20 0 14 0 Q8 0 8 8 Q8 0 2 0 Q-4 0 -4 8 Q-4 18 8 26 Q20 18 20 8Z" fill="#c4826e" transform="scale(1.5)" />
        </g>
        {/* 封筒2 */}
        <g transform="translate(450, 320) rotate(15)" opacity="0.09">
          <rect width="44" height="30" rx="3" fill="#b0735f" />
          <path d="M0 0 L22 16 L44 0" stroke="#8b5e3c" strokeWidth="1" fill="none" />
        </g>
        {/* リボン */}
        <g transform="translate(550, 200)" opacity="0.10">
          <path d="M0 10 Q-12 -5 -8 10 Q-4 20 0 10 Q4 20 8 10 Q12 -5 0 10" fill="#c4826e" />
          <path d="M-2 10 L-6 28 M2 10 L6 28" stroke="#c4826e" strokeWidth="1.5" />
        </g>
        {/* 小花 */}
        <g transform="translate(60, 200)" opacity="0.07">
          <circle cx="0" cy="-8" r="5" fill="#d4a088" />
          <circle cx="7" cy="-3" r="5" fill="#d4a088" />
          <circle cx="5" cy="6" r="5" fill="#d4a088" />
          <circle cx="-5" cy="6" r="5" fill="#d4a088" />
          <circle cx="-7" cy="-3" r="5" fill="#d4a088" />
          <circle cx="0" cy="0" r="4" fill="#c4826e" />
        </g>
      </svg>
    </div>
  );
}

/* ─── CTA セクション装飾 ─── */
export function CtaDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* 左の風呂敷ドレープ */}
      <svg className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="#c4826e" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="70" stroke="#c4826e" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="50" stroke="#c4826e" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="30" stroke="#c4826e" strokeWidth="0.5" />
      </svg>
      {/* 右の放射状装飾 */}
      <svg className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 90 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={100 + 90 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke="#c4826e"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}
