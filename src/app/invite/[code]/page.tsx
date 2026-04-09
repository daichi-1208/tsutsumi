import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getGroupInfo } from "@/lib/actions";
import { AcceptInvite } from "./accept-invite";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const { userId } = await auth();

  const group = await getGroupInfo(code);

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6f1] px-5">
        <div className="bg-white rounded-2xl border border-[#efe5da] p-8 max-w-sm text-center">
          <p className="text-lg font-bold text-[#3a2519] mb-2">
            招待リンクが無効です
          </p>
          <p className="text-sm text-[#7a6050]">
            リンクが期限切れか、間違っている可能性があります。
          </p>
        </div>
      </div>
    );
  }

  if (group.members.length >= 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6f1] px-5">
        <div className="bg-white rounded-2xl border border-[#efe5da] p-8 max-w-sm text-center">
          <p className="text-lg font-bold text-[#3a2519] mb-2">
            定員に達しています
          </p>
          <p className="text-sm text-[#7a6050]">
            このグループは既に2人が参加しています。
          </p>
        </div>
      </div>
    );
  }

  if (!userId) {
    redirect(`/sign-up?redirect_url=/invite/${code}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f1] px-5">
      <div className="bg-white rounded-2xl border border-[#efe5da] p-8 max-w-sm text-center">
        <Image
          src="/logo.png"
          alt="つつみ"
          width={64}
          height={64}
          className="w-16 h-16 rounded-2xl mx-auto mb-6"
        />
        <p className="text-lg font-bold text-[#3a2519] mb-2">
          {group.owner.name}さんからの招待
        </p>
        <p className="text-sm text-[#7a6050] mb-6">
          「{group.name}」に参加して、
          <br />
          贈答記録を一緒に管理しましょう。
        </p>
        <AcceptInvite inviteCode={code} />
      </div>
    </div>
  );
}
