"use client"

import { useState } from "react"
import type { Budget } from "@/app/data/types"
import { TRANSACTION_CATEGORIES } from "@/app/data/types"
import Modal from "@/app/components/ui/Modal"
import CurrencyInput from "@/app/components/ui/CurrencyInput"
import ThemeColorPicker from "@/app/components/ui/ThemeColorPicker"
import { THEME_OPTIONS } from "@/lib/constants"

const BUDGET_CATEGORIES = TRANSACTION_CATEGORIES.filter((c) => c !== "All Transactions")

interface AddEditBudgetModalProps {
  mode: "add" | "edit"
  budget?: Budget
  existingBudgets: Budget[]
  onSubmit: (budget: Budget) => void
  onClose: () => void
}

export default function AddEditBudgetModal({
  mode,
  budget,
  existingBudgets,
  onSubmit,
  onClose,
}: AddEditBudgetModalProps) {
  const [category, setCategory] = useState(mode === "edit" ? budget!.category : BUDGET_CATEGORIES[0])
  const [maximum, setMaximum] = useState(mode === "edit" ? budget!.maximum.toString() : "")
  const [theme, setTheme] = useState(mode === "edit" ? budget!.theme : (THEME_OPTIONS[0]?.value ?? ""))
  const [categoryOpen, setCategoryOpen] = useState(false)

  const usedThemes = existingBudgets
    .filter((b) => mode === "edit" ? b.category !== budget!.category : true)
    .map((b) => b.theme)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const maxValue = parseFloat(maximum)
    if (!category || isNaN(maxValue) || maxValue <= 0 || !theme) return
    onSubmit({
      category,
      maximum: maxValue,
      theme,
      spent: mode === "edit" ? budget!.spent : 0,
    })
  }

  const isValid = category && maximum && parseFloat(maximum) > 0 && theme

  return (
    <Modal onClose={onClose}>
      <h2 className="text-[32px] font-bold text-grey-900 mb-2">
        {mode === "add" ? "Add New Budget" : "Edit Budget"}
      </h2>
      <p className="text-[14px] text-grey-500 mb-6">
        {mode === "add"
          ? "Choose a category to set a spending budget. These categories can help you monitor spending."
          : "As your budgets change, feel free to update your spending limits."}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Budget Category */}
        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Budget Category</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoryOpen((o) => !o)}
              className="w-full h-[45px] px-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 flex items-center justify-between hover:border-grey-900 transition-colors cursor-pointer bg-white"
            >
              <span>{category}</span>
              <svg width="12" height="6" viewBox="0 0 12 6" className={`transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`}>
                <path d="M1 1l5 4 5-4" stroke="#696868" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {categoryOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setCategoryOpen(false)} />
                <ul className="absolute left-0 right-0 top-[52px] z-20 bg-white rounded-lg shadow-lg border border-grey-100 py-2 max-h-[240px] overflow-y-auto">
                  {BUDGET_CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => { setCategory(cat); setCategoryOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-[14px] hover:bg-beige-100 transition-colors cursor-pointer ${cat === category ? "font-bold text-grey-900" : "text-grey-500"}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Maximum Spend */}
        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Maximum Spend</label>
          <CurrencyInput value={maximum} onChange={setMaximum} />
        </div>

        {/* Theme */}
        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Theme</label>
          <ThemeColorPicker value={theme} onChange={setTheme} usedThemes={usedThemes} />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full h-[53px] bg-grey-900 text-white text-[14px] font-bold rounded-lg hover:bg-grey-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {mode === "add" ? "Add Budget" : "Save Changes"}
        </button>
      </form>
    </Modal>
  )
}
