

import { Suspense } from "react";
import Search from "@/components/search/Search";
import { Search as SearchIcon, ShieldCheck, Building2 } from "lucide-react";
import { callSearchText } from "@/actions/google.action";
import BloodBankCard, { BloodBank } from "@/components/cards/BloodBankCard";

type Props = {
  searchParams: Promise<{
    query?: string
  }>
}

const BloodBanksPage = async ({ searchParams }: Props) => {
  const { query } = await searchParams
  const res = query && query !== undefined ? await callSearchText(query) : null

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header Section */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm backdrop-blur-md">
            <ShieldCheck className="size-4 text-[#FB2C36]" />
            <span>Verified Blood Banks &amp; Live Stock Tracker</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Find Blood Banks<span className="text-[#FB2C36] font-sans">.</span>
          </h1>

          <p className="text-sm leading-6 text-zinc-500 dark:text-[#ffb4ab]">
            Locate registered blood banks, verify component availability in real-time, and get immediate contact details in urgent medical situations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <Suspense fallback={<div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" />}>
            <Search
              placeholder="Enter city to find blood banks..."
              icon={<SearchIcon className="size-5 text-zinc-400 dark:text-zinc-500" />}
            />
          </Suspense>
        </div>

        {/* Results Section */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <Building2 className="size-5 text-[#FB2C36]" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                {query ? `Blood Banks in "${query}"` : "Nearby Blood Banks"}
              </h2>
            </div>
            {res && res.length > 0 && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Found {res.length} blood bank{res.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {res && res.length > 0 ? (
              res.map((bank: BloodBank, index: number) => (
                <BloodBankCard key={bank.link || index} bloodBank={bank} />
              ))
            ) : query ? (
              <div className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm">
                No blood banks found for "{query}". Try searching another city.
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm">
                Type a city name in the search bar above to find blood banks.
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
};

export default BloodBanksPage;