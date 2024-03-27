import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ users })
    } catch (error) {
        return NextResponse.json({ 
            message: "Failed to fetch users",
            error: error 
        })
    }
}

// export async function POST( request: Request ) {

// }