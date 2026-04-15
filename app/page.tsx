import BalanceCards from "@/app/components/BalanceCards";
import PotsOverview from "@/app/components/PotsOverview";
import TransactionsOverview from "@/app/components/TransactionsOverview";
import BudgetsOverview from "@/app/components/BudgetsOverview";
import RecurringBillsOverview from "@/app/components/RecurringBillsOverview";
import {
    balanceData,
    potsData,
    transactionsData,
    budgetsData,
    recurringBillsSummary,
} from "@/app/data/financeData";

const OverviewPage = () => {
    return (
        <>
            {/* Page Title */}
            <h1 className="text-[32px] font-bold text-grey-900 mb-8">Overview</h1>

            {/* Balance Cards */}
            <BalanceCards data={balanceData} />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_372px] gap-6 mt-8">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <PotsOverview pots={potsData} />
                    <TransactionsOverview transactions={transactionsData} />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <BudgetsOverview budgets={budgetsData} />
                    <RecurringBillsOverview summary={recurringBillsSummary} />
                </div>
            </div>
        </ >
    );
}

export default OverviewPage;