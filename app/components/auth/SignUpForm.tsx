"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"

export default function SignUpForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/overview")
  }

  return (
    <div>
      <h1 className="text-[32px] font-bold text-grey-900 mb-8">Sign Up</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-[45px] px-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 outline-none focus:border-grey-900 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-[45px] px-4 rounded-lg border border-beige-500 text-[14px] text-grey-900 outline-none focus:border-grey-900 transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-[14px] font-bold text-grey-900 mb-2 block">Create Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full h-[45px] px-4 pr-12 rounded-lg border border-beige-500 text-[14px] text-grey-900 outline-none focus:border-grey-900 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 text-grey-500 hover:text-grey-900 transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Image
                src={showPassword ? "/images/icon-hide-password.svg" : "/images/icon-show-password.svg"}
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>
          <p className="text-[12px] text-grey-500 text-right mt-1">
            Passwords must be at least 8 characters
          </p>
        </div>

        {error && (
          <p className="text-[13px] text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[53px] bg-grey-900 text-white text-[14px] font-bold rounded-lg hover:bg-grey-500 transition-colors cursor-pointer mt-2 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-[14px] text-grey-500 text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-grey-900 underline">
          Login
        </Link>
      </p>
    </div>
  )
}
