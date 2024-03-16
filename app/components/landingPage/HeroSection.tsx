import React from 'react';
import Link from 'next/link';
import { GiRobotGolem } from "react-icons/gi";
import { IoDownloadOutline } from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className='my-10'>
        <p className='text-center text-2xl font-bold mt-12 mb-8'>
            Hello, I&apos;m Giang.
        </p>
        <p className='text-center text-xl mb-2 leading-10'>
            I&apos;m a 
            <span className='font-semibold'> full-stack developer </span> 
            with 
            <span className='font-semibold'> 4 years </span> 
            of experience. I enjoy building 
            <span className='italic font-semibold'> websites & applications, </span> 
            concentrating primarily on 
            <span className='text-sky-400 font-semibold italic'> React </span> 
            and its framework, 
            <span className='text-sky-400 font-semibold italic'> NextJS.</span> 
        </p>

        <div className='flex flex-col items-center space-x-3 mt-8 md:mt-20'>
            <a 
                className='btn btn-outline btn-sm btn-neutral rounded-full mb-3 font-light'
                download="Giang_Nguyen_Resume.docx.pdf"
                href='/cv/Giang_Nguyen_Resume.docx.pdf'
            >
                Download CV
                <IoDownloadOutline />
            </a>

            <Link 
                href='/'
                className='btn btn-wide btn-sm btn-outline btn-success font-light rounded-full'
            >
                <GiRobotGolem />
                Let&apos;s build something together
            </Link>
        </div>

        <div className='flex justify-center mx-auto mt-3 space-x-2'>
            <a 
                href='https://www.linkedin.com/in/giang-nguyen-921661188'
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-outline rounded-full'
            >
                <FaLinkedin />
            </a>
            <a 
                href="https://github.com/my-front-end-code?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className='btn btn-outline rounded-full'
            >
                <FaGithub />
            </a>
        </div>
    </div>
  )
}

export default HeroSection