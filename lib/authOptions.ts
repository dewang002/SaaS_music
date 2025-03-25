import prisma from "@/app/lib/db";
import { emailSchema, passwordSchema } from "@/schema/Credential_Schema";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";



export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        Credentials({
            credentials: {
                email: { type: "email" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                const emailValidation = emailSchema.safeParse(credentials.email);

                if (!emailValidation.success) {
                    throw new Error("Invalid email");
                }

                const passwordValidation = passwordSchema.safeParse(credentials.password);

                if (!passwordValidation.success) {
                    throw new Error(passwordValidation.error.issues[0].message);
                }
                try {

                    const user = await prisma.user.findUnique({
                        where: {
                            email: emailValidation.data
                        }
                    });

                    if (!user) {
                        const hashedPassword = await bcrypt.hash(passwordValidation.data, 10);

                        const newUser = await prisma.user.create({
                            data: {
                                email: emailValidation.data,
                                password: hashedPassword,
                                provider: "Google"
                            }
                        });

                        return newUser;
                    }

                    return user
                } catch (error) {
                    if (error instanceof PrismaClientInitializationError) {
                        throw new Error("Internal server error");
                    }
                    console.log(error);
                    throw error;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth"
    },
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn(params:any) {
            if (!params.user.email) {
                return false;
            }
            try {
                await prisma.user.create({
                    data: {
                        email: params.user.email,
                        provider: 'Google'
                    }
                })
                return true
            } catch {

            }
            return true;
        }
    }
}