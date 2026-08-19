import { User as UserIcon } from "lucide-react";

interface PersonalInfoSectionProps {
  userDataPromise: Promise<ActionResponse<User>>;
  clerkName?: string | null;
  clerkEmail?: string | null;
}

export default async function PersonalInfoSection({
  userDataPromise,
  clerkName,
  clerkEmail,
}: PersonalInfoSectionProps) {
  const res = await userDataPromise;
  const userData = res?.data ?? null;

  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Personal Information
        </h2>
        <UserIcon className="w-4 h-4 text-zinc-400" />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
            Full Name
          </label>
          <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
            {userData?.fullname || clerkName || "Not provided"}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
            Email Address
          </label>
          <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
            {userData?.email || clerkEmail || "Not provided"}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-[#FB2C36] hover:bg-[#e02630] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-red-950/40 cursor-pointer">
          Update Personal Info
        </button>
      </div>
    </div>
  );
}
