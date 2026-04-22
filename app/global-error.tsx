"use client"

import { useEffect } from "react"

export default function GlobalError({
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
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", backgroundColor: "#f8f4f0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: "1rem" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "40px", maxWidth: "420px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(201,79,79,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#C94F4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#201f24", margin: "0 0 8px" }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: "14px", color: "#696868", margin: 0 }}>
              A critical error occurred. Please try again.
            </p>
            {error.digest && (
              <p style={{ fontSize: "12px", color: "#696868", fontFamily: "monospace", marginTop: "12px" }}>
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={unstable_retry}
            style={{ width: "100%", backgroundColor: "#201f24", color: "#ffffff", fontSize: "14px", fontWeight: 700, padding: "12px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
