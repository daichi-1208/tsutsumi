import { getMyGroups } from "@/lib/actions";
import { InviteLinkCard } from "./invite-link-card";
import { CreateGroupForm } from "./create-group-form";
import { PageHeader, SectionHeader } from "@/components/editorial";

export default async function SettingsPage() {
  const groups = await getMyGroups();

  return (
    <div>
      <PageHeader
        chapter="No. 肆"
        eyebrow="Settings"
        title="設定と、"
        accent="共有。"
        description="パートナーと記録を一緒に管理できます。"
      />

      <section className="mb-14">
        <SectionHeader eyebrow="Groups" title="共有グループ。" />

        {groups.length === 0 ? (
          <p className="font-display text-sm italic text-[#7a6050] mb-8">
            まだグループがありません。
            <br />
            パートナーと一緒に管理したい場合は、グループを作成してください。
          </p>
        ) : (
          <div className="space-y-8 mb-8">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white/60 border border-[#3a2519]/15 p-6 md:p-8"
              >
                {/* グループヘッダー */}
                <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-[#3a2519]/10">
                  <div>
                    <p className="font-display text-xl font-[500] text-[#3a2519] mb-1">
                      {group.name}
                    </p>
                    <p className="font-latin text-[10px] italic text-[#7a6050] uppercase tracking-wider">
                      {group._count.contacts} contacts · {group._count.records} records
                    </p>
                  </div>
                </div>

                {/* メンバー */}
                <div className="mb-6">
                  <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-[#c4826e] mb-4">
                    Members
                  </p>
                  <div className="space-y-3">
                    {group.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-4"
                      >
                        <div className="w-9 h-9 bg-gradient-to-br from-[#c4826e] to-[#a0634f] text-[#faf6f1] flex items-center justify-center font-display text-sm font-[500]">
                          {member.user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-[#3a2519] truncate flex items-center gap-2">
                            {member.user.name}
                            {member.user.id === group.ownerId && (
                              <span className="font-latin text-[9px] italic uppercase tracking-widest text-[#c4826e]">
                                owner
                              </span>
                            )}
                          </p>
                          <p className="font-body text-[11px] text-[#7a6050] truncate">
                            {member.user.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 招待 or 共有中 */}
                {group.members.length < 2 ? (
                  <div className="pt-5 border-t border-[#3a2519]/10">
                    <InviteLinkCard
                      inviteCode={group.inviteCode}
                      groupId={group.id}
                    />
                  </div>
                ) : (
                  <div className="pt-5 border-t border-[#3a2519]/10">
                    <p className="font-display text-sm italic text-[#5a9e6f] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5a9e6f]" />
                      パートナーと共有中
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {groups.length === 0 && <CreateGroupForm />}
      </section>
    </div>
  );
}
