export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl pb-8">
          <div className="h-9 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 space-y-4"
            >
              <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
