"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Ban, 
  Loader2 
} from 'lucide-react';
import MyButton from '@/components/MyButton';
import { removeDonorStatus } from '@/actions/user.action';

interface AlreadyDonarProps {
  userId: string;
}

const AlreadyDonar = ({ userId }: AlreadyDonarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmStop, setShowConfirmStop] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStopBeingDonor = async () => {
    startTransition(async () => {
      try {
        const res = await removeDonorStatus(userId);
        if (res.success) {
          toast.success("Your donor profile has been deactivated.");
          setShowConfirmStop(false);
          router.refresh();
        } else {
          toast.error(res.error?.message || "Failed to deactivate profile.");
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-left">
      {/* Status Badge */}
      <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-500 text-black">
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </div>
        <span className="text-xs font-semibold tracking-wide text-orange-500 uppercase">
          Status Verified
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          You are an active donor.
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
          Thank you for your commitment to saving lives. Your profile is currently active in the directory, allowing hospitals and patients in need to contact you securely.
        </p>
      </div>

      {/* Toggle Button */}
      <div>
        <MyButton 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-950 hover:bg-red-900 border border-red-800/40 text-white rounded-full px-6 py-2.5 flex items-center gap-2 transition-all font-semibold"
        >
          Manage Donor Profile
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-red-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-red-400" />
          )}
        </MyButton>
      </div>

      {/* Expanded Actions Card */}
      {isOpen && (
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-white tracking-tight">Profile Options</h2>
          <p className="text-zinc-400 text-sm">
            If you need to change your availability, pause requests, or temporarily opt out of the donor directory, you can deactivate your profile here.
          </p>

          <div className="pt-6 border-t border-zinc-800 flex items-center justify-end">
            <button
              onClick={() => setShowConfirmStop(true)}
              className="flex items-center gap-2 text-red-500/80 hover:text-red-500 transition-colors text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-500/5 border border-red-500/20"
            >
              <Ban className="w-4 h-4 text-red-500/80" />
              Stop being a donor
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog/Card for Deactivation */}
      {showConfirmStop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Deactivate Donor Profile</h3>
              <p className="text-zinc-400 text-sm">
                Are you sure you want to stop being a donor? Your details will be hidden from the directory and hospitals or patients won't be able to reach out to you.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <MyButton 
                onClick={() => setShowConfirmStop(false)}
                disabled={isPending}
                className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-4 py-2 font-semibold"
              >
                Cancel
              </MyButton>
              <MyButton 
                onClick={handleStopBeingDonor}
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deactivating...
                  </>
                ) : (
                  "Yes, Stop Being Donor"
                )}
              </MyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlreadyDonar;