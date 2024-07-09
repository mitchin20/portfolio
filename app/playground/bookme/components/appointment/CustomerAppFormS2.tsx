'use client';

import React, { useState } from "react";
import { 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    Radio, 
    RadioGroup, 
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { generateTimeSlots } from '../helper';
import dayjs, { Dayjs } from "dayjs";

interface CustomerAppFormProps {
    technician: string;
}

const CustomerAppFormS2 = ({
    technician,
}: CustomerAppFormProps) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs);
    // TODO: 
    // Based on selectedDate
    // Make an API call to check for available date from DB
    // ...

    // Handle user select date
    const handleSelectDate = (value: Dayjs | null) => {
        if (value) {
            setSelectedDate(value);
        }
    }

    // Mock data
    const startTime = 9;
    const endTime = 18;
    const interval = 30;

    const timeSlots = generateTimeSlots(startTime, endTime, interval);
    return (
        <div>
            <div className='mt-5'>
                <label className="text-blue-900 font-semibold">
                    Select your appointment time
                </label>
                <div className='mt-2 w-1/3 ml-5'>
                    <LocalizationProvider 
                        dateAdapter={AdapterDayjs}
                    >
                        <DemoContainer
                            components={['DateTimePicker']}
                        >
                            <DatePicker 
                                disabled={!technician}
                                name="selectedDate"
                                onChange={handleSelectDate}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
            <div className='mt-5'>
                <FormControl>
                    <FormLabel className="text-blue-900 font-semibold">
                        Available Time Slots
                    </FormLabel>
                    <RadioGroup
                        name="selectedTime"
                    >
                        <Grid container className="ml-5">
                            {timeSlots.map((ts, index) => (
                                <Grid 
                                    key={index}
                                    item 
                                    xs={3}
                                >
                                    <FormControlLabel 
                                        value={ts.time}
                                        control={<Radio />}
                                        label={ts.time}
                                        disabled={!technician}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}

export default CustomerAppFormS2;