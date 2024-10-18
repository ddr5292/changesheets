// components/ClientSideRegisterPage.js
'use client'

import { useSearchParams } from 'next/navigation'

export default function ClientSideRegisterPage({ RegisterForm }) {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'

  return <RegisterForm callbackUrl={callbackUrl} />
}

