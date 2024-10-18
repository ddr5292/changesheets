// lib\customPrismaAdapter.js
import { PrismaAdapter } from "@auth/prisma-adapter"
import crypto from 'crypto'

export function CustomPrismaAdapter(p) {
    return {
        ...PrismaAdapter(p),
        createUser: async (data) => {
            const user = await p.user.create({
                data: {
                    ...data,
                    id: crypto.randomUUID(),
                },
            });
            return user;
        },
        getUser: async (id) => {
            return p.user.findUnique({ where: { id } });
        },
        getUserByEmail: async (email) => {
            return p.user.findUnique({ where: { email } });
        },
        getUserByAccount: async ({ providerAccountId, provider }) => {
            const account = await p.account.findUnique({
                where: {
                    provider_providerAccountId: { provider, providerAccountId },
                },
                include: { user: true },
            });
            return account?.user ?? null;
        },
        updateUser: async (data) => {
            return p.user.update({ where: { id: data.id }, data });
        },
        deleteUser: async (userId) => {
            return p.user.delete({ where: { id: userId } });
        },
        linkAccount: async (data) => {
            return p.account.create({
                data: {
                    ...data,
                    id: crypto.randomUUID(),
                },
            });
        },
        unlinkAccount: async ({ providerAccountId, provider }) => {
            return p.account.delete({
                where: {
                    provider_providerAccountId: { provider, providerAccountId },
                },
            });
        },
        // Add other methods as needed...
    };
}
