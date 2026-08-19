export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6">
          <div className="space-y-3 max-w-3xl">
            <div className="h-9 w-72 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-10 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>

        {/* Search Bar */}
        <div className="mt-4 h-12 w-full max-w-md bg-zinc-200 dark:bg-zinc-800 rounded-xl" />

        {/* Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
            >
              <div className="h-44 bg-zinc-200 dark:bg-zinc-800" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="flex gap-2 mt-3">
                  <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
