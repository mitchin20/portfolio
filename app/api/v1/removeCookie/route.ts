import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        cookies().delete('Authorization');
        return Response.json({
            success: true
        }, {
            status: 200
        })
    } catch (error) {
        console.error("Unable to remove cookie: ", error);
        return Response.json({
            success: false
        }, {
            status: 400
        })
    }
}