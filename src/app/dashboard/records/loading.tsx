export default function RecordsLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="space-y-4">
        <div className="h-3 w-24 bg-[#3a2519]/10" />
        <div className="h-12 w-72 bg-[#3a2519]/10" />
      </div>
      <div className="space-y-0 border-t border-[#3a2519]/15">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 border-b border-[#3a2519]/10" />
        ))}
      </div>
    </div>
  );
}
