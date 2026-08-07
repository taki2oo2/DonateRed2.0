"use client"
import { useState } from 'react'
import MyButton from '@/components/MyButton'
import Search from '@/components/search/Search'
import { useRouter } from "next/navigation"
import ROUTES from "@/constants/routes"
import CampCards from '@/components/cards/CampCards'
import { MapPin } from 'lucide-react'

const dummyCamps: Camp[] = [
  {
    id: 1,
    title: "City Center Blood Drive",
    organizer: "Red Cross Society",
    date: "Aug 15, 2026",
    time: "09:00 AM - 04:00 PM",
    desc: "Join us for our annual city blood drive. Free health checkup and refreshments provided for all donors.",
    status: "LIVE NOW",
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Metro Lifeline Mega Camp",
    organizer: "Rotary Club Youth Wing",
    date: "Aug 20, 2026",
    time: "10:00 AM - 05:00 PM",
    desc: "A community drive aiming to support local hospital blood banks. All blood groups welcome.",
    status: "UPCOMING",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "University Youth Blood Donation",
    organizer: "National Service Scheme (NSS)",
    date: "Aug 25, 2026",
    time: "09:30 AM - 03:30 PM",
    desc: "Campus-wide voluntary blood donation camp for students, faculty, and local residents.",
    status: "UPCOMING",
    imageUrl: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&w=800&q=80",
  },
];

const DonationCampsPage = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCamps = dummyCamps.filter(
    (camp) =>
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Blood Donation Camps<span className="text-[#FB2C36] font-sans">.</span>
            </h1>
            <p className="text-sm leading-6 text-zinc-500 dark:text-[#ffb4ab]">
              Find and participate in local blood drives. Your single donation can save up to three lives. Discover active camps near you or organize your own to support the community.
            </p>
          </div>
          <div className="shrink-0">
            <MyButton onClick={() => router.push(ROUTES.POST_CAMP)} className="w-full sm:w-auto h-11 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-semibold px-5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2">
              + Post a New Camp
            </MyButton>
          </div>
        </div>

        {/* Search Panel */}
        <Search
          placeholder="Search by location, camp name, or organizer..."
          icon={<MapPin className="size-5" />}
          btnChildren="Search Camps"
          buttonClassName="bg-[#FB2C36] hover:bg-[#E7000B] text-white font-semibold border-none px-6 rounded-xl shadow-md shadow-red-500/20 transition-all cursor-pointer"
        />

        {/* Camps Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCamps.length > 0 ? (
            filteredCamps.map((camp) => (
              <CampCards key={camp.id} camp={camp} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-zinc-500 dark:text-zinc-400">
              No donation camps found matching "{searchQuery}".
            </div>
          )}
        </div>

      </div>
    </main>
  )
}

export default DonationCampsPage