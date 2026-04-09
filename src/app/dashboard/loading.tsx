export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-[#efe5da] rounded-lg" />
        <div className="h-10 w-24 bg-[#efe5da] rounded-full" />
      </div>
      <div className="bg-white rounded-2xl border border-[#efe5da] p-6 space-y-4">
        <div className="h-5 w-32 bg-[#efe5da] rounded" />
        <div className="space-y-3">
          <div className="h-16 bg-[#fef8f3] rounded-xl" />
          <div className="h-16 bg-[#fef8f3] rounded-xl" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#efe5da] p-6 space-y-4">
        <div className="h-5 w-28 bg-[#efe5da] rounded" />
        <div className="space-y-2">
          <div className="h-14 bg-[#fef8f3] rounded-xl" />
          <div className="h-14 bg-[#fef8f3] rounded-xl" />
          <div className="h-14 bg-[#fef8f3] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
