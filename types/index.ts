export type User = { id: string; name: string; avatar?: string };
export type Expense = {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  groupId?: string;
  date: string;
};
export type Group = {
  id: string;
  name: string;
  members: User[];
  expenses: Expense[];
};
