"use client";

import HeroSection from "./components/landingPage/HeroSection";
import AboutSection from "./components/landingPage/AboutSection";
import SkillSection from "./components/landingPage/SkillSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/user/userActions";
import { useEffect, useState } from "react";
import { currentUser } from "./useFetchCurrentUser";
import { getSignInState } from "@/redux/signin/signinReducer";

export default function Home() {
    const dispatch = useAppDispatch();
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

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await currentUser();
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(setUser(null));
            }
        }
        fetchCurrentUser();
    }, [dispatch])

    return (
        <div className="flex flex-col w-full mt-[-80px]">
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
        </div>
    )
}
