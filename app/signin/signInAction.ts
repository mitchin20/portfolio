"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(
    prevState: any,
    formData: FormData
) {
    // Get form data
    const email = formData.get("email");
    const password = formData.get("password");

    // Sign in
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const json = await response.json();

    cookies().set('Authorization', json.token, {
        secure: true,
        httpOnly: true,
        expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        path: '/',
        sameSite: 'strict',
    });

    // Redirect user if response success
    if (response.ok) {
        switch (json.role) {
            case 'SUPER_ADMIN':
                redirect("/dashboard");
            default:
                redirect("/");
        }
    } else {
        return json.error;
    }
}