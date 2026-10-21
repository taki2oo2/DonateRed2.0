import { Suspense } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import WorkCard from "@/components/cards/WorkCard"
import MyButton from '../../components/MyButton';
import Link from "next/link"
import DonarSearch from "@/components/search/DonarSearch";
import ROUTES from "@/constants/routes";

const page = () => {
  return (
    <main className="flex flex-col items-center mb-12">
      <section className="relative mt-4 w-[calc(100vw-24px)] rounded-3xl border border-zinc-200/80 bg-gradient-to-r from-white via-white/80 to-[#E8C2C4]/35 dark:border-white/10 dark:from-zinc-950 dark:via-zinc-950/80 dark:to-[#7F1D1D]/20 sm:mt-8 sm:w-[95vw] max-w-7xl min-h-[480px] lg:min-h-[520px] flex items-center shadow-xs">
        {/* Soft background glowing blobs */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute -left-30 top-[-100px] h-[500px] w-[500px] rounded-full bg-[#FB2C36]/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute -right-30 bottom-[-100px] h-[500px] w-[500px] rounded-full bg-[#FB2C36]/10 blur-[120px] animate-[pulse_12s_ease-in-out_infinite]" />
        </div>

        {/* Main content layout container */}
        <div className="relative z-10 w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 flex items-center">

          {/* Left Content */}
          <div className="relative z-10 w-full max-w-[640px] flex flex-col items-start justify-center">
            <div>
              <Badge
                variant="secondary"
                className="mb-5 max-w-full gap-2 rounded-full border border-white/60 bg-white/60 px-3.5 py-1.5 text-[11px] font-mono font-medium leading-4 text-zinc-800 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-zinc-200 sm:text-xs transition-transform duration-200 hover:scale-[1.02]">
                <span className="size-2 rounded-full bg-[#FB2C36] animate-pulse" />
                <span className="tabular-nums">Trusted by 50,000+ donors nationwide</span>
              </Badge>
            </div>
            <h1 className="font-heading max-w-[540px] text-[34px] font-extrabold leading-[1.08] tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-[56px] text-wrap: balance">
              Find a blood donor
              <br className="hidden sm:block" />
              {" "}
              in <span className="text-[#FB2C36]">seconds</span>,
              <br className="sm:hidden" />
              {" "}
              save a life today.
            </h1>

            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg sm:leading-8 font-normal text-wrap: pretty">
              Connect instantly with verified donors near you. A faster, safer way to bridge patients in need with heroes ready to give.
            </p>

            <Suspense fallback={<div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-end w-full"><div className="md:col-span-5 h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" /><div className="md:col-span-4 h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" /><div className="md:col-span-2 h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" /></div>}>
              <DonarSearch compact className="mt-7 gap-3 w-full" />
            </Suspense>

            {/* Features Row */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 text-xs font-medium text-zinc-600 dark:text-zinc-400 w-full">
              <span className="group flex items-center gap-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#FEF2F2] dark:bg-[#FB2C36]/15 transition-transform duration-200 group-hover:scale-110">
                  <Image src="/shield.svg" alt="" width={12} height={12} className="size-3" />
                </div>
                Verified donors
              </span>
              <span className="group flex items-center gap-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#FEF2F2] dark:bg-[#FB2C36]/15 transition-transform duration-200 group-hover:scale-110">
                  <Image src="/clock.svg" alt="" width={12} height={12} className="size-3" />
                </div>
                Real-time availability
              </span>
              <span className="group flex items-center gap-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#FEF2F2] dark:bg-[#FB2C36]/15 transition-transform duration-200 group-hover:scale-110">
                  <Image src="/lock.svg" alt="" width={12} height={12} className="size-3" />
                </div>
                Private &amp; secure
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div className="absolute inset-y-0 right-0 z-0 h-full w-[48%] hidden lg:block pointer-events-none">
            <Image
              src="/health.png"
              alt="medical illustration"
              fill
              sizes="(min-width: 1024px) 48vw, 0px"
              className="object-cover object-[center_35%] opacity-45 dark:opacity-30 [filter:saturate(0.85)_contrast(0.95)]"
              priority
            />
            {/* Blends image to the left and to the reddish-brown tint of the section */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent dark:from-zinc-950 dark:via-zinc-950/10 dark:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#FB2C36]/5 via-transparent to-transparent" />
          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section className="w-[95vw] max-w-7xl py-24">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-3.5 rounded-full border border-[#FB2C36]/25 bg-[#FEF2F2]/80 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#FB2C36] dark:bg-[#FB2C36]/10">
            How it works
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white text-wrap: balance">
            Get help in three simple steps
          </h2>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-zinc-500 dark:text-zinc-400 text-wrap: pretty">
            Search nearby donors, connect securely, and coordinate a lifesaving donation when every minute matters.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-6 md:grid-cols-3">
          <WorkCard src="/search-2.svg" alt="search" title={"01. Search donors"} content={"Find verified donors by blood type, location, city, or hospital in seconds."} />
          <WorkCard src="/chat.svg" alt="chat" title={"02. Connect safely"} content={"Reach available donors through a clear, private request flow built for urgent moments."} />
          <WorkCard src="/heartline.svg" alt="heart line" title={"03. Save a life"} content={"Confirm the match, coordinate the donation, and help someone get blood on time."} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative flex min-h-[340px] w-[95vw] max-w-7xl items-center justify-center overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/70 px-8 py-16 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/5 shadow-xs">
        <div className="absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#FB2C36]/20 blur-[110px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FB2C36]/10 blur-[105px] dark:bg-[#FB2C36]/15" />
        <div className="absolute -right-20 top-10 h-[360px] w-[360px] rounded-full bg-[#FB2C36]/15 blur-[100px] animate-[pulse_14s_ease-in-out_infinite]" />
        <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-zinc-950 dark:text-white text-wrap: balance">
            Ready to make a difference?
          </h2>
          <p className="mt-4 max-w-[50ch] text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal text-wrap: pretty">
            Join thousands of donors helping patients get life-saving blood when they need it most.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MyButton
              asChild
              className="group/btn h-11 min-w-[160px] gap-2 rounded-xl bg-[#FB2C36] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(251,44,54,0.8)] hover:!bg-[#E7000B] hover:!text-white transition-all active:scale-[0.98] cursor-pointer"
            >
              <Link href={ROUTES.DONATE}>
                <Image src="/heartline.svg" alt="" width={16} height={16} className="size-4 brightness-0 invert transition-transform duration-200 group-hover/btn:scale-115" />
                <span>Become a Donor</span>
              </Link>
            </MyButton>
            <MyButton
              asChild
              className="group/btn h-11 min-w-[150px] gap-2 rounded-xl border border-zinc-200/90 bg-white/70 px-6 text-sm font-semibold text-[#FB2C36] shadow-none backdrop-blur-md hover:!bg-[#FEF2F2] hover:!text-[#E7000B] dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:!bg-white/15 dark:hover:!text-white transition-all active:scale-[0.98] cursor-pointer"
            >
              <Link href={ROUTES.FIND_DONORS}>
                <Image src="/drop-red.svg" alt="" width={16} height={16} className="size-4 dark:brightness-0 dark:invert transition-transform duration-200 group-hover/btn:translate-y-0.5" />
                <span>Request Blood</span>
              </Link>
            </MyButton>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page
