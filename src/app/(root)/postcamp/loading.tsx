export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 animate-pulse">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="space-y-3 pb-8">
          <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-80 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Form Skeleton */}
        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="space-y-2">
            <div className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-24 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
          </div>

          {/* Image Upload */}
          <div className="h-32 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700" />

          {/* Submit Button */}
          <div className="h-11 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>
      </div>
    </main>
  );
}
