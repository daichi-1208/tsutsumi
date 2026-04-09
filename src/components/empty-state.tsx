export function EmptyState({
  message,
  children,
}: {
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="py-12 text-center">
      {/* 風呂敷の結び目イラスト */}
      <svg
        viewBox="0 0 120 120"
        className="w-20 h-20 mx-auto mb-5 opacity-20"
        fill="none"
        stroke="#c4826e"
        strokeWidth="1.5"
      >
        <circle cx="60" cy="60" r="45" strokeDasharray="4 4" />
        <path d="M60 35 Q45 20 40 35 Q35 50 60 45 Q85 50 80 35 Q75 20 60 35Z" />
        <path d="M55 45 L45 75 M65 45 L75 75" />
        <circle cx="60" cy="40" r="5" fill="#c4826e" opacity="0.15" />
      </svg>
      <p className="text-[#7a6050] mb-4">{message}</p>
      {children}
    </div>
  );
}
