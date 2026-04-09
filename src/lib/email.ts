import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function sendReturnReminder({
  to,
  contactName,
  eventType,
  amount,
  returnAmount,
  dueDate,
}: {
  to: string;
  contactName: string;
  eventType: string;
  amount: number | null;
  returnAmount: number | null;
  dueDate: Date;
}) {
  const dueDateStr = dueDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  await resend.emails.send({
    from: `つつみ <${FROM_EMAIL}>`,
    to,
    subject: `【つつみ】${contactName}さんへのお返し期限が近づいています`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #3a2519; font-size: 18px;">お返しリマインド</h2>
        <div style="background: #fef8f3; border-radius: 12px; padding: 16px; margin: 16px 0;">
          <p style="margin: 0 0 8px; color: #3a2519; font-weight: bold;">${contactName}さん</p>
          <p style="margin: 0 0 4px; color: #7a6050; font-size: 14px;">
            ${eventType}${amount ? ` ・ ¥${amount.toLocaleString()}` : ""}
          </p>
          ${returnAmount ? `<p style="margin: 0 0 4px; color: #c4826e; font-size: 14px;">お返し目安: ¥${returnAmount.toLocaleString()}</p>` : ""}
          <p style="margin: 0; color: #c4826e; font-size: 14px; font-weight: bold;">
            期限: ${dueDateStr}
          </p>
        </div>
        <p style="color: #7a6050; font-size: 13px;">
          つつみで確認する →
          <a href="https://tsutsumi.app/dashboard" style="color: #c4826e;">ダッシュボード</a>
        </p>
        <hr style="border: none; border-top: 1px solid #efe5da; margin: 24px 0;" />
        <p style="color: #b0a090; font-size: 11px;">
          つつみ — 贈り物を、大切に包む。
        </p>
      </div>
    `,
  });
}
