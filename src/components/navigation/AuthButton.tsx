'use client'

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import MyButton from "../MyButton"
import { Loader2 } from "lucide-react"
import ROUTES from "@/constants/routes"

const AuthButton = ({ className, onClick }: { className?: string; onClick?: () => void }) => {
  const { isLoaded, isSignedIn, signOut } = useAuth()
  const router = useRouter()

  if (!isLoaded) {
    return (
      <MyButton disabled className={className}>
        <Loader2 className="size-4 animate-spin" />
      </MyButton>
    )
  }

  if (isSignedIn) {
    return (
      <MyButton
        disabled={false}
        className={className}
        onClick={() => {
          onClick?.()
          signOut(() => router.push("/"))
        }}
      >
        Logout
      </MyButton>
    )
  }

  return (
    <MyButton
      disabled={false}
      className={className}
      onClick={() => {
        onClick?.()
        router.push(ROUTES.GET_STARTED)
      }}
    >
      Get Started
    </MyButton>
  )
}

export default AuthButton
