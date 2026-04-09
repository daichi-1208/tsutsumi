export default function RecordsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-[#efe5da] rounded-lg" />
        <div className="h-10 w-24 bg-[#efe5da] rounded-full" />
      </div>
      <div className="bg-white rounded-2xl border border-[#efe5da] p-4 space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 bg-[#fef8f3] rounded-xl" />
        ))}
      </div>
    </div>
  );
}
