import { Lock } from "lucide-react";

export default function SecuritySettingsCard() {
  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Security Settings
        </h2>
        <Lock className="w-4 h-4 text-zinc-400" />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
            Current Password
          </label>
          <input
            type="password"
            defaultValue="••••••••••••"
            readOnly
            className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-400 tracking-widest focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 tracking-widest focus:outline-none focus:border-zinc-700"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 tracking-widest focus:outline-none focus:border-zinc-700"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/60 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer">
          Update Password
        </button>
      </div>
    </div>
  );
}
