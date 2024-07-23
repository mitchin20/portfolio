import { PopupOpenEventArgs } from "@syncfusion/ej2-react-schedule";

export const onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === 'Editor') {
        let customerNameElement: HTMLInputElement = args.element.querySelector('#customerName') as HTMLInputElement;
        if (customerNameElement) {
            customerNameElement.value = (args.data as { [key: string]: Object }).customerName as string || "";
        }

        let nickNameElement: HTMLInputElement = args.element.querySelector('#nickName') as HTMLInputElement;
        if (nickNameElement) {
            nickNameElement.value = (args.data as { [key: string]: Object }).nickName as string || "";
        }

        let phoneElement: HTMLInputElement = args.element.querySelector('#phone') as HTMLInputElement;
        if (phoneElement) {
            phoneElement.value = (args.data as { [key: string]: Object }).phone as string || "";
        }

        let emailElement: HTMLInputElement = args.element.querySelector('#email') as HTMLInputElement;
        if (emailElement) {
            emailElement.value = (args.data as { [key: string]: Object }).email as string || "";
        }

        let appointmentWithElement: HTMLInputElement = args.element.querySelector('#appointmentWith') as HTMLInputElement;
        if (appointmentWithElement) {
            appointmentWithElement.value = ((args.data as { [key: string]: Object }).appointmentWith as number | null)?.toString() || '';
        }

        let datePickerElement: HTMLInputElement = args.element.querySelector('#datepicker') as HTMLInputElement;
        if (datePickerElement) {
            datePickerElement.value = (args.data as { [key: string]: Object }).datepicker as string || "";
        }

        let selectedTimeElement: HTMLInputElement = args.element.querySelector('#selectedTime') as HTMLInputElement;
        if (selectedTimeElement) {
            selectedTimeElement.value = (args.data as { [key: string]: Object }).selectedTime as string || "";
        }

        let servicesElement: NodeListOf<HTMLInputElement> = args.element.querySelectorAll('input[name="services"]');
        servicesElement.forEach(selected => {
            if ((args.data as {[key: string]: any}).services && (args.data as {[key: string]: any}).services.includes(selected.value)) {
                selected.checked = true;
            }
        })

        let noteElement: HTMLInputElement = args.element.querySelector('#note') as HTMLInputElement;
        if (noteElement) {
            noteElement.value = (args.data as { [key: string]: Object }).note as string || "";
        }
    }
}