import Image from "next/image";
import Link from "next/link";
import type { TransactionData } from "@/app/data/financeData";

interface TransactionsOverviewProps {
  transactions: TransactionData[];
}

function formatCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));
  return amount >= 0 ? `+${formatted}` : `-${formatted}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TransactionsOverview = ({
  transactions,
}: TransactionsOverviewProps) => {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[20px] font-bold text-grey-900">Transactions</h2>
        <Link
          href="/transactions"
          className="flex items-center gap-3 text-[14px] text-grey-500 hover:text-grey-900 transition-colors"
        >
          View All
          <Image
            src="/images/icon-caret-right.svg"
            alt=""
            width={6}
            height={11}
          />
        </Link>
      </div>

      {/* Transaction List */}
      <ul className="divide-y divide-grey-100">
        {transactions.map((tx, index) => (
          <li
            key={`${tx.name}-${index}`}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-4">
              <Image
                src={tx.avatar}
                alt={tx.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="text-[14px] font-bold text-grey-900">
                {tx.name}
              </span>
            </div>
            <div className="text-right">
              <p
                className={`text-[14px] font-bold ${tx.amount >= 0 ? "text-green" : "text-grey-900"
                  }`}
              >
                {formatCurrency(tx.amount)}
              </p>
              <p className="text-[12px] text-grey-500 mt-1">
                {formatDate(tx.date)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionsOverview;