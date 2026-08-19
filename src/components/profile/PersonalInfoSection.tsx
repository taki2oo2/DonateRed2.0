"use client";

import { use } from "react";
import { User as UserIcon, Lock, KeyRound } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MyButton from "@/components/MyButton";

interface PersonalInfoSectionProps {
  userDataPromise: Promise<ActionResponse<User>>;
  clerkName?: string | null;
  clerkEmail?: string | null;
}

export default function PersonalInfoSection({
  userDataPromise,
  clerkName,
  clerkEmail,
}: PersonalInfoSectionProps) {
  const res = use(userDataPromise);
  const userData = res?.data ?? null;
  const { openUserProfile } = useClerk();

  const fullName = userData?.fullname || clerkName || "Not provided";
  const email = userData?.email || clerkEmail || "Not provided";

  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Personal & Security Information
        </h2>
        <div className="flex items-center gap-2 text-zinc-500">
          <UserIcon className="w-4 h-4" />
          <Lock className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Information Display */}
      <div className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="fullname"
            className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold"
          >
            Full Name
          </Label>
          <Input
            id="fullname"
            value={fullName}
            readOnly
            disabled
            className="w-full bg-[#181a22]/80 border-zinc-800/70 text-zinc-200 text-sm h-10 rounded-lg disabled:opacity-90 disabled:cursor-default disabled:bg-[#181a22]/60 focus-visible:ring-0"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            readOnly
            disabled
            className="w-full bg-[#181a22]/80 border-zinc-800/70 text-zinc-200 text-sm h-10 rounded-lg disabled:opacity-90 disabled:cursor-default disabled:bg-[#181a22]/60 focus-visible:ring-0"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold"
          >
            Password & Security
          </Label>
          <Input
            id="password"
            type="password"
            defaultValue="••••••••••••"
            readOnly
            disabled
            className="w-full bg-[#181a22]/80 border-zinc-800/70 text-zinc-400 tracking-widest text-sm h-10 rounded-lg disabled:opacity-90 disabled:cursor-default disabled:bg-[#181a22]/60 focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-4 flex items-center justify-between gap-3 flex-wrap border-t border-zinc-800/50">
        <p className="text-[11px] font-mono text-zinc-500">
          Managed securely via Clerk
        </p>
        <MyButton
          type="button"
          onClick={() => openUserProfile?.()}
          className="bg-[#FB2C36] hover:bg-[#e02630] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-red-950/40 cursor-pointer flex items-center gap-1.5"
        >
          <KeyRound className="w-3.5 h-3.5" />
          Update Info & Password
        </MyButton>
      </div>
    </div>
  );
}
