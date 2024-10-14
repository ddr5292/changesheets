// lib/auth.js
//import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { resend } from './resend'
//import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: async ({ identifier, url, provider }) => {
                const { host } = new URL(url)
                try {
                    const result = await resend.emails.send({
                        from: process.env.EMAIL_FROM,
                        to: identifier,
                        subject: `Sign in to ${host}`,
                        html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
                    });
                    if (result.error) {
                        throw new Error(result.error.message);
                    }
                } catch (error) {
                    console.error('Error sending verification email', error);
                    throw new Error('Failed to send verification email');
                }
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            console.log('Redirect callback:', { url, baseUrl });
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async signIn({ user, account, profile, email, credentials }) {
            console.log('SignIn callback:', { user, account, profile, email, credentials });
            return true;
        },
        async jwt({ token, user, account }) {
            console.log('JWT callback:', { token, user, account })
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, user }) {
            console.log('Session callback:', { session, user });
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login', // Change this to match your actual login page route
    },
    debug: true, // Enable debug messages
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}
