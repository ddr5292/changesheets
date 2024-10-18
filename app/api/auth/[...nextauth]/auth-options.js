// app\api\auth\[...nextauth]\auth-options.js
import { CustomPrismaAdapter } from '@/lib/customPrismaAdapter'
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { Resend } from 'resend'
import prisma from '@/lib/prisma'

const adapter = CustomPrismaAdapter(prisma)
const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions = {
    adapter: adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'openid email profile https://www.googleapis.com/auth/calendar.readonly'
                }
            }
        }),
        EmailProvider({
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: async ({ identifier, url, provider }) => {
                const { host } = new URL(url)
                try {
                    await resend.emails.send({
                        from: provider.from,
                        to: identifier,
                        subject: `Sign in to ${host}`,
                        html: `<p>Click <a href="${url}">here</a> to sign in.</p>`
                    })
                } catch (error) {
                    console.error('Error sending email', error)
                    throw new Error('Failed to send verification email')
                }
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions;
