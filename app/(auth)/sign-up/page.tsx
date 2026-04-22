import type { Metadata } from "next"
import AuthLayout from "@/app/components/auth/AuthLayout"
import SignUpForm from "@/app/components/auth/SignUpForm"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Finance App account to start tracking your money.",
  openGraph: {
    title: "Sign Up | Finance App",
    description: "Create a Finance App account to start tracking your money.",
  },
}

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  )
}
