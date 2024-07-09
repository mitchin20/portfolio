'use server';

async function fetchEmployeeById(employeeId: number) {
    
}

export async function appointmentFormAction(
    prevState: any,
    formData: FormData,
) {  
    const services = formData.getAll("services");
    const employeeId = formData.get("appointmentWith")

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/employee?employeeId=${Number(employeeId)}`)

        const json = await response.json();

        if (!response.ok) {
            return {
                success: json.success,
                message: "Unable to fetch employee data"
            }
        }

        const employee = json.data;
        
        const appointmentData = {
            subject: "Appointment",
            technicianId: employeeId,
            technicalName: employee.fullName,
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

    } catch (error) {
        console.error("Failed to fetch employee: ", error);
        return {
            success: true,
            message: "Appointment has confirmed.",
        }
    }
    
}