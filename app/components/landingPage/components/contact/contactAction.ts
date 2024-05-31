"use server";

export async function contact(
    prevState: any,
    formData: FormData
) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (name === '' || email === '' || message === '') {
        return {
            success: false,
            message: "One of the field is missing."
        }
    }

    const contactInfo = {
        name,
        email,
        message
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/contactForm`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactInfo)
    })

    const data = await response.json();

    if (!response.ok) {
        return {
            success: data.success,
            message: data.message
        }
    }

    return {
        success: data.success,
        message: data.message
    }
}