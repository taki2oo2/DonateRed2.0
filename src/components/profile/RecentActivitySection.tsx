import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Tent, Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import ROUTES from "@/constants/routes";

interface RecentActivitySectionProps {
  userId?: string;
  userCampsPromise: Promise<
    ActionResponse<{
      camps: Camp[];
      isNext: boolean;
      totalResults: number;
    }>
  >;
}

export default async function RecentActivitySection({
  userId,
  userCampsPromise,
}: RecentActivitySectionProps) {
  const res = await userCampsPromise;
  const camps = res?.data?.camps ?? [];
  const totalResults = res?.data?.totalResults ?? 0;

  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <Tent className="w-4 h-4 text-[#FB2C36]" />
          <h2 className="text-base font-bold text-white tracking-tight">
            Your Posted Camps ({totalResults})
          </h2>
        </div>
        <Link
          href={userId ? ROUTES.USER_CAMPS(userId) : ROUTES.DONATION_CAMP}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#FB2C36] hover:underline cursor-pointer group"
        >
          View All Camps
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Content */}
      <div className="mt-5 space-y-4">
        {camps.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center mx-auto text-zinc-500">
              <Tent className="w-5 h-5" />
            </div>
            <p className="text-xs text-zinc-400">
              You haven&apos;t posted any donation camps yet.
            </p>
            <Link
              href={ROUTES.POST_CAMP}
              className="inline-block bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all"
            >
              Organize a Camp
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {camps.map((camp) => (
              <div
                key={camp._id}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-[#181a22]/60 border border-zinc-800/70 hover:border-zinc-700 transition-all"
              >
                {/* Camp Banner / Thumbnail */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800">
                  {camp.imageurl ? (
                    <Image
                      src={camp.imageurl}
                      alt={camp.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <Tent className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Camp Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate leading-tight">
                      {camp.title}
                    </h4>
                    {camp.locationlink && (
                      <a
                        href={camp.locationlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-300 shrink-0"
                        title="Open in Maps"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-3 text-[11px] font-mono text-zinc-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FB2C36]" />
                      {camp.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {camp.startDate
                        ? format(new Date(camp.startDate), "MMM dd, yyyy")
                        : "Upcoming"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
