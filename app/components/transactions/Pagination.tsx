"use client";

import Image from "next/image";
import { getPageNumbers } from "@/lib/transaction";

//  PageButtons
interface PageButtonsProps {
  pages: (number | "...")[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

function PageButtons({ pages, currentPage, onPageChange }: PageButtonsProps) {
  return (
    <>
      {pages.map((item, idx) =>
        item === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-[40px] h-[40px] rounded-lg border border-beige-500 flex items-center justify-center text-[14px] text-grey-500"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`w-[40px] h-[40px] rounded-lg text-[14px] font-medium transition-colors cursor-pointer ${item === currentPage
              ? "bg-grey-900 text-white"
              : "border border-beige-500 text-grey-900 hover:bg-beige-100"
              }`}
          >
            {item}
          </button>
        )
      )}
    </>
  );
}

// Pagination
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-grey-100">
      {/* Prev */}
      <button
        id="pagination-prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 h-[40px] px-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 hover:bg-beige-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <Image src="/images/icon-caret-left.svg" alt="" width={6} height={11} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Mobile pages (threshold 3) */}
      <div className="flex sm:hidden items-center gap-1">
        <PageButtons
          pages={getPageNumbers(currentPage, totalPages, 3)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>

      {/* Desktop pages (threshold 5) */}
      <div className="hidden sm:flex items-center gap-2">
        <PageButtons
          pages={getPageNumbers(currentPage, totalPages, 5)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>

      {/* Next */}
      <button
        id="pagination-next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 h-[40px] px-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 hover:bg-beige-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <span className="hidden sm:inline">Next</span>
        <Image src="/images/icon-caret-right.svg" alt="" width={6} height={11} />
      </button>
    </div>
  );
}
