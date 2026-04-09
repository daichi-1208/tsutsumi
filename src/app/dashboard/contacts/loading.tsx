export default function ContactsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-24 bg-[#efe5da] rounded-lg" />
      <div className="bg-white rounded-2xl border border-[#efe5da] p-5">
        <div className="flex gap-3">
          <div className="h-10 flex-1 bg-[#fef8f3] rounded-xl" />
          <div className="h-10 flex-1 bg-[#fef8f3] rounded-xl" />
          <div className="h-10 w-16 bg-[#efe5da] rounded-xl" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#efe5da] p-4 space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 bg-[#fef8f3] rounded-xl" />
        ))}
      </div>
    </div>
  );
}
