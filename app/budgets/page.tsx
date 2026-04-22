import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import type { Budget, Transaction } from "@/app/data/types"
import BudgetsClient from "@/app/components/budgets/BudgetsClient"

export const metadata: Metadata = {
  title: "Budgets",
  description: "Track your monthly budgets and spending by category.",
  openGraph: {
    title: "Budgets | Finance App",
    description: "Track your monthly budgets and spending by category.",
  },
}

export default async function BudgetsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const [{ data: budgetsData }, { data: transactionsData }] = await Promise.all([
    supabase.from("budgets").select("category, maximum, theme").eq("user_id", user.id),
    supabase.from("transactions").select("avatar, name, category, date, amount, recurring").eq("user_id", user.id).order("date", { ascending: false }),
  ])

  const allTransactions: Transaction[] = (transactionsData ?? []).map((tx) => ({
    ...tx,
    recurring: tx.recurring ?? false,
  }))

  const budgets: Budget[] = (budgetsData ?? []).map((b) => ({
    ...b,
    spent: allTransactions
      .filter((tx) => tx.category === b.category && tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
  }))

  return <BudgetsClient initialBudgets={budgets} allTransactions={allTransactions} />
}
