export default function Loading() {
  return (
    <main className="flex flex-col items-center mb-8 animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative mt-4 w-[calc(100vw-24px)] rounded-2xl border border-zinc-200/80 bg-gradient-to-r from-white via-white/80 to-zinc-100/40 dark:border-white/10 dark:from-zinc-950 dark:via-zinc-950/80 dark:to-zinc-900/30 sm:mt-8 sm:w-[95vw] max-w-7xl min-h-[480px] lg:min-h-[500px] flex items-center">
        <div className="relative z-10 w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 flex items-center">
          <div className="w-full max-w-[620px] flex flex-col items-start justify-center space-y-6">
            <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="space-y-3 w-full">
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
            <div className="h-5 w-80 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="flex gap-3 mt-4">
              <div className="h-11 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-11 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section Skeleton */}
      <section className="w-[calc(100vw-24px)] sm:w-[95vw] max-w-7xl mt-12 space-y-6">
        <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-12 w-full max-w-md bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </section>

      {/* How It Works Skeleton */}
      <section className="w-[calc(100vw-24px)] sm:w-[95vw] max-w-7xl mt-16 space-y-8">
        <div className="h-8 w-52 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
