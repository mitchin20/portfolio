import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

export async function POST(req: Request) {
    // Read data from req body
    const body = await req.json();
    const { email, password } = body;

    // Validate data
    const existingUser = await prisma?.user.findUnique({
        where: { email: email }
    })
    if (!existingUser) {
        return Response.json({
            error: "Invalid email or password."
        }, {
            status: 400
        })
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
        return Response.json({
            error: "Invalid email or password."
        }, {
            status: 400
        })
    }

    // JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const alg = 'HS256'
    
    const jwt = await new jose.SignJWT({
            id: existingUser.id,
            role: existingUser.role
        })
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .setSubject(existingUser.id.toString())
        .sign(secret)
    
    return Response.json({ 
        token: jwt,
        userId: existingUser.id,
        role: existingUser.role
    });
}