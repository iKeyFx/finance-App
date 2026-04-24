"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import type { RecurringBill } from "@/app/recurring-bills/page"
import { formatCurrencyNoSign, formatOrdinal } from "@/lib/formatter"
import { SORT_OPTIONS } from "@/lib/constants"
import type { SortOption } from "@/app/data/types"

function getBillStatus(day: number, today: number): "paid" | "dueSoon" | "upcoming" {
  if (day <= today) return "paid"
  if (day <= today + 5) return "dueSoon"
  return "upcoming"
}

export default function RecurringBillsClient({ bills }: { bills: RecurringBill[] }) {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<SortOption>("latest")
  const [sortOpen, setSortOpen] = useState(false)

  const today = new Date().getUTCDate()

  const totalBills = useMemo(
    () => bills.reduce((sum, b) => sum + b.amount, 0),
    [bills]
  )

  const { paidCount, paidTotal, upcomingCount, upcomingTotal, dueSoonCount, dueSoonTotal } =
    useMemo(() => {
      let paidCount = 0, paidTotal = 0
      let upcomingCount = 0, upcomingTotal = 0
      let dueSoonCount = 0, dueSoonTotal = 0
      for (const b of bills) {
        const status = getBillStatus(b.day, today)
        if (status === "paid") { paidCount++; paidTotal += b.amount }
        else if (status === "dueSoon") { dueSoonCount++; dueSoonTotal += b.amount; upcomingCount++; upcomingTotal += b.amount }
        else { upcomingCount++; upcomingTotal += b.amount }
      }
      return { paidCount, paidTotal, upcomingCount, upcomingTotal, dueSoonCount, dueSoonTotal }
    }, [bills, today])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    const result = q ? bills.filter((b) => b.name.toLowerCase().includes(q)) : [...bills]
    result.sort((a, b) => {
      switch (sort) {
        case "latest": return a.day - b.day
        case "oldest": return b.day - a.day
        case "a-z": return a.name.localeCompare(b.name)
        case "z-a": return b.name.localeCompare(a.name)
        case "highest": return b.amount - a.amount
        case "lowest": return a.amount - b.amount
        default: return 0
      }
    })
    return result
  }, [bills, search, sort])

  return (
    <>
      <h1 className="text-[32px] font-bold text-grey-900 mb-8">Recurring Bills</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left column */}
        <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-6">
          {/* Total Bills card */}
          <div className="bg-grey-900 rounded-xl p-6 flex flex-col gap-8">
            <Image src="/images/icon-recurring-bills.svg" alt="" width={40} height={40} />
            <div>
              <p className="text-[14px] text-white/70 mb-2">Total Bills</p>
              <p className="text-[32px] font-bold text-white">{formatCurrencyNoSign(totalBills)}</p>
            </div>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-[16px] font-bold text-grey-900 mb-5">Summary</h2>
            <div className="flex flex-col divide-y divide-beige-500">
              <div className="flex items-center justify-between py-4">
                <span className="text-[13px] text-grey-500">Paid Bills</span>
                <span className="text-[13px] font-bold text-grey-900">
                  {paidCount} ({formatCurrencyNoSign(paidTotal)})
                </span>
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-[13px] text-grey-500">Total Upcoming</span>
                <span className="text-[13px] font-bold text-grey-900">
                  {upcomingCount} ({formatCurrencyNoSign(upcomingTotal)})
                </span>
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-[13px] text-red">Due Soon</span>
                <span className="text-[13px] font-bold text-red">
                  {dueSoonCount} ({formatCurrencyNoSign(dueSoonTotal)})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="bg-white rounded-xl p-6 sm:p-8 flex-1 w-full">
          {/* Toolbar */}
          <div className="flex items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search bills"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-[45px] rounded-lg border border-beige-500 bg-white pl-4 pr-11 text-[14px] text-grey-900 placeholder:text-beige-500 outline-none focus:border-grey-900 transition-colors"
              />
              <Image
                src="/images/icon-search.svg"
                alt=""
                width={16}
                height={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>

            {/* Sort */}
            <div className="relative flex items-center gap-2">
              <span className="hidden sm:inline text-grey-500 text-[14px] whitespace-nowrap">Sort by</span>
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 h-[45px] px-4 rounded-lg sm:border border-beige-500 text-[14px] text-grey-900 hover:border-grey-900 transition-colors cursor-pointer"
              >
                <Image src="/images/icon-sort-mobile.svg" alt="Sort" width={16} height={16} className="sm:hidden" />
                <span className="hidden sm:inline font-medium">
                  {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                </span>
                <Image
                  src="/images/icon-caret-down.svg"
                  alt=""
                  width={12}
                  height={6}
                  className={`hidden sm:block transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <ul className="absolute right-0 top-[52px] z-30 w-[180px] bg-white rounded-lg shadow-lg border border-grey-100 py-2">
                  {SORT_OPTIONS.map((opt) => (
                    <li key={opt.value}>
                      <button
                        type="button"
                        onClick={() => { setSort(opt.value); setSortOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-[14px] hover:bg-beige-100 transition-colors cursor-pointer ${sort === opt.value ? "font-bold text-grey-900" : "text-grey-500"}`}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 pb-3 border-b border-grey-100 mb-1">
            <span className="text-[12px] text-grey-500">Bill Title</span>
            <span className="text-[12px] text-grey-500 text-center">Due Date</span>
            <span className="text-[12px] text-grey-500 text-right">Amount</span>
          </div>

          {/* Bills list */}
          {filtered.length === 0 ? (
            <p className="text-[14px] text-grey-500 py-8 text-center">No bills found.</p>
          ) : (
            <ul className="divide-y divide-grey-100">
              {filtered.map((bill) => {
                const status = getBillStatus(bill.day, today)
                return (
                  <li key={bill.name} className="grid grid-cols-[40px_1fr_auto] sm:grid-cols-[1fr_auto_auto] gap-x-4 items-center py-4">
                    {/* Avatar — mobile only (desktop version lives inside the title cell) */}
                    <Image
                      src={bill.avatar}
                      alt={bill.name}
                      width={40}
                      height={40}
                      className="rounded-full shrink-0 sm:hidden"
                    />

                    {/* Title cell */}
                    <div className="min-w-0">
                      {/* Desktop: avatar + name inline */}
                      <div className="hidden sm:flex items-center gap-4 min-w-0">
                        <Image src={bill.avatar} alt={bill.name} width={40} height={40} className="rounded-full shrink-0" />
                        <span className="text-[14px] font-bold text-grey-900 truncate">{bill.name}</span>
                      </div>
                      {/* Mobile: name then date below */}
                      <span className="sm:hidden text-[14px] font-bold text-grey-900 truncate block">{bill.name}</span>
                      <div className="sm:hidden flex items-center gap-2 mt-1 whitespace-nowrap">
                        <span className={`text-[12px] font-medium ${status === "upcoming" ? "text-grey-500" : "text-green"}`}>
                          Monthly · {formatOrdinal(bill.day)}
                        </span>
                        {status === "paid" && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#277C78" />
                            <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {status === "dueSoon" && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#C94F4F" />
                            <path d="M8 5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="8" cy="11" r="0.75" fill="white" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Due Date — desktop only */}
                    <div className="hidden sm:flex items-center gap-2 whitespace-nowrap">
                      <span className={`text-[12px] font-medium ${status === "upcoming" ? "text-grey-500" : "text-green"}`}>
                        Monthly · {formatOrdinal(bill.day)}
                      </span>
                      {status === "paid" && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#277C78" />
                          <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {status === "dueSoon" && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#C94F4F" />
                          <path d="M8 5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="8" cy="11" r="0.75" fill="white" />
                        </svg>
                      )}
                    </div>

                    {/* Amount */}
                    <span className={`text-[14px] font-bold text-right ${status === "dueSoon" ? "text-red" : "text-grey-900"}`}>
                      {formatCurrencyNoSign(bill.amount)}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
