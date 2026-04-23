import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import RecurringBillsClient from "@/app/components/recurring-bills/RecurringBillsClient"

export const metadata: Metadata = {
  title: "Recurring Bills",
  description: "Track your monthly recurring bills — paid, upcoming, and due soon.",
  openGraph: {
    title: "Recurring Bills | Finance App",
    description: "Track your monthly recurring bills — paid, upcoming, and due soon.",
  },
}

export interface RecurringBill {
  name: string
  avatar: string
  amount: number
  day: number
}

export default async function RecurringBillsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data } = await supabase
    .from("transactions")
    .select("avatar, name, amount, date")
    .eq("user_id", user.id)
    .eq("recurring", true)
    .order("date", { ascending: false })

  // Deduplicate by name — keep the most recent occurrence
  const seen = new Set<string>()
  const bills: RecurringBill[] = []
  for (const tx of data ?? []) {
    if (!seen.has(tx.name)) {
      seen.add(tx.name)
      bills.push({
        name: tx.name,
        avatar: tx.avatar,
        amount: Math.abs(tx.amount),
        day: new Date(tx.date).getUTCDate(),
      })
    }
  }

  return <RecurringBillsClient bills={bills} />
}
