import { getUerInfo } from "@/actions/user.action"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'
import Image from "next/image"
import { format } from "date-fns"
import { User as UserIcon, Info, Lock, ChevronDown, Activity, Droplet } from "lucide-react"
import DonorStatusCard from "@/components/profile/DonorStatusCard"

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const [{ id }, user] = await Promise.all([
    params,
    currentUser(),
  ])

  let data: User | null = null

  if (user?.id !== id || !user) {
    redirect('/')
  } else {
    const res = await getUerInfo({ clerkid: user.id })
    data = res.data ?? null
  }

  const memberSince = user.createdAt
    ? format(new Date(user.createdAt), "MMM yyyy")
    : "Oct 2023"

  const isDonor = data?.isDonar ?? false

  return (
    <div className="min-h-screen bg-[#0c0d12] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header / Profile Info */}
        <div className="flex items-center gap-5">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-zinc-700/80 shadow-xl shrink-0 bg-zinc-900">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                <UserIcon className="w-8 h-8" />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {data?.fullname || user.fullName}
            </h1>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-mono text-zinc-400">
                Member since {memberSince}
              </span>
              <span className="text-zinc-600 text-xs">•</span>
              {isDonor ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-[#FB2C36] text-[11px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB2C36] animate-pulse"></span>
                  Blood Donor
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-[11px] font-mono font-medium">
                  Registered Member
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (3 Cards: Personal Information, Other Details, Security Settings) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Card 1: Personal Information */}
            <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Personal Information
                </h2>
                <UserIcon className="w-4 h-4 text-zinc-400" />
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
                    Full Name
                  </label>
                  <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
                    {data?.fullname || user.fullName || "Elena Rostova"}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
                    Email Address
                  </label>
                  <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
                    {data?.email || user.emailAddresses?.[0]?.emailAddress || "elena.r@example.com"}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-[#FB2C36] hover:bg-[#e02630] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-red-950/40 cursor-pointer">
                  Update Personal Info
                </button>
              </div>
            </div>

            {/* Card 2: Other Details */}
            <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Other Details
                </h2>
                <Info className="w-4 h-4 text-zinc-400" />
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
                    City / Location
                  </label>
                  <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
                    {data?.city || "Seattle, WA"}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
                    Contact Number
                  </label>
                  <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
                    {data?.contactno || "+1 (555) 019-8472"}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
                    Blood Group
                  </label>
                  <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium flex items-center justify-between">
                    <span>
                      {data?.bloodGroup
                        ? `${data.bloodGroup} (${data.bloodGroup.includes("-") ? "Negative" : "Positive"})`
                        : "O Negative (O-)"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-[#FB2C36] hover:bg-[#e02630] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-red-950/40 cursor-pointer">
                  Update Other Details
                </button>
              </div>
            </div>

            {/* Card 3: Security Settings */}
            <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Security Settings
                </h2>
                <Lock className="w-4 h-4 text-zinc-400" />
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    readOnly
                    className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-400 tracking-widest focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 tracking-widest focus:outline-none focus:border-zinc-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 tracking-widest focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/60 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer">
                  Update Password
                </button>
              </div>
            </div>

          </div>

          {/* Right Column (2 Cards: Active Donor Status, Recent Activity) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            {/* Active Donor Status Card */}
            <DonorStatusCard isDonar={isDonor} userId={id} />

            {/* Recent Activity Card */}
            <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Recent Activity
                </h2>
                <button className="text-xs font-semibold text-[#FB2C36] hover:underline cursor-pointer">
                  View All
                </button>
              </div>

              <div className="mt-5 space-y-4">
                {/* Activity 1 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                    <Activity className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                      Emergency O- Request Shared
                    </h4>
                    <p className="text-[11px] font-mono text-zinc-500 mt-1">
                      Seattle General Hospital • 2 days ago
                    </p>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                    <Droplet className="w-3.5 h-3.5 text-[#FB2C36]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                      Donated at Metro Camp
                    </h4>
                    <p className="text-[11px] font-mono text-zinc-500 mt-1">
                      Downtown Community Center • Nov 12, 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Page