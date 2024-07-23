"use client";

import React, { SyntheticEvent, useState, useEffect } from 'react';
import {
    Day, Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop, WorkWeek, PopupOpenEventArgs
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import { 
    Box,
    Tabs,
    Tab
} from '@mui/material';
import {
    TabContext,
    TabPanel,
} from '@mui/lab';
import AppointmentForm from './components/appointment/AppointmentForm';
import { getAppointments } from './appointmentsAction';
import { getEmployees } from './components/appointment/server_actions/employees';
import { editorTemplate } from './components/editorTemplate/editorTemplate';
import { onPopupOpen } from './components/editorTemplate/editorTemplate';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJyWmFZfVpgdVdMY1xbR35PIiBoS35RckVlWXhfcndVRWheUUJ2")

interface Appointment {
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

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    color: string;
    phone: string;
    email: string;           
}

// Define the type for the event data
interface EventData {
    elementType: string;
    Id: number;
    CustomerName: string;
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    TechnicianId: number;
    Services: string[];
    Note: string;
    [key: string]: any;
}

// Define the event template
const eventTemplate = (props: EventData): JSX.Element => {
    return (
        <div className="template-wrap">
            <div>{props.CustomerName}</div>
            <div> Appointment for:
                {props.Services.map((service, index) => (
                    <li key={index}>
                        {service}
                    </li>
                ))}
            </div>
            <div className="note">Note: {props.Note}</div>
        </div>
    );
};

const Bookme = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [tabValue, setTabValue] = useState('1');

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const resApp = await getAppointments();
                const resEmp = await getEmployees();

                setAppointments(resApp.data);
                setEmployees(resEmp.employees);
            } catch (error) {
                console.error("Failed to fetch data: ", error);
            }
        }

        handleFetch();
    }, [])

    // Tab handler
    const handleTabChange = (event: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    }
    // End tab handler

    const parseDateUTC = (dateString: string): Date => {
        const [date, time] = dateString.split('T');
        const [year, month, day] = date.split('-');
        const [hours, minutes, seconds] = time.split(':');
        const newDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));

        return newDate;
    };

    const mappedResourceData = appointments.map(appointment => ({
        Id: appointment.id,
        Subject: appointment.subject,
        CustomerName: appointment.customerName,
        TechnicianId: appointment.technicianId,
        Services: appointment.services,
        Note: appointment.note,
        StartTime: parseDateUTC(appointment.startTime.toString()),
        EndTime: parseDateUTC(appointment.endTime.toString())
    }))

    const eventSettings: EventSettingsModel = { 
        dataSource: mappedResourceData,
        template: eventTemplate as any
    };

    // Quick Info Templates
    const content = (props: EventData) => {
        return (
            <div>
                {props.elementType === "cell" ? null : (
                    <div className="quick-info-content p-3">
                        <div className="mb-2">
                            <div>
                                <b>Technician:</b> {employees.find(t => t.id === props.TechnicianId)?.fullName}
                                <br />
                                <b>Customer:</b> {props.CustomerName}
                            </div>
                        </div>
                        <div className='mb-2'>
                            {props.StartTime.toLocaleDateString()} ({props.StartTime.toLocaleTimeString()} - {props.EndTime.toLocaleTimeString()})
                        </div>
                        <div className="mb-2"><b>Services:</b> {props.Services?.map((service, index) => (
                            <li 
                                key={index}
                                className="ml-5"
                            >
                                {service}
                            </li>
                        ))}</div>
                        <div><b>Note:</b> {props.Note}</div>
                    </div>
                )}
            </div>
        )
    }

    // Prevent quick info popup from opening when there is no data
    // const onPopupOpen = (args: PopupOpenEventArgs): void => {
    //     if (args.type === 'QuickInfo' && args.target && args.target.classList.contains('e-work-cells')) {
    //       args.cancel = true;
    //     }
    // };

    const quickInfoTemplates = {
        content: content.bind(this)
    }
    // End Quick Info Templates

    return (
        <div>
            <h2 className='mb-5'>
                Book Me with Syncfusion React Schedule Component.
            </h2>

            <Box
                className="w-full"
            >
                <TabContext
                    value={tabValue}
                >
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label='wrapped label tabs'
                        variant='fullWidth'
                    >
                        <Tab
                            value='1'
                            label='Admin View'
                        />
                        <Tab
                            value='2'
                            label='Customer Appointment Form'
                        />
                    </Tabs>
                    <TabPanel
                        value='1'
                    >
                        <ScheduleComponent
                            width='100%'
                            height='650px'
                            currentView='Day'
                            eventSettings={eventSettings}
                            // readonly
                            group={{ 
                                resources: ['Technicians']
                            }}
                            quickInfoTemplates={quickInfoTemplates}
                            popupOpen={onPopupOpen}
                            startHour='08:00'
                            endHour='20:00'
                            editorTemplate={editorTemplate}
                        >
                            <ViewsDirective>
                                <ViewDirective option='Day' />
                                <ViewDirective option='Week' />
                                <ViewDirective option='Month' />
                                <ViewDirective option='Agenda' />
                            </ViewsDirective>
                            <ResourcesDirective>
                                <ResourceDirective
                                    field='TechnicianId'
                                    title='Technician'
                                    name='Technicians'
                                    allowMultiple={true}
                                    dataSource={employees}
                                    textField='fullName'
                                    idField='id'
                                    colorField='color'
                                />
                            </ResourcesDirective>
                            <Inject 
                                services={[
                                    Day,
                                    Week,
                                    WorkWeek,
                                    Month,
                                    Agenda,
                                    Resize,
                                    DragAndDrop
                                ]}
                            />
                        </ScheduleComponent>
                    </TabPanel>
                    <TabPanel
                        value='2'
                    >
                        <AppointmentForm />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Bookme;