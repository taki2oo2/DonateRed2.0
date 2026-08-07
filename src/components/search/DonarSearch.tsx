import { MapPin, Search, Droplets } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import MyButton from '@/components/MyButton'
import { cn } from "@/lib/utils"
import Autocompletesearch from './Autocompletesearch'

type DonarSearchProps = {
    className?: string
    buttonClassName?: string
    compact?: boolean
}

const DonarSearch = ({ className, buttonClassName, compact = false }: DonarSearchProps) => {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 items-end relative z-30", className)}>

            {/* Enter City Column */}
            <div className="flex flex-col gap-2 w-full md:col-span-5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-[#ffb4ab]/85 pl-1">
                    Enter City
                </Label>

                <Autocompletesearch
                    placeholder="e.g. New Delhi"
                    icon={<MapPin className="size-4.5 text-[#FB2C36]" />}
                    inputClassName="bg-white/5 border border-zinc-200 dark:border-white/8 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:border-[#FB2C36] focus:ring-1 focus:ring-[#FB2C36]/30"
                />
            </div>

            {/* Blood Group Column */}
            <div className="flex flex-col gap-2 w-full md:col-span-4">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-[#ffb4ab]/85 pl-1">
                    Blood Group
                </Label>
                <div className="relative flex items-center w-full">
                    <span className="absolute left-4 text-[#FB2C36] dark:text-[#FB2C36] z-10">
                        <Droplets className="size-4.5" />
                    </span>
                    <Select>
                        <SelectTrigger className="w-full !h-12 pl-11 pr-4 bg-white/5 border border-zinc-200 dark:border-white/8 rounded-xl outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus-visible:border-[#FB2C36] focus-visible:ring-1 focus-visible:ring-[#FB2C36]/30 transition-all cursor-pointer">
                            <SelectValue placeholder="Select Group" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                            <SelectGroup>
                                <SelectItem value="A+">A+</SelectItem>
                                <SelectItem value="A-">A-</SelectItem>
                                <SelectItem value="B+">B+</SelectItem>
                                <SelectItem value="B-">B-</SelectItem>
                                <SelectItem value="AB+">AB+</SelectItem>
                                <SelectItem value="AB-">AB-</SelectItem>
                                <SelectItem value="O+">O+</SelectItem>
                                <SelectItem value="O-">O-</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Search Button Column */}
            <div className={compact ? "w-full md:w-auto md:col-span-2" : "w-full md:col-span-3"}>
                <MyButton className={cn(
                    "h-12 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-bold transition-all cursor-pointer flex items-center justify-center shadow-[0_4px_20px_-6px_rgba(251,44,54,0.6)] hover:shadow-[0_6px_24px_-4px_rgba(251,44,54,0.7)] active:scale-[0.98] rounded-xl gap-2",
                    compact
                        ? "w-full md:w-12 md:gap-0"
                        : "w-full text-xs uppercase tracking-wider",
                    buttonClassName
                )}>
                    <Search className="size-4 shrink-0" />
                    <span className={compact ? "inline md:hidden text-xs uppercase tracking-wider" : "text-xs uppercase tracking-wider"}>
                        Search Donors
                    </span>
                </MyButton>
            </div>

        </div>
    )
}

export default DonarSearch