"use client";

import React, { useState, useEffect } from 'react';
import NavItemsCenter from './NavItemsCenter';

const NavBar = () => {
    const [currentPath, setCurrentPath] = useState<string>('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);

        const handleChangePath = () => {
            setCurrentPath(window.location.pathname);
        }

        window.addEventListener('popstate', handleChangePath);
        // Listening to hashchange if you expect to work with hash-based routing
        window.addEventListener('hashchange', handleChangePath);

        return () => {
            window.removeEventListener('popstate', handleChangePath);
            window.removeEventListener('hashchange', handleChangePath);
        };
    }, [])

    return (
        <>
            {currentPath !== "/signin" ? (
                <div className="navbar sticky bg-transparent top-0 z-30">
                    <div className='navbar-center rounded-full border mx-auto border-slate-200 text-gray-500 bg-base-100'>
                        <NavItemsCenter />
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default NavBar