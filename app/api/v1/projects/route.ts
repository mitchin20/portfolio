import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
    try {
        const projects = await prisma.project.findMany();

        return NextResponse.json({ projects });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch projects",
            error: error
        })
    }
}