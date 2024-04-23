"use server";
import { z } from "zod";
import { redirect } from "next/navigation";

const userSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
})

export async function signUp(
    prevState: any,
    formData: FormData
) {
    const newUser = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
    }

    // Validate data
    if (formData.get("password") !== formData.get("confirmPassword")) {
        return {
            success: false,
            message: "Password do not match."
        }
    }
    const result = await userSchema.safeParseAsync(newUser);
    if (!result.success) {
        console.error("Validation failed:", result.error.issues)
        return {
            success: false,
            message: "Validation failed."
        }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });

    if (!response.ok) {
        return {
            success: false,
            message: "Unable to sign up."
        }
    }

    redirect("/signin")
}