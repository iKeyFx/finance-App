"use client"

import { useEffect } from "react"

interface LogoutModalProps {
  onConfirm: () => void
  onClose: () => void
}

export default function LogoutModal({ onConfirm, onClose }: LogoutModalProps) {
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
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-beige-500 flex items-center justify-center text-grey-500 hover:text-grey-900 hover:border-grey-900 transition-colors cursor-pointer text-[14px]"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-[32px] font-bold text-grey-900 mb-2">Log Out?</h2>

        <p className="text-[14px] text-grey-500 mb-6">
          Are you sure you want to log out? You&apos;ll need to sign in again to access your account.
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="w-full h-[53px] bg-grey-900 text-white text-[14px] font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer mb-4"
        >
          Yes, Log Out
        </button>

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
