import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-beige-100 flex items-center justify-center p-6 overflow-hidden">
      <div className="flex items-center gap-6 w-full h-full">
        {/* Left dark panel */}
        <div className="hidden lg:flex bg-grey-900 rounded-2xl p-8 w-[480px] shrink-0 flex-col justify-between overflow-hidden h-full">
          <Image src="/images/logo-large.svg" alt="Finance" width={122} height={22} />
          <div className="-mx-8 flex-1 min-h-0 overflow-hidden">
            <img
              src="/images/illustration-authentication.svg"
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-[24px] font-bold text-white mb-4">
              Keep track of your money and save for your future
            </h2>
            <p className="text-[14px] text-grey-300">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>

        {/* Right form card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[560px] bg-white rounded-2xl p-8 sm:p-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
