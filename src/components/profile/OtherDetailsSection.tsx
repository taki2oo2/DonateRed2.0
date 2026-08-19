import OtherDetailsForm from "./OtherDetailsForm";

interface OtherDetailsSectionProps {
  userDataPromise: Promise<ActionResponse<User>>;
}

export default async function OtherDetailsSection({
  userDataPromise,
}: OtherDetailsSectionProps) {
  const res = await userDataPromise;
  const userData = res?.data ?? null;

  return (
    <OtherDetailsForm
      initialCity={userData?.city || ""}
      initialContactNo={userData?.contactno || ""}
      initialBloodGroup={userData?.bloodGroup || "O-"}
    />
  );
}
