import Image from "next/image";
import type { Transaction } from "@/app/data/types";
import { formatCurrency, formatDate } from "@/lib/formatter";


interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction: tx }: TransactionRowProps) {
  return (
    <li className="grid grid-cols-[1fr_auto] sm:grid-flow-col sm:grid-cols-4 gap-2 items-center py-4 border-b border-grey-100 last:border-b-0">
      {/* Name + Avatar */}
      <div className="flex items-center gap-4 min-w-0">
        <Image
          src={tx.avatar}
          alt={tx.name}
          width={40}
          height={40}
          className="rounded-full object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="truncate text-[14px] font-bold text-grey-900">
            {tx.name}
          </p>
          <p className="sm:hidden text-[12px] text-grey-500 mt-0.5">
            {tx.category}
          </p>
        </div>
      </div>

      {/* Desktop: Category */}
      <span className="hidden sm:block text-[12px] text-grey-500">
        {tx.category}
      </span>

      {/* Desktop: Date */}
      <span className="hidden sm:block text-[12px] text-grey-500">
        {formatDate(tx.date)}
      </span>

      {/* Amount + mobile date */}
      <div className="text-right">
        <p
          className={`text-[14px] font-bold ${tx.amount >= 0 ? "text-green" : "text-grey-900"
            }`}
        >
          {formatCurrency(tx.amount)}
        </p>
        <p className="sm:hidden text-[12px] text-grey-500 mt-0.5">
          {formatDate(tx.date)}
        </p>
      </div>
    </li>
  );
}
