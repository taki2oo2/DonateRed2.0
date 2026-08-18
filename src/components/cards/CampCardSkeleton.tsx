const CampCardSkeleton = () => {
    return (
        <div className="bg-zinc-50/50 dark:bg-[#111114]/80 border border-zinc-200 dark:border-white/8 rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
            {/* Image skeleton */}
            <div className="h-48 w-full bg-zinc-200 dark:bg-zinc-800" />

            {/* Content skeleton */}
            <div className="p-5 flex flex-col flex-1 gap-3">
                {/* Title */}
                <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                {/* Organizer */}
                <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                {/* City */}
                <div className="h-3 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />

                {/* Date rows */}
                <div className="mt-2 space-y-2">
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                </div>

                {/* Description */}
                <div className="mt-2 space-y-1.5 flex-1">
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                    <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                    <div className="h-3 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                </div>

                {/* Button */}
                <div className="mt-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                    <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                </div>
            </div>
        </div>
    )
}

export const CampCardsGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <CampCardSkeleton key={i} />
            ))}
        </div>
    )
}

export default CampCardSkeleton
