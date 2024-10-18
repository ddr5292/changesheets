'use client'

import dynamic from 'next/dynamic'

const RegisterForm = dynamic(() => import('../../components/RegisterForm'), { 
  ssr: false,
  loading: () => <p>Loading...</p>
})

const ClientSideRegisterPage = dynamic(() => import('../../components/ClientSideRegisterPage'), { ssr: false })

export default function RegisterPage() {
  return <ClientSideRegisterPage RegisterForm={RegisterForm} />
}
