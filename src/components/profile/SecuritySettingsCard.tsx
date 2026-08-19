"use client";

import { Lock, KeyRound, ArrowRight } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

export default function SecuritySettingsCard() {
  const { openUserProfile } = useClerk();

  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Security & Password
        </h2>
        <Lock className="w-4 h-4 text-zinc-400" />
      </div>

      <div className="mt-5 space-y-4">
        <p className="text-xs text-zinc-400 leading-relaxed">
          Manage your authentication credentials, change your password, or recover your account securely.
        </p>

        <div className="pt-2 flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => openUserProfile?.()}
            className="inline-flex items-center gap-2 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
            Change Password
          </button>

          <button
            type="button"
            onClick={() => openUserProfile?.()}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#FB2C36] px-3 py-2 transition-colors cursor-pointer"
          >
            Forgot Password?
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
