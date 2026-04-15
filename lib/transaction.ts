import type { Transaction, SortOption } from "@/app/data/types";

/** Sort transactions by the given criteria */
export function sortTransactions(
    items: Transaction[],
    sort: SortOption
): Transaction[] {
    const sorted = [...items];
    const sorters: Record<SortOption, (a: Transaction, b: Transaction) => number> = {
        latest: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        oldest: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        "a-z": (a, b) => a.name.localeCompare(b.name),
        "z-a": (a, b) => b.name.localeCompare(a.name),
        highest: (a, b) => b.amount - a.amount,
        lowest: (a, b) => a.amount - b.amount,
    };
    return sorted.sort(sorters[sort]);
}



export function getPageNumbers(
    current: number,
    total: number,
    threshold: number
): (number | "...")[] {
    if (total <= threshold) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];
    const rangeStart = Math.max(2, current - 1);
    const rangeEnd = Math.min(total - 1, current + 1);

    if (rangeStart > 2) pages.push("...");
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < total - 1) pages.push("...");

    pages.push(total);
    return pages;
}
