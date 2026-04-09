import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendReturnReminder } from "@/lib/email";

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  if (CRON_SECRET) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const now = new Date();
  const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const pendingRecords = await prisma.record.findMany({
    where: {
      returnStatus: "PENDING",
      returnDueDate: {
        lte: in7days,
        gte: now,
      },
    },
    include: {
      contact: true,
      user: true,
      group: {
        include: { members: { include: { user: true } } },
      },
    },
  });

  let sentCount = 0;

  for (const record of pendingRecords) {
    if (!record.returnDueDate) continue;

    const daysLeft = Math.ceil(
      (record.returnDueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft !== 7 && daysLeft !== 1) continue;

    // 送信先: グループの場合は全メンバー、パーソナルの場合はユーザー本人
    const recipients = record.group
      ? record.group.members.map((m) => m.user.email).filter(Boolean)
      : [record.user.email].filter(Boolean);

    for (const email of recipients) {
      try {
        await sendReturnReminder({
          to: email,
          contactName: record.contact.name,
          eventType: record.eventType,
          amount: record.amount,
          returnAmount: record.returnAmount,
          dueDate: record.returnDueDate,
        });
        sentCount++;
      } catch (e) {
        console.error(`Failed to send reminder to ${email}:`, e);
      }
    }
  }

  return NextResponse.json({
    ok: true,
    checked: pendingRecords.length,
    sent: sentCount,
    timestamp: now.toISOString(),
  });
}
