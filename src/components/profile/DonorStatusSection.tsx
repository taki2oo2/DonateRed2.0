import DonorStatusCard from "@/components/profile/DonorStatusCard";

interface DonorStatusSectionProps {
  userDataPromise: Promise<ActionResponse<User>>;
  userId: string;
}

export default async function DonorStatusSection({
  userDataPromise,
  userId,
}: DonorStatusSectionProps) {
  const res = await userDataPromise;
  const userData = res?.data ?? null;
  const isDonor = userData?.isDonar ?? false;

  return <DonorStatusCard isDonar={isDonor} userId={userId} />;
}
