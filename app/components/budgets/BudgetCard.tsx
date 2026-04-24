"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Budget, BudgetWithTransactions } from "@/app/data/types"
import { formatCurrencyNoSign } from "@/lib/formatter"
import { formatCurrency, formatDate } from "@/lib/formatter"

interface BudgetCardProps {
  budget: BudgetWithTransactions
  onEdit: (budget: Budget) => void
  onDelete: (budget: Budget) => void
}

export default function BudgetCard({ budget, onEdit, onDelete }: BudgetCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const remaining = Math.max(budget.maximum - budget.spent, 0)
  const progressPercent = Math.min((budget.spent / budget.maximum) * 100, 100)

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: budget.theme }}
          />
          <h2 className="text-[20px] font-bold text-grey-900">{budget.category}</h2>
        </div>

        {/* Three-dots menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="text-grey-300 hover:text-grey-500 transition-colors p-1 cursor-pointer"
            aria-label="Budget options"
          >
            <Image src="/images/icon-ellipsis.svg" alt="" width={14} height={4} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border border-grey-100 py-2 w-[160px]">
                <button
                  type="button"
                  onClick={() => { onEdit(budget); setMenuOpen(false) }}
                  className="w-full text-left px-4 py-2 text-[14px] text-grey-900 hover:bg-beige-100 transition-colors cursor-pointer"
                >
                  Edit Budget
                </button>
                <div className="border-t border-grey-100 mx-4" />
                <button
                  type="button"
                  onClick={() => { onDelete(budget); setMenuOpen(false) }}
                  className="w-full text-left px-4 py-2 text-[14px] text-red hover:bg-beige-100 transition-colors cursor-pointer"
                >
                  Delete Budget
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Maximum subtitle */}
      <p className="text-[12px] text-grey-500 mb-4">
        Maximum of {formatCurrencyNoSign(budget.maximum)}
      </p>

      {/* Progress bar */}
      <div className="bg-beige-100 rounded-sm h-8 w-full mb-3 p-1">
        <div
          className="h-full rounded-sm transition-all"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: budget.theme,
          }}
        />
      </div>

      {/* Spent / Remaining row */}
      <div className="flex justify-between mb-5">
        <div>
          <p className="text-[12px] text-grey-500">Spent</p>
          <p className="text-[14px] font-bold text-grey-900">
            {formatCurrencyNoSign(budget.spent)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[12px] text-grey-500">Remaining</p>
          <p className="text-[14px] font-bold text-grey-900">
            {formatCurrencyNoSign(remaining)}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-grey-100 mb-5" />

      {/* Latest Spending header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[16px] font-bold text-grey-900">Latest Spending</span>
        <Link
          href="/transactions"
          className="flex items-center gap-2 text-[12px] text-grey-500 hover:text-grey-900 transition-colors"
        >
          See All
          <Image src="/images/icon-caret-right.svg" alt="" width={6} height={11} />
        </Link>
      </div>

      {/* Transaction rows */}
      {budget.latestSpending.length === 0 ? (
        <p className="text-[12px] text-grey-500">No recent transactions.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-grey-100">
          {budget.latestSpending.map((tx, idx) => (
            <li
              key={`${tx.name}-${tx.date}-${idx}`}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Image
                  src={tx.avatar}
                  alt={tx.name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover shrink-0"
                />
                <span className="text-[14px] font-bold text-grey-900 truncate max-w-[140px]">
                  {tx.name}
                </span>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[14px] font-bold text-grey-900">
                  {formatCurrency(tx.amount)}
                </p>
                <p className="text-[12px] text-grey-500 mt-0.5">
                  {formatDate(tx.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
