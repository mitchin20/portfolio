interface TimeSlots {
    id: number;
    time: string;
}

export const generateTimeSlots = (startTime: number, endTime: number, interval: number) => {
    const timeSlots: TimeSlots[] = [];
    let currentTime = new Date();
    currentTime.setHours(startTime, 0, 0, 0);

    const end = new Date();
    end.setHours(endTime, 0, 0, 0);

    let id = 0;
    while (currentTime <= end) {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const time = `${hours % 12 || 12}:${minutes} ${hours < 12 ? 'AM' : 'PM'}`
        timeSlots.push({id: id++, time});
        currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    return timeSlots;
}