"use client";

import { Suspense } from "react";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { verification } from "./verificationAction";
import UserIdInputField from "./UserIdInputField";
import ResendVerification from "./ResendVerification";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const initialState = {
    data: null,
};
const Verification = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectLink = searchParams.get("redirect_link") ?? null;
    const userId = searchParams.get("userId") ?? null;
    const [message, setMessage] = useState('');

    const [formState, formAction] = useFormState(verification, initialState);

    useEffect(() => {
        if (formState && formState.data && formState.data.message) {
            setMessage(formState.data?.message)
            if (redirectLink) {
                router.push(`/${redirectLink}?userId=${userId}`)
            }
        }
    }, [router, formState, message, redirectLink, userId])

    return (
        <Suspense>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-center sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    Welcome! Let&apos;s get your account activated. Please enter the code to verify your account below.
                </div>
                <div className="mt-10 font-semibold">
                    Verification Code
                </div>
                {formState && message && (
                    <div>
                        <div className={`${formState.data.success ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </div>
                        <Link
                            href="/signin"
                            className="text-sm text-blue-400"
                        >
                            Please click here to sign in.
                        </Link>
                    </div>
                )}
                <form className="space-y-6" action={formAction}>
                    <UserIdInputField />
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

                <ResendVerification />
            </div>
        </Suspense>
    );
};

function VerifyButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Verify Account
        </button>
    );
}

export default Verification;
