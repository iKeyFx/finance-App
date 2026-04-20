"use client"

import { useEffect } from "react"
import type { Budget } from "@/app/data/types"

interface DeleteBudgetModalProps {
  budget: Budget
  onConfirm: () => void
  onClose: () => void
}

export default function DeleteBudgetModal({ budget, onConfirm, onClose }: DeleteBudgetModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-[560px] p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-beige-500 flex items-center justify-center text-grey-500 hover:text-grey-900 hover:border-grey-900 transition-colors cursor-pointer text-[14px]"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-[32px] font-bold text-grey-900 mb-2">
          Delete &lsquo;{budget.category}&rsquo;?
        </h2>

        {/* Description */}
        <p className="text-[14px] text-grey-500 mb-6">
          Are you sure you want to delete this budget? This action cannot be reversed, and all
          the data inside it will be removed forever.
        </p>

        {/* Confirm button */}
        <button
          type="button"
          onClick={onConfirm}
          className="w-full h-[53px] bg-red text-white text-[14px] font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer mb-4"
        >
          Yes, Confirm Deletion
        </button>

        {/* Cancel link */}
        <button
          type="button"
          onClick={onClose}
          className="w-full text-[14px] text-grey-500 hover:text-grey-900 transition-colors cursor-pointer text-center"
        >
          No, Go Back
        </button>
      </div>
    </div>
  )
}
