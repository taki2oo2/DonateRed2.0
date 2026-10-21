import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserCamps } from "@/actions/camp.action";
import CampCards from "@/components/cards/CampCards";
import { CampCardsGridSkeleton } from "@/components/cards/CampCardSkeleton";
import { Tent, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const UserCampsContent = async ({ userId }: { userId: string }) => {
  const result = await getUserCamps({ clerkid: userId, page: 1, pageSize: 12
    
   });
  const camps = result?.data?.camps ?? [];
  const totalResults = result?.data?.totalResults ?? 0;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/profile/${userId}`}
            className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Your Donation Camps</h1>
            <p className="text-sm text-zinc-400 mt-0.5">
              {totalResults} camp{totalResults !== 1 ? "s" : ""} organized by you
            </p>
          </div>
        </div>
      </div>

      {/* Camps Grid */}
      {camps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp) => (
            <CampCards key={camp._id} camp={camp} currentUserId={camp.owner} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center mb-4">
            <Tent className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-300">No camps yet</h3>
          <p className="text-sm text-zinc-500 mt-1 max-w-md">
            You haven&apos;t organized any donation camps. Start making a difference today!
          </p>
          <Link
            href={ROUTES.POST_CAMP}
            className="mt-4 inline-flex items-center gap-2 bg-[#FB2C36] hover:bg-[#e0262f] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Tent className="w-4 h-4" />
            Organize a Camp
          </Link>
        </div>
      )}
    </>
  );
};

const UserCampsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [{ id }, user] = await Promise.all([params, currentUser()]);

  // Check if user is logged in and matches the profile
  if (!user || user.id !== id) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#0c0d12] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Suspense fallback={<CampCardsGridSkeleton />}>
          <UserCampsContent userId={user.id} />
        </Suspense>
      </div>
    </main>
  );
};

export default UserCampsPage;
