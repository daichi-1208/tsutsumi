import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
}

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  await getResend().emails.send({
    from: `つつみ <${getFromEmail()}>`,
    to,
    subject: "つつみへようこそ — 贈り物を、大切に包む。",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #3a2519; font-size: 20px;">ようこそ、${name}さん</h2>
        <p style="color: #7a6050; font-size: 14px; line-height: 1.8;">
          つつみへのご登録ありがとうございます。
        </p>
        <div style="background: #fef8f3; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px; color: #3a2519; font-weight: bold; font-size: 14px;">つつみでできること</p>
          <ul style="margin: 0; padding-left: 20px; color: #7a6050; font-size: 13px; line-height: 1.8;">
            <li>贈答のやりとりをかんたん記録</li>
            <li>お返し金額・時期を自動計算（全13種対応）</li>
            <li>期限が近づいたらメールでお知らせ</li>
            <li>グループを作ってパートナーと共有</li>
          </ul>
        </div>
        <a href="https://tsutsumi.app/dashboard" style="display: inline-block; background: #c4826e; color: white; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 14px; font-weight: bold;">
          さっそく記録をつける →
        </a>
        <hr style="border: none; border-top: 1px solid #efe5da; margin: 24px 0;" />
        <p style="color: #b0a090; font-size: 11px;">
          つつみ — 贈り物を、大切に包む。<br />
          <a href="https://tsutsumi.app" style="color: #c4826e;">tsutsumi.app</a>
        </p>
      </div>
    `,
  });
}

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

  await getResend().emails.send({
    from: `つつみ <${getFromEmail()}>`,
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
