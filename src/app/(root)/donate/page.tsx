import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const DonatePage = async () => {
  const { isAuthenticated } = await auth()
  if (!isAuthenticated) {
    redirect('/getStarted?msg=donate_signin_required')
  }

  return (
    <div>donar</div>
  )
}

export default DonatePage