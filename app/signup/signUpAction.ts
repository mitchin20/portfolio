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

    try {
        // Validate data
        if (formData.get("password") !== formData.get("confirmPassword")) {
            return {
                success: false,
                message: "Password do not match."
            }
        }
        await userSchema.parseAsync(newUser);

        const response = await fetch(`${process.env.ROOT_URL}/api/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            redirect("/signin")
        } else {
            return {
                success: false,
                message: "Unable to sign up."
            }
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validateErrors = error.issues.map(err => err.message)

            console.error("Error during sign up:", validateErrors);
            return {
                success: false,
                message: validateErrors.join(", ")
            }
        } else {
            return {
                success: false,
                message: "Network Error"
            }
        }
    }
}