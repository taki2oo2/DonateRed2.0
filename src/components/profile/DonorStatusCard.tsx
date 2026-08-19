"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { changeDonorStatus } from "@/actions/user.action";
import ROUTES from "@/constants/routes";

interface DonorStatusCardProps {
  isDonar: boolean;
  userId: string;
}

export default function DonorStatusCard({ isDonar, userId }: DonorStatusCardProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleDonor = async (newStatus: boolean) => {
    startTransition(async () => {
      try {
        const res = await changeDonorStatus({ isDonar: newStatus });
        if (res.success) {
          toast.success(
            newStatus
              ? "Your donor profile has been activated."
              : "Your donor profile has been deactivated."
          );
          router.refresh();
        } else {
          toast.error(res.error?.message || "Failed to update donor status.");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  if (!isDonar) {
    return (
      <div className="bg-[#12141a]/90 border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden shadow-lg">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-zinc-500" />
        </div>
        <h3 className="text-base font-bold text-white mt-3">Donor Status: Inactive</h3>
        <p className="text-xs font-mono text-zinc-500 mt-0.5">Not listed in emergency directories.</p>
        <p className="text-xs text-zinc-400 leading-relaxed mt-3">
          Join our verified donor network to help emergency patients and hospitals find matching donors when every second counts.
        </p>
        <button
          onClick={() => router.push(ROUTES.DONATE)}
          className="w-full mt-5 bg-[#FB2C36] hover:bg-[#e02630] text-white rounded-lg py-2.5 text-xs font-mono tracking-wider font-semibold transition-all shadow-md shadow-red-950/40 cursor-pointer"
        >
          Register as a Donor
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1a1215] to-[#12141a] border border-red-900/60 rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-red-950/20">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-[#FB2C36] fill-[#FB2C36]/20" />
      </div>
      <h3 className="text-base font-bold text-white mt-3">Active Donor Status</h3>
      <p className="text-xs font-mono text-zinc-400 mt-0.5">Currently listed in emergency directories.</p>
      <p className="text-xs text-zinc-400 leading-relaxed mt-3">
        Thank you for being a vital part of the life-saving network. Your profile is visible to verified hospitals and emergency requests in your area.
      </p>
      <button
        disabled={isPending}
        onClick={() => handleToggleDonor(false)}
        className="w-full mt-5 border border-red-800/80 bg-red-950/30 text-red-400 hover:bg-red-900/40 rounded-lg py-2.5 text-xs font-mono tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Updating...
          </>
        ) : (
          "Stop being a donor"
        )}
      </button>
    </div>
  );
}
