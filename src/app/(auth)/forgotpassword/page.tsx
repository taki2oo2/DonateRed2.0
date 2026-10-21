"use client"

import Link from "next/link"
import { Suspense } from "react"
import {
  ArrowRight,
  Droplets,
  KeyRound,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react"
import Logo from "@/components/navigation/Logo"
import ForgotPasswordForm from "@/components/forms/ForgotPassword"
import ROUTES from "@/constants/routes"

const ForgotPasswordPage = () => {
  return (
    <main className="relative min-h-screen lg:h-screen lg:overflow-hidden bg-[#050506] text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-[#FB2C36]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 size-[500px] rounded-full bg-[#FB2C36]/5 blur-[120px]" />
      </div>

      <section className="relative grid min-h-screen lg:h-screen lg:grid-cols-[1.08fr_1fr]">
        {/* ============ LEFT BRANDING PANEL ============ */}
        <div className="relative hidden items-center justify-center overflow-hidden border-r border-white/10 px-12 lg:flex">
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_52%,rgba(251,44,54,0.35),transparent_35%),radial-gradient(circle_at_62%_58%,rgba(251,44,54,0.18),transparent_28%),linear-gradient(135deg,#120204_0%,#050506_50%,#010102_100%)] pointer-events-none" />
          <div className="absolute left-1/4 top-1/3 h-[320px] w-[320px] rounded-full bg-[#FB2C36]/8 blur-[80px] pointer-events-none" />

          {/* Brand logo — top left */}
          <Logo className="absolute left-10 top-10 z-20" />

          <div className="relative z-10 w-full max-w-[500px] flex flex-col justify-center gap-7 py-12 text-left items-start">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FB2C36]/20 bg-[#FB2C36]/5 text-xs font-medium text-[#FB2C36]">
              <LockKeyhole className="size-3.5" />
              Account Security &amp; Recovery
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.1]">
                Restore Your <span className="bg-gradient-to-r from-[#FB2C36] to-[#FF8A90] bg-clip-text text-transparent">Account</span> Access.
              </h1>
              <p className="text-sm leading-6 text-zinc-400">
                Don&apos;t worry, it happens to the best of us. We&apos;ll help you securely verify your identity and get back to making a difference.
              </p>
            </div>

            {/* Secure & Private Card */}
            <div className="w-full group/card relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.01] p-5 backdrop-blur-md transition-all hover:border-[#FB2C36]/30 hover:bg-white/[0.03]">
              <div className="absolute -right-8 -bottom-8 size-24 rounded-full bg-[#FB2C36]/5 blur-2xl transition-all group-hover/card:bg-[#FB2C36]/8 pointer-events-none" />
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#FB2C36]/10 text-[#FB2C36] mb-4">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Protected Recovery Flow</h3>
              <p className="mt-1.5 text-xs leading-5 text-zinc-400">
                Single-use verification codes and strict end-to-end encryption guarantee that only verified account owners can update login credentials.
              </p>
            </div>
          </div>
        </div>

        {/* ============ RIGHT AUTH PANEL ============ */}
        <div className="relative flex min-h-screen lg:h-full w-full items-center justify-center overflow-y-auto px-4 py-8 sm:px-6 lg:px-12 bg-gradient-to-b from-white/5 to-transparent">
          {/* Red glow behind form */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FB2C36]/10 blur-[100px]" />

          {/* Mobile brand header */}
          <Link
            href="/"
            className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 lg:hidden"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#FB2C36] shadow-[0_8px_25px_-8px_rgba(251,44,54,0.9)]">
              <Droplets className="size-4.5 text-white" />
            </span>
            <span className="text-base font-bold tracking-tight">
              Donate<span className="text-[#FB2C36]">Red</span>
            </span>
          </Link>

          <div className="relative z-10 w-full max-w-[420px] my-auto py-8">
            {/* Card header */}
            <div className="mb-6 text-center lg:text-left">
              <span className="mb-3 inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <KeyRound className="size-6 text-[#FB2C36]" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Forgot <span className="text-[#FB2C36]">Password</span>?
              </h2>
              <p className="mt-1.5 text-sm text-zinc-400">
                Verify your identity to reset your password and restore access to your account.
              </p>
            </div>

            {/* Form Card */}
            <div className="p-6 bg-[#111114]/80 border border-white/8 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_-20px_rgba(251,44,54,0.5)]">
              <ForgotPasswordForm />
            </div>

            {/* Bottom links */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <Link
                  href={ROUTES.GET_STARTED}
                  className="transition hover:text-white"
                >
                  Return to sign in
                </Link>
                <span className="text-zinc-600">•</span>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 transition hover:text-white"
                >
                  <ArrowRight className="size-3.5 rotate-180" />
                  Home
                </Link>
              </div>
              <p className="text-center text-[11px] leading-5 text-zinc-600">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-zinc-400 underline-offset-2 transition hover:text-[#FB2C36] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-zinc-400 underline-offset-2 transition hover:text-[#FB2C36] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protected badge */}
      <div className="pointer-events-none fixed bottom-6 left-6 z-20 hidden items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs text-zinc-400 backdrop-blur-md md:flex">
        <ShieldCheck className="size-4 text-[#FB2C36]" />
        Protected donor recovery
      </div>
    </main>
  )
}

const ForgotPasswordPageWrapped = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050506] text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ForgotPasswordPage />
    </Suspense>
  )
}

export default ForgotPasswordPageWrapped