"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOutAction() {
    const cookie = cookies().delete("Authorization");

    if (cookie) {
        console.error("Log out failed.");
        return {
            success: false,
            message: "Log out failed."
        }
    }

    redirect("/");
}
