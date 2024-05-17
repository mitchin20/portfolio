"use client";

import React, { useEffect, useState, Suspense } from "react";
import passwordRequirement from "@/helpers/passwordRequirement";
import { useFormState, useFormStatus } from "react-dom";
import UserIdInputField from "../components/UserIdInputField";
import { resetPasswordAction } from "./resetPasswordAction";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setSignUpState } from "@/redux/signup/signupActions";

const initialState = {
    success: false,
    message: ""
}

const ResetPassword = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const requirements = passwordRequirement();

    const [formState, formAction] = useFormState(resetPasswordAction, initialState);

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
    };

    useEffect(() => {
        if (formState.success) {
            dispatch(setSignUpState(formState));
            router.push("/signin");
        }
    }, [dispatch, router, formState, formState.success])
    return (
        <Suspense>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form 
                    action={formAction}
                    className="space-y-6"
                >
                    <UserIdInputField />

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Enter your new password.
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
                                    {req.isFulfilled ? "\u2714" : "\u2717"}{" "}
                                    {req.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm password{" "}
                                {confirmPassword !== "" && (
                                    <span className="font-medium">
                                        {password === confirmPassword
                                            ? "- match \u2714"
                                            : "- not match \u2717"}
                                    </span>
                                )}
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

                    <SubmitButton />
                </form>
            </div>
        </Suspense>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Done
        </button>
    );
}

export default ResetPassword;