"use client";

import React, { SyntheticEvent, useState } from 'react';
import {
    Day, Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop, WorkWeek, PopupOpenEventArgs
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import { timelineResourceData, technicianData } from "./datasource";
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

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJyWmFZfVpgdVdMY1xbR35PIiBoS35RckVlWXhfcndVRWheUUJ2")

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
    const [tabValue, setTabValue] = useState('1');
    const eventSettings: EventSettingsModel = { 
        dataSource: timelineResourceData,
        template: eventTemplate as any
    };

    // Tab handler
    const handleTabChange = (event: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    }
    // End tab handler

    // Quick Info Templates
    const content = (props: EventData) => {
        return (
            <div>
                {props.elementType === "cell" ? null : (
                    <div className="quick-info-content p-3">
                        <div className="mb-2">
                            <div>
                                <b>Technician:</b> {technicianData.find(t => t.id === props.TechnicianId)?.name}
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
    const onPopupOpen = (args: PopupOpenEventArgs): void => {
        if (args.type === 'QuickInfo' && args.target && args.target.classList.contains('e-work-cells')) {
          args.cancel = true;
        }
    };

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
                                    dataSource={technicianData}
                                    textField='text'
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