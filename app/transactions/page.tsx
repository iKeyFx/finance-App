import type { Metadata } from "next"
import TransactionsTable from "@/app/components/transactions/TransactionsTable"
import { requireUser } from "@/utils/supabase/helpers"
import type { Transaction } from "@/app/data/types"

export const metadata: Metadata = {
  title: "Transactions",
  description: "Browse and search your full transaction history, sorted and filtered by date, category, or amount.",
  openGraph: {
    title: "Transactions | Finance App",
    description: "Browse and search your full transaction history, sorted and filtered by date, category, or amount.",
  },
}

export default async function TransactionsPage() {
  const { user, supabase } = await requireUser()

  const { data } = await supabase
    .from("transactions")
    .select("avatar, name, category, date, amount, recurring")
    .eq("user_id", user.id)
    .order("date", { ascending: false })

  const transactions: Transaction[] = (data ?? []).map((tx) => ({
    ...tx,
    recurring: tx.recurring ?? false,
  }))

  return (
    <>
      <h1 className="text-[32px] font-bold text-grey-900 mb-8">Transactions</h1>
      <TransactionsTable transactions={transactions} />
    </>
  )
}
