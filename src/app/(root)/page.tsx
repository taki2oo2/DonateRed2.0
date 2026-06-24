import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import WorkCard from "@/components/WorkCard"
import MyButton from '../../components/MyButton';

const page = () => {
  return (
    <main className="flex flex-col items-center mb-8">
      <section className="relative mt-4 min-h-[540px] w-[calc(100vw-24px)] overflow-hidden rounded-xl border sm:mt-8 sm:min-h-[600px] sm:w-[95vw] lg:h-[550px] lg:min-h-0">
        <div className="absolute -left-30 h-[500px] w-[500px] rounded-full bg-[#FB2C36]/20 blur-[120px]" />
        <div className="absolute -right-30 h-[500px] w-[500px] bottom-50 rounded-full bg-[#FB2C36]/20 blur-[120px]" />
        <div className="relative z-10 flex h-full flex-col items-start justify-center gap-6 px-5 py-8 sm:gap-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:p-0">

          {/* Left Content */}
          <div className="relative z-10 w-full max-w-[600px] lg:ml-30">
            <div>
              <Badge
                variant="secondary"
                className="mb-4 max-w-full gap-2 rounded-full border border-white/60 bg-white/45 px-3 py-[5px] text-[11px] font-normal leading-4 text-[#18181B] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white sm:px-[13px] sm:text-xs">
                <span className="size-2 rounded-full bg-[#FB2C36]" />
                Trusted by 50,000+ donors nationwide
              </Badge>
            </div>
            <h1 className="max-w-[420px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.7px] text-black dark:text-white sm:max-w-none sm:text-5xl sm:leading-tight sm:tracking-normal">
              Find a blood donor
              <br className="hidden sm:block" />
              {" "}
              in <span className="text-[#FB2C36]">seconds</span>,
              save a life
              <br className="hidden sm:block" />
              {" "}
              today.
            </h1>

            <p className="mt-4 max-w-[440px] text-sm font-light leading-6 text-zinc-500 sm:max-w-[520px] sm:text-md">
              Connect instantly with verified donors near you.
              A faster, safer way to bridge those in need with
              people ready to give.
            </p>
            <div>

            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-normal leading-4 text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Image src="/shield.svg" alt="" width={16} height={16} className="size-4" />
                Verified donors
              </span>
              <span className="flex items-center gap-1.5">
                <Image src="/clock.svg" alt="" width={16} height={16} className="size-4" />
                Real-time availability
              </span>
              <span className="flex items-center gap-1.5">
                <Image src="/lock.svg" alt="" width={16} height={16} className="size-4" />
                Private &amp; secure
              </span>
            </div>
          </div>

          {/* Right Image */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-full overflow-hidden sm:w-[75%] lg:relative lg:h-[600px] lg:w-[600px] lg:shrink-0">
            <Image
              src="/health.png"
              alt="medical image"
              fill
              className="object-cover object-[65%_center] opacity-20 [filter:saturate(0.85)_contrast(0.9)] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.12)_30%,rgba(0,0,0,0.62)_58%,black_100%)] sm:opacity-30 lg:object-center lg:opacity-40 lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.18)_22%,rgba(0,0,0,0.7)_46%,black_100%)]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-[#FB2C36]/10 to-[#7F1D1D]/35 dark:from-transparent dark:via-[#FB2C36]/10 dark:to-[#7F1D1D]/35" />
    
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
              className="h-11 min-w-[160px] gap-2 rounded-xl bg-[#FB2C36] px-6 text-sm font-medium text-white shadow-[0_12px_30px_-18px_rgba(251,44,54,0.8)] hover:!bg-[#E7000B] hover:!text-white"
            >
              <Image src="/heartline.svg" alt="" width={16} height={16} className="size-4 brightness-0 invert" />
              Become a Donor
            </MyButton>
            <MyButton
              className="h-11 min-w-[150px] gap-2 rounded-xl border border-[#E4E4E7] bg-white/50 px-6 text-sm font-medium text-[#FB2C36] shadow-none backdrop-blur-md hover:!bg-[#FEF2F2] hover:!text-[#E7000B] dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:!bg-white/15 dark:hover:!text-white"
            >
              <Image src="/drop-red.svg" alt="" width={16} height={16} className="size-4 dark:brightness-0 dark:invert" />
              Request Blood
            </MyButton>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page
