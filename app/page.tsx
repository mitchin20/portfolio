import HeroSection from "./components/landingPage/HeroSection";
import AboutSection from "./components/landingPage/AboutSection";
import prisma from "@/prisma/client";

export default async function Home() {
    const users = await prisma.user.findMany();

    console.log("users: ", users);

    return (
        <div className="flex flex-col items-center px-8 sm:px-24 md:px-56 lg:px-[300px] xl:px-[450px] 2xl:px-[550px]">
            <HeroSection />
            <div className="bg-gray-300" style={{height: '80px', width: '2px'}}></div>
            <AboutSection />

            <div>
                <ul>
                    {users && users.map((user, i) => (
                        <li key={i}>{user.firstName}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
