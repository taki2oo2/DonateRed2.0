export const DonorCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 bg-zinc-50/50 dark:bg-[#111114]/80 border border-zinc-200 dark:border-white/8 rounded-2xl p-6 shadow-sm backdrop-blur-xl animate-pulse">
      {/* Left: Avatar & Profile Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="size-14 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />

        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          </div>
          <div className="h-3.5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        </div>
      </div>

      {/* Middle/Right: Contact Info */}
      <div className="flex flex-col gap-2.5 md:ml-4">
        <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
      </div>
    </div>
  )
}

export const DonorCardsListSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <DonorCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default DonorCardSkeleton
