"use server";

export async function resendVerificationAction(
    prevState: any,
    formData: FormData
) {
    const userId = formData.get('encodedData');

    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/resendVerification`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: userId })
    })

    const res = await response.json();

    if (!response.ok) {
        return {
            success: false,
            message: res?.error
        }
    }

    return {
        success: true,
        message: res?.message
    }
}