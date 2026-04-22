"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import type { Budget, Transaction, BudgetWithTransactions } from "@/app/data/types"
import BudgetDonutChart from "./BudgetDonutChart"
import BudgetCard from "./BudgetCard"
import AddEditBudgetModal from "./AddEditBudgetModal"
import DeleteBudgetModal from "./DeleteBudgetModal"
import { addBudget, updateBudget, deleteBudget } from "@/app/actions/budgets"

interface BudgetsClientProps {
  initialBudgets: Budget[]
  allTransactions: Transaction[]
}

type ModalState =
  | { type: "add" }
  | { type: "edit"; budget: Budget }
  | { type: "delete"; budget: Budget }
  | null

export default function BudgetsClient({ initialBudgets, allTransactions }: BudgetsClientProps) {
  const router = useRouter()
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)
  const [modal, setModal] = useState<ModalState>(null)
  const [error, setError] = useState<string | null>(null)

  const budgetsWithSpending = useMemo<BudgetWithTransactions[]>(
    () =>
      budgets.map((budget) => {
        const matching = allTransactions.filter(
          (tx) => tx.category === budget.category && tx.amount < 0
        )
        return {
          ...budget,
          spent: matching.reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
          latestSpending: [...matching]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3),
        }
      }),
    [budgets, allTransactions]
  )

  const handleAdd = async (newBudget: Budget) => {
    const prev = budgets
    setBudgets((b) => [...b, newBudget])
    setModal(null)
    try {
      await addBudget(newBudget)
      router.refresh()
    } catch (e) {
      setBudgets(prev)
      setError(e instanceof Error ? e.message : "Failed to add budget")
    }
  }

  const handleEdit = async (updated: Budget) => {
    if (modal?.type !== "edit") return
    const originalCategory = modal.budget.category
    const prev = budgets
    setBudgets((b) => b.map((budget) => (budget.category === originalCategory ? updated : budget)))
    setModal(null)
    try {
      await updateBudget(originalCategory, updated)
      router.refresh()
    } catch (e) {
      setBudgets(prev)
      setError(e instanceof Error ? e.message : "Failed to update budget")
    }
  }

  const handleDelete = async () => {
    if (modal?.type !== "delete") return
    const category = modal.budget.category
    const prev = budgets
    setBudgets((b) => b.filter((budget) => budget.category !== category))
    setModal(null)
    try {
      await deleteBudget(category)
      router.refresh()
    } catch (e) {
      setBudgets(prev)
      setError(e instanceof Error ? e.message : "Failed to delete budget")
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
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[32px] font-bold text-grey-900">Budgets</h1>
        <button
          type="button"
          onClick={() => setModal({ type: "add" })}
          className="bg-grey-900 text-white text-[14px] font-bold px-5 py-3 rounded-lg hover:bg-grey-500 transition-colors cursor-pointer"
        >
          + Add New Budget
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-[400px] shrink-0">
          <BudgetDonutChart budgets={budgets} />
        </div>
        <div className="flex flex-col gap-6 flex-1 w-full">
          {budgetsWithSpending.map((budget) => (
            <BudgetCard
              key={budget.category}
              budget={budget}
              onEdit={(b) => setModal({ type: "edit", budget: b })}
              onDelete={(b) => setModal({ type: "delete", budget: b })}
            />
          ))}
        </div>
      </div>

      {modal?.type === "add" && (
        <AddEditBudgetModal
          mode="add"
          existingBudgets={budgets}
          onSubmit={handleAdd}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "edit" && (
        <AddEditBudgetModal
          mode="edit"
          budget={modal.budget}
          existingBudgets={budgets}
          onSubmit={handleEdit}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteBudgetModal
          budget={modal.budget}
          onConfirm={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}
