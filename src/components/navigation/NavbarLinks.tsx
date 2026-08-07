'use client';
import { NavLinks } from "@/constants"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import clsx from 'clsx';

const NavbarLinks = () => {
  const pathname = usePathname()
  return (
    <>
      {NavLinks.map((link) => {
        const isActive = pathname.includes(link.href);

        return (
          <Link
            href={link.href}
            key={link.name}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-[color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 active:scale-[0.98] select-none min-w-0 w-full md:w-auto",
              isActive
                ? "text-[#FB2C36] bg-red-50/60 dark:bg-red-950/20 font-semibold"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40"
            )}
          >
            <Image
              src={link.iconPath}
              alt=""
              aria-hidden="true"
              height={18}
              width={18}
              priority
              className="object-contain shrink-0"
            />
            <span className="truncate">{link.name}</span>
          </Link>
        )
      })}
    </>
  )
}

export default NavbarLinks