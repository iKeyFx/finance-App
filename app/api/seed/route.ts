import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import rawData from "@/app/data/data.json"

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  // Prevent double-seeding
  const { count } = await supabase
    .from("transactions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)

  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: "Data already seeded for this user" }, { status: 400 })
  }

  const { error: balanceError } = await supabase.from("balances").insert({
    user_id: user.id,
    current: rawData.balance.current,
    income: rawData.balance.income,
    expenses: rawData.balance.expenses,
    recurring_paid: rawData.recurringBillsSummary.paid,
    recurring_upcoming: rawData.recurringBillsSummary.upcoming,
    recurring_due_soon: rawData.recurringBillsSummary.dueSoon,
  })
  if (balanceError) return NextResponse.json({ error: balanceError.message }, { status: 500 })

  const { error: txError } = await supabase.from("transactions").insert(
    rawData.transactions.map((tx) => ({ ...tx, user_id: user.id }))
  )
  if (txError) return NextResponse.json({ error: txError.message }, { status: 500 })

  const { error: budgetError } = await supabase.from("budgets").insert(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rawData.budgets.map(({ spent: _spent, ...b }) => ({ ...b, user_id: user.id }))
  )
  if (budgetError) return NextResponse.json({ error: budgetError.message }, { status: 500 })

  const { error: potError } = await supabase.from("pots").insert(
    rawData.pots.map((p) => ({ ...p, user_id: user.id }))
  )
  if (potError) return NextResponse.json({ error: potError.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
