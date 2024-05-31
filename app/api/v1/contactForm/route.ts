import validateEmail from "@/helpers/validateEmail";
import { sendContactEmail } from "@/lib/contactEmailService";
import { ratelimit } from "@/ratelimit/ratelimit";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const ip = headers().get('x-forwarded-for');
        const { remaining, limit, success } = await ratelimit.limit(ip!);

        if (!success) {
            return Response.json({
                success: false,
                message: "Limit reached. Please come back later."
            }, {
                status: 400
            })
        }

        const body = await req.json();

        const { name, email, message } = body;
    
        // validate email
        const validatedEmail = validateEmail(email);
        if (!validatedEmail) {
            return Response.json({
                success: false,
                message: "Invalid email"
            }, {
                status: 400
            })
        }

        // Send contact email
        const emailResponse = await sendContactEmail({
            name,
            email,
            message
        })

        if (!emailResponse.success) {
            return Response.json({
                success: emailResponse.success,
                message: emailResponse.error
            }, {
                status: 400
            })
        }

        console.log("email response data:", emailResponse.data);

        return Response.json({
            success: true,
            message: "Successfully sent request."
        }, {
            status: 200
        })
    } catch (error) {
        console.error("Failed to send request.", error);
        return Response.json({
            success: false,
            message: "Failed to send request."
        }, {
            status: 400
        })
    }
}