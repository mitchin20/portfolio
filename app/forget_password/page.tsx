"use client";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { forgetPasswordAction } from "./forgetPasswordAction";
import { useRouter } from "next/navigation";

const initialState = {
    success: false,
    message: '',
    userId: null
}

const ForgetPassword = () => {
    const router = useRouter();
    const [formState, formAction] = useFormState(forgetPasswordAction, initialState);
    const redirectLink = "reset_password"

    useEffect(() => {
        if (formState.success) {
            router.push(`/verification?userId=${formState?.userId}&redirect_link=${redirectLink}`);
        }
    }, [router, formState, formState.success])

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form 
                action={formAction}
                className="space-y-6"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Please enter your email address.
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

                <SubmitButton />
            </form>
        </div>
    );
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Submit
        </button>
    );
}

export default ForgetPassword;
