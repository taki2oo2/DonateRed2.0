import Link from "next/link";
import { Droplets } from "lucide-react";

type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={className}>
      <Link
        href="/"
        className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 active:scale-[0.98] transition-transform duration-150 cursor-pointer"
      >
        <span className="relative flex size-9 items-center justify-center rounded-xl bg-[#FB2C36] shadow-[0_6px_20px_-6px_rgba(251,44,54,0.8)] transition-[transform,box-shadow] duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_24px_-4px_rgba(251,44,54,0.9)]">
          <Droplets className="size-4.5 text-white transition-transform duration-300 group-hover:rotate-6" />
          <span className="absolute -right-0.5 -top-0.5 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/80 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-heading text-base font-extrabold tracking-tight text-zinc-900 dark:text-white">Donate <span className="text-[#FB2C36]">Red</span></span>
          <span className="mt-0.5 text-[9px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Blood Network</span>
        </span>
      </Link>
    </div>
  )
}

export default Logo;
