import { Info, ChevronDown } from "lucide-react";

interface OtherDetailsSectionProps {
  userDataPromise: Promise<ActionResponse<User>>;
}

export default async function OtherDetailsSection({
  userDataPromise,
}: OtherDetailsSectionProps) {
  const res = await userDataPromise;
  const userData = res?.data ?? null;

  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Other Details
        </h2>
        <Info className="w-4 h-4 text-zinc-400" />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
            City / Location
          </label>
          <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
            {userData?.city || "Not provided"}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
            Contact Number
          </label>
          <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
            {userData?.contactno || "Not provided"}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
            Blood Group
          </label>
          <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium flex items-center justify-between">
            <span>
              {userData?.bloodGroup
                ? `${userData.bloodGroup} (${userData.bloodGroup.includes("-") ? "Negative" : "Positive"})`
                : "Not specified"}
            </span>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-[#FB2C36] hover:bg-[#e02630] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-red-950/40 cursor-pointer">
          Update Other Details
        </button>
      </div>
    </div>
  );
}
