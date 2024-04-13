import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

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

// sign up request
export async function POST( req: Request ) {
    try {
        const body = await req.json();
        console.log("***", body)
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