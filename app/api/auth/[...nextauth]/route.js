// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { host } = new URL(url)
        try {
          const result = await resend.emails.send({
            from: provider.from,
            to: identifier,
            subject: `Sign in to ${host}`,
            html: `<p>Click <a href="${url}">here</a> to sign in.</p>`
          })
          console.log('Email sent', result)
        } catch (error) {
          console.error('Error sending email', error)
          throw new Error('Failed to send verification email')
        }
      },
    }),
  ],
  // ... any other options you have configured
})

export { handler as GET, handler as POST }
