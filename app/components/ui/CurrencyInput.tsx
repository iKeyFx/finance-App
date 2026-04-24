"use client"

interface CurrencyInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function CurrencyInput({ value, onChange, placeholder = "e.g. 2000", disabled }: CurrencyInputProps) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-4 text-[14px] text-beige-500 pointer-events-none">$</span>
      <input
        type="number"
        min="0.01"
        step="0.01"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full h-[45px] pl-8 pr-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 placeholder:text-beige-500 outline-none focus:border-grey-900 transition-colors disabled:opacity-50"
      />
    </div>
  )
}
