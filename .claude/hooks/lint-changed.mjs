import { execSync } from "node:child_process";

let raw = "";
for await (const chunk of process.stdin) raw += chunk;
const input = JSON.parse(raw);

// いま編集されたファイルだけを対象にする(.ts/.tsx 以外は何もしない)
const file = input.tool_input?.file_path ?? "";
if (!/\.(ts|tsx)$/.test(file)) process.exit(0);

try {
  execSync(`npx eslint --max-warnings=0 "${file}"`, {
    cwd: input.cwd,
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch (e) {
  process.stderr.write(`${e.stdout ?? ""}${e.stderr ?? ""}`);
  process.stderr.write(
    "上記の ESLint 警告・エラーは、既存・新規を問わずこの場ですべて解消してから作業を続けること(別タスクに切り出さない)。\n"
  );
  process.exit(2);
}