import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Suspense } from "react";
import Search from "@/components/search/Search";
import {
  Search as SearchIcon,
  ShieldCheck,
  Building2,
  PhoneCall,
  Navigation,
  Sparkles,
  HeartHandshake
} from "lucide-react";
import { callSearchText } from "@/actions/google.action";
import BloodBankCard from "@/components/cards/BloodBankCard";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    city?: string;
  }>;
};

const POPULAR_CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Kolkata",
  "Chennai",
  "Pune",
  "Ahmedabad",
];

const BloodBanksPage = async ({ searchParams }: Props) => {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    redirect('/getStarted?msg=signin_required');
  }

  const { city } = await searchParams;
  const res: ActionResponse<BloodBank[]> | null =
    city && isAuthenticated ? await callSearchText(city) : null;

  const bloodBanks: BloodBank[] = res?.success ? (res.data ?? []) : [];

  return (
    <main className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Decorative Ambient Background Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Top-Right Crimson Aura */}
        <div className="absolute -top-36 -right-24 sm:-right-10 size-[500px] sm:size-[650px] rounded-full bg-[#FB2C36]/10 dark:bg-[#FB2C36]/15 blur-[140px]" />

        {/* Top-Left Ambient Blob */}
        <div className="absolute top-12 -left-40 size-[450px] rounded-full bg-red-400/10 dark:bg-[#FB2C36]/10 blur-[130px]" />

        {/* Center Subtle Atmosphere Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-[#FB2C36]/5 dark:bg-[#FB2C36]/8 blur-[160px]" />

        {/* Bottom-Right Accent Glow */}
        <div className="absolute -bottom-40 right-1/4 size-[500px] rounded-full bg-[#FB2C36]/8 dark:bg-red-900/15 blur-[150px]" />

        {/* Top Down Gradient Sheen */}
        <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-[#FB2C36]/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm backdrop-blur-md">
              <span className="size-2 rounded-full bg-[#FB2C36] animate-pulse" />
              <ShieldCheck className="size-4 text-[#FB2C36]" />
              <span>Verified Blood Banks &amp; Emergency Hubs</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white text-wrap: balance">
              Find Blood Banks<span className="text-[#FB2C36]">.</span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-[65ch] text-wrap: pretty">
              Locate registered blood banks, verify availability in real-time, and get direct contact numbers and turn-by-turn directions during urgent medical situations.
            </p>
          </div>

          {/* Quick Feature Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 backdrop-blur-md shadow-xs">
              <Building2 className="size-4 text-[#FB2C36]" />
              <span className="font-medium">Verified Units</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 backdrop-blur-md shadow-xs">
              <PhoneCall className="size-4 text-[#FB2C36]" />
              <span className="font-medium">Direct Dial</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 backdrop-blur-md shadow-xs">
              <Navigation className="size-4 text-[#FB2C36]" />
              <span className="font-medium">GPS Directions</span>
            </div>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="space-y-3">
          <Suspense fallback={<div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" />}>
            <Search
              placeholder="Search by city (e.g. Delhi, Mumbai, Bangalore)..."
              icon={<SearchIcon className="size-5 text-zinc-400 dark:text-zinc-500" />}
            />
          </Suspense>

          {/* Quick city suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-[#FB2C36]" />
              Quick search:
            </span>
            {POPULAR_CITIES.map((c) => (
              <Link
                key={c}
                href={`/blood-banks?city=${encodeURIComponent(c)}`}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  city?.toLowerCase() === c.toLowerCase()
                    ? "bg-[#FB2C36] text-white shadow-xs"
                    : "bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-[#FB2C36] hover:text-[#FB2C36] dark:hover:border-[#FB2C36] dark:hover:text-[#FB2C36]"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <section className="space-y-6 pt-2">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-red-500/10 dark:bg-[#FB2C36]/10 border border-[#FB2C36]/20 flex items-center justify-center text-[#FB2C36]">
                <Building2 className="size-4" />
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                {city ? `Blood Banks in "${city}"` : "Available Blood Banks"}
              </h2>
            </div>
            {bloodBanks.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 dark:bg-[#FB2C36]/10 text-[#FB2C36] border border-[#FB2C36]/20">
                <span className="size-1.5 rounded-full bg-[#FB2C36]" />
                {bloodBanks.length} verified center{bloodBanks.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {bloodBanks.length > 0 ? (
              <div className="space-y-4">
                {bloodBanks.map((bank, index) => (
                  <BloodBankCard key={bank.link || index} bloodBank={bank} />
                ))}
              </div>
            ) : city ? (
              /* No Results Found State */
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl bg-zinc-50/50 dark:bg-[#111114]/50 border border-zinc-200/80 dark:border-zinc-800/70 backdrop-blur-xl space-y-4">
                <div className="size-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center text-zinc-400">
                  <SearchIcon className="size-7" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    No blood banks found in &ldquo;{city}&rdquo;
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {res?.error?.message ?? "We couldn't locate registered blood banks in this specific location. Try searching for a nearby metropolitan district or state capital."}
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-md">
                  {POPULAR_CITIES.slice(0, 5).map((c) => (
                    <Link
                      key={c}
                      href={`/blood-banks?city=${encodeURIComponent(c)}`}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:border-[#FB2C36] hover:text-[#FB2C36] dark:hover:border-[#FB2C36] dark:hover:text-[#FB2C36] transition-all shadow-xs cursor-pointer"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* Initial Empty State (Prompt to Search) */
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl bg-zinc-50/50 dark:bg-[#111114]/50 border border-zinc-200/80 dark:border-zinc-800/70 backdrop-blur-xl space-y-4">
                <div className="size-16 rounded-2xl bg-red-500/10 dark:bg-[#FB2C36]/10 border border-[#FB2C36]/20 flex items-center justify-center text-[#FB2C36]">
                  <HeartHandshake className="size-8" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    Search by City or District
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Enter your city name in the search bar above or choose a quick hub below to view verified blood banks with direct phone lines and navigation directions.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-lg">
                  {POPULAR_CITIES.map((c) => (
                    <Link
                      key={c}
                      href={`/blood-banks?city=${encodeURIComponent(c)}`}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:border-[#FB2C36] hover:text-[#FB2C36] dark:hover:border-[#FB2C36] dark:hover:text-[#FB2C36] transition-all shadow-xs cursor-pointer"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
};

export default BloodBanksPage;
