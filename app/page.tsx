"use client";

import HeroSection from "./components/landingPage/HeroSection";
import AboutSection from "./components/landingPage/AboutSection";
import SkillSection from "./components/landingPage/SkillSection";
import { setUser } from "./redux/user/userActions";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { currentUser } from "./useFetchCurrentUser";

export default function Home() {
    const dispatch = useAppDispatch();

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
            <HeroSection />
            <AboutSection />
            <SkillSection />
        </div>
    )
}
