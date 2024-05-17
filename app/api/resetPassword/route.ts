import prisma from "@/prisma/client";
import validatePassword from "@/helpers/validatePassword";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    // Read data from req body
    const body = await req.json();
    const { userId, password } = body;

    const validatedPassword = validatePassword(password);
    
    if (!validatedPassword) {
        return Response.json({
            message: "Password is not match the requirement.",
            user: null
        }, {
            status: 400
        })
    }

    // Validate User
    const existingUser = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!existingUser) {
        return Response.json({
            message: "User not exist",
            user: null
        }, {
            status: 400
        })
    }

    // Encrypt Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Update user password
    const updatedUser = await prisma.user.update({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            isActive: true
        },
        data: {
            password: hashedPassword,
            isActive: true
        },
        where: {
            id: userId
        }
    })

    if (!updatedUser) {
        return Response.json({
            message: "Unable to update user password",
            user: null
        }, {
            status: 400
        })
    }

    return Response.json({
        message: "Successfully updated password.",
        user: updatedUser
    }, {
        status: 200
    })
}