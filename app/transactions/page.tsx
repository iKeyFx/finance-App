import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Browse and search your full transaction history, sorted and filtered by date, category, or amount.",
  openGraph: {
    title: "Transactions | Finance App",
    description: "Browse and search your full transaction history, sorted and filtered by date, category, or amount.",
  },
};

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