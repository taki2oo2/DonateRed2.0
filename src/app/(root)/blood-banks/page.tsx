"use client";

import React, { useState } from "react";
import Search from "@/components/search/Search";
import { Search as SearchIcon, ArrowRight, Building2, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import MyButton from "@/components/MyButton";

type BloodBank = {
  id: number;
  name: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  timing: string;
  availableGroups: string[];
  stockLevel: "High" | "Moderate" | "Critical";
};

const dummyBloodBanks: BloodBank[] = [
  {
    id: 1,
    name: "Central Regional Blood Bank",
    category: "Government Recognized",
    city: "New Delhi",
    address: "7, Ring Road, Lajpat Nagar III, New Delhi, Delhi 110024",
    phone: "+91 11 2984 5678",
    timing: "24/7 Available",
    availableGroups: ["A+", "B+", "O+", "AB+", "O-"],
    stockLevel: "High",
  },
  {
    id: 2,
    name: "Apollo Lifeline Blood Center",
    category: "Hospital Attached",
    city: "Mumbai",
    address: "21, Greams Lane, Thousand Lights, Mumbai, Maharashtra 400001",
    phone: "+91 22 4567 8901",
    timing: "08:00 AM - 10:00 PM",
    availableGroups: ["A+", "B+", "B-", "O+"],
    stockLevel: "Moderate",
  },
  {
    id: 3,
    name: "Rotary Medical Blood Bank",
    category: "Charitable Trust",
    city: "Bengaluru",
    address: "56, Indiranagar 100ft Road, Bengaluru, Karnataka 560038",
    phone: "+91 80 3456 7890",
    timing: "24/7 Available",
    availableGroups: ["O+", "O-", "A-", "AB-", "B+"],
    stockLevel: "Critical",
  },
];

const BloodBanksPage = () => {
  const [cityQuery, setCityQuery] = useState("");

  const filteredBanks = dummyBloodBanks.filter(
    (bank) =>
      bank.city.toLowerCase().includes(cityQuery.toLowerCase()) ||
      bank.name.toLowerCase().includes(cityQuery.toLowerCase()) ||
      bank.address.toLowerCase().includes(cityQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm backdrop-blur-md">
            <ShieldCheck className="size-4 text-[#FB2C36]" />
            <span>Verified Blood Banks &amp; Live Stock Tracker</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Find Blood Banks<span className="text-[#FB2C36] font-sans">.</span>
          </h1>

          <p className="text-sm leading-6 text-zinc-500 dark:text-[#ffb4ab]">
            Locate registered blood banks, verify component availability in real-time, and get immediate contact details in urgent medical situations.
          </p>
        </div>

        {/* Search Bar - Custom Adaptive Search (Image 2 style) */}
        <Search
          placeholder="Enter city to find blood banks..."
          icon={<SearchIcon className="size-5 text-zinc-400 dark:text-zinc-500" />}
          btnChildren={<ArrowRight className="size-5" />}
          className="mt-6 bg-zinc-900/60 dark:bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-3.5 backdrop-blur-md shadow-sm"
          containerClassName="flex-row items-center gap-3"
          buttonClassName="w-11 h-11 min-w-11 p-0 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-semibold rounded-xl border-none flex items-center justify-center shadow-lg shadow-red-500/20 cursor-pointer"
        />

        {/* Blood Banks Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank) => (
              <div
                key={bank.id}
                className="bg-zinc-50/50 dark:bg-[#111114]/80 border border-zinc-200 dark:border-white/8 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[#FB2C36]">
                        {bank.category}
                      </span>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug mt-1">
                        {bank.name}
                      </h3>
                    </div>
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider uppercase shrink-0 ${
                        bank.stockLevel === "High"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : bank.stockLevel === "Moderate"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {bank.stockLevel} Stock
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-[#FB2C36]/80 shrink-0" />
                      <span className="line-clamp-1">{bank.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-[#FB2C36]/80 shrink-0" />
                      <span>{bank.timing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 text-[#FB2C36]/80 shrink-0" />
                      <span>{bank.phone}</span>
                    </div>
                  </div>

                  {/* Stock Badges */}
                  <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                    <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                      Available Blood Groups:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {bank.availableGroups.map((grp) => (
                        <span
                          key={grp}
                          className="px-2 py-0.5 text-xs font-semibold rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                        >
                          {grp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <MyButton
                    onClick={() => (window.location.href = `tel:${bank.phone}`)}
                    className="w-full h-10 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-medium px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs shadow-md"
                  >
                    <Phone className="size-3.5" />
                    Contact Blood Bank
                  </MyButton>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-zinc-500 dark:text-zinc-400">
              No blood banks found matching "{cityQuery}".
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BloodBanksPage;