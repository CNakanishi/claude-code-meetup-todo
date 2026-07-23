import { describe, it, expect } from "vitest";
import { sortTodos } from "./sort";
import type { Todo } from "./store";

function makeTodo(overrides: Partial<Todo> & { id: string }): Todo {
  return {
    title: "test",
    dueDate: null,
    completed: false,
    priority: "medium",
    createdAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("sortTodos", () => {
  it('"default" のとき元の順序を維持する', () => {
    const todos = [
      makeTodo({ id: "a", priority: "low" }),
      makeTodo({ id: "b", priority: "high" }),
    ];
    const result = sortTodos(todos, "default");
    expect(result.map((t) => t.id)).toEqual(["a", "b"]);
  });

  it('"priority" のとき high→medium→low 順にソートする', () => {
    const todos = [
      makeTodo({ id: "low", priority: "low" }),
      makeTodo({ id: "high", priority: "high" }),
      makeTodo({ id: "medium", priority: "medium" }),
    ];
    const result = sortTodos(todos, "priority");
    expect(result.map((t) => t.id)).toEqual(["high", "medium", "low"]);
  });

  it("同一優先度内は createdAt 昇順（作成順）を維持する", () => {
    const todos = [
      makeTodo({ id: "b", priority: "high", createdAt: "2026-01-02T00:00:00.000Z" }),
      makeTodo({ id: "a", priority: "high", createdAt: "2026-01-01T00:00:00.000Z" }),
    ];
    const result = sortTodos(todos, "priority");
    expect(result.map((t) => t.id)).toEqual(["a", "b"]);
  });

  it("元の配列を変更しない（純粋関数）", () => {
    const todos = [
      makeTodo({ id: "low", priority: "low" }),
      makeTodo({ id: "high", priority: "high" }),
    ];
    const originalIds = todos.map((t) => t.id);
    sortTodos(todos, "priority");
    expect(todos.map((t) => t.id)).toEqual(originalIds);
  });
});
