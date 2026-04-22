import type { Metadata } from "next"
import AuthLayout from "@/app/components/auth/AuthLayout"
import LoginForm from "@/app/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Finance App account.",
  openGraph: {
    title: "Login | Finance App",
    description: "Log in to your Finance App account.",
  },
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
