import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyGroups } from "@/lib/actions";
import { InviteLinkCard } from "./invite-link-card";
import { CreateGroupForm } from "./create-group-form";

export default async function SettingsPage() {
  const groups = await getMyGroups();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#3a2519]">設定</h1>

      {/* グループ一覧 */}
      <Card className="border-[#efe5da]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-[#3a2519]">
            共有グループ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {groups.length === 0 ? (
            <p className="text-sm text-[#7a6050]">
              まだグループがありません。パートナーと一緒に管理したい場合はグループを作成してください。
            </p>
          ) : (
            groups.map((group) => (
              <div
                key={group.id}
                className="p-4 bg-[#fef8f3] rounded-xl border border-[#f5ede5] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#3a2519]">{group.name}</p>
                    <p className="text-xs text-[#7a6050] mt-0.5">
                      {group._count.contacts}人の連絡先 ・ {group._count.records}件の記録
                    </p>
                  </div>
                </div>

                {/* メンバー */}
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-[#b0a090] uppercase tracking-wider">
                    メンバー
                  </p>
                  {group.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-2 bg-white rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c4826e] to-[#a0634f] flex items-center justify-center text-white text-xs font-bold">
                        {member.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#3a2519]">
                          {member.user.name}
                          {member.user.id === group.ownerId && (
                            <span className="ml-1.5 text-[10px] text-[#c4826e] bg-[#fef0ea] px-1.5 py-0.5 rounded-full">
                              オーナー
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-[#7a6050]">{member.user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 招待リンク（2人未満の場合） */}
                {group.members.length < 2 && (
                  <InviteLinkCard inviteCode={group.inviteCode} groupId={group.id} />
                )}
                {group.members.length >= 2 && (
                  <p className="text-xs text-[#5a9e6f] bg-[#e8f5e9] px-3 py-2 rounded-lg">
                    パートナーと共有中
                  </p>
                )}
              </div>
            ))
          )}

          {/* グループ作成（まだグループがない場合のみ） */}
          {groups.length === 0 && <CreateGroupForm />}
        </CardContent>
      </Card>
    </div>
  );
}
