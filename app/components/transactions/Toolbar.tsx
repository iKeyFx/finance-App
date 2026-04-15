"use client";

import Image from "next/image";
import type { SortOption, TransactionCategory } from "@/app/data/types";
import { TRANSACTION_CATEGORIES } from "@/app/data/types";
import { SORT_OPTIONS } from "@/lib/constants";


interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

//SortDropdown
interface SortDropdownProps {
  value: SortOption;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: SortOption) => void;
}

// CategoryFilter
interface CategoryFilterProps {
  value: TransactionCategory;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: TransactionCategory) => void;
}


export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative flex-1 max-w-xs">
      <input
        id="search-transactions"
        type="text"
        placeholder="Search transaction"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[45px] rounded-lg border border-beige-500 bg-white pl-4 pr-11 text-[14px] text-grey-900 placeholder:text-beige-500 outline-none focus:border-grey-900 transition-colors"
      />
      <Image
        src="/images/icon-search.svg"
        alt="Search"
        width={16}
        height={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}


export function SortDropdown({ value, isOpen, onToggle, onSelect }: SortDropdownProps) {
  return (
    <div className="relative flex items-center gap-2">
      <span className="hidden sm:inline text-grey-500 text-[14px] whitespace-nowrap">
        Sort by
      </span>
      <button
        id="sort-dropdown-trigger"
        onClick={onToggle}
        className="flex items-center gap-2 h-[45px] px-4 rounded-lg sm:border border-beige-500 text-[14px] text-grey-500 hover:border-grey-900 transition-colors cursor-pointer"
      >
        <Image
          src="/images/icon-sort-mobile.svg"
          alt="Sort"
          width={16}
          height={16}
          className="sm:hidden"
        />
        <span className="hidden sm:inline font-medium text-grey-900">
          {SORT_OPTIONS.find((o) => o.value === value)?.label}
        </span>
        <Image
          src="/images/icon-caret-down.svg"
          alt=""
          width={12}
          height={6}
          className={`hidden sm:block transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute right-0 top-[52px] z-30 w-[180px] bg-white rounded-lg shadow-lg border border-grey-100 py-2">
          {SORT_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => onSelect(opt.value)}
                className={`w-full text-left px-4 py-2 text-[14px] hover:bg-beige-100 transition-colors cursor-pointer ${value === opt.value ? "font-bold text-grey-900" : "text-grey-500"
                  }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export function CategoryFilter({ value, isOpen, onToggle, onSelect }: CategoryFilterProps) {
  return (
    <div className="relative flex items-center gap-2">
      <span className="hidden sm:inline text-grey-500 text-[14px]">Category</span>
      <button
        id="category-dropdown-trigger"
        onClick={onToggle}
        className="flex items-center gap-2 h-[45px] px-4 rounded-lg sm:border border-beige-500 text-[14px] text-grey-500 hover:border-grey-900 transition-colors cursor-pointer"
      >
        <Image
          src="/images/icon-filter-mobile.svg"
          alt="Filter"
          width={16}
          height={16}
          className="sm:hidden"
        />
        <span className="hidden sm:inline font-medium text-grey-900">{value}</span>
        <Image
          src="/images/icon-caret-down.svg"
          alt=""
          width={12}
          height={6}
          className={`hidden sm:block transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute right-0 top-[52px] z-30 w-[210px] bg-white rounded-lg shadow-lg border border-grey-100 py-2 max-h-[320px] overflow-y-auto">
          {TRANSACTION_CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onSelect(cat)}
                className={`w-full text-left px-4 py-2 text-[14px] hover:bg-beige-100 transition-colors cursor-pointer ${value === cat ? "font-bold text-grey-900" : "text-grey-500"
                  }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
