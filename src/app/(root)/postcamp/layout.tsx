import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const PostCampLayout = async ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = await auth()
  if (!isAuthenticated) {
    redirect('/getStarted?msg=postcamp_signin_required')
  }

  return <>{children}</>
}

export default PostCampLayout
