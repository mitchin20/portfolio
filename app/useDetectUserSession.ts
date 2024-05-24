import { getSessionStorage } from "@/helpers/sessionStorage";

export async function detectUserSession() {
    const userSession = getSessionStorage('user', '');

    if (!userSession) {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/removeCookie`);
        } catch (error) {
            console.error("Error removing cookie:", error);
        }
    }
}