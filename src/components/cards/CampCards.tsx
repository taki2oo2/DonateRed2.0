import Image from "next/image"
import { Calendar, Clock, MapPin, Map, Building2 } from 'lucide-react'
import { format } from "date-fns"
import Link from "next/link"

const CampCards = ({ camp }: { camp: Camp }) => {
    return (
        <div
            className="bg-zinc-50/50 dark:bg-[#111114]/80 border border-zinc-200 dark:border-white/8 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-xl flex flex-col h-full"
        >
            {/* Card Image */}
            <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900">
                {camp.imageurl && (
                    <Image
                        src={camp.imageurl}
                        alt={camp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-90 dark:opacity-85"
                    />
                )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                    {camp.title}
                </h3>

                {/* Organizer */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Organized by: <span className="font-medium text-zinc-700 dark:text-zinc-300">{camp.organizer}</span>
                </p>

                {/* City */}
                <div className="flex items-center gap-1.5 mt-2">
                    <Building2 className="size-3.5 text-[#FB2C36]/80 dark:text-[#FB2C36]" />
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{camp.city}</span>
                </div>

                {/* Date & Time Details */}
                <div className="mt-4 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {/* Start */}
                    <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-[#FB2C36]/80 dark:text-[#FB2C36] shrink-0" />
                        <span>
                            <span className="font-medium text-zinc-600 dark:text-zinc-300">Starts:</span>{' '}
                            {format(new Date(camp.startDate), "MMM dd, yyyy")}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                        <Clock className="size-4 text-[#FB2C36]/80 dark:text-[#FB2C36] shrink-0" />
                        <span>{format(new Date(camp.startTime), "hh:mm a")}</span>
                    </div>
                    {/* End */}
                    <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-[#FB2C36]/80 dark:text-[#FB2C36] shrink-0" />
                        <span>
                            <span className="font-medium text-zinc-600 dark:text-zinc-300">Ends:</span>{' '}
                            {format(new Date(camp.endDate), "MMM dd, yyyy")}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                        <Clock className="size-4 text-[#FB2C36]/80 dark:text-[#FB2C36] shrink-0" />
                        <span>{format(new Date(camp.endTime), "hh:mm a")}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-[#ffb4ab]/90 flex-1 line-clamp-3">
                    {camp.description}
                </p>

                {/* Location Button */}
                <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                    <Link
                        href={camp.locationlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-10 border border-zinc-200 dark:border-zinc-800 bg-white/50 hover:bg-zinc-100 dark:bg-transparent dark:hover:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                    >
                        <MapPin className="size-3.5" />
                        View Exact Location
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CampCards