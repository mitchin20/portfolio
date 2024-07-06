'use server';

export async function appointmentFormAction(
    prevState: any,
    formData: FormData,
) {  
    const services = formData.getAll("services");

    const appointmentData = {
        subject: "Appointment",
        technicianId: formData.get("appointmentWith"),
        technicalName: "", // get technician name from db
        customerName: formData.get("fullName"),
        nickName: formData.get("nickName"),
        customerPhone: formData.get("phoneNumber"),
        customerEmail: formData.get("email"),
        selectedDate: formData.get("selectedDate"),
        selectedTime: formData.get("selectedTime"),
        services: services,
        note: formData.get("note"),
    }

    console.log(appointmentData);


    // const data = {
    //     customerName: formData.get("fullName"),
    //     nickName: formData.get("nickName"),

    // }
    return {
        success: true,
        message: "Appointment has confirmed.",
    }
}