import React from 'react'
import NavItems from './NavItems'

const NavItemsDropdown = () => {
    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden rounded-full border border-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-svw" style={{ right: '-40px' }}>
                <NavItems />
            </ul>
        </div>
    )
}

export default NavItemsDropdown