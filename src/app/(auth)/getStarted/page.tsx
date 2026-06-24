"use client"

import Image from "next/image"
import Link from "next/link"

import {
  HeartPulse,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const GetStartedPage = () => {
  return (
    <main className="h-screen overflow-hidden bg-[#050506] text-white">
      <section className="grid h-screen lg:grid-cols-[1.08fr_1fr]">
        <div className="relative hidden items-center justify-center overflow-hidden border-r border-white/10 px-8 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_52%,rgba(251,44,54,0.42),transparent_26%),radial-gradient(circle_at_62%_58%,rgba(251,44,54,0.24),transparent_21%),linear-gradient(135deg,#1a0508_0%,#09090b_58%,#040405_100%)]" />
          <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FB2C36]/10 blur-[100px]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-medium text-zinc-200 shadow-2xl backdrop-blur-xl transition hover:bg-white/12"
            >
              <Image src="/drop-red.svg" alt="" width={14} height={14} className="size-3.5" />
              Welcome Back
            </Link>

            <h1 className="text-4xl font-bold tracking-[-1px] text-white sm:text-5xl">
              Welcome Back
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300 sm:text-base">
              Join donors, hospitals, and volunteers moving life-saving blood where it is needed most.
            </p>

            <div className="relative mt-8 h-52 w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/8 bg-[#111114]/80 shadow-[0_30px_100px_-40px_rgba(251,44,54,0.9)] backdrop-blur-xl">
              <div className="absolute left-8 top-9 size-20 rounded-full border border-[#FB2C36]/20 bg-[#FB2C36]/35 blur-[1px]" />
              <div className="absolute right-12 top-16 size-28 rounded-full border border-[#FB2C36]/15 bg-[#FB2C36]/24 blur-[2px]" />
              <div className="absolute -bottom-16 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#FB2C36]/20 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

              <div className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#151518]/90 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#FB2C36]/10">
                  <HeartPulse className="size-3.5 text-[#FB2C36]" />
                </span>
                Give blood. Give someone tomorrow.
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-screen  items-center justify-center overflow-hidden px-4 py-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white/5 to-transparent">
          <Tabs defaultValue="login" className="w-[420px]">
            <TabsList className="w-full bg-white/5 border border-white/8 rounded-xl p-1">
              <TabsTrigger
                value="login"
                className="flex-1 text-zinc-400 data-[state=active]:bg-[#FB2C36] data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg text-sm font-medium transition-all duration-200"
              >
                <UserRound className="size-4" />
                Account
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 text-zinc-400 data-[state=active]:bg-[#FB2C36] data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg text-sm font-medium transition-all duration-200"
              >
                <LockKeyhole className="size-4" />
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="login"
              className="mt-4 p-5 bg-[#111114]/80 border border-white/8 rounded-xl backdrop-blur-xl shadow-[0_0_30px_-20px_rgba(251,44,54,0.5)]"
            >
              
            </TabsContent>
            <TabsContent
              value="signup"
              className="mt-4 p-5 bg-[#111114]/80 border border-white/8 rounded-xl backdrop-blur-xl shadow-[0_0_30px_-20px_rgba(251,44,54,0.5)]"
            >
              
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <div className="pointer-events-none fixed bottom-6 left-6 hidden items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs text-zinc-400 backdrop-blur-md md:flex">
        <ShieldCheck className="size-4 text-[#FB2C36]" />
        Protected donor access
      </div>

    </main>
  )
}

export default GetStartedPage
