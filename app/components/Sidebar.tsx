"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import LogoutModal from "@/app/components/auth/LogoutModal";

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
  { label: "Overview", href: "/overview", icon: "/images/icon-nav-overview.svg" },
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

const Sidebar = ({ minimized, setMinimized }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

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
                        ? "bg-beige-100 border-l-green text-grey-900 rounded-r-xl mr-3"
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

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-4 px-8 py-4 text-grey-300 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M7.5 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.333 14.167 17.5 10l-4.167-4.167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!minimized && (
            <span className="text-[14px] font-normal">Log Out</span>
          )}
        </button>

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
          <li>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex flex-col items-center gap-1 px-3 py-2 text-grey-300 transition-colors duration-200 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.333 14.167 17.5 10l-4.167-4.167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[10px] font-bold hidden sm:block">Log Out</span>
            </button>
          </li>
        </ul>
      </nav>
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}

export default Sidebar;