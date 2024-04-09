'use server';

import { redirect } from "next/navigation";
import * as yup from "yup";

const userSchema = yup.object().shape({
    firstName: yup.string().min(2).required('First name is required'),
    lastName: yup.string().min(2).required('Last name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8).required('Password is required and must be at least 8 characters long')
})

export async function signup(
    prevState: any, 
    formData: FormData
) {
    const newUser = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    try {
        await userSchema.validate(newUser);

        const response = await fetch('http://localhost:3000/api/v1/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser),
        })

        if (response.ok) {
            const data = await response.json();
            return { 
                success: true,
                message: data.message,
            };
        } else {
            const data = await response.json();
            return { 
                success: false, 
                message: data.message,
            };
        }
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const validationErrors = error.inner.map((err) => err.message)
            console.error("Error during signup:", validationErrors);
            return {
                success: false,
                message: validationErrors.join(", ")
            }
        } else {
            return { 
                success: false, 
                message: "Network error" 
            };
        }
    } finally {
        redirect("/signin");
    }
}