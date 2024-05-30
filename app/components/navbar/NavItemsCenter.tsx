import React from 'react';
import NavItems from './NavItems';

const NavItemsCenter = () => {
    return (
        <ul className="menu menu-horizontal px-3 space-x-3 md:px-10 md:space-x-10 sm:space-x-2">
            <NavItems />
        </ul>
    )
}

export default NavItemsCenter