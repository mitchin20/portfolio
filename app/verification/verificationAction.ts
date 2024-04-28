"use server";

export async function verification(
    prevState: any,
    formData: FormData,
) {
    const code = formData.get("code");
    const userId = formData.get("encodedData");

    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/verification?userId=${userId}&verificationCode=${code}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const data = await response.json();

    if (!response.ok) {
        return {
            data
        }
    }

    return {
        data
    }
}