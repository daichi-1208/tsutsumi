"use client";

import { updateReturnStatus } from "@/lib/actions";
import { useTransition } from "react";

export function ReturnStatusToggle({ recordId }: { recordId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(() =>
          updateReturnStatus(recordId, "COMPLETED")
        )
      }
      className="text-xs px-3 py-1.5 rounded-full border border-[#c4826e] text-[#c4826e] hover:bg-[#c4826e] hover:text-white transition-colors disabled:opacity-50"
    >
      {isPending ? "..." : "済みにする"}
    </button>
  );
}
