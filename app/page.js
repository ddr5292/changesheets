// app/page.js
'use client';

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/Header'

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <>
      <Header />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ChangeSheets
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your ultimate solution for managing and tracking changes.
          </p>
          {loading ? (
            <div>Loading...</div>
          ) : session ? (
            <Link 
              href="/dashboard" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="space-x-4">
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Log In
              </Link>
              <Link 
                href="/signup" 
                className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-150 ease-in-out"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
        {/* You can add more sections here, such as features, testimonials, etc. */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          {/* Add your features list or grid here */}
        </section>
      </main>
    </>
  )
}
