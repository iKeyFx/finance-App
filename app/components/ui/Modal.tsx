"use client"

import { useEscapeKey } from "@/lib/hooks/useEscapeKey"

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  useEscapeKey(onClose)

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
        {children}
      </div>
    </div>
  )
}
