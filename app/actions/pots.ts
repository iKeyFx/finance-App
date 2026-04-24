"use server"

import { requireUserForAction } from "@/utils/supabase/helpers"
import type { Pot } from "@/app/data/types"

function validatePot(pot: Pot) {
  if (!pot.name || typeof pot.name !== "string" || pot.name.trim().length < 1 || pot.name.length > 30)
    throw new Error("Pot name must be between 1 and 30 characters")
  if (typeof pot.target !== "number" || !isFinite(pot.target) || pot.target <= 0)
    throw new Error("Target must be a positive number")
  if (typeof pot.total !== "number" || !isFinite(pot.total) || pot.total < 0)
    throw new Error("Total must be a non-negative number")
  if (!pot.theme || typeof pot.theme !== "string")
    throw new Error("Invalid theme")
}

function validateAmount(amount: number) {
  if (typeof amount !== "number" || !isFinite(amount) || amount <= 0)
    throw new Error("Amount must be a positive number")
}

export async function addPot(pot: Pot) {
  validatePot(pot)
  const { user, supabase } = await requireUserForAction()

  const { error } = await supabase.from("pots").insert({
    user_id: user.id,
    name: pot.name.trim(),
    target: pot.target,
    total: pot.total,
    theme: pot.theme,
  })
  if (error) { console.error("addPot:", error.message); throw new Error("Failed to save pot") }
}

export async function updatePot(originalName: string, pot: Pot) {
  if (!originalName || typeof originalName !== "string") throw new Error("Invalid pot name")
  validatePot(pot)
  const { user, supabase } = await requireUserForAction()

  const { error } = await supabase
    .from("pots")
    .update({ name: pot.name, target: pot.target, theme: pot.theme })
    .eq("user_id", user.id)
    .eq("name", originalName)
  if (error) { console.error("updatePot:", error.message); throw new Error("Failed to update pot") }
}

export async function deletePot(name: string) {
  if (!name || typeof name !== "string") throw new Error("Invalid pot name")
  const { user, supabase } = await requireUserForAction()

  const { error } = await supabase
    .from("pots")
    .delete()
    .eq("user_id", user.id)
    .eq("name", name)
  if (error) { console.error("deletePot:", error.message); throw new Error("Failed to delete pot") }
}

export async function addMoneyToPot(name: string, amount: number) {
  if (!name || typeof name !== "string") throw new Error("Invalid pot name")
  validateAmount(amount)
  const { user, supabase } = await requireUserForAction()

  const { data: pot, error: fetchError } = await supabase
    .from("pots")
    .select("total")
    .eq("user_id", user.id)
    .eq("name", name)
    .single()
  if (fetchError) { console.error("addMoneyToPot fetch:", fetchError.message); throw new Error("Failed to fetch pot") }

  const { error } = await supabase
    .from("pots")
    .update({ total: pot.total + amount })
    .eq("user_id", user.id)
    .eq("name", name)
  if (error) { console.error("addMoneyToPot update:", error.message); throw new Error("Failed to add money") }
}

export async function withdrawFromPot(name: string, amount: number) {
  if (!name || typeof name !== "string") throw new Error("Invalid pot name")
  validateAmount(amount)
  const { user, supabase } = await requireUserForAction()

  const { data: pot, error: fetchError } = await supabase
    .from("pots")
    .select("total")
    .eq("user_id", user.id)
    .eq("name", name)
    .single()
  if (fetchError) { console.error("withdrawFromPot fetch:", fetchError.message); throw new Error("Failed to fetch pot") }
  if (pot.total < amount) throw new Error("Insufficient funds")

  const { error } = await supabase
    .from("pots")
    .update({ total: pot.total - amount })
    .eq("user_id", user.id)
    .eq("name", name)
  if (error) { console.error("withdrawFromPot update:", error.message); throw new Error("Failed to withdraw") }
}
