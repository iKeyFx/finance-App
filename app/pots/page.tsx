import type { Metadata } from "next"
import { requireUser } from "@/utils/supabase/helpers"
import type { Pot } from "@/app/data/types"
import PotsClient from "@/app/components/pots/PotsClient"

export const metadata: Metadata = {
  title: "Pots",
  description: "Manage your savings pots and track progress toward your goals.",
  openGraph: {
    title: "Pots | Finance App",
    description: "Manage your savings pots and track progress toward your goals.",
  },
}

export default async function PotsPage() {
  const { user, supabase } = await requireUser()

  const { data: potsData } = await supabase
    .from("pots")
    .select("name, target, total, theme")
    .eq("user_id", user.id)

  const pots: Pot[] = potsData ?? []

  return <PotsClient initialPots={pots} />
}
