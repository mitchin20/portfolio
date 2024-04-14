import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

async function verifyToken(token: string, secret: any) {
    try {
        const { payload } = await jose.jwtVerify(token, secret)
        return payload;
    } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Invalid token");
    }
}

export async function middleware(request: NextRequest) {
    // Check for cookies
    const cookie = cookies().get("Authorization");
    if (!cookie) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    const url = new URL(request.url);

    if (url.pathname.startsWith("/dashboard")) {
        return NextResponse.next();
    }
    
    // Validate cookies
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;
    
    try {
        const userData = await verifyToken(jwt, secret);
        
        if (userData.role === "SUPER_ADMIN" && !url.pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        } else if (userData.role !== "SUPER_ADMIN" && url.pathname !== "/") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    
        return NextResponse.next();
    } catch (error) {
        console.error("Failed to get jwt token:", error);
        return NextResponse.redirect(new URL("/signin", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"]
};
