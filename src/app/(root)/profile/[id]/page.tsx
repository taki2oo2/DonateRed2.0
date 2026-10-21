import { Suspense } from "react";
import { getUerInfo } from "@/actions/user.action";
import { getUserCamps } from "@/actions/camp.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfoSection from "@/components/profile/PersonalInfoSection";
import OtherDetailsSection from "@/components/profile/OtherDetailsSection";
import DonorStatusSection from "@/components/profile/DonorStatusSection";
import RecentActivitySection from "@/components/profile/RecentActivitySection";

import {
  ProfileHeaderSkeleton,
  PersonalInfoSkeleton,
  OtherDetailsSkeleton,
  DonorStatusSkeleton,
  RecentActivitySkeleton,
} from "@/components/profile/ProfileSkeletons";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [{ id }, user] = await Promise.all([
    params,
    currentUser(),
  ]);

  if (!user || user.id !== id) {
    redirect("/");
  }

  // Non-blocking promises passed to Suspense boundaries for streaming
  const userDataPromise = getUerInfo({ clerkid: user.id });
  const userCampsPromise = getUserCamps({ clerkid: user.id, page: 1, pageSize: 6 });

  return (
    <div className="min-h-screen bg-[#0c0d12] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header / Profile Info with Suspense */}
        <Suspense fallback={<ProfileHeaderSkeleton />}>
          <ProfileHeader
            user={{
              fullName: user.fullName,
              imageUrl: user.imageUrl,
              createdAt: user.createdAt,
            }}
            userDataPromise={userDataPromise}
          />
        </Suspense>

        {/* 2-Column Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (Personal Info & Security, Other Details) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Card 1: Personal & Security Information */}
            <Suspense fallback={<PersonalInfoSkeleton />}>
              <PersonalInfoSection
                userDataPromise={userDataPromise}
                clerkName={user.fullName}
                clerkEmail={user.emailAddresses?.[0]?.emailAddress}
              />
            </Suspense>

            {/* Card 2: Other Details */}
            <Suspense fallback={<OtherDetailsSkeleton />}>
              <OtherDetailsSection userDataPromise={userDataPromise} />
            </Suspense>

          </div>

          {/* Right Column (Donor Status, Posted Camps) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            {/* Donor Status Card */}
            <Suspense fallback={<DonorStatusSkeleton />}>
              <DonorStatusSection
                userDataPromise={userDataPromise}
                userId={id}
              />
            </Suspense>

            {/* Posted Donation Camps */}
            <Suspense fallback={<RecentActivitySkeleton />}>
              <RecentActivitySection
                userCampsPromise={userCampsPromise}
                userId={id}
              />
            </Suspense>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Page;