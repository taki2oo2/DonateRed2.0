import Image from "next/image";
import { format } from "date-fns";
import { User as UserIcon } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    fullName?: string | null;
    imageUrl?: string | null;
    createdAt?: number | Date | null;
  };
  userDataPromise: Promise<ActionResponse<User>>;
}

export default async function ProfileHeader({
  user,
  userDataPromise,
}: ProfileHeaderProps) {
  const res = await userDataPromise;
  const userData = res?.data ?? null;

  const memberSince = user.createdAt
    ? format(new Date(user.createdAt), "MMM yyyy")
    : "Oct 2023";

  const isDonor = userData?.isDonar ?? false;

  return (
    <div className="flex items-center gap-5">
      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-zinc-700/80 shadow-xl shrink-0 bg-zinc-900">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.fullName || "Profile"}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500">
            <UserIcon className="w-8 h-8" />
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {userData?.fullname || user.fullName}
        </h1>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-mono text-zinc-400">
            Member since {memberSince}
          </span>
          <span className="text-zinc-600 text-xs">•</span>
          {isDonor ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-[#FB2C36] text-[11px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB2C36] animate-pulse"></span>
              Blood Donor
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-[11px] font-mono font-medium">
              Registered Member
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
