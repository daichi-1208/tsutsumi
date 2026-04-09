"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { RecordType, ReturnStatus } from "@/generated/prisma/client";
import {
  calcReturnAmount,
  calcReturnDueDate,
  isReturnNeeded,
} from "@/lib/return-rules";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { sendWelcomeEmail } from "@/lib/email";

// ─── ユーザー同期 ───

export async function ensureUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let user = await prisma.user.findUnique({ where: { clerkId: userId } });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Clerk user not found");

    const name =
      `${clerkUser.lastName ?? ""} ${clerkUser.firstName ?? ""}`.trim() ||
      clerkUser.emailAddresses[0]?.emailAddress ||
      "ユーザー";
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";

    // createで作成試行。既に存在する場合（並行リクエスト）はfindUniqueにフォールバック
    let isNewUser = false;
    try {
      user = await prisma.user.create({
        data: { clerkId: userId, name, email },
      });
      isNewUser = true;
    } catch {
      user = await prisma.user.findUnique({ where: { clerkId: userId } });
      if (!user) throw new Error("User creation failed");
    }

    // ウェルカムメール（新規作成時のみ。重複送信を防ぐ）
    if (isNewUser && email) {
      sendWelcomeEmail({ to: email, name }).catch(() => {});
    }
  }

  return user;
}

/** 現在のスコープ（パーソナル or グループ）で使えるcontact/recordのwhere条件 */
async function scopeWhere(groupId?: string | null) {
  const user = await ensureUser();
  if (groupId) {
    // グループメンバーか確認
    const membership = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: user.id } },
    });
    if (!membership) throw new Error("このグループのメンバーではありません");
    return { groupId };
  }
  // パーソナル
  return { userId: user.id, groupId: null };
}

// ─── 連絡先 ───

export async function getContacts(groupId?: string | null) {
  const where = await scopeWhere(groupId);

  return prisma.contact.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { records: true } },
    },
  });
}

export async function createContact(formData: FormData) {
  const user = await ensureUser();
  const groupId = formData.get("groupId") as string | null;

  const name = formData.get("name") as string;
  const relationship = formData.get("relationship") as string;
  const gender = formData.get("gender") as string;
  const memo = formData.get("memo") as string;

  if (!name?.trim()) throw new Error("名前は必須です");

  await prisma.contact.create({
    data: {
      userId: user.id,
      groupId: groupId || null,
      name: name.trim(),
      relationship: relationship || null,
      gender: gender || null,
      memo: memo || null,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/contacts");
}

export async function getContact(id: string) {
  const user = await ensureUser();

  return prisma.contact.findFirst({
    where: {
      id,
      OR: [
        { userId: user.id },
        { group: { members: { some: { userId: user.id } } } },
      ],
    },
    include: {
      records: { orderBy: { date: "desc" } },
    },
  });
}

export async function updateContact(contactId: string, formData: FormData) {
  const user = await ensureUser();

  const name = formData.get("name") as string;
  const relationship = formData.get("relationship") as string;
  const gender = formData.get("gender") as string;
  const memo = formData.get("memo") as string;

  if (!name?.trim()) throw new Error("名前は必須です");

  // 権限チェック: 自分の連絡先 or 所属グループの連絡先
  const contact = await prisma.contact.findFirst({
    where: {
      id: contactId,
      OR: [
        { userId: user.id },
        { group: { members: { some: { userId: user.id } } } },
      ],
    },
  });
  if (!contact) throw new Error("連絡先が見つかりません");

  await prisma.contact.update({
    where: { id: contactId },
    data: {
      name: name.trim(),
      relationship: relationship || null,
      gender: gender || null,
      memo: memo || null,
    },
  });

  revalidatePath("/dashboard/contacts");
}

export async function deleteContact(contactId: string) {
  const user = await ensureUser();

  const contact = await prisma.contact.findFirst({
    where: {
      id: contactId,
      OR: [
        { userId: user.id },
        { group: { members: { some: { userId: user.id } } } },
      ],
    },
  });
  if (!contact) throw new Error("連絡先が見つかりません");

  await prisma.record.deleteMany({ where: { contactId } });
  await prisma.contact.delete({ where: { id: contactId } });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/contacts");
}

// ─── 贈答記録 ───

export async function getRecords(groupId?: string | null) {
  const where = await scopeWhere(groupId);

  return prisma.record.findMany({
    where,
    orderBy: { date: "desc" },
    include: { contact: true },
  });
}

export async function getPendingReturns(groupId?: string | null) {
  const where = await scopeWhere(groupId);

  return prisma.record.findMany({
    where: {
      ...where,
      type: RecordType.RECEIVED,
      returnStatus: ReturnStatus.PENDING,
    },
    orderBy: { returnDueDate: "asc" },
    include: { contact: true },
  });
}

export async function createRecord(formData: FormData) {
  const user = await ensureUser();
  const groupId = formData.get("groupId") as string | null;

  const contactId = formData.get("contactId") as string;
  const type = formData.get("type") as string;
  const eventType = formData.get("eventType") as string;
  const amountStr = formData.get("amount") as string;
  const amount = amountStr ? parseInt(amountStr, 10) : null;
  const itemName = formData.get("itemName") as string;
  const date = formData.get("date") as string;
  const memo = formData.get("memo") as string;
  const forceReturn = formData.get("forceReturn") === "true";

  if (!contactId || !type || !eventType || !date) {
    throw new Error("必須項目を入力してください");
  }

  const recordType =
    type === "received" ? RecordType.RECEIVED : RecordType.GIVEN;

  let returnStatus: ReturnStatus = ReturnStatus.NOT_NEEDED;
  let returnDueDate: Date | null = null;
  let returnAmount: number | null = null;

  if (recordType === RecordType.RECEIVED) {
    const needed = isReturnNeeded(eventType) || forceReturn;
    returnStatus = needed ? ReturnStatus.PENDING : ReturnStatus.NOT_NEEDED;
    if (needed) {
      returnDueDate = calcReturnDueDate(eventType, new Date(date))
        ?? new Date(new Date(date).getTime() + 30 * 24 * 60 * 60 * 1000); // forceReturn時はデフォルト30日
    }
    if (amount) {
      const calc = calcReturnAmount(eventType, amount);
      returnAmount = calc ? calc.min : null;
    }
  }

  await prisma.record.create({
    data: {
      userId: user.id,
      groupId: groupId || null,
      contactId,
      type: recordType,
      eventType,
      amount,
      itemName: itemName || null,
      date: new Date(date),
      returnStatus,
      returnDueDate,
      returnAmount,
      memo: memo || null,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/records");
}

export async function deleteRecord(recordId: string) {
  const user = await ensureUser();

  const record = await prisma.record.findFirst({
    where: {
      id: recordId,
      OR: [
        { userId: user.id },
        { group: { members: { some: { userId: user.id } } } },
      ],
    },
  });
  if (!record) throw new Error("記録が見つかりません");

  await prisma.record.delete({ where: { id: recordId } });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/records");
}

export async function updateReturnStatus(recordId: string, status: string) {
  const user = await ensureUser();

  const record = await prisma.record.findFirst({
    where: {
      id: recordId,
      OR: [
        { userId: user.id },
        { group: { members: { some: { userId: user.id } } } },
      ],
    },
  });
  if (!record) throw new Error("記録が見つかりません");

  await prisma.record.update({
    where: { id: recordId },
    data: { returnStatus: status as ReturnStatus },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/records");
}

export async function getPastItemNames(groupId?: string | null) {
  const where = await scopeWhere(groupId);

  const records = await prisma.record.findMany({
    where: { ...where, itemName: { not: null } },
    select: { itemName: true },
    distinct: ["itemName"],
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return records.map((r) => r.itemName!).filter(Boolean);
}

// ─── グループ ───

export async function getMyGroups() {
  const user = await ensureUser();

  return prisma.group.findMany({
    where: { members: { some: { userId: user.id } } },
    include: {
      members: { include: { user: true } },
      owner: true,
      _count: { select: { records: true, contacts: true } },
    },
  });
}

export async function createGroup(formData: FormData) {
  const user = await ensureUser();
  const name = formData.get("name") as string;

  if (!name?.trim()) throw new Error("グループ名は必須です");

  // 1人1グループまで
  const existing = await prisma.groupMember.findFirst({
    where: { userId: user.id },
  });
  if (existing) throw new Error("グループは1つまでです");

  const group = await prisma.group.create({
    data: {
      name: name.trim(),
      inviteCode: crypto.randomBytes(8).toString("hex"),
      ownerId: user.id,
      members: {
        create: { userId: user.id },
      },
    },
  });

  revalidatePath("/dashboard/settings");
  return group;
}

export async function joinGroup(inviteCode: string) {
  const user = await ensureUser();

  const group = await prisma.group.findUnique({
    where: { inviteCode },
    include: { members: true },
  });

  if (!group) throw new Error("招待コードが無効です");

  const alreadyMember = group.members.some((m) => m.userId === user.id);
  if (alreadyMember) return group;

  if (group.members.length >= 2) {
    throw new Error("このグループは定員（2人）に達しています");
  }

  await prisma.groupMember.create({
    data: { groupId: group.id, userId: user.id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  return group;
}

export async function getGroupInfo(inviteCode: string) {
  return prisma.group.findUnique({
    where: { inviteCode },
    include: {
      owner: true,
      members: { include: { user: true } },
    },
  });
}

export async function regenerateInviteCode(groupId: string) {
  const user = await ensureUser();

  const group = await prisma.group.findFirst({
    where: { id: groupId, ownerId: user.id },
  });
  if (!group) throw new Error("権限がありません");

  await prisma.group.update({
    where: { id: groupId },
    data: { inviteCode: crypto.randomBytes(8).toString("hex") },
  });

  revalidatePath("/dashboard/settings");
}
