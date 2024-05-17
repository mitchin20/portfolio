"use server";

export async function resetPasswordAction(
    prevState: any,
    formData: FormData
) {
    const userId = formData.get('encodedData');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Validate UserId and Password
    if (!userId) {
        return {
            success: false,
            message: "Missing User Id."
        }
    }

    if (password !== confirmPassword) {
        return {
            success: false,
            message: "Password is not match."
        }
    }

    const data = {
        userId: Number(userId),
        password: password
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/resetPassword`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return {
            success: false,
            message: "Unable to reset password."
        }
    }

    const res = await response.json();

    return {
        success: true,
        message: res.message,
    }
}