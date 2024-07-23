'use server';

export async function getAppointments() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/appointments`);

        if (!response.ok) {
            const json = await response.json();
            return {
                success: json.success,
                message: json.message,
                data: json.data
            }
        }

        const json = await response.json();

        return {
            success: json.success,
            message: json.message,
            data: json.data
        }
        
    } catch (error) {
        console.error("Appointment Action Failed to fetch appointments.")
        return {
            success: false,
            message: "Failed to fetch appointments",
            data: null
        }
    }
}