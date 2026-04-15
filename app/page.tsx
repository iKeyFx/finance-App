import BalanceCards from "@/app/components/overviews/BalanceCards";
import PotsOverview from "@/app/components/overviews/PotsOverview";
import TransactionsOverview from "@/app/components/overviews/TransactionsOverview";
import BudgetsOverview from "@/app/components/overviews/BudgetsOverview";
import RecurringBillsOverview from "@/app/components/overviews/RecurringBillsOverview";
import rawData from "@/app/data/data.json";
import type {
    Balance,
    Pot,
    Transaction,
    Budget,
    RecurringBillsSummary,
} from "@/app/data/types";

const balance: Balance = rawData.balance;
const pots: Pot[] = rawData.pots.slice(0, 4);
const transactions: Transaction[] = rawData.transactions.slice(0, 5);
const budgets: Budget[] = rawData.budgets.slice(0, 4);
const recurringBillsSummary: RecurringBillsSummary = rawData.recurringBillsSummary;

const OverviewPage = () => {
    return (
        <>
            {/* Page Title */}
            <h1 className="text-[32px] font-bold text-grey-900 mb-8">Overview</h1>

            {/* Balance Cards */}
            <BalanceCards data={balance} />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_372px] gap-6 mt-8">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <PotsOverview pots={pots} />
                    <TransactionsOverview transactions={transactions} />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <BudgetsOverview budgets={budgets} />
                    <RecurringBillsOverview summary={recurringBillsSummary} />
                </div>
            </div>
        </>
    );
};

export default OverviewPage;