import { SortOption } from "@/app/data/types";

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
    { label: "A to Z", value: "a-z" },
    { label: "Z to A", value: "z-a" },
    { label: "Highest", value: "highest" },
    { label: "Lowest", value: "lowest" },
];

export const ITEMS_PER_PAGE = 10;

export const THEME_OPTIONS = [
    { name: "Green", value: "#277C78" },
    { name: "Yellow", value: "#F2CDAC" },
    { name: "Cyan", value: "#82C9D7" },
    { name: "Navy", value: "#626070" },
    { name: "Red", value: "#C94736" },
    { name: "Purple", value: "#826CB0" },
    { name: "Turquoise", value: "#597C7C" },
    { name: "Brown", value: "#93674F" },
    { name: "Magenta", value: "#934F6F" },
    { name: "Blue", value: "#3F82B2" },
    { name: "Navy Grey", value: "#97A0AC" },
    { name: "Army Green", value: "#7F9161" },
    { name: "Gold", value: "#CAB361" },
    { name: "Orange", value: "#BE6C49" },
] as const;