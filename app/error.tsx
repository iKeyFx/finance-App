"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-beige-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-10 max-w-md w-full flex flex-col items-center gap-6 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-red/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#C94F4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-[24px] font-bold text-grey-900 mb-2">Something went wrong</h1>
          <p className="text-[14px] text-grey-500">
            An unexpected error occurred. You can try again or return to the overview.
          </p>
          {error.digest && (
            <p className="mt-3 text-[12px] text-grey-500 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            type="button"
            onClick={unstable_retry}
            className="flex-1 bg-grey-900 text-white text-[14px] font-bold px-5 py-3 rounded-lg hover:bg-grey-500 transition-colors cursor-pointer text-center"
          >
            Try again
          </button>
          <Link
            href="/overview"
            className="flex-1 bg-beige-100 text-grey-900 text-[14px] font-bold px-5 py-3 rounded-lg hover:bg-beige-500 transition-colors cursor-pointer text-center"
          >
            Go to Overview
          </Link>
        </div>
      </div>
    </div>
  )
}
