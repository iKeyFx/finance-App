import TransactionsTable from "@/app/components/transactions/TransactionsTable";
import rawData from "@/app/data/data.json";
import type { Transaction } from "@/app/data/types";

const transactions: Transaction[] = rawData.transactions;

const TransactionsPage = () => {
    return (
        <>
            {/* Page Title */}
            <h1 className="text-[32px] font-bold text-grey-900 mb-8">Transactions</h1>

            {/* Transactions Table */}
            <TransactionsTable transactions={transactions} />
        </>
    );
};

export default TransactionsPage;