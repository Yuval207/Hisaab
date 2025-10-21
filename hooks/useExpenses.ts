import { useMemo } from "react";
import { Expense } from "../types";

export default function useExpenses(expenses: Expense[]) {
  return useMemo(
    () =>
      expenses
        .slice()
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
    [expenses]
  );
}
