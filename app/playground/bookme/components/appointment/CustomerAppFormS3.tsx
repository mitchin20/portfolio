'use client';

import React, { useEffect, useState } from "react";
import { 
    Checkbox,
    FormControl,
    FormLabel,
    FormControlLabel, 
    Grid, 
    TextField,
    RadioGroup,
    Radio,
    Chip,
} from '@mui/material';
import { servicesData } from '../../datasource';

interface Service {
    id: number;
    name: string;
    type: string;
}

const CustomerAppFormS3 = () => {
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [selectedType, setSelectedType] = useState<string>('All');
    const [filteredServices, setFilterServices] = useState<Service[]>([]);
    const [serviceTypes, setServiceTypes] = useState<string[]>([])

    // Handle user select filter services by type
    const handleFilterServicesByType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    }

    // Handle filtered services
    useEffect(() => {
        if (selectedType !== "All") {
            const filteredData = servicesData.filter(s => s.type === selectedType);
            setFilterServices(filteredData);
        } else {
            setFilterServices(servicesData);
        }
    }, [selectedType])

    // Handle remove selected services
    const handleRemoveSeletedServices = (serviceName: string) => {
        const newList = selectedServices.filter(ss => ss.name !== serviceName)
        setSelectedServices(newList);
    }

    // Getting service type from data list
    useEffect(() => {
        if (servicesData) {
            const types = servicesData.flatMap(s => s.type);
            types.push(...types, "All");
            if (types) {
                setServiceTypes(Array.from(new Set(types)).sort());
            }
        }
    }, [])

    // Handle user selecting services.
    const handleSelectedService = (event: React.ChangeEvent<HTMLInputElement>, service: Service) => {
        if (event.target.checked) {
            // add service to array if checked
            setSelectedServices([...selectedServices, service]);
        } else {
            // remove service if unchecked
            setSelectedServices(selectedServices.filter(s => s !== service));
        }
    }

    return (
        <div>
            <div>
                <label className="text-blue-900 font-semibold">
                    Services selection
                </label>

                <div className="ml-5">
                    <FormControl>
                        <FormLabel
                            id="filter-by-service-category"
                            className="mt-3"
                        >
                            Filter by Service Category
                        </FormLabel>
                        <RadioGroup
                            onChange={handleFilterServicesByType}
                        >
                            <Grid container>
                                {serviceTypes.map((type, index) => (
                                    <Grid item key={index}>
                                        <FormControlLabel 
                                            value={type}
                                            label={type}
                                            control={
                                                <Radio 
                                                    checked={selectedType === type}
                                                />
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                </div>

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
                    {filteredServices?.map((service, index) => (
                        <Grid
                            key={index}
                            item
                            xs={2}
                        >
                            <div
                                className="text-blue-500 mt-5 mb-5"
                            >
                                <FormControlLabel 
                                    label={service.name}
                                    value={service.name}
                                    name="services"
                                    control={
                                        <Checkbox 
                                            checked={selectedServices.some(s => s.id === service.id)}
                                            onChange={(event) => {handleSelectedService(event, service)}}
                                        />
                                    }
                                />
                            </div>
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