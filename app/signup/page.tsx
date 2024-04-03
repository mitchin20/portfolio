'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';

const userSchema = yup.object({
    firstName: yup.string().min(2).required('Required'),
    lastName: yup.string().min(2).required('Required'),
    email: yup.string().email('Invalid email address.').required('Required'),
    password: yup.string().min(8).required('Required: must be at least 8 characters long.')
})

interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

interface Error {
    [key: string]: string,
}

const SignUp = () => {
    const [formInput, setFormInput] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<Error>({});

    // Handle input fields value changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormInput((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    } 

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError({});
        // Check if password match
        if (confirmPassword !== formInput.password) {
            setError(prev => ({
                ...prev,
                confirmPassword: "Password do not match."
            }))
            return;
        }
        try {   
            // Validate inputs
            await userSchema.validate(formInput, { abortEarly: false });
            setError({});

            console.log('User input: ', formInput);
            // Proceed form submission actions
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.reduce((acc: Error, curr) => ({
                    ...acc,
                    [curr.path as string]: curr.message,
                }), {})
                setError(validationErrors)
            }
        }
    }

    return (
        <div className='flex w-full h-svh mt-[-80px] place-content-center place-items-center'>
            <div className="card w-7/12 bg-base-100 shadow-xl">
                <form 
                    onSubmit={handleSubmit}
                    className="card-body items-center text-center"
                >
                    <h2 className="card-title mb-5">Sign Up</h2>

                    <div className='grid grid-cols-2 gap-4'>
                        {/* <div> */}
                            <label className='input input-bordered flex items-center gap-2 w-full required:border-red-400' >
                                <input 
                                    id='firstName'
                                    name='firstName'
                                    value={formInput.firstName}
                                    onChange={handleChange}
                                    type='text' 
                                    className='grow' 
                                    placeholder='First Name' 
                                />
                            </label>
                            {error.firstName && <p>{error.firstName}</p>}
                        {/* </div> */}

                        {/* <div> */}
                            <label className='input input-bordered flex items-center gap-2 w-full required:border-red-400' >
                                <input 
                                    id='lastName'
                                    name='lastName'
                                    value={formInput.lastName}
                                    onChange={handleChange}
                                    type='text' 
                                    className='grow' 
                                    placeholder='Last Name' 
                                />
                            </label>
                            {error.lastName && <p>{error.lastName}</p>}
                        {/* </div> */}
                    </div>

                    <label className='input input-bordered flex items-center gap-2 w-full required:border-red-400' >
                        <input 
                            id='email'
                            name='email'
                            value={formInput.email}
                            onChange={handleChange}
                            type='text' 
                            className='grow' 
                            placeholder='Email' 
                        />
                    </label>
                    {error.email && <p>{error.email}</p>}

                    {/* Password */}
                    <label className='input input-bordered flex items-center gap-2 w-full required:border-red-400' >
                        <input 
                            id='password'
                            name='password'
                            value={formInput.password}
                            onChange={handleChange}
                            type='password' 
                            className='grow' 
                            placeholder='Password' 
                        />
                    </label>
                    {error.password && <p>{error.password}</p>}
                    
                    <label className='input input-bordered flex items-center gap-2 w-full required:border-red-400' >
                        <input 
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type='password' 
                            className='grow' 
                            placeholder='Confirm Password' 
                        />
                    </label>
                    {error.confirmPassword && <p>{error.confirmPassword}</p>}
                    
                    <div className="card-actions w-[100%] px-5 sm:px-0 my-3">
                        <button 
                            type='submit'
                            className="btn btn-primary w-full rounded-full"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className='text-center text-sm font-light text-gray-500'>
                    Already have an account? <span>
                        <Link
                            href='/'
                        >
                            Sign In
                        </Link>
                    </span>
                </div>
            </div>   
        </div>
    )
}

export default SignUp