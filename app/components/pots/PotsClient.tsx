"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Pot } from "@/app/data/types"
import PotCard from "./PotCard"
import AddEditPotModal from "./AddEditPotModal"
import DeletePotModal from "./DeletePotModal"
import AddMoneyModal from "./AddMoneyModal"
import WithdrawModal from "./WithdrawModal"
import { addPot, updatePot, deletePot, addMoneyToPot, withdrawFromPot } from "@/app/actions/pots"

interface PotsClientProps {
  initialPots: Pot[]
}

type ModalState =
  | { type: "add" }
  | { type: "edit"; pot: Pot }
  | { type: "delete"; pot: Pot }
  | { type: "addMoney"; pot: Pot }
  | { type: "withdraw"; pot: Pot }
  | null

export default function PotsClient({ initialPots }: PotsClientProps) {
  const router = useRouter()
  const [pots, setPots] = useState<Pot[]>(initialPots)
  const [modal, setModal] = useState<ModalState>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAdd = async (newPot: Pot) => {
    const prev = pots
    setPots((p) => [...p, newPot])
    setModal(null)
    try {
      await addPot(newPot)
      router.refresh()
    } catch (e) {
      setPots(prev)
      setError(e instanceof Error ? e.message : "Failed to add pot")
    }
  }

  const handleEdit = async (updated: Pot) => {
    if (modal?.type !== "edit") return
    const originalName = modal.pot.name
    const prev = pots
    setPots((p) => p.map((pot) => (pot.name === originalName ? updated : pot)))
    setModal(null)
    try {
      await updatePot(originalName, updated)
      router.refresh()
    } catch (e) {
      setPots(prev)
      setError(e instanceof Error ? e.message : "Failed to update pot")
    }
  }

  const handleDelete = async () => {
    if (modal?.type !== "delete") return
    const name = modal.pot.name
    const prev = pots
    setPots((p) => p.filter((pot) => pot.name !== name))
    setModal(null)
    try {
      await deletePot(name)
      router.refresh()
    } catch (e) {
      setPots(prev)
      setError(e instanceof Error ? e.message : "Failed to delete pot")
    }
  }

  const handleAddMoney = async (amount: number) => {
    if (modal?.type !== "addMoney") return
    const name = modal.pot.name
    const prev = pots
    setPots((p) => p.map((pot) => pot.name === name ? { ...pot, total: pot.total + amount } : pot))
    setModal(null)
    try {
      await addMoneyToPot(name, amount)
      router.refresh()
    } catch (e) {
      setPots(prev)
      setError(e instanceof Error ? e.message : "Failed to add money")
    }
  }

  const handleWithdraw = async (amount: number) => {
    if (modal?.type !== "withdraw") return
    const name = modal.pot.name
    const prev = pots
    setPots((p) => p.map((pot) => pot.name === name ? { ...pot, total: pot.total - amount } : pot))
    setModal(null)
    try {
      await withdrawFromPot(name, amount)
      router.refresh()
    } catch (e) {
      setPots(prev)
      setError(e instanceof Error ? e.message : "Failed to withdraw")
    }
  }

  return (
    <>
      {error && (
        <div className="mb-4 px-4 py-3 bg-red/10 border border-red rounded-lg text-[14px] text-red flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="ml-4 text-red hover:opacity-70 cursor-pointer">✕</button>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[32px] font-bold text-grey-900">Pots</h1>
        <button
          type="button"
          onClick={() => setModal({ type: "add" })}
          className="bg-grey-900 text-white text-[14px] font-bold px-5 py-3 rounded-lg hover:bg-grey-500 transition-colors cursor-pointer"
        >
          + Add New Pot
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pots.map((pot) => (
          <PotCard
            key={pot.name}
            pot={pot}
            onEdit={(p) => setModal({ type: "edit", pot: p })}
            onDelete={(p) => setModal({ type: "delete", pot: p })}
            onAddMoney={(p) => setModal({ type: "addMoney", pot: p })}
            onWithdraw={(p) => setModal({ type: "withdraw", pot: p })}
          />
        ))}
        {pots.length === 0 && (
          <p className="text-[14px] text-grey-500 col-span-2">No pots yet. Add one to start saving!</p>
        )}
      </div>

      {modal?.type === "add" && (
        <AddEditPotModal mode="add" existingPots={pots} onSubmit={handleAdd} onClose={() => setModal(null)} />
      )}
      {modal?.type === "edit" && (
        <AddEditPotModal mode="edit" pot={modal.pot} existingPots={pots} onSubmit={handleEdit} onClose={() => setModal(null)} />
      )}
      {modal?.type === "delete" && (
        <DeletePotModal pot={modal.pot} onConfirm={handleDelete} onClose={() => setModal(null)} />
      )}
      {modal?.type === "addMoney" && (
        <AddMoneyModal pot={modal.pot} onConfirm={handleAddMoney} onClose={() => setModal(null)} />
      )}
      {modal?.type === "withdraw" && (
        <WithdrawModal pot={modal.pot} onConfirm={handleWithdraw} onClose={() => setModal(null)} />
      )}
    </>
  )
}
