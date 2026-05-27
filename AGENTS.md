# プロジェクト概要

Next.js App Router + Prisma + SQLite による Todo アプリのサンプル。
Server Components / Server Actions / DAL パターンの実装例として使用する。

## 技術スタック

| 項目    | バージョン | 備考                                        |
| ------- | ---------- | ------------------------------------------- |
| Node.js | v20        | `/opt/homebrew/opt/node@20/bin/node` を使用 |
| Next.js | 16.2.6     | App Router                                  |
| React   | 19.2.4     |                                             |
| Prisma  | 7.8.0      | **v7 は破壊的変更あり（後述）**             |
| SQLite  | —          | ファイル: `dev.db`（プロジェクトルート）    |

## コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# DB スキーマ変更後のマイグレーション
npx prisma migrate dev --name <名前>

# Prisma Client 再生成
npx prisma generate
```

## ディレクトリ構成

```
src/
├── lib/
│   ├── db.ts              # Prisma クライアントのシングルトン
│   └── dal/
│       └── todos.ts       # DB アクセス層 (DAL)
├── app/
│   ├── actions/
│   │   └── todos.ts       # Server Actions ('use server')
│   └── page.tsx           # Server Component (トップページ)
└── components/
    ├── TodoForm.tsx        # Client Component ('use client')
    └── TodoItem.tsx        # Client Component ('use client')
prisma/
└── schema.prisma          # DB スキーマ定義
```

## アーキテクチャの原則

- **読み取り**: Server Components が DAL を直接呼び出す。API Route は使わない。
- **書き込み**: Server Actions (`app/actions/`) 経由。完了後に `revalidatePath('/')` を呼ぶ。
- **DB アクセス**: 必ず DAL (`lib/dal/`) を通す。コンポーネントから `db` を直接使わない。
- **Client Components**: インタラクション（クリック・入力）のみ担当。データ取得はしない。

## Prisma v7 の破壊的変更

Prisma v7 では `PrismaClient` の初期化方法が変わった。

**変更点1: `schema.prisma` に `url` を書かない**

```prisma
# NG (v6 以前)
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")  # ← 書けない
}

# OK (v7)
datasource db {
  provider = "sqlite"
}
```

接続 URL は `prisma.config.ts` で管理する。

**変更点2: `PrismaClient` コンストラクタに `adapter` が必須**

```ts
# NG (v6 以前)
const prisma = new PrismaClient()

# OK (v7) — SQLite の場合は libsql アダプターを使う
import { PrismaLibSql } from '@prisma/adapter-libsql'
const adapter = new PrismaLibSql({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })
```

詳細は `src/lib/db.ts` を参照。

## DB ファイルの場所

`DATABASE_URL=file:./dev.db` は**プロジェクトルート**相対のパス。
実ファイルは `/Users/tnakamura/git/nextjs-sample/dev.db`。
`prisma/dev.db` ではないので注意。
