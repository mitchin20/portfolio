"use server";

export async function forgetPasswordAction(
    prevState: any,
    formData: FormData
) {
    const email = formData.get('email');

    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/forgetPassword`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    })

    const res = await response.json();

    if (!response.ok) {
        return {
            success: false,
            message: res.message,
            userId: null
        }
    }

    return {
        success: true,
        message: res.message,
        userId: res.userId
    }
}