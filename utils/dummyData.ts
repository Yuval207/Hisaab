import { Expense, Group, User } from "../types";

export const DUMMY_USER: User = {
  id: "u1",
  name: "Prakarsh Pandey",
  avatar: "https://via.placeholder.com/120",
};

export const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "Lunch",
    amount: 250,
    paidBy: "u1",
    date: new Date().toISOString(),
  },
];

export const DUMMY_GROUPS: Group[] = [
  { id: "g1", name: "Trip", members: [DUMMY_USER], expenses: DUMMY_EXPENSES },
];
