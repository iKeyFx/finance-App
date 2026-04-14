export interface BalanceData {
  current: number;
  income: number;
  expenses: number;
}

export interface PotData {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface TransactionData {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

export interface BudgetData {
  category: string;
  maximum: number;
  spent: number;
  theme: string;
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

export const balanceData: BalanceData = {
  current: 4836.0,
  income: 3814.25,
  expenses: 1700.5,
};

export const potsData: PotData[] = [
  { name: "Savings", target: 2000, total: 159, theme: "#277C78" },
  { name: "Concert Ticket", target: 150, total: 110, theme: "#626070" },
  { name: "Gift", target: 60, total: 40, theme: "#82C9D7" },
  { name: "New Laptop", target: 1000, total: 10, theme: "#F2CDAC" },
];

export const transactionsData: TransactionData[] = [
  {
    avatar: "/images/avatars/emma-richardson.jpg",
    name: "Emma Richardson",
    category: "General",
    date: "2024-08-19T14:23:11Z",
    amount: 75.5,
  },
  {
    avatar: "/images/avatars/savory-bites-bistro.jpg",
    name: "Savory Bites Bistro",
    category: "Dining Out",
    date: "2024-08-19T10:05:32Z",
    amount: -55.5,
  },
  {
    avatar: "/images/avatars/daniel-carter.jpg",
    name: "Daniel Carter",
    category: "General",
    date: "2024-08-18T09:45:00Z",
    amount: -42.3,
  },
  {
    avatar: "/images/avatars/sun-park.jpg",
    name: "Sun Park",
    category: "General",
    date: "2024-08-17T16:12:05Z",
    amount: 120.0,
  },
  {
    avatar: "/images/avatars/urban-services-hub.jpg",
    name: "Urban Services Hub",
    category: "General",
    date: "2024-08-17T08:30:00Z",
    amount: -65.0,
  },
];

export const budgetsData: BudgetData[] = [
  { category: "Entertainment", maximum: 50, spent: 25, theme: "#277C78" },
  { category: "Bills", maximum: 750, spent: 750, theme: "#82C9D7" },
  { category: "Dining Out", maximum: 75, spent: 67, theme: "#F2CDAC" },
  { category: "Personal Care", maximum: 100, spent: 65, theme: "#626070" },
];

export const recurringBillsSummary: RecurringBillsSummary = {
  paid: 190.0,
  upcoming: 194.98,
  dueSoon: 59.98,
};
