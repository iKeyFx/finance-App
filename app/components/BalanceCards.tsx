import type { BalanceData } from "@/app/data/financeData";

interface BalanceCardsProps {
  data: BalanceData;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

const BalanceCards = ({ data }: BalanceCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
      {/* Current Balance — dark card */}
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
export default BalanceCards;
