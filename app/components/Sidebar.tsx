"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface SidebarProps {
  minimized: boolean;
  setMinimized: (value: boolean) => void;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: "/images/icon-nav-overview.svg" },
  {
    label: "Transactions",
    href: "/transactions",
    icon: "/images/icon-nav-transactions.svg",
  },
  { label: "Budgets", href: "/budgets", icon: "/images/icon-nav-budgets.svg" },
  { label: "Pots", href: "/pots", icon: "/images/icon-nav-pots.svg" },
  {
    label: "Recurring Bills",
    href: "/recurring-bills",
    icon: "/images/icon-nav-recurring-bills.svg",
  },
];

export default function Sidebar({ minimized, setMinimized }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-grey-900 hidden lg:flex flex-col transition-all duration-300 ease-in-out z-50 ${minimized ? "w-[88px]" : "w-[300px]"
          } rounded-r-2xl`}
      >
        {/* Logo */}
        <div className="pt-10 pb-6 px-8">
          {minimized ? (
            <Image
              src="/images/logo-small.svg"
              alt="Finance"
              width={14}
              height={22}
            />
          ) : (
            <Image
              src="/images/logo-large.svg"
              alt="Finance"
              width={122}
              height={22}
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-2">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-4 py-4 border-l-4 transition-all duration-200 ${minimized ? "px-5 justify-center" : "px-8"
                      } ${isActive
                        ? "bg-beige-100 border-l-green text-grey-900 rounded-r-xl"
                        : "border-l-transparent text-grey-300 hover:text-white"
                      }`}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={20}
                      height={20}
                      className={`transition-all duration-200 ${isActive
                        ? "brightness-0 saturate-100 sepia-[.6] hue-rotate-[120deg]"
                        : "group-hover:brightness-200"
                        }`}
                      style={
                        isActive
                          ? {
                            filter:
                              "brightness(0) saturate(100%) invert(40%) sepia(15%) saturate(1500%) hue-rotate(130deg) brightness(95%)",
                          }
                          : undefined
                      }
                    />
                    {!minimized && (
                      <span
                        className={`text-[14px] font-bold whitespace-nowrap ${isActive ? "text-grey-900" : ""
                          }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Minimize Button */}
        <button
          onClick={() => setMinimized(!minimized)}
          className="flex items-center gap-4 px-8 py-6 text-grey-300 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <Image
            src="/images/icon-minimize-menu.svg"
            alt=""
            width={20}
            height={20}
            className={`transition-transform duration-300 ${minimized ? "rotate-180" : ""
              }`}
          />
          {!minimized && (
            <span className="text-[14px] font-normal">Minimize Menu</span>
          )}
        </button>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-grey-900 lg:hidden z-50 rounded-t-xl">
        <ul className="flex justify-around items-center px-4 pt-2 pb-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-t-lg transition-all duration-200 ${isActive
                    ? "bg-beige-100 border-b-4 border-b-green -mb-1"
                    : "text-grey-300"
                    }`}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    style={
                      isActive
                        ? {
                          filter:
                            "brightness(0) saturate(100%) invert(40%) sepia(15%) saturate(1500%) hue-rotate(130deg) brightness(95%)",
                        }
                        : undefined
                    }
                  />
                  <span
                    className={`text-[10px] font-bold hidden sm:block ${isActive ? "text-grey-900" : "text-grey-300"
                      }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
