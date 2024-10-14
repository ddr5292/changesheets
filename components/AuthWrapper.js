// components/AuthWrapper.js
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

const AuthWrapper = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (!session) {
    router.push("/login")
    return null
  }

  return <>{children}</>
}

export default AuthWrapper
