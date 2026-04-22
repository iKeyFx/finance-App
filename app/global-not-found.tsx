import Link from "next/link"
import type { Metadata } from "next"
import "./globals.css"
import localFont from "next/font/local"

const publicSans = localFont({
  src: [
    { path: "./fonts/PublicSans-VariableFont_wght.ttf", style: "normal" },
    { path: "./fonts/PublicSans-Italic-VariableFont_wght.ttf", style: "italic" },
  ],
  variable: "--font-public-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "404 – Page Not Found",
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="min-h-screen bg-beige-100 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-6 text-center max-w-sm">
          <p className="text-[80px] font-bold text-grey-900 leading-none">404</p>
          <div>
            <h1 className="text-[24px] font-bold text-grey-900 mb-2">Page not found</h1>
            <p className="text-[14px] text-grey-500">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
          <Link
            href="/overview"
            className="bg-grey-900 text-white text-[14px] font-bold px-5 py-3 rounded-lg hover:bg-grey-500 transition-colors"
          >
            Go to Overview
          </Link>
        </div>
      </body>
    </html>
  )
}
