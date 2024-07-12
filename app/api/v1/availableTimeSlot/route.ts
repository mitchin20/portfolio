import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { generateTimeSlots } from "@/helpers/generateTimeSlots";

interface ScheduledTimes {
    startTime: Date;
}

function getAvailableTimeSlots(scheduledTimes: ScheduledTimes[]) {
    const startTime = 9;
    const endTime = 18;
    const interval = 60;
    const timeSlots = generateTimeSlots(startTime, endTime, interval);
    const scheduledTimeStrings = scheduledTimes.map(st => new Date(st.startTime).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    }));

    const availableTimeSlots = timeSlots.filter(slot => !scheduledTimeStrings.includes(slot.time));

    return availableTimeSlots;
}

async function getUnavailableTimeSlot(technicianId: number, selectedDate: string) {
    const unavailableTimes = await prisma.appointment.findMany({
        where: {
            technicianId: technicianId,
            selectedDate: selectedDate
        },
        select: {
            startTime: true,
        }
    })

    return unavailableTimes || null;
}

export async function GET(req: NextRequest) {
    // const body = await req.json();
    // const { technicianId, selectedDate } = body;
    const searchParams = req.nextUrl.searchParams;
    const technicianId = searchParams.get("technicianId");
    const selectedDate = searchParams.get("selectedDate");

    if (!technicianId || !selectedDate) {
        return NextResponse.json({
            success: false,
            message: "Missing technician ID or date",
            data: null
        })
    }

    const scheduledTimes = await getUnavailableTimeSlot(Number(technicianId), String(selectedDate))

    if (!scheduledTimes) {
        return NextResponse.json({
            success: false,
            message: "Unable to get scheduled times",
            data: null
        })
    }
    const availableScheduleTimes = getAvailableTimeSlots(scheduledTimes);

    return NextResponse.json({
        success: true,
        message: "Successfully fetch available time slots",
        data: availableScheduleTimes,
    })
}