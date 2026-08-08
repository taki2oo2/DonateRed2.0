'use client';

import { useState } from "react";
import NavbarLinks from "./NavbarLinks";
import AuthButton from "./AuthButton";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";
import { Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { NavLinks } from "@/constants";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative w-full z-50">
      {/* Main Navbar Row */}
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm transition-[background-color,border-color] duration-300">

        {/* Left: Logo */}
        <Logo />

        {/* Center: Desktop Navigation Links (visible at >= 950px) */}
        <div className="hidden min-[950px]:flex items-center justify-center gap-1 lg:gap-2">
          <NavbarLinks />
        </div>

        {/* Right: Desktop Actions (visible at >= 950px) */}
        <div className="hidden min-[950px]:flex items-center gap-4">
          <ThemeToggle />
          <UserAvatar />

          <AuthButton
            className="h-9 px-4 bg-[#FB2C36] text-white hover:bg-[#FB2C36]/90 transition-[background-color,transform] duration-200 font-medium rounded-lg shadow-sm shadow-red-500/10 hover:shadow-red-500/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 cursor-pointer"
          />
        </div>

        {/* Mobile: Actions (Theme Toggle & Hamburger Sheet) (visible at < 950px) */}
        <div className="flex min-[950px]:hidden items-center gap-2">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100 transition-[color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 active:scale-95 shrink-0 cursor-pointer"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[300px] sm:max-w-[360px] p-6 flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-all duration-300"
            >
              <div className="flex flex-col gap-6">
                <SheetHeader className="p-0 flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-900/80 pb-4">
                  <div className="flex items-center gap-2">
                    <Logo />
                  </div>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Browse Donate Red pages and sections</SheetDescription>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-1.5 pt-2">
                  {NavLinks.map((link) => {
                    const isActive = pathname.includes(link.href);

                    return (
                      <SheetClose asChild key={link.name}>
                        <Link
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-[color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 active:scale-[0.98] select-none w-full",
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
                      </SheetClose>
                    );
                  })}
                </div>
              </div>

              {/* Auth Button at bottom */}
              <SheetFooter className="p-0 flex flex-col gap-3 mt-auto border-t border-zinc-100 dark:border-zinc-900/80 pt-4">
                <AuthButton
                  className="w-full h-11 bg-[#FB2C36] text-white hover:bg-[#FB2C36]/90 transition-[background-color,transform] duration-200 font-medium rounded-xl shadow-md shadow-red-500/10 hover:shadow-red-500/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
