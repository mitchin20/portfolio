"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserIcon } from "../svgs";
import SignOutButton from "../signOut/SignOutButton";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/user/userReducer";

interface User {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: string | null;
}

const NavItems = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isScreenSmall, setIsScreenSmall] = useState<boolean>(false);
    const userData = useAppSelector(getUser);
    
    useEffect(() => {
        if (userData) {
            setUser(userData);
        } else {
            setUser(null);
        }
        const handleResize = () => {
            const isSmall = window.innerWidth < 769;
            setIsScreenSmall(isSmall);
        };
        
        handleResize();
        
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, [userData]);
    
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
                    href="/about"
                    className="font-medium tracking-wide sm:p-2 md:p-3 rounded-full"
                >
                    About
                </Link>
            </li>
            <li>
                <Link
                    href="/projects"
                    className="font-medium tracking-wide sm:p-2 md:p-3 rounded-full"
                >
                    Projects
                </Link>
            </li>
            <li>
                <Link
                    href="/contact"
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
            ) : null}
        </>
    );
};

export default NavItems;
