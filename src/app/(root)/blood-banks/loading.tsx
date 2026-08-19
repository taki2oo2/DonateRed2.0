export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl pb-6">
          <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Search Bar */}
        <div className="mt-4 h-12 w-full max-w-md bg-zinc-200 dark:bg-zinc-800 rounded-xl" />

        {/* Blood Bank Table Skeleton */}
        <div className="mt-10 space-y-3">
          {/* Table Header */}
          <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          {/* Table Rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-14 w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
