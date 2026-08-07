import React from 'react'
import DonarSearch from '@/components/search/DonarSearch'
import DonorCard from '@/components/cards/DonorCard'
import { Users } from 'lucide-react'

const FindDonorsPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden">

      {/* Background Ambient Glows & Grid Pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-[#FB2C36]/12 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">

        {/* ============ SECTION 1: HERO & SEARCH ============ */}
        <section className="space-y-8">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            {/* Live Network Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm backdrop-blur-md mb-5">
              <span className="size-2 rounded-full bg-[#FB2C36] animate-pulse" />
              <span>Live Donor Directory &amp; Real-Time Search</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.15]">
              Find Life-Saving{" "}
              <span className="bg-gradient-to-r from-[#FB2C36] via-[#FF535B] to-[#FF8A90] bg-clip-text text-transparent">
                Donors
              </span>
              <span className="text-[#FB2C36]">.</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-[#ffb4ab]/90 max-w-2xl">
              Instantly connect with verified blood donors in your area. Every second counts in a medical emergency—search by location and blood group below.
            </p>
          </div>

          {/* Search Card Container */}
          <div className="relative z-30 rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0c0c0e]/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-red-500/5 transition-all duration-300">
            <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FB2C36]/50 to-transparent" />
            <DonarSearch />
          </div>
        </section>

        {/* ============ SECTION 2: RESULTS ============ */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <Users className="size-5 text-[#FB2C36]" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Available Donors</h2>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Showing matches nearby</span>
          </div>

          <div className="space-y-4">
            <DonorCard />
          </div>
        </section>

      </div>
    </main>
  )
}

export default FindDonorsPage