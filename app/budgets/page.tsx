import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Budgets",
  description: "Track your monthly budgets and spending by category.",
  openGraph: {
    title: "Budgets | Finance App",
    description: "Track your monthly budgets and spending by category.",
  },
}

import rawData from "@/app/data/data.json"
import type { Budget, Transaction } from "@/app/data/types"
import BudgetsClient from "@/app/components/budgets/BudgetsClient"

const BudgetsPage = () => {
  const budgets: Budget[] = rawData.budgets
  const transactions: Transaction[] = rawData.transactions

  return <BudgetsClient initialBudgets={budgets} allTransactions={transactions} />
}

export default BudgetsPage
