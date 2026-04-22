"use server"

import { createClient } from "@/utils/supabase/server"
import type { Budget } from "@/app/data/types"

function validateBudget(budget: Omit<Budget, "spent">) {
  if (!budget.category || typeof budget.category !== "string" || budget.category.trim().length === 0)
    throw new Error("Invalid category")
  if (typeof budget.maximum !== "number" || !isFinite(budget.maximum) || budget.maximum <= 0)
    throw new Error("Maximum must be a positive number")
  if (!budget.theme || typeof budget.theme !== "string")
    throw new Error("Invalid theme")
}

export async function addBudget(budget: Omit<Budget, "spent">) {
  validateBudget(budget)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase.from("budgets").insert({
    user_id: user.id,
    category: budget.category,
    maximum: budget.maximum,
    theme: budget.theme,
  })
  if (error) { console.error("addBudget:", error.message); throw new Error("Failed to save budget") }
}

export async function updateBudget(originalCategory: string, budget: Omit<Budget, "spent">) {
  if (!originalCategory || typeof originalCategory !== "string") throw new Error("Invalid category")
  validateBudget(budget)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("budgets")
    .update({ category: budget.category, maximum: budget.maximum, theme: budget.theme })
    .eq("user_id", user.id)
    .eq("category", originalCategory)
  if (error) { console.error("updateBudget:", error.message); throw new Error("Failed to update budget") }
}

export async function deleteBudget(category: string) {
  if (!category || typeof category !== "string") throw new Error("Invalid category")
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("user_id", user.id)
    .eq("category", category)
  if (error) { console.error("deleteBudget:", error.message); throw new Error("Failed to delete budget") }
}
