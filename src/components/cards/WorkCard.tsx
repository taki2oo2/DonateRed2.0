import Image from 'next/image'

interface WorkCardProps{
    src:string;
    alt:string;
    title:string;
    content:string;
}

const WorkCard = ({src,alt,title,content}:WorkCardProps) => {
  return (
    <div className="group relative flex flex-1 flex-col items-center rounded-2xl border border-zinc-200/80 bg-white/70 px-8 py-9 text-center shadow-[0_20px_50px_-35px_rgba(251,44,54,0.35)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FB2C36]/30 hover:shadow-[0_24px_60px_-28px_rgba(251,44,54,0.45)] dark:border-white/10 dark:bg-white/5">
        <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#FEF2F2] shadow-[0_10px_30px_-18px_rgba(251,44,54,0.6)] transition-[transform,background-color,box-shadow] duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_14px_36px_-12px_rgba(251,44,54,0.5)] dark:bg-[#FB2C36]/15 dark:group-hover:bg-[#FB2C36]/25">
            <Image
              src={src}
              alt={alt}
              width={24}
              height={24}
              className="size-6 transition-transform duration-300 group-hover:rotate-3"
            />
        </div>
        <div className="font-heading text-lg font-bold leading-snug tracking-tight text-zinc-950 dark:text-white">
            {title}
        </div>
        <div className="mt-2.5 max-w-[32ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {content}
        </div>

    </div>
  )
}

export default WorkCard
