'use client';

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

export default function AuthStatus() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <Link href="/login" className="text-gray-500 hover:text-gray-900 mr-4">
        Log in
      </Link>
    )
  }

  return (
    <div className="flex items-center">
      <Link 
        href="/dashboard" 
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out mr-4"
      >
        Dashboard
      </Link>
      <Link href="/profile" className="ml-4">
        <Image
          src={session.user.image || '/anonymous-avatar.png'}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </Link>
    </div>
  )
}
