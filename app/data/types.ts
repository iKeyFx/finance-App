
export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface Budget {
  category: string;
  maximum: number;
  theme: string;
  spent: number;
}

export interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface FinanceData {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
}

export interface RecurringBillData {
  title: string;
  amount: number;
}

export interface RecurringBillsSummary {
  paid: number;
  upcoming: number;
  dueSoon: number;
}

export interface TransactionData {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

/** Sort options for the transactions table */
export type SortOption = "latest" | "oldest" | "a-z" | "z-a" | "highest" | "lowest";

/** All available transaction categories */
export const TRANSACTION_CATEGORIES = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export type BudgetWithTransactions = Budget & { latestSpending: Transaction[] };
