import { User, MapPin, Mail, Phone, Droplets } from 'lucide-react'

const DonorCard = ({ donor }: DonorCardProps) => {
  const { fullname, bloodGroup, city, email, contactno } = donor

  return (
    <div className="group w-full flex flex-col md:flex-row md:items-center justify-between gap-6 bg-zinc-50/70 dark:bg-[#111114]/80 border border-zinc-200/90 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-red-500/5 hover:border-red-500/25 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 ease-out backdrop-blur-xl">

      {/* Left: Avatar & Profile Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:border-red-500/30 group-hover:text-[#FB2C36] transition-colors duration-300">
          <User className="size-6 transition-transform duration-300 group-hover:scale-105" />
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white leading-none tracking-tight">
              {fullname}
            </h3>
            {bloodGroup && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-red-500/10 border border-[#FB2C36]/30 text-[#FB2C36] leading-none transition-transform duration-200 group-hover:scale-105">
                <Droplets className="size-3.5 fill-[#FB2C36] stroke-[#FB2C36]" />
                <span className="tabular-nums font-mono">{bloodGroup}</span>
              </span>
            )}
          </div>
          {city && (
            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <MapPin className="size-3.5 text-[#FB2C36]" />
              <span>{city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Contact Info */}
      <div className="flex flex-col gap-2.5 text-sm text-zinc-600 dark:text-zinc-300 md:ml-4 tabular-nums">
        <div className="flex items-center gap-2.5">
          <Mail className="size-4.5 text-zinc-400 dark:text-zinc-500" />
          <a href={`mailto:${email}`} className="hover:underline hover:text-[#FB2C36] transition-colors duration-200">{email}</a>
        </div>
        {contactno && (
          <div className="flex items-center gap-2.5">
            <Phone className="size-4.5 text-zinc-400 dark:text-zinc-500" />
            <a href={`tel:${contactno}`} className="hover:underline hover:text-[#FB2C36] transition-colors duration-200">{contactno}</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonorCard