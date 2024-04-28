"use client";

import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { verification } from "./verificationAction";

const initialState = {
    success: false,
    message: "",
}

const Verification = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = searchParams.get('userId') ?? null;
    const userId = Number(params);
    // console.log("userId", userId);

    const [formState, formAction] = useFormState(verification, initialState)
    // const verifyUserWithId = verification.bind(null, userId);
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div>Verification code</div>
            <form 
                className="space-y-6"
                action={formAction}
            >
                <div>
                    <input
                        id="encodedData"
                        name="encodedData"
                        type="hidden"
                        value={userId}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <input
                        id="code"
                        name="code"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <VerifyButton />
                </div>
            </form>    
        </div>
    )
}

function VerifyButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"    
        >
            Verify
        </button>
    )
}

export default Verification