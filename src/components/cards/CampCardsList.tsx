import CampCards from '@/components/cards/CampCards'
import { getCamps } from '@/actions/camp.action'
import { MapPin } from 'lucide-react'
import Pagination from '@/components/Pagination'
import { auth } from '@clerk/nextjs/server'
import dbConnect from '@/lib/moongoose'
import { User } from '@/database/user.model'

interface CampCardsListProps {
    city?: string
    page?: number
}

const CampCardsList = async ({ city, page = 1 }: CampCardsListProps) => {
    const [result, { userId: clerkId }] = await Promise.all([
        city ? getCamps({ city, page, pageSize: 6 }) : null,
        auth(),
    ]);
    const camps = result?.data?.camps ?? [];
    const isNext = result?.data?.isNext ?? false;

    // Resolve the Clerk ID → MongoDB _id for ownership comparison
    let currentUserMongoId: string | undefined;
    if (clerkId) {
        await dbConnect();
        const userDoc = await User.findOne({ clerkid: clerkId }).select("_id").lean();
        currentUserMongoId = userDoc?._id?.toString();
    }

    if (camps.length > 0) {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {camps.map((camp) => (
                        <CampCards key={camp._id} camp={camp} currentUserId={currentUserMongoId} />
                    ))}
                </div>
                <Pagination page={page} isNext={isNext} />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <MapPin className="size-12 text-zinc-300 dark:text-zinc-700 mb-4" />
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                No camps found
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1 max-w-md">
                {city
                    ? `No donation camps found in "${city}". Try searching for a different city.`
                    : 'Search for a city above to find blood donation camps near you.'}
            </p>
        </div>
    )
}

export default CampCardsList
