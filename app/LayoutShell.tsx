"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const [minimized, setMinimized] = useState(false);

    return (
        <>
            <Sidebar minimized={minimized} setMinimized={setMinimized} />
            <div
                className={`transition-all duration-300 ease-in-out pb-20 lg:pb-0 min-h-screen ${minimized ? "lg:pl-[88px]" : "lg:pl-[300px]"
                    }`}
            >
                <main>{children}</main>
            </div>
        </>
    );
}