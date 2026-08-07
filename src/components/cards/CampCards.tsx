import Image from "next/image"
import { Calendar, Clock, Map } from 'lucide-react'



const CampCards = ({ camp }: { camp: Camp }) => {
    return (
        <div
            className="bg-zinc-50/50 dark:bg-[#111114]/80 border border-zinc-200 dark:border-white/8 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-xl flex flex-col h-full"
        >
            {/* Card Image Wrapper */}
            <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900">
                {camp.imageUrl && (
                    <Image
                        src={camp.imageUrl}
                        alt={camp.title}
                        fill
                        className="object-cover opacity-90 dark:opacity-85"
                    />
                )}
                {/* Status Badge */}
                <span className={`absolute left-4 top-4 px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider uppercase ${camp.status === 'LIVE NOW'
                    ? 'bg-[#FB2C36] text-white shadow-lg shadow-red-500/20'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}>
                    {camp.status}
                </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                    {camp.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Organized by: <span className="font-medium text-zinc-700 dark:text-zinc-300">{camp.organizer}</span>
                </p>

                {/* Details list */}
                <div className="mt-4 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-[#FB2C36]/80 dark:text-[#FB2C36]" />
                        <span>{camp.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="size-4 text-[#FB2C36]/80 dark:text-[#FB2C36]" />
                        <span>{camp.time}</span>
                    </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-[#ffb4ab]/90 flex-1">
                    {camp.desc}
                </p>

                {/* Card Button */}
                <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                    <button className="w-full h-10 border border-zinc-200 dark:border-zinc-800 bg-white/50 hover:bg-zinc-100 dark:bg-transparent dark:hover:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs">
                        <Map className="size-3.5" />
                        View on Map
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CampCards