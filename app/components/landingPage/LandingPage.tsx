"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { getSignInState } from "@/redux/signin/signinReducer";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillSection from "./SkillSection";
import ContactSection from "./ContactSection";
import NavBar from "../navbar/NavBar";

export default function LandingPage() {
    const [signInMessage, setSignInMessage] = useState<string | null | undefined>('');
    const [visible, setVisible] = useState(!!signInMessage);
    
    const userSignIn = useAppSelector(getSignInState);

    useEffect(() => {
        if (userSignIn?.message !== '') {
            setSignInMessage(userSignIn?.message)
        }
    }, [userSignIn?.message])

    useEffect(() => {
        if (signInMessage) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [signInMessage])

    return (
        <div className="flex flex-col w-full mt-[-80px]">
            <NavBar />
            
            {visible && (
                <div
                    role="alert"
                    className="sm:mx-auto sm:w-full sm:max-w-sm fixed top-0 left-1/2 transform -translate-x-1/2 mt-[80px] alert alert-success text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{signInMessage}</span>
                </div>
            )}
            <HeroSection />
            <AboutSection />
            <SkillSection />
            <ContactSection />
        </div>
    )
}