"use client";

import HeroSection from "./components/landingPage/HeroSection";
import AboutSection from "./components/landingPage/AboutSection";
import SkillSection from "./components/landingPage/SkillSection";
// import ProjectsSection from "./components/landingPage/ProjectsSection";
import { setUser } from "./redux/user/userActions";
import { useDispatch } from "react-redux";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

const fetchUser = async (): Promise<User | null> => {
    try {
        const URL = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/user`;
        const res = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch user: ${res.status}`);
        }

        const user: User = await res.json();
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
}

export default async function Home() {
    const dispatch = useDispatch();
    const user = await fetchUser();

    dispatch(setUser(user));

    return (
        <div className="flex flex-col w-full mt-[-80px]">
            <HeroSection />
            <AboutSection />
            <SkillSection />
            {/* <ProjectsSection /> */}
        </div>
    )
}
