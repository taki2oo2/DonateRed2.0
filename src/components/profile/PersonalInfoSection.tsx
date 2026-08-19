import PersonalInfoForm from "./PersonalInfoForm";

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

  const initialFullName = userData?.fullname || clerkName || "";
  const initialEmail = userData?.email || clerkEmail || "";

  return (
    <PersonalInfoForm
      initialFullName={initialFullName}
      initialEmail={initialEmail}
    />
  );
}
