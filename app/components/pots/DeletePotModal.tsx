"use client"

import type { Pot } from "@/app/data/types"
import Modal from "@/app/components/ui/Modal"

interface DeletePotModalProps {
  pot: Pot
  onConfirm: () => void
  onClose: () => void
}

export default function DeletePotModal({ pot, onConfirm, onClose }: DeletePotModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-[32px] font-bold text-grey-900 mb-2">
        Delete &lsquo;{pot.name}&rsquo;?
      </h2>
      <p className="text-[14px] text-grey-500 mb-6">
        Are you sure you want to delete this pot? This action cannot be reversed, and all
        the data inside it will be removed forever.
      </p>
      <button
        type="button"
        onClick={onConfirm}
        className="w-full h-[53px] bg-red text-white text-[14px] font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer mb-4"
      >
        Yes, Confirm Deletion
      </button>
      <button
        type="button"
        onClick={onClose}
        className="w-full text-[14px] text-grey-500 hover:text-grey-900 transition-colors cursor-pointer text-center"
      >
        No, Go Back
      </button>
    </Modal>
  )
}
