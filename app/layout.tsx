import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutShell from "./LayoutShell";

const publicSans = localFont({
  src: [
    {
      path: "./fonts/PublicSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/PublicSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Finance App",
    default: "Finance App",
  },
  description: "Track your balance, budgets, transactions, and savings all in one place.",
  keywords: ["personal finance", "budget tracker", "expense tracker", "savings", "transactions"],
  authors: [{ name: "Finance App" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Finance App",
    title: "Finance App",
    description: "Track your balance, budgets, transactions, and savings all in one place.",
  },
  twitter: {
    card: "summary",
    title: "Finance App",
    description: "Track your balance, budgets, transactions, and savings all in one place.",
  },
  icons: {
    icon: "/images/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="min-h-screen">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}