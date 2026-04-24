"use client"

import { useState, useRef, useEffect } from "react"
import type { Pot } from "@/app/data/types"
import { formatCurrencyNoSign as formatCurrency } from "@/lib/formatter"

interface PotCardProps {
  pot: Pot
  onEdit: (pot: Pot) => void
  onDelete: (pot: Pot) => void
  onAddMoney: (pot: Pot) => void
  onWithdraw: (pot: Pot) => void
}

export default function PotCard({ pot, onEdit, onDelete, onAddMoney, onWithdraw }: PotCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const pct = Math.min((pot.total / pot.target) * 100, 100)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: pot.theme }} />
          <h3 className="text-[20px] font-bold text-grey-900">{pot.name}</h3>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="text-grey-300 hover:text-grey-500 transition-colors cursor-pointer p-1"
            aria-label="Options"
          >
            <svg width="14" height="4" viewBox="0 0 14 4" fill="currentColor">
              <circle cx="2" cy="2" r="2" />
              <circle cx="7" cy="2" r="2" />
              <circle cx="12" cy="2" r="2" />
            </svg>
          </button>
          {menuOpen && (
            <ul className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border border-grey-100 py-2 w-[120px]">
              <li>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onEdit(pot) }}
                  className="w-full text-left px-4 py-2 text-[14px] text-grey-900 hover:bg-beige-100 transition-colors cursor-pointer"
                >
                  Edit Pot
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onDelete(pot) }}
                  className="w-full text-left px-4 py-2 text-[14px] text-red hover:bg-beige-100 transition-colors cursor-pointer"
                >
                  Delete Pot
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Total Saved */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] text-grey-500">Total Saved</span>
        <span className="text-[32px] font-bold text-grey-900">{formatCurrency(pot.total)}</span>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="w-full h-2 bg-beige-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, backgroundColor: pot.theme }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-grey-500">{pct.toFixed(1)}%</span>
          <span className="text-[12px] text-grey-500">Target of {formatCurrency(pot.target)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onAddMoney(pot)}
          className="flex-1 h-[53px] bg-beige-100 text-grey-900 text-[14px] font-bold rounded-lg hover:bg-grey-100 transition-colors cursor-pointer"
        >
          + Add Money
        </button>
        <button
          type="button"
          onClick={() => onWithdraw(pot)}
          className="flex-1 h-[53px] bg-beige-100 text-grey-900 text-[14px] font-bold rounded-lg hover:bg-grey-100 transition-colors cursor-pointer"
        >
          Withdraw
        </button>
      </div>
    </div>
  )
}
