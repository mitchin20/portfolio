import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";
import { sendAppointmentEmail } from "@/lib/emailScheduledAppointment";

const appointmentSchema = z.object({
    subject: z.string(),
    technicianId: z.number(),
    technicianName: z.string(),
    customerName: z.string(),
    nickName: z.string(),
    customerPhone: z.string(),
    customerEmail: z.string(),
    selectedDate: z.string(),
    selectedTime: z.string(),
    services: z.array(z.string()),
    note: z.string(),
    startTime: z.date(),
    endTime: z.date()
})

async function getEmployeeById(employeeId: number) {
    const employee = await prisma.employee.findUnique({
        where: {
            id: employeeId
        }
    })

    return employee || null;
}

function convertToLocalTime(date: Date) {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60 * 1000);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { appointmentData } = body;

        const employee = await getEmployeeById(appointmentData.technicianId);

        if (!appointmentData.selectedDate) {
            return NextResponse.json({
                success: false,
                message: "Appointment date is required",
                data: null,
            })
        }

        if (!appointmentData.selectedTime) {
            return NextResponse.json({
                success: false,
                message: "Time is required",
                data: null,
            })
        }

        const [month, day, year] = appointmentData.selectedDate.split('/').map(Number);
        const [time, period] = appointmentData.selectedTime.split(' ');
        const [hours, minutes] = time.split(':').map(Number);

        let finalHours = hours;
        if (period === 'PM' && hours < 12) {
            finalHours += 12; // convert PA to 24-hour format
        }

        if (period === 'AM' && hours === 12) {
            finalHours = 0; // handle 12 AM case
        }

        const endTimeHour = finalHours + 1;

        let startTime = new Date(year, month - 1, day, finalHours, minutes);
        let endTime = new Date(year, month - 1, day, endTimeHour, minutes);

        startTime = convertToLocalTime(startTime);
        endTime = convertToLocalTime(endTime);

        const transformedData = {
            ...appointmentData,
            technicianName: employee?.fullName,
            startTime: startTime,
            endTime: endTime    
        }

        // Validation
        const result = await appointmentSchema.safeParseAsync(transformedData)

        if (!result.success) {
            const validationErrors = result.error.issues.map(issue => {
                return `${issue.path.join('.')} - ${issue.message}`;
            }).join(', ');
            console.error("Validation failed:", result.error.issues)
            return NextResponse.json({
                success: result.success,
                message: `Validation failed: ${validationErrors}`,
                data: null
            })
        }

        // Create record in DB
        const res = await prisma.appointment.create({
            data: transformedData
        })

        // Send email

        if (!res) {
            return NextResponse.json({
                success: false,
                message: "Failed to save record.",
                data: null
            })
        }

        const response = await sendAppointmentEmail({appointmentInfo: res});

        if (!response.success) {
            return NextResponse.json({
                success: response.success,
                message: response.error,
                data: response.data
            })
        }

        return NextResponse.json({
            success: true,
            message: "Successfully scheduled the appointment and Email has been sent.",
            data: res
        })

    } catch (error) {
        console.error("Failed to schedule the appointment:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to schedule the appointment",
            data: null,
        })
    }
}