import { RecurringBillsSummary } from "@/app/data/types";
import Image from "next/image";
import Link from "next/link";
import { formatCurrencyNoSign as formatCurrency } from "@/lib/formatter";

interface RecurringBillsOverviewProps {
  summary: RecurringBillsSummary;
}



const RecurringBillsOverview = ({
  summary,
}: RecurringBillsOverviewProps) => {
  const items = [
    { label: "Paid Bills", amount: summary.paid, borderColor: "#277C78" },
    {
      label: "Total Upcoming",
      amount: summary.upcoming,
      borderColor: "#F2CDAC",
    },
    { label: "Due Soon", amount: summary.dueSoon, borderColor: "#82C9D7" },
  ];

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[20px] font-bold text-grey-900">Recurring Bills</h2>
        <Link
          href="/recurring-bills"
          className="flex items-center gap-3 text-[14px] text-grey-500 hover:text-grey-900 transition-colors"
        >
          See Details
          <Image
            src="/images/icon-caret-right.svg"
            alt=""
            width={6}
            height={11}
          />
        </Link>
      </div>

      {/* Bills List */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between bg-beige-100 rounded-xl py-4 px-4 border-l-4"
            style={{ borderLeftColor: item.borderColor }}
          >
            <span className="text-[14px] text-grey-500">{item.label}</span>
            <span className="text-[14px] font-bold text-grey-900">
              {formatCurrency(item.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecurringBillsOverview;