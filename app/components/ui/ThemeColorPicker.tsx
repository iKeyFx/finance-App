"use client"

import { useState } from "react"
import { THEME_OPTIONS } from "@/lib/constants"

interface ThemeColorPickerProps {
  value: string
  onChange: (value: string) => void
  usedThemes?: string[]
}

export default function ThemeColorPicker({ value, onChange, usedThemes = [] }: ThemeColorPickerProps) {
  const [open, setOpen] = useState(false)
  const selectedTheme = THEME_OPTIONS.find((t) => t.value === value)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-[45px] px-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 flex items-center justify-between hover:border-grey-900 transition-colors cursor-pointer bg-white"
      >
        <span className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: value }} />
          {selectedTheme?.name ?? "Select a theme"}
        </span>
        <svg
          width="12"
          height="6"
          viewBox="0 0 12 6"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l5 4 5-4" stroke="#696868" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul className="absolute left-0 right-0 top-[52px] z-20 bg-white rounded-lg shadow-lg border border-grey-100 py-2 max-h-[240px] overflow-y-auto">
            {THEME_OPTIONS.map((t) => {
              const alreadyUsed = usedThemes.includes(t.value)
              return (
                <li key={t.value}>
                  <button
                    type="button"
                    onClick={() => { if (!alreadyUsed) { onChange(t.value); setOpen(false) } }}
                    disabled={alreadyUsed}
                    className={`w-full text-left px-4 py-2 text-[14px] flex items-center justify-between transition-colors ${alreadyUsed ? "cursor-not-allowed opacity-60" : "hover:bg-beige-100 cursor-pointer"} ${t.value === value ? "font-bold text-grey-900" : "text-grey-900"}`}
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
  )
}
