export function ProfileHeaderSkeleton() {
  return (
    <div className="flex items-center gap-5 animate-pulse">
      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-zinc-200 dark:bg-zinc-800/80 border-2 border-zinc-300 dark:border-zinc-700/50 shrink-0" />
      <div className="space-y-2.5">
        <div className="h-7 w-48 sm:w-64 bg-zinc-200 dark:bg-zinc-800/90 rounded-lg" />
        <div className="flex items-center gap-2.5">
          <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
          <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800/70 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function PersonalInfoSkeleton() {
  return (
    <div className="bg-white dark:bg-[#12141a]/95 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm animate-pulse">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800/60 rounded mb-2" />
          <div className="h-10 w-full bg-zinc-100 dark:bg-[#181a22]/80 border border-zinc-200 dark:border-zinc-800/70 rounded-lg" />
        </div>
        <div>
          <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800/60 rounded mb-2" />
          <div className="h-10 w-full bg-zinc-100 dark:bg-[#181a22]/80 border border-zinc-200 dark:border-zinc-800/70 rounded-lg" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="h-9 w-36 bg-zinc-200 dark:bg-zinc-800/80 rounded-lg" />
      </div>
    </div>
  );
}

export function OtherDetailsSkeleton() {
  return (
    <div className="bg-white dark:bg-[#12141a]/95 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm animate-pulse">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800/60 rounded mb-2" />
          <div className="h-10 w-full bg-zinc-100 dark:bg-[#181a22]/80 border border-zinc-200 dark:border-zinc-800/70 rounded-lg" />
        </div>
        <div>
          <div className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800/60 rounded mb-2" />
          <div className="h-10 w-full bg-zinc-100 dark:bg-[#181a22]/80 border border-zinc-200 dark:border-zinc-800/70 rounded-lg" />
        </div>
        <div className="sm:col-span-2">
          <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800/60 rounded mb-2" />
          <div className="h-10 w-full bg-zinc-100 dark:bg-[#181a22]/80 border border-zinc-200 dark:border-zinc-800/70 rounded-lg" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="h-9 w-36 bg-zinc-200 dark:bg-zinc-800/80 rounded-lg" />
      </div>
    </div>
  );
}

export function DonorStatusSkeleton() {
  return (
    <div className="bg-white dark:bg-[#12141a]/90 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="w-5 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      <div className="h-5 w-36 bg-zinc-200 dark:bg-zinc-800 rounded mt-3" />
      <div className="h-3 w-48 bg-zinc-200 dark:bg-zinc-800/60 rounded mt-1.5" />
      <div className="space-y-2 mt-4">
        <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800/50 rounded" />
        <div className="h-3 w-4/5 bg-zinc-200 dark:bg-zinc-800/50 rounded" />
      </div>
      <div className="h-9 w-full bg-zinc-200 dark:bg-zinc-800/80 rounded-lg mt-5" />
    </div>
  );
}

export function RecentActivitySkeleton() {
  return (
    <div className="bg-white dark:bg-[#12141a]/95 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="h-5 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 w-44 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          </div>
        </div>
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-36 bg-zinc-200 dark:bg-zinc-800/60 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
