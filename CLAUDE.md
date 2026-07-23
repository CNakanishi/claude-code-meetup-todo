# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run lint
npm test         # vitest run
npx vitest run lib/date.test.ts  # 単一ファイル実行
```

## 仕様

機能仕様の正は [`SPEC.md`](SPEC.md) とする。

## アーキテクチャ

Next.js 15 (App Router) + React 19。DB なし、`data/todos.json` にファイル永続化（実行時自動生成のため直接編集しないこと）。

- `lib/store.ts` — 永続化層。`listTodos` / `addTodo` / `updateTodo` / `deleteTodo`
- `app/api/todos/route.ts` — `GET` / `POST`
- `app/api/todos/[id]/route.ts` — `PATCH`（完了トグル）/ `DELETE`
- `app/page.tsx` — クライアントコンポーネント。UI 状態を保持し API を `fetch` で呼び出す
- `lib/date.ts` — 期限切れ判定・日付フォーマット（`lib/date.test.ts` でテスト済み）

**期限切れルール:** `dueDate < today` のときのみ（当日は期限内）。未完了タスクにのみ表示。

**未実装:** 優先度フィールド（`SPEC.md` セクション 7）

## テスト実行

アプリケーション機能系のコードを修正した後は必ず `npm test` を実行して確認すること。

## 応答言語

セッションでの応答は日本標準語で行うこと。

## Git

コミットメッセージは日本標準語で簡潔に記載すること。誰の命令でコミットしたかも明記すること。
