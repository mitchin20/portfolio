import { type NextRequest } from "next/server";
import prisma from "@/prisma/client";

function hasExpired(expiresAt: Date) {
    const currentTime = new Date();

    return currentTime > expiresAt
}

async function findVerificationCodeRecords(
    userId: number,
    vCode: string,
) {
    const records = await prisma.verificationCode.findMany({
        where: {
            userId: userId,
            code: vCode
        }
    })

    return records;
}

async function activateUser(userId: number) {
    const user = await prisma.user.update({
        select: {
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true
        },
        where: {
            id: Number(userId)
        },
        data: {
            isActive: true
        }
    })

    return user;
}

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const verificationCode = searchParams.get('verificationCode')

    if (!userId || !verificationCode) {
        return Response.json({
            success: false,
            message: "Invalid userId or code."
        })
    }
    
    const records = await findVerificationCodeRecords(Number(userId), verificationCode);
    
    const data = records.find(r => r.code === verificationCode);
    
    if (!data) {
        return Response.json({
            success: false,
            message: "Unable to find verification code!"
        })
    }
    
    if (hasExpired(data?.expiresAt)) {
        return Response.json({
            success: false,
            message: "The code has expired."
        })
    }

    const user = await activateUser(Number(userId));

    if (!user) {
        return Response.json({
            success: false,
            message: "Something went wrong. Unable to activate user."
        })
    }

    return Response.json({
        data: user,
        success: true,
        message: "Successfully activated the account."
    })
}