import { render } from "@react-email/render";
import WelcomeEmail from "@/emails/welcomeEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailResponse {
    userName: string;
    email: string;
    code: string;
}

export async function sendVerificationEmail({
    userName,
    email,
    code
}: EmailResponse){
    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio <noreply@insightlabs.dev>",
            to: [email],
            subject: "Verification",
            html: render(WelcomeEmail({
                userFirstname: userName,
                email: email,
                code: code
            })),
            reply_to: email,
        })

        if (error) {
            console.error("Error sending email: ", error.message);
            return {
                success: false,
                data: null,
                error: error.message,
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