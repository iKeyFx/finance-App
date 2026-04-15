"use client";

import { useMemo, useState } from "react";
import type { Transaction, SortOption, TransactionCategory } from "@/app/data/types";
import { sortTransactions } from "@/lib/transaction";
import { SearchInput, SortDropdown, CategoryFilter } from "./Toolbar";
import Pagination from "./Pagination";
import TransactionRow from "./TransactionRow";
import { ITEMS_PER_PAGE } from "@/lib/constants";


interface TransactionsTableProps {
  transactions: Transaction[];
}

// Component 
export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");
  const [category, setCategory] = useState<TransactionCategory>("All Transactions");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  // Filtered + sorted list
  const filtered = useMemo(() => {
    let result = transactions;

    if (category !== "All Transactions") {
      result = result.filter((tx) => tx.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((tx) => tx.name.toLowerCase().includes(q));
    }

    return sortTransactions(result, sort);
  }, [transactions, search, sort, category]);

  // Pagination 
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Handlers (reset page on filter change) 
  const resetAndSet = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearch = resetAndSet(setSearch);

  const handleSort = (value: SortOption) => {
    setSort(value);
    setSortOpen(false);
    setCurrentPage(1);
  };

  const handleCategory = (value: TransactionCategory) => {
    setCategory(value);
    setCategoryOpen(false);
    setCurrentPage(1);
  };

  const toggleSort = () => {
    setSortOpen((prev) => !prev);
    setCategoryOpen(false);
  };

  const toggleCategory = () => {
    setCategoryOpen((prev) => !prev);
    setSortOpen(false);
  };


  return (
    <section className="bg-white rounded-xl p-4 sm:p-8">
      {/* Toolbar */}
      <div className="flex items-center gap-2 sm:gap-4 mb-6">
        <SearchInput value={search} onChange={handleSearch} />

        <div className="flex items-center sm:gap-4 ml-auto">
          <SortDropdown
            value={sort}
            isOpen={sortOpen}
            onToggle={toggleSort}
            onSelect={handleSort}
          />
          <CategoryFilter
            value={category}
            isOpen={categoryOpen}
            onToggle={toggleCategory}
            onSelect={handleCategory}
          />
        </div>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden sm:grid grid-flow-col grid-cols-4 pb-3 border-b border-grey-100">
        <span className="text-[12px] text-grey-500 truncate">Recipient / Sender</span>
        <span className="text-[12px] text-grey-500">Category</span>
        <span className="text-[12px] text-grey-500">Transaction Date</span>
        <span className="text-[12px] text-grey-500 text-right">Amount</span>
      </div>

      {/* Transaction Rows */}
      {paginated.length === 0 ? (
        <div className="py-12 text-center text-grey-500 text-[14px]">
          No transactions found.
        </div>
      ) : (
        <ul>
          {paginated.map((tx, idx) => (
            <TransactionRow
              key={`${tx.name}-${tx.date}-${idx}`}
              transaction={tx}
            />
          ))}
        </ul>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
