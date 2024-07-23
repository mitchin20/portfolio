import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

async function getAppointments() {
    const appointments = await prisma.appointment.findMany();

    return appointments || null;
}

export async function GET(req: Request) {
    try {
        const appointments = await getAppointments();

        return NextResponse.json({
            success: true,
            message: "Successfully fetched appointments.",
            data: appointments
        })
    } catch (error) {
        console.error("Failed to fetch appointments.")
        return NextResponse.json({
            success: false,
            message: "Failed to fetch appointments.",
            data: null
        })
    }
}