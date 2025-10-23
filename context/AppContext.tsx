import React, { createContext, useContext, useState } from "react";
import { Expense, Group, User } from "../types";
import { DUMMY_EXPENSES, DUMMY_GROUPS, DUMMY_USER } from "../utils/dummyData";

type AppContextType = {
  user: User | null;
  groups: Group[];
  expenses: Expense[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  addExpense: (e: Expense) => void;
  updateExpense: (id: string, updatedExpense: Expense) => void;
  createGroup: (g: Group) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user] = useState<User>(DUMMY_USER);
  const [groups, setGroups] = useState<Group[]>(DUMMY_GROUPS);
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES);

  const addExpense = (e: Expense) => {
    setExpenses((p) => [...p, e]);
    if (e.groupId) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === e.groupId ? { ...g, expenses: [...g.expenses, e] } : g
        )
      );
    }
  };

  const updateExpense = (id: string, updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) => (expense.id === id ? updatedExpense : expense))
    );
    if (updatedExpense.groupId) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === updatedExpense.groupId
            ? {
                ...g,
                expenses: g.expenses.map((expense) =>
                  expense.id === id ? updatedExpense : expense
                ),
              }
            : g
        )
      );
    }
  };

  const createGroup = (g: Group) => setGroups((p) => [...p, g]);

  return (
    <AppContext.Provider
      value={{
        user,
        groups,
        expenses,
        setGroups,
        addExpense,
        updateExpense,
        createGroup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
