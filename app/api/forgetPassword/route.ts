import prisma from "@/prisma/client";
import generateVerificationCode from "@/helpers/generateVerificationCode";
import { sendVerificationEmail } from "@/lib/emailService";

export async function POST(req: Request) {
    // Read data from req body
    const body = await req.json();

    const { email } = body;

    // Validate User
    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    })

    if (!existingUser) {
        return Response.json({
            message: "Email not exist",
            userId: null
        }, {
            status: 400
        })
    }

    // Generate verification code and code expiration time
    const verificationCode = generateVerificationCode();
    const expirationTime = 15 * 60 * 1000;

    // Create code
    await prisma.verificationCode.create({
        data: {
            userId: existingUser.id,
            code: verificationCode,
            expiresAt: new Date(Date.now() + expirationTime)
        }
    })

    // Send verification email
    const emailResponse = await sendVerificationEmail({
        userName: existingUser.firstName,
        email: existingUser.email,
        code: verificationCode
    })

    if (!emailResponse.success) {
        return Response.json({
            message: emailResponse.error
        })
    }

    // Return data
    return Response.json({
        message: "Forget password email sent",
        userId: existingUser.id
    }, {
        status: 200
    })
}