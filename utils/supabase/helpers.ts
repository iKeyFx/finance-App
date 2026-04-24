import { redirect } from "next/navigation"
import { createClient } from "./server"

/** For server page components — redirects to /login if unauthenticated */
export async function requireUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  if (!user) redirect("/login")
  return { user, supabase }
}

/** For server actions — throws if unauthenticated */
export async function requireUserForAction() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")
  return { user, supabase }
}
