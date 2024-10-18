'use client';

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import AuthStatus from './AuthStatus'

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-gray-800">
            ChangeSheets
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/features" className="text-gray-500 hover:text-gray-900">Features</Link>
            <Link href="/pricing" className="text-gray-500 hover:text-gray-900">Pricing</Link>
            <Link href="/docs" className="text-gray-500 hover:text-gray-900">Docs</Link>
          </nav>
          <AuthStatus />
        </div>
      </div>
    </header>
  )
}
