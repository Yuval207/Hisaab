import { Expense } from "../types";

export const calculateBalances = (expenses: Expense[]) => {
  const map = new Map<string, number>();
  expenses.forEach((e) => {
    map.set(e.paidBy, (map.get(e.paidBy) || 0) + e.amount);
  });
  return map;
};
