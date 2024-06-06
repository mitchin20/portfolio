import { render } from "@react-email/render";
import ContactEmail from "@/emails/contactEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailResponse {
    name: string;
    email: string;
    message: string;
}

export async function sendContactEmail({
    name,
    email,
    message
}: EmailResponse) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio <noreply@insightlabs.dev>",
            to: ['gnguyen5464@gmail.com'],
            subject: "Portfolio - Contact Email",
            html: render(ContactEmail({
                name: name,
                email: email,
                message: message
            })),
            reply_to: email,
        })

        if (error) {
            console.error("Error sending email: ", error.message);
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
            error: "Unable to send email."
        }
    }
}