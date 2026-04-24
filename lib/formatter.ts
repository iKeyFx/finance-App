/** Format a number as USD currency with +/- sign prefix */
export function formatCurrency(amount: number): string {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
}

/** Format a number as USD currency without sign prefix */
export function formatCurrencyNoSign(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

/** Format an ISO date string as "1 Jan 2024" */
export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

/** Format a number with its ordinal suffix: 1st, 2nd, 3rd, 4th… */
export function formatOrdinal(n: number): string {
    const s = ["th", "st", "nd", "rd"]
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
}

