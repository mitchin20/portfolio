'use client';

import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { PopupOpenEventArgs, PopupCloseEventArgs } from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { getAvailableTimeSlots } from "../appointment/server_actions/availableTimeSlots";
import { getEmployees } from "../appointment/server_actions/employees";
import { servicesData } from "../../datasource";
import { 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    Radio, 
    RadioGroup,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
} from '@mui/material';

export const onPopupOpen = (args: PopupOpenEventArgs): void => {

}

export const onPopupClose = (args: PopupCloseEventArgs): void => {

}

interface AvailableTimesProps {
    id: number;
    time: string;
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

interface Service {
    id: number;
    name: string;
    type: string;
}

interface GroupedServices {
    [key: string]: Service[];
}



export const editorTemplate = (props: Object): JSX.Element => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [availableTimes, setAvailableTimes] = useState<AvailableTimesProps[]>([]);
    const [groupedBySerType, setGroupedBySerType] = useState<GroupedServices>({});
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [technicianId, setTechnicianId] = useState<number| null>(null);

    useEffect(() => {
        const getAllEmployees = async () => {
            const res = await getEmployees();
            if (res) {
                setEmployees(res.employees);
            }
        }

        getAllEmployees();
    }, [])

    useEffect(() => {
        if (!technicianId || !selectedDate) return;

        const date = selectedDate ? dayjs(selectedDate).format('MM/DD/YYYY') : null;
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

    // Group services by type
    useEffect(() => {
        const handleGroupedByServiceTYpe = () => {
            const groupedByType: GroupedServices = servicesData.reduce<GroupedServices>((acc, obj) => {
                if (!acc[obj.type]) {
                    acc[obj.type] = [];
                }

                acc[obj.type].push(obj)

                return acc;
            }, {} as GroupedServices)

            setGroupedBySerType(groupedByType);
        }

        handleGroupedByServiceTYpe();
    }, [servicesData])

    const handleSelectedService = (value: Service) => {
        setSelectedServices(prevSelectedServices => {
            if (prevSelectedServices.some(s => s.id === value.id)) {
                // Service is already selected, so remove it
                return prevSelectedServices.filter(s => s.id !== value.id);
            } else {
                // Service is not selected, so add it
                return [...prevSelectedServices, value];
            }
        });
    }

    const handleSelectDate = (event: any) => {
        setSelectedDate(event.value);
    }

    // Handle user selecting technician
    const handleSelectTechnician = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTechnicianId(Number(event.target.value));
    }

    return (
        props !== undefined ? <table className="custom-event-editor">
            <tbody>
                <tr>
                    <td className="e-textlabel">Full Name:</td>
                    <td colSpan={4}>
                        <input id="customerName" className="e-input" type="text" value="" name="customerName"/>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Nick Name:</td>
                    <td colSpan={4}>
                        <input id="nickName" className="e-input" type="text" value="" name="nickName"/>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Phone:</td>
                    <td colSpan={4}>
                        <input id="phone" className="e-input" type="text" value="" name="phone"/>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Email:</td>
                    <td colSpan={4}>
                        <input id="email" className="e-input" type="email" value="" name="email"/>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Technician:</td>
                    <td colSpan={4}>
                        <FormControl size="small">
                            <RadioGroup
                                aria-label="radio group"
                                name="appointmentWith"
                                onChange={handleSelectTechnician}
                                id="AppointmentWith"
                            >
                                {employees.map((employee, index) => (
                                    <FormControlLabel 
                                        key={index}
                                        value={employee.id}
                                        control={<Radio size="small" />}
                                        label={employee.fullName}
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '11px'
                                            }
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel mr-5">Date:</td>
                    <td colSpan={4}>
                        <DatePickerComponent 
                            id="datepicker"
                            placeholder="Select Date"
                            onChange={handleSelectDate}
                        />
                    </td>
                </tr>
                <tr>
                    {availableTimes.length > 0 && (
                        <>
                            <td className="e-textlabel">Available Times:</td>
                            <td colSpan={4}>
                                <div className='mt-5'>
                                    <FormControl>
                                        <RadioGroup
                                            name="selectedTime"
                                            id="selectedTime"
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
                                                            control={<Radio size="small" />}
                                                            label={ts.time}
                                                            sx={{
                                                                '& .MuiFormControlLabel-label': {
                                                                    fontSize: '11px'
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                        </>
                    )}
                </tr>
                <tr>
                    <td className="e-textlabel">Services:</td>
                    <td colSpan={4}>
                        <Grid container className="mt-2" spacing={1}>
                            {Object.keys(groupedBySerType).map(type => (
                                <Grid
                                    key={type}
                                    xs={4}
                                >
                                    <Typography fontSize="small">
                                        {type}
                                    </Typography>
                                    <List>
                                        {groupedBySerType[type].map((service, index) => (
                                            <ListItem 
                                                key={index} 
                                                dense
                                                sx={{
                                                    paddingTop: '0px',
                                                    paddingBottom: '0px',
                                                }}
                                            >
                                                <ListItemButton
                                                    onClick={() => handleSelectedService(service)}
                                                    dense
                                                    sx={{
                                                        '& .MuiListItemIcon-root': {
                                                            minWidth: 0
                                                        }
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            name="services"
                                                            value={service.name}
                                                            edge="start"
                                                            checked={selectedServices.some(s => s.id === service.id)}
                                                            size="small"
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText 
                                                        primary={service.name} 
                                                        sx={{
                                                            '& .MuiListItemText-primary': {
                                                                fontSize: '10px'
                                                            }
                                                        }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            ))}
                        </Grid>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Note:</td>
                    <td colSpan={4}>
                        <textarea id="note" className="e-input" name="note" rows={3} cols={50} />
                    </td>
                </tr>
            </tbody>
        </table> : <div></div>
    )
}