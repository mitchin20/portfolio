"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const URL = `${process.env.NEXT_PUBLIC_ROOT_URL}`

async function getCurrentUser() {
    await new Promise(resolve => setTimeout(resolve, 5000))

    const res = await fetch(`${URL}/api/v1/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    
    return res.json();
}

const UserProfile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<any>(null);
    
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const userData = await getCurrentUser();
            console.log("User Data: ", userData);
            const user = await Promise.all([userData])
            setUser(user);
        }
        fetchCurrentUser();
    }, [])

    console.log("user data: ", user)

    return (
        <div>UserProfile</div>
    )
}

export default UserProfile