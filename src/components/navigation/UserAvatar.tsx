'use client'

import { useUser } from "@clerk/nextjs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link"
import ROUTES from "@/constants/routes"

const UserAvatar = () => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <div className="size-9 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
  }

  if (!isSignedIn || !user) {
    return null
  }

  return (
    <Link href = {ROUTES.PROFILE(user.id)}>  
    <Avatar className="size-9 ring-2 ring-red-500/20 hover:ring-red-500/40 transition-all cursor-pointer">
      <AvatarImage
        src={user.imageUrl}
        alt={user.fullName || "User avatar"}
      />
      <AvatarFallback className="bg-red-500/10 text-red-500 text-xs font-semibold">
        {user.firstName?.[0]}{user.lastName?.[0]}
      </AvatarFallback>
    </Avatar>
    </Link>
  )
}

export default UserAvatar
