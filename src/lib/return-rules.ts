/** お返し計算ルール（全13種） */

export type ReturnRule = {
  label: string;
  returnRate: number | null; // null = 不要
  returnRateMax?: number; // 範囲がある場合の上限
  dueDays: number | null; // null = 不要, 日数で指定
  note: string;
};

export const EVENT_TYPES: Record<string, ReturnRule> = {
  結婚祝い: {
    label: "結婚祝い",
    returnRate: 0.5,
    dueDays: 30,
    note: "目上からは1/3返しでもOK",
  },
  出産祝い: {
    label: "出産祝い",
    returnRate: 0.3,
    returnRateMax: 0.5,
    dueDays: 30,
    note: "お宮参りの頃が目安",
  },
  入学祝い: {
    label: "入学祝い",
    returnRate: null,
    dueDays: null,
    note: "お返し不要。お礼状のみ",
  },
  お歳暮: {
    label: "お歳暮",
    returnRate: 1.0,
    dueDays: 14,
    note: "お礼状だけでもOK",
  },
  お中元: {
    label: "お中元",
    returnRate: 1.0,
    dueDays: 14,
    note: "お礼状だけでもOK",
  },
  香典: {
    label: "香典",
    returnRate: 0.5,
    dueDays: 49,
    note: "四十九日後。当日返しもあり",
  },
  快気祝い: {
    label: "快気祝い",
    returnRate: 0.5,
    dueDays: 30,
    note: "退院後1ヶ月が目安",
  },
  お年玉: {
    label: "お年玉",
    returnRate: null,
    dueDays: null,
    note: "お返し不要",
  },
  誕生日: {
    label: "誕生日",
    returnRate: 1.0,
    dueDays: null,
    note: "相手の誕生日に同額程度。任意",
  },
  新築祝い: {
    label: "新築祝い",
    returnRate: 0.33,
    returnRateMax: 0.5,
    dueDays: 60,
    note: "入居後1〜2ヶ月。新居お披露目でも可",
  },
  七五三祝い: {
    label: "七五三祝い",
    returnRate: null,
    returnRateMax: 0.33,
    dueDays: null,
    note: "不要〜1/3。内祝いの品を贈る程度",
  },
  餞別: {
    label: "餞別",
    returnRate: 0.33,
    returnRateMax: 0.5,
    dueDays: 30,
    note: "新天地着任後1ヶ月。転勤・退職時",
  },
  長寿祝い: {
    label: "長寿祝い（還暦等）",
    returnRate: 0.33,
    returnRateMax: 0.5,
    dueDays: 30,
    note: "還暦・古希・喜寿・傘寿等",
  },
};

export const EVENT_TYPE_LIST = Object.keys(EVENT_TYPES);

/**
 * お返し金額を計算
 */
export function calcReturnAmount(
  eventType: string,
  amount: number
): { min: number; max: number } | null {
  const rule = EVENT_TYPES[eventType];
  if (!rule || rule.returnRate === null) return null;

  const min = Math.round(amount * rule.returnRate);
  const max = rule.returnRateMax
    ? Math.round(amount * rule.returnRateMax)
    : min;

  return { min, max };
}

/**
 * お返し期限日を計算
 */
export function calcReturnDueDate(
  eventType: string,
  receivedDate: Date
): Date | null {
  const rule = EVENT_TYPES[eventType];
  if (!rule || rule.dueDays === null) return null;

  const due = new Date(receivedDate);
  due.setDate(due.getDate() + rule.dueDays);
  return due;
}

/**
 * お返しが必要かどうか
 */
export function isReturnNeeded(eventType: string): boolean {
  const rule = EVENT_TYPES[eventType];
  return rule?.returnRate !== null;
}
