import { SortOption } from "@/app/data/types";

// Constants
export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
    { label: "A to Z", value: "a-z" },
    { label: "Z to A", value: "z-a" },
    { label: "Highest", value: "highest" },
    { label: "Lowest", value: "lowest" },
];

export const ITEMS_PER_PAGE = 10;