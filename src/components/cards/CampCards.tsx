import Image from "next/image"
import { Calendar, Clock, MapPin, Map, Building2 } from 'lucide-react'
import { format } from "date-fns"
import Link from "next/link"
import DeleteCampButton from "@/components/cards/DeleteCampButton"

const CampCards = ({ camp, currentUserId }: { camp: Camp; currentUserId?: string }) => {
    const isOwner = currentUserId && camp.owner === currentUserId;

    return (
        <div
            className="group relative bg-zinc-50/70 dark:bg-[#111114]/80 border border-zinc-200/90 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-500/10 hover:border-red-500/30 hover:-translate-y-1.5 transition-[transform,box-shadow,border-color] duration-300 ease-out backdrop-blur-xl flex flex-col h-full"
        >
            {/* Card Image */}
            <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                {isOwner && (
                    <DeleteCampButton campId={camp._id} campTitle={camp.title} />
                )}
                {camp.imageurl && (
                    <Image
                        src={camp.imageurl}
                        alt={camp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-90 dark:opacity-85 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white leading-snug tracking-tight">
                    {camp.title}
                </h3>

                {/* Organizer */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Organized by: <span className="font-medium text-zinc-700 dark:text-zinc-300">{camp.organizer}</span>
                </p>

                {/* City */}
                <div className="flex items-center gap-1.5 mt-2.5">
                    <Building2 className="size-3.5 text-[#FB2C36] shrink-0" />
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{camp.city}</span>
                </div>

                {/* Date & Time Details */}
                <div className="mt-4 space-y-2 text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                    {/* Start */}
                    <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-[#FB2C36] shrink-0" />
                        <span>
                            <span className="font-medium text-zinc-600 dark:text-zinc-300">Starts:</span>{' '}
                            {format(new Date(camp.startDate), "MMM dd, yyyy")}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                        <Clock className="size-4 text-[#FB2C36] shrink-0" />
                        <span>{format(new Date(camp.startTime), "hh:mm a")}</span>
                    </div>
                    {/* End */}
                    <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-[#FB2C36] shrink-0" />
                        <span>
                            <span className="font-medium text-zinc-600 dark:text-zinc-300">Ends:</span>{' '}
                            {format(new Date(camp.endDate), "MMM dd, yyyy")}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                        <Clock className="size-4 text-[#FB2C36] shrink-0" />
                        <span>{format(new Date(camp.endTime), "hh:mm a")}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 flex-1 line-clamp-3">
                    {camp.description}
                </p>

                {/* Location Button */}
                <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                    <Link
                        href={camp.locationlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn w-full h-10 border border-zinc-200 dark:border-zinc-800 bg-white/70 hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium px-4 rounded-xl transition-[transform,background-color,border-color,color] duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 text-xs"
                    >
                        <MapPin className="size-3.5 text-[#FB2C36] transition-transform duration-200 group-hover/btn:scale-110" />
                        <span>View Exact Location</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CampCards