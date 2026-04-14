"use client";

import { updateReturnStatus } from "@/lib/actions";
import { useTransition } from "react";

export function ReturnStatusToggle({ recordId }: { recordId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(() => updateReturnStatus(recordId, "COMPLETED"))
      }
      className="font-latin text-[10px] italic uppercase tracking-[0.2em] text-[#c4826e] hover:text-[#a0634f] transition-colors disabled:opacity-50 whitespace-nowrap"
    >
      {isPending ? "..." : "Mark as done →"}
    </button>
  );
}
