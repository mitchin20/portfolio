import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    // Read data from req body
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // Validate data
    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    })

    if (existingUser) {
        return Response.json({
            error: "Email already existed."
        }, {
            status: 400
        })
    }

    const validatedEmail = validateEmail(email);

    if (!validatedEmail.isValid) {
        return Response.json({
            error: validatedEmail.message
        }, {
            status: 400
        })
    }

    const validatedPassword = validatePassword(password);

    if (!validatedPassword.isValid) {
        return Response.json({
            error: validatedPassword.message
        }, {
            status: 400
        })
    }

    // Encrypt Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user in DB
    const newUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })

    const { password: _, ...user } = newUser;

    // return data
    return Response.json({});
}