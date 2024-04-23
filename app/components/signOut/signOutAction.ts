"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface signOutAction {
    currentPath: string
}

export async function signOutAction({
    currentPath
}: signOutAction) {
    const cookie = cookies().delete("Authorization");

    if (cookie) {
        console.error("Log out failed.");
        return {
            success: false,
            message: "Log out failed."
        }
    }

    if (currentPath === "/") {
        redirect('/signin')
    } else {
        redirect("/");
    }

}
