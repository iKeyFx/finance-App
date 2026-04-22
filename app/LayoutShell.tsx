"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

const AUTH_PATHS = ["/login", "/sign-up"]

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [minimized, setMinimized] = useState(false);

    if (AUTH_PATHS.includes(pathname)) return <>{children}</>

    return (
        <>
            <Sidebar minimized={minimized} setMinimized={setMinimized} />
            <div
                className={`transition-all duration-300 ease-in-out pb-20 lg:pb-0 min-h-screen ${minimized ? "lg:pl-[88px]" : "lg:pl-[300px]"
                    }`}
            >
                <main className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-8">{children}</main>
            </div>
        </>
    );
}