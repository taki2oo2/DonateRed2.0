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
    {NavLinks.map( (link) => {
      const isActive = pathname.includes(link.href);

      return (
        <Link
        href={link.href}
        key={link.name}
        className= {clsx("flex items-center justify-center gap-1 rounded-lg transition-colors " , isActive ? "text-red-600 font-medium " : "" )}
        >
        <Image
        src={link.iconPath}
        alt= {link.name}
        height={30}
        width={30}
        className="object-contain"
        />

        <span>{link.name}</span>
        </Link>
      )
    })}
    </>
  )
}

export default NavbarLinks