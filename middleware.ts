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
    const url = new URL(request.url);

    // Public paths that do not require authentication
    const publicPaths = ["/", "/signin", "/signup"];
    if (publicPaths.includes(url.pathname)) {
        // Check for cookies
        const cookie = cookies().get('Authorization');
        if (cookie) {
            // Validate cookies
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const jwt = cookie.value;

            try {
                const userData = await verifyToken(jwt, secret);
                // Redirect authenticated users away from sign-in or sign-up pages
                if (url.pathname === '/signin' || url.pathname === '/signup') {
                    return NextResponse.redirect(new URL('/', request.url));
                }
                return NextResponse.next();
            } catch (error) {
                console.error('Failed to verify token:', error);
                // Clear the invalid cookie
                const response = NextResponse.redirect(new URL('/signin', request.url));
                response.headers.set('Set-Cookie', 'Authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict');
                return response;
            }
        }
        return NextResponse.next();
    }

    // Check for cookies
    const cookie = cookies().get("Authorization");
    if (!cookie) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Validate cookies
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;
    
    try {
        const userData = await verifyToken(jwt, secret);

        // Ensure any authenticated user can access /user routes
        if (url.pathname.startsWith("/user")) {
            return NextResponse.next();
        }
        
        // Redirect logic based on role
        if (userData.role === "SUPER_ADMIN" && !url.pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        } else if (userData.role !== "SUPER_ADMIN" && url.pathname !== "/") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    
        return NextResponse.next();
    } catch (error) {
        console.error("Failed to get jwt token:", error);
        // Clear the invalid cookie
        const response = NextResponse.redirect(new URL("/signin", request.url));
        response.headers.set('Set-Cookie', 'Authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict');
        return response;
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/user/:path*", "/loading", '/signin', '/signup']
};
