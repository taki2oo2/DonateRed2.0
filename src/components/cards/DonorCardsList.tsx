import { getDonors } from '@/actions/user.action'
import DonorCard from '@/components/cards/DonorCard'
import { SearchX, Users } from 'lucide-react'

interface DonorCardsListProps {
  city?: string
  bloodGroup?: string
}

const DonorCardsList = async ({ city, bloodGroup }: DonorCardsListProps) => {
  const result = await getDonors({
    city,
    bloodGroup,
  })

  const donors = result?.success ? result.data?.donors ?? [] : []
  const totalDonors = result?.success ? result.data?.totalDonors ?? 0 : 0

  return (
    <section className="space-y-6 pt-4">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-[#FB2C36]" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Available Donors</h2>
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {totalDonors} {totalDonors === 1 ? 'donor' : 'donors'} found
        </span>
      </div>

      <div className="space-y-4">
        {donors.length > 0 ? (
          donors.map((donor) => (
            <DonorCard key={donor._id} donor={donor} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
              <SearchX className="size-7 text-zinc-400 dark:text-zinc-600" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">No donors found</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500 max-w-sm">
              {city || bloodGroup
                ? 'No donors match your search criteria. Try adjusting your filters or location.'
                : 'Try searching by location or blood group to find available donors.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default DonorCardsList
