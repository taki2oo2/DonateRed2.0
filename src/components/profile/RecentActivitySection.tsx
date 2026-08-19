import { Activity, Droplet } from "lucide-react";

export default function RecentActivitySection() {
  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <h2 className="text-base font-bold text-white tracking-tight">
          Recent Activity
        </h2>
        <button className="text-xs font-semibold text-[#FB2C36] hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {/* Activity 1 */}
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
            <Activity className="w-3.5 h-3.5 text-zinc-300" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">
              Emergency O- Request Shared
            </h4>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">
              Seattle General Hospital • 2 days ago
            </p>
          </div>
        </div>

        {/* Activity 2 */}
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
            <Droplet className="w-3.5 h-3.5 text-[#FB2C36]" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">
              Donated at Metro Camp
            </h4>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">
              Downtown Community Center • Nov 12, 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
