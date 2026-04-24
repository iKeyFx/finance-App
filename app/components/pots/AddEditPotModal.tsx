"use client"

import { useState } from "react"
import type { Pot } from "@/app/data/types"
import Modal from "@/app/components/ui/Modal"
import CurrencyInput from "@/app/components/ui/CurrencyInput"
import ThemeColorPicker from "@/app/components/ui/ThemeColorPicker"
import { THEME_OPTIONS } from "@/lib/constants"

interface AddEditPotModalProps {
  mode: "add" | "edit"
  pot?: Pot
  existingPots: Pot[]
  onSubmit: (pot: Pot) => void
  onClose: () => void
}

export default function AddEditPotModal({ mode, pot, existingPots, onSubmit, onClose }: AddEditPotModalProps) {
  const [name, setName] = useState(mode === "edit" ? pot!.name : "")
  const [target, setTarget] = useState(mode === "edit" ? pot!.target.toString() : "")
  const [theme, setTheme] = useState(mode === "edit" ? pot!.theme : (THEME_OPTIONS[0]?.value ?? ""))

  const usedThemes = existingPots
    .filter((p) => mode === "edit" ? p.name !== pot!.name : true)
    .map((p) => p.theme)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const targetValue = parseFloat(target)
    if (!name.trim() || isNaN(targetValue) || targetValue <= 0 || !theme) return
    onSubmit({
      name: name.trim(),
      target: targetValue,
      total: mode === "edit" ? pot!.total : 0,
      theme,
    })
  }

  const isValid = name.trim() && target && parseFloat(target) > 0 && theme

  return (
    <Modal onClose={onClose}>
      <h2 className="text-[32px] font-bold text-grey-900 mb-2">
        {mode === "add" ? "Add New Pot" : "Edit Pot"}
      </h2>
      <p className="text-[14px] text-grey-500 mb-6">
        {mode === "add"
          ? "Create a pot to set savings targets. These can help you reach your financial goals."
          : "Update your pot details to keep your savings goals on track."}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Pot Name</label>
          <input
            type="text"
            placeholder="e.g. Rainy Days"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="w-full h-[45px] px-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 placeholder:text-beige-500 outline-none focus:border-grey-900 transition-colors"
          />
          <p className="text-[12px] text-grey-500 mt-1 text-right">{30 - name.length} characters left</p>
        </div>

        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Target</label>
          <CurrencyInput value={target} onChange={setTarget} />
        </div>

        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Theme</label>
          <ThemeColorPicker value={theme} onChange={setTheme} usedThemes={usedThemes} />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full h-[53px] bg-grey-900 text-white text-[14px] font-bold rounded-lg hover:bg-grey-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {mode === "add" ? "Add Pot" : "Save Changes"}
        </button>
      </form>
    </Modal>
  )
}
