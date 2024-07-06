import React from "react";
import { 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    Radio, 
    RadioGroup, 
} from '@mui/material';
import { technicianData } from "../../datasource";

interface CustomerAppFormS1Props {
    setTechnician: (value: string) => void;
  }

const CustomerAppFormS1 = ({
    setTechnician
}: CustomerAppFormS1Props) => {
    // Handle user selecting technician
    const handleSelectTechnician = (event: any) => {
        setTechnician(event.target.value);
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={8}>
                <div>
                    <label className="text-blue-900 font-semibold">Full Name</label>
                    <div className="mt-2 mb-2">
                        <input 
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="fullName"
                            placeholder='Enter your full name here...'
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-blue-900 font-semibold">Nick Name</label>
                    <div className="mt-2 mb-2">
                        <input 
                            id="nickName"
                            name="nickName"
                            type="text"
                            autoComplete="nickName"
                            placeholder='Optional'
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-blue-900 font-semibold mt-2">Phone Number</label>
                    <div className="mt-2 mb-2">
                        <input 
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            autoComplete="phoneNumber"
                            placeholder='(123) 123-1234'
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-blue-900 font-semibold">Email</label>
                    <div className="mt-2 mb-2">
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder='example@email.com'
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                    </div>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div>
                    <FormControl>
                        <FormLabel className="text-blue-900 font-semibold">Appointment With</FormLabel>
                        <RadioGroup
                            aria-label="radio group"
                            name="appointmentWith"
                            onChange={handleSelectTechnician}
                        >
                            <FormControlLabel 
                                key='any'
                                value='any'
                                control={<Radio />}
                                label='any'
                            />
                            {technicianData.map((tech, index) => (
                                <FormControlLabel 
                                    key={index}
                                    value={tech.id}
                                    control={<Radio />}
                                    label={tech.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </div>
            </Grid>
        </Grid>
    )
}

export default CustomerAppFormS1;