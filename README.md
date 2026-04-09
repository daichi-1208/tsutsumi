# つつみ — 贈り物を、大切に包む。

贈答のお付き合いを管理するWebアプリ。現金もギフトも、記録するだけでお返しの時期と金額を教えてくれる。

**本番URL**: https://tsutsumi.app

---

## 技術スタック

| 項目 | サービス | 用途 |
|------|---------|------|
| Framework | Next.js 16 (App Router) | フロントエンド + API |
| ORM | Prisma 7 | DB操作 |
| DB | Supabase (PostgreSQL / 東京リージョン) | データ保存 |
| Auth | Clerk (Production) | Google + メール認証 |
| Email | Resend | リマインド + ウェルカムメール |
| Hosting | Vercel | ホスティング + Cron |
| UI | Tailwind CSS + shadcn/ui | UIコンポーネント |
| Domain | tsutsumi.app | ConoHa DNS |

---

## 機能一覧

### コア機能
- 贈答記録（もらった / あげた）
- 現金 / ギフト 切り替え（ギフトはタグ選択 + 自由入力）
- お返し自動計算（全13種のイベント対応）
- お返しリマインド（期限7日前・1日前にメール通知）
- 連絡先管理（名前・関係・性別・メモ・編集・削除）
- 贈答一覧（メモ表示・削除・お返し済みトグル）
- 相手別やりとり履歴

### ダッシュボード
- サマリーカード（いただいた / お贈りした / お付き合い人数 / お返し達成率）
- 贈答バランスバー
- 品目内訳（現金 / ギフト）
- お返し未済リスト（5件表示 + 全件ページ）
- 最近の記録（5件表示）

### グループ共有
- パーソナル（個人記録）+ グループ（共有記録）の2層設計
- グループ作成 → 招待リンク発行 → パートナー参加
- スコープ切り替えUI（テラコッタ / インディゴ色分け）
- グループメンバー全員にリマインドメール送信

### その他
- LP（和風デザイン・AI生成画像・WebP最適化）
- Google / メール認証（LINE対応予定）
- ウェルカムメール（サインアップ時）
- レスポンシブ（モバイルタブバー・スケルトンローディング）
- 利用規約・プライバシーポリシー・お問い合わせ
- 404・エラーページ
- OGP画像設定

---

## お返し計算ルール（全13種）

| イベント | お返し率 | 時期 |
|---------|---------|------|
| 結婚祝い | 50% | 挙式後1ヶ月 |
| 出産祝い | 30-50% | 生後1ヶ月 |
| 香典 | 50% | 四十九日後 |
| 新築祝い | 1/3〜50% | 入居後1-2ヶ月 |
| お歳暮 / お中元 | 同額 | 2週間 |
| 快気祝い | 50% | 退院後1ヶ月 |
| 餞別 | 1/3〜50% | 着任後1ヶ月 |
| 長寿祝い | 1/3〜50% | お祝い後1ヶ月 |
| 七五三祝い | 不要〜1/3 | — |
| 入学祝い | 不要 | — |
| お年玉 | 不要 | — |
| 誕生日 | 同額（任意） | 相手の誕生日 |

※ 「お返し不要」のイベントでも「それでもお返しする」オプションあり

---

## 環境変数

```env
# Supabase (PostgreSQL)
DATABASE_URL=postgresql://...pooler...6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://...pooler...5432/postgres

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Resend
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=noreply@tsutsumi.app

# Cron
CRON_SECRET=
```

---

## 開発

```bash
npm install
npx prisma generate
npm run dev
```

### マイグレーション

PgBouncer経由だとハングするため、`prisma.config.ts`を一時的にDIRECT_URLに切り替えてから実行:

```bash
# prisma.config.ts の url を process.env["DIRECT_URL"] に変更してから
npx prisma migrate dev --name <migration_name>
# 完了後に DATABASE_URL に戻す
```

---

## DNS設定（ConoHa）

| タイプ | ホスト | 値 |
|--------|--------|-----|
| A | @ | 76.76.21.21 (Vercel) |
| CNAME | clerk | frontend-api.clerk.services |
| CNAME | accounts | accounts.clerk.services |
| CNAME | clkmail | mail.12htaqd9hmc5.clerk.services |
| CNAME | clk._domainkey | dkim1.12htaqd9hmc5.clerk.services |
| CNAME | clk2._domainkey | dkim2.12htaqd9hmc5.clerk.services |
| TXT | resend._domainkey | p=MIGfMA0GCSqGSIb3DQEBA... (Resend DKIM) |
| MX | send | feedback-smtp.ap-northeast-1.amazonses.com (優先度10) |
| TXT | send | v=spf1 include:amazonses.com ~all |

---

## Cron Job

| スケジュール | パス | 内容 |
|-------------|------|------|
| 毎日 0:00 UTC (JST 9:00) | /api/reminders | お返し期限7日前・1日前にメール送信 |

手動実行: `curl https://tsutsumi.app/api/reminders`

---

## 今後のTODO

- [ ] グループからメンバーを外す / グループ削除
- [ ] グループ作成時のカラー / アイコン選択
- [ ] グループ作成数の制限（無料1つ / プレミアム無制限）
- [ ] Stripe課金導線
- [ ] LINEログイン
- [ ] 記録の編集機能
