import Image from "next/image";
import Link from "next/link";
import type { PotData } from "@/app/data/financeData";

interface PotsOverviewProps {
  pots: PotData[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

const PotsOverview = ({ pots }: PotsOverviewProps) => {
  const totalSaved = pots.reduce((acc, pot) => acc + pot.total, 0);

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[20px] font-bold text-grey-900">Pots</h2>
        <Link
          href="/pots"
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

      {/* Content */}
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5">
        {/* Total Saved */}
        <div className="flex items-center gap-4 bg-beige-100 rounded-xl p-4 sm:min-w-[220px]">
          <Image
            src="/images/icon-pot.svg"
            alt=""
            width={28}
            height={36}
          />
          <div>
            <p className="text-[14px] text-grey-500">Total Saved</p>
            <p className="text-[32px] font-bold leading-tight">
              {formatCurrency(totalSaved)}
            </p>
          </div>
        </div>

        {/* Individual Pots */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {pots.map((pot) => (
            <div key={pot.name} className="flex items-center gap-4">
              <div
                className="w-1 h-full min-h-[43px] rounded-full"
                style={{ backgroundColor: pot.theme }}
              />
              <div>
                <p className="text-[12px] text-grey-500">{pot.name}</p>
                <p className="text-[14px] font-bold">
                  {formatCurrency(pot.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PotsOverview;