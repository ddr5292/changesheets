// app/layout.js
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import { Providers } from './providers'
import Header from '@/components/Header'  // Import the Header
import './globals.css'

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Header />  {/* Add the Header component here */}
          <main className="pt-16">  {/* Add padding-top to account for fixed header */}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
