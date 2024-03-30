import HeroSection from "./components/landingPage/HeroSection";
import AboutSection from "./components/landingPage/AboutSection";
import SkillSection from "./components/landingPage/SkillSection";

export default function Home() {
    return (
        <div className="flex flex-col w-full mt-[-80px]">
            <HeroSection />
            <AboutSection />
            <SkillSection />
        </div>
    )
}
