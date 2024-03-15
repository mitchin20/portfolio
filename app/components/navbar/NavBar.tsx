import React from 'react';
import NavItemsCenter from './NavItemsCenter';

const NavBar = () => {
    return (
        <div className="navbar sticky bg-transparent top-0 z-30">
            <div className='navbar-center rounded-full border mx-auto border-slate-200 text-gray-500 bg-base-100'>
                <NavItemsCenter />
            </div>
        </div>
    )
}

export default NavBar