import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import bcrypt from "bcrypt";
import * as yup from "yup";

const userSchema = yup.object().shape({
    firstName: yup.string().min(2).required('First name is required'),
    lastName: yup.string().min(2).required('Last name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8).required('Password is required and must be at least 8 characters long')
})

async function validateEmail(email: string) {
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
        await userSchema.validate(body);

        const { firstName, lastName, email, password } = body;

        const existedEmail = await validateEmail(email);
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