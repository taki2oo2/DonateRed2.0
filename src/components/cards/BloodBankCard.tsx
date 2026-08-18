import { BloodBankCardProps } from '@/types/types'
import { MapPin, Phone, ExternalLink, Building2 } from 'lucide-react'



const BloodBankCard = ({ bloodBank }: BloodBankCardProps) => {
  const {
    name,
    address,
    contactNo,
    link,
  } = bloodBank || {}

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-zinc-50/50 dark:bg-[#111114]/80 border border-zinc-200 dark:border-white/8 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-xl">
      
      {/* Left: Icon & Main Info */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {/* Hospital / Building Icon */}
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 dark:bg-[#FB2C36]/10 border border-[#FB2C36]/20 text-[#FB2C36]">
          <Building2 className="size-6" />
        </div>

        {/* Title & Address */}
        <div className="space-y-2 min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug truncate">
              {name || "Blood Bank"}
            </h3>
          </div>

          {address && (
            <div className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-[#ffb4ab]/80">
              <MapPin className="size-4 text-[#FB2C36] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Contact & Action Button */}
      <div className="flex flex-col sm:items-end gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-200 dark:border-zinc-800/80">
        {contactNo ? (
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            <Phone className="size-4 text-[#FB2C36]" />
            <a href={`tel:${contactNo}`} className="hover:underline hover:text-[#FB2C36] transition-colors">
              {contactNo}
            </a>
          </div>
        ) : (
          <span className="text-xs text-zinc-400 dark:text-zinc-500 italic">No phone listed</span>
        )}

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-xs font-semibold text-white bg-[#FB2C36] hover:bg-[#E7000B] shadow-[0_4px_16px_-4px_rgba(251,44,54,0.5)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Get Directions</span>
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>

    </div>
  )
}

export default BloodBankCard
