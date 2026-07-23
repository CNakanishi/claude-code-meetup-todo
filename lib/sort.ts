import type { Priority, Todo } from "./store";

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export type SortKey = "default" | "priority";

export function sortTodos(todos: Todo[], sortKey: SortKey): Todo[] {
  if (sortKey === "default") return todos;
  return [...todos].sort((a, b) => {
    const diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (diff !== 0) return diff;
    return a.createdAt.localeCompare(b.createdAt);
  });
}
