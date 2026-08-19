export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background animate-pulse">
      <div className="w-full max-w-md mx-auto px-6 space-y-8">
        {/* Logo Placeholder */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-7 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-56 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Auth Card Skeleton */}
        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 space-y-5">
          <div className="space-y-2">
            <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>
          <div className="h-11 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-11 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>
      </div>
    </main>
  );
}
