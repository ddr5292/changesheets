'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import LoginForm from '@/components/LoginForm'

function SignInContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const error = searchParams.get('error')

  console.log('SignIn page loaded. CallbackUrl:', callbackUrl, 'Error:', error)

  return <LoginForm callbackUrl={callbackUrl} />
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  )
}
