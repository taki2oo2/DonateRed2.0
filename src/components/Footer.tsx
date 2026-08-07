import Logo from "@/components/navigation/Logo"
import Link from "next/link"

const Footer = () => {
  return (
    <div className="w-full border-t border-border bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-md transition-[background-color,border-color] duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand Logo and Tagline */}
        <div className="flex flex-col items-center sm:items-start gap-1.5">
          <Logo className="!ml-0" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[280px] text-center sm:text-left mt-0.5">
            Saving lives, together. Connect instantly with verified donors near you.
          </p>
        </div>

        {/* Right Side: Copyright and System Info */}
        <div className="flex flex-col items-center sm:items-end gap-2.5">
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <Link 
              href="/privacy" 
              className="hover:text-[#FB2C36] dark:hover:text-[#FB2C36] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-zinc-300 dark:text-zinc-800" aria-hidden="true">•</span>
            <Link 
              href="/terms" 
              className="hover:text-[#FB2C36] dark:hover:text-[#FB2C36] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center sm:text-right">
            © {new Date().getFullYear()} Donate{"\u00a0"}Red. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Footer;