"use client"

import { useState, useEffect } from "react"
import type { Pot } from "@/app/data/types"
import { formatCurrency } from "@/lib/formatCurrencyNoSign"

interface AddMoneyModalProps {
  pot: Pot
  onConfirm: (amount: number) => void
  onClose: () => void
}

export default function AddMoneyModal({ pot, onConfirm, onClose }: AddMoneyModalProps) {
  const [amount, setAmount] = useState("")

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const parsed = parseFloat(amount)
  const newTotal = isNaN(parsed) || parsed <= 0 ? pot.total : pot.total + parsed
  const cappedTotal = Math.min(newTotal, pot.target)
  const newPct = Math.min((cappedTotal / pot.target) * 100, 100)
  const currentPct = Math.min((pot.total / pot.target) * 100, 100)
  const addedPct = newPct - currentPct

  const isValid = !isNaN(parsed) && parsed > 0 && pot.total + parsed <= pot.target

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onConfirm(parsed)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-[560px] p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-beige-500 flex items-center justify-center text-grey-500 hover:text-grey-900 hover:border-grey-900 transition-colors cursor-pointer text-[14px]"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-[32px] font-bold text-grey-900 mb-2">Add to &lsquo;{pot.name}&rsquo;</h2>
        <p className="text-[14px] text-grey-500 mb-6">
          Add money to your pot to keep it growing!
        </p>

        {/* Progress preview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] text-grey-500">New Amount</span>
            <span className="text-[32px] font-bold text-grey-900">{formatCurrency(cappedTotal)}</span>
          </div>
          <div className="w-full h-2 bg-beige-100 rounded-full overflow-hidden mb-2">
            <div className="h-full flex rounded-full overflow-hidden">
              <div
                className="h-full rounded-l-full transition-all duration-300"
                style={{ width: `${currentPct}%`, backgroundColor: pot.theme }}
              />
              <div
                className="h-full bg-green transition-all duration-300"
                style={{ width: `${addedPct}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-grey-900">{newPct.toFixed(1)}%</span>
            <span className="text-[12px] text-grey-500">Target of {formatCurrency(pot.target)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[14px] font-bold text-grey-900 mb-2 block">Amount to Add</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[14px] text-beige-500 pointer-events-none">$</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="e.g. 100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-[45px] pl-8 pr-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 placeholder:text-beige-500 outline-none focus:border-grey-900 transition-colors"
              />
            </div>
            {!isNaN(parsed) && parsed > 0 && pot.total + parsed > pot.target && (
              <p className="text-[12px] text-red mt-1">
                Amount exceeds target. Max you can add: {formatCurrency(pot.target - pot.total)}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full h-[53px] bg-grey-900 text-white text-[14px] font-bold rounded-lg hover:bg-grey-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Addition
          </button>
        </form>
      </div>
    </div>
  )
}
