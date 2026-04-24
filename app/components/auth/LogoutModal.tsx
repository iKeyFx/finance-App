"use client"

import Modal from "@/app/components/ui/Modal"

interface LogoutModalProps {
  onConfirm: () => void
  onClose: () => void
}

export default function LogoutModal({ onConfirm, onClose }: LogoutModalProps) {
  return (
    <Modal onClose={onClose}>
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
    </Modal>
  )
}
