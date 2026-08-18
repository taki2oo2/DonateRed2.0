import { currentUser } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'

const page = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const [{ id }, user] = await Promise.all([
    params,
    currentUser(),
  ])

  if(user?.id != id || !user){
    redirect('/')
  }

return (
    <div className="h-screen">{`${id}`}</div>
)
}

export default page