"use server"

import { createClient } from "@/utils/supabase/server"
import type { Budget } from "@/app/data/types"

export async function addBudget(budget: Omit<Budget, "spent">) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase.from("budgets").insert({
    user_id: user.id,
    category: budget.category,
    maximum: budget.maximum,
    theme: budget.theme,
  })
  if (error) throw new Error(error.message)
}

export async function updateBudget(originalCategory: string, budget: Omit<Budget, "spent">) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("budgets")
    .update({ category: budget.category, maximum: budget.maximum, theme: budget.theme })
    .eq("user_id", user.id)
    .eq("category", originalCategory)
  if (error) throw new Error(error.message)
}

export async function deleteBudget(category: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("user_id", user.id)
    .eq("category", category)
  if (error) throw new Error(error.message)
}
