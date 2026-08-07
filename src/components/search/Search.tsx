"use client";

import { ReactNode, useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { autocomplete } from "@/actions/google.action";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

type AutocompleteSearchProps = {
  placeholder?: string;
  icon?: ReactNode;
  inputClassName?: string;
  onSelectAddress?: (address: string) => void;
  onSelectPlace?: (place: PlaceData) => void;
};

export const Autocompletesearch = ({
  placeholder,
  icon,
  inputClassName,
  onSelectAddress,
  onSelectPlace,
}: AutocompleteSearchProps) => {
  const [input, setInput] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PlaceData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateUrlQuery = (queryValue: string) => {
    if (queryValue.trim()) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: queryValue.trim(),
      });
      router.push(newUrl, { scroll: false });
    } else if (pathname) {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        KeysToRemove: ["query"],
      });
      router.push(newUrl, { scroll: false });
    }
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    if (selectedAddress && val !== selectedAddress) {
      setSelectedAddress(null);
    }
    if (onSelectAddress) onSelectAddress(val);
  };

  const handleSelect = (place: PlaceData) => {
    setInput(place.formatted_address);
    setSelectedAddress(place.formatted_address);
    setPredictions([]);
    setIsOpen(false);
    if (onSelectAddress) onSelectAddress(place.formatted_address);
    if (onSelectPlace) onSelectPlace(place);
    updateUrlQuery(place.formatted_address);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      if (!selectedAddress) {
        setInput("");
      } else {
        setInput(selectedAddress);
      }
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (predictions.length > 0 && !selectedAddress) {
        handleSelect(predictions[0]);
      } else {
        setIsOpen(false);
        updateUrlQuery(input);
      }
    }
  };

  useEffect(() => {
    if (!input.trim() || input === selectedAddress) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      const data = await autocomplete(input);
      if (data && data.length > 0) {
        setPredictions(data);
        setIsOpen(true);
      } else {
        setPredictions([]);
        setIsOpen(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [input, selectedAddress]);

  return (
    <div className="relative flex-1 w-full">
      <Command shouldFilter={false} className="bg-transparent border-none p-0 overflow-visible text-inherit">
        <div className="relative flex items-center w-full">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-zinc-400 dark:text-zinc-500 pointer-events-none flex items-center justify-center">
              {icon}
            </span>
          )}
          <CommandInput
            placeholder={placeholder}
            value={input}
            onValueChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (predictions.length > 0) setIsOpen(true);
            }}
            onBlur={handleBlur}
            className={cn(
              "h-12 w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-sm",
              icon ? "pl-11 pr-4" : "px-4",
              inputClassName
            )}
          />
        </div>

        {isOpen && predictions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden p-1 backdrop-blur-lg">
            <CommandList className="max-h-60 overflow-y-auto">
              <CommandGroup heading="Suggestions">
                {predictions.map((p) => (
                  <CommandItem
                    key={p.place_id}
                    value={p.formatted_address}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => handleSelect(p)}
                    className="px-3.5 py-2.5 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-sm flex items-center gap-2.5 transition-colors"
                  >
                    <MapPin className="size-4 shrink-0 text-[#FB2C36] !text-[#FB2C36]" />
                    <span className="truncate">{p.formatted_address}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
};

export default Autocompletesearch;