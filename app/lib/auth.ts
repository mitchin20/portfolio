import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { compare } from "bcrypt";

export const authOption: NextAuthOptions = ({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/signin'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }
                
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!existingUser) {
                    return null
                }

                const matchPassword = await compare(credentials.password, existingUser.password)
        
                if (!matchPassword) {
                    return null
                }

                return {
                    id: `${existingUser.id}`,
                    email: existingUser.email,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    role: existingUser.role
                }
            }
        })
    ]
})