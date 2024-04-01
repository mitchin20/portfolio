"use client";
import React, { useEffect, useState } from 'react';
import SmallScreen from './components/SmallScreen';
import LargeScreen from './components/LargeScreen';

const SkillSection = () => {
    const [isSmall, setIsSmall] = useState<Boolean>(false);

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth < 769) {
                setIsSmall(true);
            } else {
                setIsSmall(false);
            }
        }

        checkSize();

        window.addEventListener('resize', checkSize);

        return () => window.removeEventListener('resize', checkSize);
    }, [])

    return (
        <div className='max-h-full py-3 px-4 md:px-24 lg:px-[5%] xl:px-[8%] 2xl:px-[10%]'>
            <div className='divider my-20'>
                <h1
                    className='font-semibold text-lg'
                >
                    Tech Stack
                </h1>
            </div>
            {isSmall ? (
                <SmallScreen />
            ) : (
                <LargeScreen />
            )}
        </div>
    )
}

export default SkillSection