import { sendVerificationEmail } from "@/lib/emailService";
import generateVerificationCode from "@/helpers/generateVerificationCode";
import expirationTime from "@/helpers/expirationTime";
import prisma from "@/prisma/client";
import { headers } from "next/headers";
import { ratelimit } from "@/ratelimit/ratelimit";

async function getUser(userId: number) {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
        },
        where: {
            id: userId
        }
    })

    return user;
}

async function createVerificationCode(
    userId: number,
    code: string,
    expiresTime: number
) {
    try {
        const newCode = await prisma.verificationCode.create({
            data: {
                userId,
                code,
                expiresAt: new Date(Date.now() + expiresTime)
            }
        })
        return {
            success: true,
            newCode
        }
    } catch (error) {
        console.error("Unable to re-create new verification code: ", error)
        return {
            success: false,
            message: "Failed to re-create new verification code."
        }
    }
}

export async function POST(req: Request) {
    const ip = headers().get('x-forwarded-for');

    const { remaining, limit, success } = await ratelimit.limit(ip!);

    if (!success) {
        return Response.json({
            error: "Please resend request in 30 minutes."
        }, {
            status: 429
        })
    }

    console.log("rate limit: ", {remaining, limit})

    // Rea data from req body
    const body = await req.json();
    const { userId } = body;

    // Find user in database
    const user = await getUser(Number(userId));

    if (!user) {
        return Response.json({
            error: "Account not exist."
        }, {
            status: 400
        })
    }

    // generate verification code & expiration time
    const vCode = generateVerificationCode();
    const expiresTime = expirationTime();

    // create new verification code in database
    const code = await createVerificationCode(Number(user?.id), vCode, expiresTime)

    if (!code.success) {
        return Response.json({
            error: code.message
        }, {
            status: 400
        })
    }

    // Send verification email
    const response = await sendVerificationEmail({
        userName: user?.firstName,
        email: user?.email,
        code: vCode
    })

    if (!response.success) {
        return Response.json({
            error: response.error
        }, {
            status: 400
        })
    }

    return Response.json({
        message: "Code has been sent"
    },{
        status: 200
    })
}