"use client";

import React, { useEffect, useState } from "react";
import { signOutAction } from "./signOutAction";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/user/userActions";
import { clearSignUpState, setSignUpState } from "@/redux/signup/signupActions";

const SignOutButton = () => {
    const dispatch = useAppDispatch();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);

        const handlePathChange = () => {
            setCurrentPath(window.location.pathname);
        }

        window.addEventListener('popstate', handlePathChange);

        return () => window.removeEventListener('popstate', handlePathChange);
    }, [])

    const handleSignOut = async () => {
        dispatch(setUser(null));
        dispatch(clearSignUpState());
        await signOutAction({currentPath});
    }

    return <button onClick={handleSignOut}>Sign out</button>;
};

export default SignOutButton;
