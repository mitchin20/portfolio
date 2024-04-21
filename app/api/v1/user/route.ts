import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { cookies } from "next/headers";
import * as jose from "jose";

// sign up request
const userSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
})

async function isEmailExist(email: string) {
    const existedUserEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return existedUserEmail !== null;
}

export async function POST( req: Request ) {
    try {
        const body = await req.json();
        // Validation
        await userSchema.parseAsync(body);

        const { firstName, lastName, email, password } = body;

        const existedEmail = await isEmailExist(email);
        // Validate user email if it  already existed
        if (existedEmail) {
            return NextResponse.json(
                {
                    user: null,
                    message: "Email already existed"
                },
                {
                    status: 409,
                }
            )
        }

        // Encrypt password before saved to database
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create new user in database
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        })

        // Exclude password when returning user object
        const { password: _, ...user } = newUser;

        return NextResponse.json({
            user,
            message: "Successfully registered."
        });
    } catch (error) {
        console.error("Validation or Saving Failed: ", error);
        return NextResponse.json({
            user: null,
            message: "An error occurred during registration."
        }, {
            status: 500,
        });
    }
}
// end sign up request

// Get currentUser API
interface User {
    id: number | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    password: string | null,
    role: string | null
}

async function getUser(id: number) {
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user;
}

async function verifyToken(token: string, secret: any) {
    try {
        const { payload } = await jose.jwtVerify(token, secret)
        return payload;
    } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Invalid token");
    }
}

export async function GET(req: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get("Authorization");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    try {
        if (token) {
            const jwt = token.value;
            
            const userData = await verifyToken(jwt, secret);
            const existingUser = await getUser(Number(userData.id))
            
            if (existingUser) {
                const { password: _, ...user } = existingUser;
                return NextResponse.json({
                    user
                })
            } else {
                console.error("User is null and cannot be processed.");
                return NextResponse.json({
                    user: null,
                    error: "User is null and cannot be processed."
                })
            }
        }

    } catch (error) {
        console.error("Failed to get jwt token", error);
        return NextResponse.json({
            user: null,
            error: "Failed to get jwt token"
        })
    }
}
// End get currentUser API