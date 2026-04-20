import { Balance } from "@/app/data/types";
import { formatCurrency } from "@/lib/formatCurrencyNoSign";


interface BalanceCardsProps {
  data: Balance;
}


export default function BalanceCards({ data }: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
      {/* Current Balance */}
      <div className="bg-grey-900 text-white rounded-xl p-5 sm:p-6">
        <p className="text-[14px] text-white/80">Current Balance</p>
        <p className="text-[32px] font-bold mt-3 leading-tight">
          {formatCurrency(data.current)}
        </p>
      </div>

      {/* Income */}
      <div className="bg-white rounded-xl p-5 sm:p-6">
        <p className="text-[14px] text-grey-500">Income</p>
        <p className="text-[32px] font-bold mt-3 leading-tight">
          {formatCurrency(data.income)}
        </p>
      </div>

      {/* Expenses */}
      <div className="bg-white rounded-xl p-5 sm:p-6">
        <p className="text-[14px] text-grey-500">Expenses</p>
        <p className="text-[32px] font-bold mt-3 leading-tight">
          {formatCurrency(data.expenses)}
        </p>
      </div>
    </div>
  );
}
