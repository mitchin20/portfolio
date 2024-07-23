import { render } from "@react-email/render";
import { Resend } from "resend";
import AppointmentEmail from "@/emails/appointmentEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Appointment {
    id: number;
    subject: string;
    technicianId: number;
    technicianName: string;
    customerName: string;
    nickName: string;
    customerPhone: string;
    customerEmail: string;
    selectedDate: string;
    selectedTime: string;
    services: string[];
    note: string;
    endTime: Date;
    startTime: Date;
}

interface SendAppointmentEmailProps {
    appointmentInfo: Appointment;
}

export async function sendAppointmentEmail({
    appointmentInfo
}: SendAppointmentEmailProps){
    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio <noreply@insightlabs.dev>",
            to: [appointmentInfo.customerEmail],
            subject: "Appointment from Bookme",
            html: render(AppointmentEmail({
                data: appointmentInfo
            })),
            reply_to: appointmentInfo.customerEmail,
        })

        if (error) {
            console.error("Error sending appointment email:", error.message);
            return {
                success: false,
                data: null,
                error: error.message
            }
        }

        return {
            success: true,
            data,
            error: null
        }
    } catch (error) {
        console.error("Unable to send email:", error);
        return {
            success: false,
            data: null,
            error: "Unable to send appointment email."
        }
    }
}