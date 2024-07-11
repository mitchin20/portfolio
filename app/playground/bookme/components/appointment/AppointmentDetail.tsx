import React from "react";
import { Typography, List, ListItem, ListItemText } from '@mui/material';

interface AppointmentDetail {
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

interface AppointmentDetailProps {
    appointmentDetail: AppointmentDetail | undefined;
}

const AppointmentDetail = ({
    appointmentDetail
}: AppointmentDetailProps) => {
    if (!appointmentDetail) {
        return <div>No appointment details available.</div>
    }

    return (
        <div>
            {appointmentDetail && (
                <div
                    id="modal-modal-description"
                >
                    <Typography
                        className="mb-2"
                    >
                        Hi {appointmentDetail.customerName},
                    </Typography>
                    <Typography variant='body2'>
                        Thank you for scheduling an appointment with us.
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText 
                                primary="With"
                                secondary={appointmentDetail.technicianName}
                            />
                            <ListItemText 
                                primary="On"
                                secondary={appointmentDetail.startTime.toLocaleString('en-US', {
                                    weekday: 'short',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    timeZone: 'UTC'
                                })}
                                sx={{ 
                                    marginRight: '16px', 
                                    marginLeft: '16px'
                                }}
                            />
                            <ListItemText 
                                primary="At"
                                secondary={appointmentDetail.startTime.toLocaleString('en-US', {
                                    timeStyle: 'short',
                                    timeZone: 'UTC'
                                })}
                            />
                        </ListItem>
                    </List>
                    <Typography
                        variant='body2'
                    >
                        Appointment For
                    </Typography>
                    {appointmentDetail.services.map((s, index) => (
                        <li 
                            key={index}
                            className='text-sm ml-5'
                        >
                            {s}
                        </li>
                    ))}
                    <Typography variant='body2'>
                        {appointmentDetail.note}
                    </Typography>

                    <Typography variant='body2' className='mt-4'>
                        Thank you
                    </Typography>
                    <Typography variant='body2'>
                        See you soon
                    </Typography>
                </div>
            )}
        </div>
    )
}

export default AppointmentDetail;