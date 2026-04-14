export default function DashboardLoading() {
  return (
    <div className="space-y-14 animate-pulse">
      <div className="space-y-4">
        <div className="h-3 w-24 bg-[#3a2519]/10" />
        <div className="h-12 w-80 bg-[#3a2519]/10" />
        <div className="h-4 w-64 bg-[#3a2519]/8" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#3a2519]/10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#faf6f1] h-32" />
        ))}
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-[#3a2519]/5 border-b border-[#3a2519]/10" />
        ))}
      </div>
    </div>
  );
}
