"use client"

import { useState } from "react"
import type { Pot } from "@/app/data/types"
import Modal from "@/app/components/ui/Modal"
import CurrencyInput from "@/app/components/ui/CurrencyInput"
import { formatCurrencyNoSign } from "@/lib/formatter"

interface WithdrawModalProps {
  pot: Pot
  onConfirm: (amount: number) => void
  onClose: () => void
}

export default function WithdrawModal({ pot, onConfirm, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")

  const parsed = parseFloat(amount)
  const newTotal = isNaN(parsed) || parsed <= 0 ? pot.total : Math.max(pot.total - parsed, 0)
  const newPct = Math.min((newTotal / pot.target) * 100, 100)
  const currentPct = Math.min((pot.total / pot.target) * 100, 100)
  const removedPct = currentPct - newPct

  const isValid = !isNaN(parsed) && parsed > 0 && parsed <= pot.total

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid) return
    onConfirm(parsed)
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-[32px] font-bold text-grey-900 mb-2">Withdraw from &lsquo;{pot.name}&rsquo;</h2>
      <p className="text-[14px] text-grey-500 mb-6">Withdraw from your pot when you need the funds.</p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] text-grey-500">New Amount</span>
          <span className="text-[32px] font-bold text-grey-900">{formatCurrencyNoSign(newTotal)}</span>
        </div>
        <div className="w-full h-2 bg-beige-100 rounded-full overflow-hidden mb-2">
          <div className="h-full flex rounded-full overflow-hidden">
            <div className="h-full rounded-l-full transition-all duration-300" style={{ width: `${newPct}%`, backgroundColor: pot.theme }} />
            <div className="h-full bg-red transition-all duration-300" style={{ width: `${removedPct}%` }} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-grey-900">{newPct.toFixed(1)}%</span>
          <span className="text-[12px] text-grey-500">Target of {formatCurrencyNoSign(pot.target)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Amount to Withdraw</label>
          <CurrencyInput value={amount} onChange={setAmount} placeholder="e.g. 50" />
          {!isNaN(parsed) && parsed > 0 && parsed > pot.total && (
            <p className="text-[12px] text-red mt-1">
              Amount exceeds current total of {formatCurrencyNoSign(pot.total)}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="w-full h-[53px] bg-grey-900 text-white text-[14px] font-bold rounded-lg hover:bg-grey-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Withdrawal
        </button>
      </form>
    </Modal>
  )
}
