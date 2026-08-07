import { Suspense } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import WorkCard from "@/components/cards/WorkCard"
import MyButton from '../../components/MyButton';
import Link from "next/link"
import DonarSearch from "@/components/search/DonarSearch";

const page = () => {
  return (
    <main className="flex flex-col items-center mb-8">
      <section className="relative mt-4 w-[calc(100vw-24px)] rounded-2xl border border-zinc-200/80 bg-gradient-to-r from-white via-white/80 to-[#E8C2C4]/35 dark:border-white/10 dark:from-zinc-950 dark:via-zinc-950/80 dark:to-[#7F1D1D]/20 sm:mt-8 sm:w-[95vw] max-w-7xl min-h-[480px] lg:min-h-[500px] flex items-center">
        {/* Soft background glowing blobs */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute -left-30 top-[-100px] h-[500px] w-[500px] rounded-full bg-[#FB2C36]/10 blur-[120px]" />
          <div className="absolute -right-30 bottom-[-100px] h-[500px] w-[500px] rounded-full bg-[#FB2C36]/10 blur-[120px]" />
        </div>

        {/* Main content layout container */}
        <div className="relative z-10 w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 flex items-center">

          {/* Left Content */}
          <div className="relative z-10 w-full max-w-[620px] flex flex-col items-start justify-center">
            <div>
              <Badge
                variant="secondary"
                className="mb-4 max-w-full gap-2 rounded-full border border-white/60 bg-white/45 px-3 py-[5px] text-[11px] font-normal leading-4 text-[#18181B] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white sm:px-[13px] sm:text-xs">
                <span className="size-2 rounded-full bg-[#FB2C36] animate-pulse" />
                Trusted by 50,000+ donors nationwide
              </Badge>
            </div>
            <h1 className="max-w-[500px] text-[34px] font-extrabold leading-[1.1] tracking-[-0.8px] text-zinc-900 dark:text-white sm:text-5xl lg:text-[54px] lg:leading-[1.15]">
              Find a blood donor
              <br className="hidden sm:block" />
              {" "}
              in <span className="text-[#FB2C36]">seconds</span>,
              <br className="sm:hidden" />
              {" "}
              save a life today.
            </h1>

            <p className="mt-4 max-w-[480px] text-sm font-light leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base sm:leading-7">
              Connect instantly with verified donors near you.
              A faster, safer way to bridge those in need with
              people ready to give.
            </p>

            <Suspense fallback={<div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-end"><div className="md:col-span-5 h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" /><div className="md:col-span-4 h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" /><div className="md:col-span-2 h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" /></div>}>
              <DonarSearch compact className="mt-6 gap-3" />
            </Suspense>

            {/* Features Row */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 text-xs font-normal leading-4 text-zinc-500 dark:text-zinc-400 w-full">
              <span className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#FEF2F2] dark:bg-[#FB2C36]/10">
                  <Image src="/shield.svg" alt="" width={12} height={12} className="size-3" />
                </div>
                Verified donors
              </span>
              <span className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#FEF2F2] dark:bg-[#FB2C36]/10">
                  <Image src="/clock.svg" alt="" width={12} height={12} className="size-3" />
                </div>
                Real-time availability
              </span>
              <span className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#FEF2F2] dark:bg-[#FB2C36]/10">
                  <Image src="/lock.svg" alt="" width={12} height={12} className="size-3" />
                </div>
                Private &amp; secure
              </span>
            </div>
          </div>

          {/* Right Image (Hidden on Mobile/Tablet decrease) */}
          <div className="absolute inset-y-0 right-0 z-0 h-full w-[48%] hidden lg:block pointer-events-none">
            <Image
              src="/health.png"
              alt="medical illustration"
              fill
              className="object-cover object-[center_35%] opacity-45 dark:opacity-30 [filter:saturate(0.85)_contrast(0.95)]"
              priority
            />
            {/* Blends image to the left and to the reddish-brown tint of the section */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent dark:from-zinc-950 dark:via-zinc-950/10 dark:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#FB2C36]/5 via-transparent to-transparent" />
          </div>

        </div>
      </section>
      <section className="w-[95vw] py-20">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-3 rounded-full border border-[#FB2C36]/20 bg-[#FEF2F2]/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#FB2C36] dark:bg-[#FB2C36]/10">
            How it works
          </span>
          <span className="text-4xl font-bold tracking-[-0.8px] text-zinc-950 dark:text-white">
            Get help in three simple steps
          </span>
          <span className="mt-4 text-base leading-7 text-zinc-500 dark:text-zinc-400">
            Search nearby donors, connect securely, and coordinate a lifesaving donation when every minute matters.
          </span>
        </div>
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-6 md:grid-cols-3">
          <WorkCard src="/search-2.svg" alt="search" title={"01. Search donors"} content={"Find verified donors by blood type, location, city, or hospital in seconds."} />
          <WorkCard src="/chat.svg" alt="chat" title={"02. Connect safely"} content={"Reach available donors through a clear, private request flow built for urgent moments."} />
          <WorkCard src="/heartline.svg" alt="heart line" title={"03. Save a life"} content={"Confirm the match, coordinate the donation, and help someone get blood on time."} />
        </div>
      </section>
      <section className="relative flex min-h-[336px] w-[95vw] items-center justify-center overflow-hidden rounded-[28px] border border-[#E4E4E7] bg-white/70 px-8 py-16 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#FB2C36]/20 blur-[110px]" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FB2C36]/10 blur-[105px] dark:bg-[#FB2C36]/15" />
        <div className="absolute -right-20 top-10 h-[360px] w-[360px] rounded-full bg-[#FB2C36]/15 blur-[100px]" />
        <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center">
          <h1 className="text-[40px] font-bold leading-[1.15] tracking-[-0.8px] text-zinc-950 dark:text-white">
            Ready to make a difference?
          </h1>
          <span className="mt-5 max-w-[680px] text-lg font-normal leading-7 text-zinc-500 dark:text-zinc-300">
            Join thousands of donors helping patients get life-saving blood when they need it most.
          </span>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MyButton
              asChild
              className="h-11 min-w-[160px] gap-2 rounded-xl bg-[#FB2C36] px-6 text-sm font-medium text-white shadow-[0_12px_30px_-18px_rgba(251,44,54,0.8)] hover:!bg-[#E7000B] hover:!text-white cursor-pointer"
            >
              <Link href="/donate">
                <Image src="/heartline.svg" alt="" width={16} height={16} className="size-4 brightness-0 invert" />
                Become a Donor
              </Link>
            </MyButton>
            <MyButton
              asChild
              className="h-11 min-w-[150px] gap-2 rounded-xl border border-[#E4E4E7] bg-white/50 px-6 text-sm font-medium text-[#FB2C36] shadow-none backdrop-blur-md hover:!bg-[#FEF2F2] hover:!text-[#E7000B] dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:!bg-white/15 dark:hover:!text-white cursor-pointer"
            >
              <Link href="/finddonors">
                <Image src="/drop-red.svg" alt="" width={16} height={16} className="size-4 dark:brightness-0 dark:invert" />
                Request Blood
              </Link>
            </MyButton>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page
