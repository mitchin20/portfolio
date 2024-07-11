'use server';

import { z } from "zod";

const appointmentSchema = z.object({
    technicianId: z.number(),
    customerName: z.string().min(2),
    customerPhone: z.string().min(10),
    customerEmail: z.string().email(),
    selectedDate: z.string(),
    selectedTime: z.string(),
    services: z.array(z.string())
})

export async function appointmentFormAction(
    prevState: any,
    formData: FormData,
) {
    try {
        const services = formData.getAll("services");
        const employeeId = formData.get("appointmentWith")
        
        const appointmentData = {
            subject: "Appointment",
            technicianId: Number(employeeId),
            customerName: formData.get("fullName"),
            nickName: formData.get("nickName"),
            customerPhone: formData.get("phoneNumber"),
            customerEmail: formData.get("email"),
            selectedDate: formData.get("selectedDate"),
            selectedTime: formData.get("selectedTime"),
            services: services,
            note: formData.get("note"),
        }

        const result = await appointmentSchema.safeParseAsync(appointmentData)
        if (!result.success) {
            const validationErrors = result.error.issues.map(issue => {
                return `${issue.path.join('.')} - ${issue.message}`;
            }).join(', ');
            console.error("Validation failed:", result.error.issues);
            return {
                success: false,
                message: `Validation Failed: ${validationErrors}`,
                data: null
            }
        }

        const scheduleRes = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/scheduleAppointment`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({appointmentData})
        })

        if (!scheduleRes.ok) {
            const json = await scheduleRes.json();
            return {
                success: json.success,
                message: json.message,
                data: json.data
            }
        }

        const json = await scheduleRes.json();
        return {
            success: json.success,
            message: json.message,
            data: json.data
        }
    } catch (error) {
        console.error("Failed to fetch employee: ", error);
        return {
            success: false,
            message: "Unable to schedule the appointment",
            data: null,
        }
    }
}