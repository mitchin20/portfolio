'use client';

import React, { useEffect, useState } from "react";
import { 
    Checkbox,
    Grid, 
    TextField,
    Chip,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { servicesData } from '../../datasource';

interface Service {
    id: number;
    name: string;
    type: string;
}

interface GroupedServices {
    [key: string]: Service[];
}

const CustomerAppFormS3 = () => {
    const [groupedBySerType, setGroupedBySerType] = useState<GroupedServices>({});
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);

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

    // Handle remove selected services
    const handleRemoveSeletedServices = (serviceName: string) => {
        const newList = selectedServices.filter(ss => ss.name !== serviceName)
        setSelectedServices(newList);
    }

    return (
        <div>
            <div>
                <label className="text-blue-900 font-semibold">
                    Services selection
                </label>

                <div className="ml-5 mt-2">
                    {selectedServices.length > 0 && (
                        <div>
                            <div className="text-orange-700 text-sm">
                                You have selected the following services for your appointment.
                            </div>
                            <div>
                                { selectedServices && selectedServices.map((ss, index) => (
                                    <Chip 
                                        key={index}
                                        label={ss.name}
                                        className="mr-2 text-green-700"
                                        onDelete={() => handleRemoveSeletedServices(ss.name)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Grid container className="ml-5">
                    {Object.keys(groupedBySerType).map(type => (
                        <Grid
                            key={type}
                            xs={Math.floor(12 / Object.keys(groupedBySerType).length)}
                        >
                            <Typography>
                                {type}
                            </Typography>
                            <List>
                                {groupedBySerType[type].map((service, index) => (
                                    <ListItem key={index}>
                                        <ListItemButton
                                            onClick={() => handleSelectedService(service)}
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    name="services"
                                                    value={service.name}
                                                    edge="start"
                                                    checked={selectedServices.some(s => s.id === service.id)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={service.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div>
                <label
                    className="text-blue-900 font-semibold"
                >
                    Note:
                </label>
                <div className='w-full'>
                    <TextField 
                        name='note'
                        multiline 
                        minRows={3} 
                        maxRows={5} 
                        fullWidth 
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomerAppFormS3;