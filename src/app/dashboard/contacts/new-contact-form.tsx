"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createContact } from "@/lib/actions";

export function NewContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    if (groupId) formData.set("groupId", groupId);
    startTransition(async () => {
      await createContact(formData);
      router.refresh();
    });
  }

  return (
    <Card className="border-[#efe5da]">
      <CardContent className="pt-5">
        <form action={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              name="name"
              placeholder="名前"
              required
              className="border-[#e8ddd0] rounded-xl"
            />
            <Input
              name="relationship"
              placeholder="関係（親戚・職場・友人）"
              className="border-[#e8ddd0] rounded-xl"
            />
            <div className="relative sm:w-32 shrink-0">
              <select
                name="gender"
                defaultValue=""
                className="h-10 w-full rounded-xl border border-[#e8ddd0] bg-white px-3 text-sm text-[#3a2519] focus:outline-none focus:ring-2 focus:ring-[#c4826e]/30"
              >
                <option value="">選択しない</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>
              <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-[#b0a090]">性別</span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#c4826e] hover:bg-[#a0634f] text-white rounded-xl"
            >
              {isPending ? "追加中..." : "追加"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
