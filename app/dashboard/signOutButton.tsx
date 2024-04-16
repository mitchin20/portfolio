"use client";

import React from "react";
import { signOutAction } from "./signOutAction";

const SignOutButton = () => {
    const handleSignOut = async () => {
        await signOutAction();
    }
    return <button onClick={handleSignOut}>Sign out</button>;
};

export default SignOutButton;
