import {
  ProfileHeaderSkeleton,
  PersonalInfoSkeleton,
  OtherDetailsSkeleton,
  DonorStatusSkeleton,
  RecentActivitySkeleton,
} from "@/components/profile/ProfileSkeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0c0d12] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeaderSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <PersonalInfoSkeleton />
            <OtherDetailsSkeleton />
          </div>

          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <DonorStatusSkeleton />
            <RecentActivitySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
