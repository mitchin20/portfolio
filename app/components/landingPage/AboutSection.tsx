import React from 'react';

const AboutSection = () => {
    return (
        <div 
            id='about'
            className='text-center max-h-full py-3 px-10 md:px-24 lg:px-[300px] xl:px-[400px] 2xl:px-[600px]'
        >
            <div className='divider my-20'>
                <h1
                    className='font-semibold text-lg'
                >
                    About Me
                </h1>
            </div>
            <p className='text-sm leading-8'>
                Throughout my career, I&apos;ve had the opportunity to contributing to projects at Comcast, a leader in the telecommunications industry. This experience has allowed me to impact thousands of users with my work. I&apos;m passionate about building accessible web applications that enhance user experience and solve real-world problems.
            </p>
        </div>
    )
}

export default AboutSection