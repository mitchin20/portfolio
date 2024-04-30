"use client";

import React, { Suspense } from "react";
import { useFormState, useFormStatus } from "react-dom";
import UserIdInputField from "./UserIdInputField";
import { resendVerificationAction } from "./resendVerificationAction";

const initialState = {
    success: false,
    message: '',
}

const ResendVerification = () => {
    const [formState, formAction] = useFormState(resendVerificationAction, initialState)

    return (
        <Suspense>
            <div className="mt-10">
                <div className="mb-5">
                    Haven&apos;t received your verification code?
                </div>
                <form className="space-y-6" action={formAction}>
                    <UserIdInputField />

                    <ResendButton />
                </form>
                <div className={`mt-5 ${formState.success ? "text-green-500" : "text-red-500"}`}>
                    {formState?.message}
                </div>
            </div>
        </Suspense>
    );
};

function ResendButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graybg-gray-200"
        >
            Resend Verification Code
        </button>
    );
}

export default ResendVerification;
