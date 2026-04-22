"use client"

import { useState, useEffect } from "react"
import type { Pot } from "@/app/data/types"

const POT_THEMES = [
  { name: "Green", value: "#277C78" },
  { name: "Yellow", value: "#F2CDAC" },
  { name: "Cyan", value: "#82C9D7" },
  { name: "Navy", value: "#626070" },
  { name: "Red", value: "#C94736" },
  { name: "Purple", value: "#826CB0" },
  { name: "Turquoise", value: "#597C7C" },
  { name: "Brown", value: "#93674F" },
  { name: "Magenta", value: "#934F6F" },
  { name: "Blue", value: "#3F82B2" },
  { name: "Navy Grey", value: "#97A0AC" },
  { name: "Army Green", value: "#7F9161" },
  { name: "Gold", value: "#CAB361" },
  { name: "Orange", value: "#BE6C49" },
]

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
  const [theme, setTheme] = useState(mode === "edit" ? pot!.theme : (POT_THEMES[0]?.value ?? ""))
  const [themeOpen, setThemeOpen] = useState(false)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const usedThemes = existingPots
    .filter((p) => mode === "edit" ? p.name !== pot!.name : true)
    .map((p) => p.theme)

  const selectedTheme = POT_THEMES.find((t) => t.value === theme)

  const handleSubmit = (e: React.FormEvent) => {
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

        <h2 className="text-[32px] font-bold text-grey-900 mb-2">
          {mode === "add" ? "Add New Pot" : "Edit Pot"}
        </h2>
        <p className="text-[14px] text-grey-500 mb-6">
          {mode === "add"
            ? "Create a pot to set savings targets. These can help you reach your financial goals."
            : "Update your pot details to keep your savings goals on track."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Pot Name */}
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

          {/* Target */}
          <div>
            <label className="text-[14px] font-bold text-grey-900 mb-2 block">Target</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[14px] text-beige-500 pointer-events-none">$</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="e.g. 2000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full h-[45px] pl-8 pr-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 placeholder:text-beige-500 outline-none focus:border-grey-900 transition-colors"
              />
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="text-[14px] font-bold text-grey-900 mb-2 block">Theme</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeOpen((o) => !o)}
                className="w-full h-[45px] px-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 flex items-center justify-between hover:border-grey-900 transition-colors cursor-pointer bg-white"
              >
                <span className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: theme }} />
                  {selectedTheme?.name ?? "Select a theme"}
                </span>
                <svg width="12" height="6" viewBox="0 0 12 6" className={`transition-transform duration-200 ${themeOpen ? "rotate-180" : ""}`}>
                  <path d="M1 1l5 4 5-4" stroke="#696868" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {themeOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setThemeOpen(false)} />
                  <ul className="absolute left-0 right-0 top-[52px] z-20 bg-white rounded-lg shadow-lg border border-grey-100 py-2 max-h-[240px] overflow-y-auto">
                    {POT_THEMES.map((t) => {
                      const alreadyUsed = usedThemes.includes(t.value)
                      return (
                        <li key={t.value}>
                          <button
                            type="button"
                            onClick={() => { if (!alreadyUsed) { setTheme(t.value); setThemeOpen(false) } }}
                            disabled={alreadyUsed}
                            className={`w-full text-left px-4 py-2 text-[14px] flex items-center justify-between transition-colors ${alreadyUsed ? "cursor-not-allowed opacity-60" : "hover:bg-beige-100 cursor-pointer"} ${t.value === theme ? "font-bold text-grey-900" : "text-grey-900"}`}
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.value }} />
                              {t.name}
                            </span>
                            {alreadyUsed && <span className="text-[12px] text-grey-500">Already used</span>}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full h-[53px] bg-grey-900 text-white text-[14px] font-bold rounded-lg hover:bg-grey-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {mode === "add" ? "Add Pot" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}
