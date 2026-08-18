import MyButton from '@/components/MyButton'
import Search from '@/components/search/Search'
import CampCards from '@/components/cards/CampCards'
import ROUTES from "@/constants/routes"
import { Suspense } from 'react'
import { MapPin} from 'lucide-react'
import Link from 'next/link'
import { getCamps } from '@/actions/camp.action'

const DonationCampsPage = async({
  searchParams,
}: {
  searchParams: Promise<{
    city?:string
  }>
}) => {
  const resolvedParams = await searchParams;
  const result = resolvedParams.city ? await getCamps(resolvedParams) : null;
  const camps = result?.data?.camps ?? [];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header Section matching mockup exactly */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Blood Donation Camps<span className="text-[#FB2C36] font-sans">.</span>
            </h1>
            <p className="text-sm leading-6 text-zinc-500 dark:text-[#ffb4ab]">
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
          {camps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {camps.map((camp) => (
                <CampCards key={camp._id} camp={camp} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <MapPin className="size-12 text-zinc-300 dark:text-zinc-700 mb-4" />
              <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                No camps found
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1 max-w-md">
                {resolvedParams.city
                  ? `No donation camps found in "${resolvedParams.city}". Try searching for a different city.`
                  : 'Search for a city above to find blood donation camps near you.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}

export default DonationCampsPage