import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import DonorEligibilityForm from '@/components/forms/DonorEligibilityForm'
import AlreadyDonar from '@/components/AlreadyDonar'

import { isUserDonor } from '@/actions/user.action'

const DonatePage = async () => {
  const { isAuthenticated, userId } = await auth()
  if (!isAuthenticated || !userId) {
    redirect('/getStarted?msg=donate_signin_required')
  }

  let isDonor = false

  if (userId && isAuthenticated) {
    const res = await isUserDonor(userId)
    isDonor = !!(res.success && res.data)
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Glow effect backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FB2C36]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[120px] pointer-events-none" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full flex justify-center">
        {isDonor ? (
          <AlreadyDonar userId={userId} />
        ) : (
          <DonorEligibilityForm />
        )}
      </div>
    </div>
  )

}
export default DonatePage