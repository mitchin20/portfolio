"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserIcon } from "../svgs";
import SignOutButton from "../signOut/SignOutButton";
import { getSessionStorage } from "@/helpers/sessionStorage";

const NavItems = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isScreenSmall, setIsScreenSmall] = useState<boolean>(false);

    useEffect(() => {
        const user = getSessionStorage('user', null);
        setUser(user);
        setLoading(false);
    }, [])
    
    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.innerWidth < 769;
            setIsScreenSmall(isSmall);
        };
        
        handleResize();
        
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (loading) {
        return null;
    }

    return (
        <>
            <li>
                <Link
                    href="/"
                    className="font-medium tracking-wide sm:p-2 md:p-3 rounded-full"
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    href="#about"
                    className="font-medium tracking-wide sm:p-2 md:p-3 rounded-full"
                >
                    About
                </Link>
            </li>
            {/* <li>
                <Link
                    href="/projects"
                    className="font-medium tracking-wide sm:p-2 md:p-3 rounded-full"
                >
                    Projects
                </Link>
            </li> */}
            <li>
                <Link
                    href="#contact"
                    className="font-medium tracking-wide sm:p-2 md:p-3 rounded-full"
                >
                    Contact
                </Link>
            </li>
            {user ? (
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className={`btn btn-ghost btn-circle avatar ${
                            isScreenSmall ? "btn-sm" : "btn-md"
                        }`}
                    >
                        <UserIcon className="text-xl" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link href="/user">Profile</Link>
                        </li>
                        <li>
                            <SignOutButton />
                        </li>
                    </ul>
                </div>
            ) : (
                <li>
                    <Link
                        href="/signin"
                        className="font-medium tracking-wide sm:p-2 md:p-3 rounded-full"
                    >
                        Sign In
                    </Link>
                </li>
            )}
        </>
    );
};

export default NavItems;
