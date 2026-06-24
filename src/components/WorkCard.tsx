import Image from 'next/image'

interface WorkCardProps{
    src:string;
    alt:string;
    title:string;
    content:string;
}

const WorkCard = ({src,alt,title,content}:WorkCardProps) => {
  return (
    <div className="group relative flex flex-1 flex-col items-center rounded-2xl border border-zinc-200/80 bg-white/70 px-8 py-9 text-center shadow-[0_20px_50px_-35px_rgba(251,44,54,0.45)] backdrop-blur-md transition hover:-translate-y-1 hover:border-[#FB2C36]/25 hover:shadow-[0_24px_60px_-32px_rgba(251,44,54,0.55)] dark:border-white/10 dark:bg-white/5">
        <div className= "mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#FEF2F2] shadow-[0_10px_30px_-18px_rgba(251,44,54,0.75)] transition group-hover:bg-[#FEF2F2] dark:bg-[#FB2C36]/15 dark:group-hover:bg-[#FB2C36]/20">
            <Image
            src={src}
            alt= {alt}
            width={24}
            height={24}
            className="size-6"
            />
        </div>
        <div className="text-lg font-semibold leading-7 tracking-[-0.2px] text-zinc-950 dark:text-white">
            {title}
        </div>
        <div className="mt-2 max-w-[270px] text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {content}
        </div>

    </div>
  )
}

export default WorkCard
