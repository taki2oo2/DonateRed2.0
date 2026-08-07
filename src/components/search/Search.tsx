"use client";

import { ReactNode } from "react";
import { MapPin } from "lucide-react";
import MyButton from "../MyButton";
import { cn } from "@/lib/utils";
import Autocompletesearch from "./Autocompletesearch";

type SearchProps = {
  placeholder?: string;
  btnChildren?: ReactNode;
  icon?: ReactNode;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

const Search = ({
  placeholder = "Search...",
  btnChildren = "Search",
  icon = <MapPin className="size-5" />,
  className,
  containerClassName,
  inputClassName,
  buttonClassName,
}: SearchProps) => {
  return (
    <div
      className={cn(
        "mt-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm transition-[background-color,border-color] duration-300 relative z-30",
        className
      )}
    >
      <div className={cn("flex flex-col sm:flex-row items-center gap-4", containerClassName)}>
        <Autocompletesearch
          placeholder={placeholder}
          icon={icon}
          inputClassName={inputClassName}
        />

        <MyButton
          variant="ghost"
          className={cn(
            "w-full sm:w-auto h-12 border border-[#FB2C36] hover:bg-[#FB2C36]/10 text-[#FB2C36] font-semibold px-8 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0",
            buttonClassName
          )}
        >
          {btnChildren}
        </MyButton>
      </div>
    </div>
  );
};

export default Search;