import React from 'react';
import Link from 'next/link';

const NavItems = () => {
    return (
        <>
            <li>
                <Link
                    href="/"
                    className='font-medium tracking-wide sm:p-2 md:p-3 rounded-full'
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    href="/about"
                    className='font-medium tracking-wide sm:p-2 md:p-3 rounded-full'
                >
                    About
                </Link>    
            </li>
            <li>
                <Link
                    href="/projects"
                    className='font-medium tracking-wide sm:p-2 md:p-3 rounded-full'
                >
                    Projects
                </Link>    
            </li>
            <li>
                <Link
                    href="/contact"
                    className='font-medium tracking-wide sm:p-2 md:p-3 rounded-full'
                >
                    Contact
                </Link>    
            </li>
        </>
    )
}

export default NavItems