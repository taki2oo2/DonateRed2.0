import MyButton from '@/components/MyButton'
import Search from '@/components/search/Search'
import CampCardsList from '@/components/cards/CampCardsList'
import { CampCardsGridSkeleton } from '@/components/cards/CampCardSkeleton'
import ROUTES from "@/constants/routes"
import { Suspense } from 'react'
import { MapPin} from 'lucide-react'
import Link from 'next/link'

const DonationCampsPage = async({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string
    page?: string
  }>
}) => {
  const resolvedParams = await searchParams;
  const currentPage = resolvedParams.page ? Number(resolvedParams.page) : 1;

  return (
    <main className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Decorative Ambient Background Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Top-Right Crimson Aura */}
        <div className="absolute -top-36 -right-24 sm:-right-10 size-[500px] sm:size-[650px] rounded-full bg-[#FB2C36]/10 dark:bg-[#FB2C36]/15 blur-[140px]" />

        {/* Top-Left Ambient Blob */}
        <div className="absolute top-12 -left-40 size-[450px] rounded-full bg-red-400/10 dark:bg-[#FB2C36]/10 blur-[130px]" />

        {/* Center Subtle Atmosphere Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-[#FB2C36]/5 dark:bg-[#FB2C36]/8 blur-[160px]" />

        {/* Bottom-Right Accent Glow */}
        <div className="absolute -bottom-40 right-1/4 size-[500px] rounded-full bg-[#FB2C36]/8 dark:bg-red-900/15 blur-[150px]" />

        {/* Top Down Gradient Sheen */}
        <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-[#FB2C36]/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header Section matching mockup exactly */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white text-wrap: balance">
              Blood Donation Camps<span className="text-[#FB2C36]">.</span>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-[65ch] text-wrap: pretty">
              Find and participate in local blood drives. Your single donation can save up to three lives. Discover active camps near you or organize your own to support the community.
            </p>
          </div>
          <div className="shrink-0 pt-2">
            <Link href = {ROUTES.POST_CAMP}>
            <MyButton 
              className="w-full sm:w-auto h-11 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-semibold px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              + Post a New Camp
            </MyButton>
            </Link>
          </div>
        </div>

        {/* Search Panel matching mockup exactly */}
        <div className="mt-6">
          <Suspense fallback={<div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" />}>
            <Search
              placeholder="Search by location, camp name, or organizer..."
              icon={<MapPin className="size-5 text-zinc-400 dark:text-zinc-500" />}
            />
          </Suspense>
        </div>

        {/* Camp Cards Grid */}
        <div className="mt-10">
          <Suspense 
            key={`${resolvedParams.city || ''}-${currentPage}`}
            fallback={<CampCardsGridSkeleton />}
          >
            <CampCardsList city={resolvedParams.city} page={currentPage} />
          </Suspense>
        </div>

      </div>
    </main>
  )
}

export default DonationCampsPage