"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
    const [minimized, setMinimized] = useState(false);

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
export default LayoutShell