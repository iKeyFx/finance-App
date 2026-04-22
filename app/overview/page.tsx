import type { Metadata } from "next"
import BalanceCards from "@/app/components/overviews/BalanceCards"
import PotsOverview from "@/app/components/overviews/PotsOverview"
import TransactionsOverview from "@/app/components/overviews/TransactionsOverview"
import BudgetsOverview from "@/app/components/overviews/BudgetsOverview"
import RecurringBillsOverview from "@/app/components/overviews/RecurringBillsOverview"
import { createClient } from "@/utils/supabase/server"
import type { Balance, Pot, Transaction, Budget, RecurringBillsSummary } from "@/app/data/types"

export const metadata: Metadata = {
  title: "Overview",
  description: "Your financial overview — current balance, recent transactions, budgets, pots, and recurring bills at a glance.",
  openGraph: {
    title: "Overview | Finance App",
    description: "Your financial overview — current balance, recent transactions, budgets, pots, and recurring bills at a glance.",
  },
}

export default async function OverviewPage() {
  const supabase = await createClient()

  const [
    { data: balanceData },
    { data: potsData },
    { data: transactionsData },
    { data: budgetsData },
    { data: allNegativeTx },
  ] = await Promise.all([
    supabase.from("balances").select("current, income, expenses, recurring_paid, recurring_upcoming, recurring_due_soon").single(),
    supabase.from("pots").select("name, target, total, theme").limit(4),
    supabase.from("transactions").select("avatar, name, category, date, amount, recurring").order("date", { ascending: false }).limit(5),
    supabase.from("budgets").select("category, maximum, theme").limit(4),
    supabase.from("transactions").select("category, amount").lt("amount", 0),
  ])

  const balance: Balance = balanceData ?? { current: 0, income: 0, expenses: 0 }
  const pots: Pot[] = potsData ?? []
  const transactions: Transaction[] = (transactionsData ?? []).map((tx) => ({ ...tx, recurring: tx.recurring ?? false }))

  const budgets: Budget[] = (budgetsData ?? []).map((b) => ({
    ...b,
    spent: (allNegativeTx ?? [])
      .filter((tx) => tx.category === b.category)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
  }))

  const recurringBillsSummary: RecurringBillsSummary = {
    paid: balanceData?.recurring_paid ?? 0,
    upcoming: balanceData?.recurring_upcoming ?? 0,
    dueSoon: balanceData?.recurring_due_soon ?? 0,
  }

  return (
    <>
      <h1 className="text-[32px] font-bold text-grey-900 mb-8">Overview</h1>
      <BalanceCards data={balance} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_372px] gap-6 mt-8">
        <div className="flex flex-col gap-6">
          <PotsOverview pots={pots} />
          <TransactionsOverview transactions={transactions} />
        </div>
        <div className="flex flex-col gap-6">
          <BudgetsOverview budgets={budgets} />
          <RecurringBillsOverview summary={recurringBillsSummary} />
        </div>
      </div>
    </>
  )
}
