'use client';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { signup } from './actions';

const initialState = {
    success: false,
    message: '',
}

export default function SignUp() {
    const [formState, formAction] = useFormState(signup, initialState);

    return (
        <div className='flex w-full h-svh mt-[-80px] place-content-center place-items-center'>
            <div className="card md:w-7/12 sm:w-11/12 bg-base-100 shadow-xl">
                {formState.success ? (
                    <div>
                        {formState.message}
                    </div>
                ) : (
                    <div>
                        {formState.message}
                    </div>
                )}
                <form 
                    action={formAction}
                    className="card-body"
                >
                    <h2 className="card-title mb-5 place-content-center">
                        Sign Up
                    </h2>

                    <div className='md:grid md:grid-cols-2 gap-4'>
                        <label className={`input input-bordered flex items-center gap-2 sm:mb-2`} >
                            <input 
                                id='firstName'
                                name='firstName'
                                type='text' 
                                className='grow' 
                                placeholder='First Name'
                                required
                            />
                        </label>
                        <label className={`input input-bordered flex items-center gap-2`} >
                            <input 
                                id='lastName'
                                name='lastName'
                                type='text' 
                                className='grow' 
                                placeholder='Last Name' 
                                required
                            />
                        </label>
                    </div>
                    <label className={`input input-bordered flex items-center gap-2 w-full`} >
                        <input 
                            id='email'
                            name='email'
                            type='text' 
                            className='grow' 
                            placeholder='Email' 
                            required
                        />
                    </label>
                    <label className={`input input-bordered flex items-center gap-2 w-full`} >
                        <input 
                            id='password'
                            name='password'
                            type='password' 
                            className='grow' 
                            placeholder='Password' 
                            required
                        />
                    </label>
                    <label className={`input input-bordered flex items-center gap-2 w-full`} >
                        <input 
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password' 
                            className='grow' 
                            placeholder='Confirm Password' 
                            required
                        />
                    </label>
                    
                    <div className="card-actions w-[100%] px-5 sm:px-0 mt-5">
                        <button 
                            type='submit'
                            className="btn btn-primary w-full rounded-full"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className='text-center text-sm mb-4 font-light text-gray-500'>
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