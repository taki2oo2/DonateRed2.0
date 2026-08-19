export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl pb-6">
          <div className="h-9 w-56 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-80 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Search / Filter Row */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="h-12 w-full max-w-xs bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-12 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-12 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>

        {/* Donor Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              </div>
              <div className="h-9 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
