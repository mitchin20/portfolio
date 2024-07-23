'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { appointmentFormAction } from './server_actions/appointmentFormAction';
import CustomerAppFormS1 from './CustomerAppFormS1';
import CustomerAppFormS2 from './CustomerAppFormS2';
import CustomerAppFormS3 from './CustomerAppFormS3';
import { Alert, Box, Divider, Modal, Typography } from '@mui/material';
import AppointmentDetail from './AppointmentDetail';
import LoadingButton from '@mui/lab/LoadingButton';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        background: 'linear-gradient(to right, white, #b9f1a2)',
        zIndex: -1,
        borderRadius: '10px',
    },
};

const initialState = {
    success: false,
    message: '',
    data: []
}

interface AppointmentDetailProps {
    id: number;
    subject: string;
    technicianId: number;
    technicianName: string;
    customerName: string;
    nickName: string;
    customerPhone: string;
    customerEmail: string;
    selectedDate: string;
    selectedTime: string;
    services: string[];
    note: string;
    endTime: Date;
    startTime: Date;
}

interface TechnicianProps {
    id: number;
    fullName: string;
}

const AppointmentForm = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [technicianId, setTechnicianId] = useState<number| null>(null);
    const [appointmentDetail, setAppointmentDetail] = useState<AppointmentDetailProps | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);

    const [formState, formAction] = useFormState(appointmentFormAction, initialState);

    const handleCloseModal = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (formState.success) {
            const data = formState.data;
            const startTime = new Date(Date.parse(data.startTime));

            setAppointmentDetail({
                ...data,
                startTime: startTime
            });
            setOpen(true);
        }
        
    }, [formState])

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {!formState.success && formState.message !== "" && (
                <Alert severity="error">
                    {formState.message}
                </Alert>
            )}

            <div className="mt-3 px-40 sm:w-full">
                <form
                    ref={ref}
                    className="space-y-6"
                    action={formAction}
                >
                    <CustomerAppFormS1 setTechnicianId={setTechnicianId} />
                    
                    <CustomerAppFormS2 
                        technicianId={technicianId}
                    />
                    
                    <CustomerAppFormS3 />

                    <div>
                        <SubmitAppointmentButton />
                    </div>
                </form>
            </div>

            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    sx={style}
                >
                    <Typography 
                        id='modal-modal-title' 
                        variant='h6' 
                    >
                        Appointment detail
                    </Typography>
                    <Divider className='mt-3 mb-3' />

                    <AppointmentDetail appointmentDetail={appointmentDetail} />
                </Box>
            </Modal>
        </div>
    )
}

function SubmitAppointmentButton() {
    const { pending } = useFormStatus();
    return (
        <LoadingButton
            type="submit"
            disabled={pending}
            loading={pending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Create Appointment
        </LoadingButton>
    )
}

export default AppointmentForm;