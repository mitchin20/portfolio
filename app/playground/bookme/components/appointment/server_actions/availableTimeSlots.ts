'use server';

interface getAvailableTimeSlotsProps {
    technicianId: number;
    selectedDate: string;
}

export async function getAvailableTimeSlots({
    technicianId,
    selectedDate
}: getAvailableTimeSlotsProps) {
    if (!technicianId || !selectedDate) {
        return {
            success: false,
            message: "Missing technician ID or date, Not available",
            data: null,
        }
    }

    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/availableTimeSlot?technicianId=${technicianId}&selectedDate=${selectedDate}`)

        if (!result.ok) {
            const json = await result.json();
            return {
                success: json.success,
                message: json.message,
                data: json.data
            }
        }

        const json = await result.json();

        return {
            success: json.success,
            message: json.message,
            data: json.data
        }
    } catch (error) {
        return {
            success: false,
            message: `Error fetching available time slots: ${error}`,
            data: null,
        }
    }
}