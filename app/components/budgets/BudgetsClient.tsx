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
    setBudgets((prev) => [...prev, newBudget])
    setModal(null)
    await addBudget(newBudget)
    router.refresh()
  }

  const handleEdit = async (updated: Budget) => {
    if (modal?.type !== "edit") return
    const originalCategory = modal.budget.category
    setBudgets((prev) => prev.map((b) => (b.category === originalCategory ? updated : b)))
    setModal(null)
    await updateBudget(originalCategory, updated)
    router.refresh()
  }

  const handleDelete = async () => {
    if (modal?.type !== "delete") return
    const category = modal.budget.category
    setBudgets((prev) => prev.filter((b) => b.category !== category))
    setModal(null)
    await deleteBudget(category)
    router.refresh()
  }

  return (
    <>
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
