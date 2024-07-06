'use client';

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { appointmentFormAction } from './appointmentFormAction';
import CustomerAppFormS1 from './CustomerAppFormS1';
import CustomerAppFormS2 from './CustomerAppFormS2';
import CustomerAppFormS3 from './CustomerAppFormS3';

const initialState = {
    success: false,
    message: ''
}

const AppointmentForm = () => {
    const [technician, setTechnician] = useState<string>("");

    const [formState, formAction] = useFormState(appointmentFormAction, initialState);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-3 px-40 sm:w-full">
                <form 
                    className="space-y-6"
                    action={formAction}
                >
                    <CustomerAppFormS1 setTechnician={setTechnician} />
                    
                    <CustomerAppFormS2 technician={technician} />
                    
                    <CustomerAppFormS3 />

                    <div>
                        <SubmitAppointmentButton />
                    </div>
                </form>
            </div>
        </div>
    )
}

function SubmitAppointmentButton() {
    return (
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Create Appointment
        </button>
    )
}

export default AppointmentForm;