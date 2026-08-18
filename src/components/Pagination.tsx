"use client"

import MyButton from "./MyButton"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { formUrlQuery } from "@/lib/url"

interface PaginationProps {
  page?: number
  isNext?: boolean
}

const Pagination = ({ page = 1, isNext = false }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleNavigation = (direction: 'prev' | 'next') => {
    const nextPageNumber = direction === 'prev' ? page - 1 : page + 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextPageNumber.toString(),
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex items-center justify-center gap-3 py-8 select-none">
      {/* Prev Button */}
      <MyButton
        variant="outline"
        disabled={page <= 1}
        onClick={() => handleNavigation('prev')}
        className="flex items-center gap-1.5 px-4 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#111114]/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="size-4 text-zinc-500 dark:text-zinc-400" />
        <span className="text-sm">Prev</span>
      </MyButton>

      {/* Page Number Indicator */}
      <div className="min-w-10 h-10 px-3.5 flex items-center justify-center rounded-xl border border-[#FB2C36]/30 bg-red-500/10 text-[#FB2C36] font-semibold text-sm shadow-sm backdrop-blur-sm">
        {page}
      </div>

      {/* Next Button */}
      <MyButton
        variant="outline"
        disabled={!isNext}
        onClick={() => handleNavigation('next')}
        className="flex items-center gap-1.5 px-4 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#111114]/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="text-sm">Next</span>
        <ChevronRight className="size-4 text-zinc-500 dark:text-zinc-400" />
      </MyButton>
    </div>
  )
}

export default Pagination