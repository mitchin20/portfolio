'use client';

import React, { useEffect, useState } from "react";
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
import { getAvailableTimeSlots } from "./server_actions/availableTimeSlots";

interface CustomerAppFormProps {
    technicianId: number | null;
}

interface AvailableTimesProps {
    id: number;
    time: string;
}

const CustomerAppFormS2 = ({
    technicianId,
}: CustomerAppFormProps) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [availableTimes, setAvailableTimes] = useState<AvailableTimesProps[]>([]);

    // Based on selectedDate & technician ID
    // Make an API call to check for available time slot from DB
    useEffect(() => {
        if (!technicianId || !selectedDate) return;

        const date = selectedDate ? selectedDate.format('MM/DD/YYYY') : null;
        const handleFetch = async () => {
            if (technicianId && date) {
                const result = await getAvailableTimeSlots({technicianId, selectedDate: date});

                setAvailableTimes(result?.data);
            }
        }

        if (technicianId && date) {
            handleFetch();
        }
    }, [technicianId, selectedDate])

    // Handle user select date
    const handleSelectDate = (value: Dayjs | null) => {
        setSelectedDate(value);
    }

    return (
        <div>
            <div className='mt-5'>
                <label className="text-blue-900 font-semibold">
                    Select your appointment date
                </label>
                <div className='mt-2 w-1/3 ml-5'>
                    <LocalizationProvider 
                        dateAdapter={AdapterDayjs}
                    >
                        <DemoContainer
                            components={['DateTimePicker']}
                        >
                            <DatePicker 
                                disabled={!technicianId}
                                name="selectedDate"
                                onChange={handleSelectDate}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
            {selectedDate?.isValid() && availableTimes.length > 0 && (
                <div className='mt-5'>
                    <FormControl>
                        <FormLabel
                            className="text-blue-900 font-semibold"
                        >
                            Available Time Slots
                        </FormLabel>
                        <RadioGroup
                            name="selectedTime"
                        >
                            <Grid container className="ml-5">
                                {availableTimes.map((ts, index) => (
                                    <Grid 
                                        key={index}
                                        item 
                                        xs={3}
                                    >
                                        <FormControlLabel 
                                            value={ts.time}
                                            control={<Radio />}
                                            label={ts.time}
                                            disabled={!selectedDate.isValid()}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                </div>
            )}
        </div>
    )
}

export default CustomerAppFormS2;