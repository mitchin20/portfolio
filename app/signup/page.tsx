"use client";

import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "./signUpAction";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSignUpState } from "@/redux/signup/signupReducer";
import { setSignUpState } from "@/redux/signup/signupActions";

const initialState = {
    success: false,
    message: "",
};

const SignUp = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [formState, formAction] = useFormState(signUp, initialState);

    useEffect(() => {
        if (formState.success) {
            dispatch(setSignUpState(formState));
            // router.push("/signin");
        }
    }, [dispatch, formState.success])

    const signUpState = useAppSelector(getSignUpState);

    console.log("From sign up page", signUpState)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Define the password requirements
    const requirements = [
        {
            id: 1,
            name: "At least 8 characters",
            predicate: (pwd: string) => pwd.length >= 8,
        },
        {
            id: 2,
            name: "Includes a number",
            predicate: (pwd: string) => /[0-9]/.test(pwd),
        },
        {
            id: 3,
            name: "Includes a special character",
            predicate: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        },
        {
            id: 4,
            name: "Includes an uppercase letter",
            predicate: (pwd: string) => /[A-Z]/.test(pwd),
        },
        {
            id: 5,
            name: "Includes a lowercase letter",
            predicate: (pwd: string) => /[a-z]/.test(pwd),
        },
    ];

    // Determine which requirements the password meets
    const fulfilledRequirements = requirements.map((req) => ({
        ...req,
        isFulfilled: req.predicate(password),
    }));

    const handleChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleConfirmPassword = (event: any) => {
        setConfirmPassword(event.target.value);
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {formState.message !== "" && (
                <div
                    role="alert"
                    className={`alert ${
                        formState.success ? "alert-success" : "alert-error"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{formState.message}</span>
                </div>
            )}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action={formAction}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="firstName"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="lastName"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <ul>
                            {fulfilledRequirements.map((req) => (
                                <li
                                    key={req.id}
                                    className={`mt-1 text-sm ${
                                        req.isFulfilled
                                            ? "text-green-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {req.isFulfilled ? "\u2714" : "\u2717"} {req.name}
                                    
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password {confirmPassword !== "" &&<span className="font-medium">
                                    {password === confirmPassword ? "- match \u2714" : "- not match \u2717"}
                                </span>}
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPassword}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <SignUpButton />
                    </div>
                </form>
            </div>
        </div>
    );
};

function SignUpButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Sign up
        </button>
    );
}

export default SignUp;
