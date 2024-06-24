import React from 'react'

//react router dom
import { NavLink, useLocation } from 'react-router-dom';

//icons
import { MdOutlineSecurity } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { TbCash } from "react-icons/tb";


export const AnalyticsSideBar = () => {
    const location = useLocation()

    const navLinks = [
        {
            title:'home',
            link:'/dashboard/settings',
            icon: <AiFillHome className='text-[1.5rem]' />
        },
        {
            title:'permissions',
            link:'/dashboard/settings/permissions',
            icon: <MdOutlineSecurity className='text-[1.5rem]' />
        },
        {
            title:'customers',
            link:'/dashboard/settings/customers',
            icon: <IoPeopleSharp className='text-[1.5rem]' />
        },
        {
            title:'suppliers',
            link:'/dashboard/settings/suppliers',
            icon: <FaTruck className='text-[1.5rem]' />
        },
        {
            title:'expenses',
            link:'/dashboard/settings/expenses',
            icon: <TbCash className='text-[1.5rem]' />
        }
    ]

    return (
        <section className='w-[5%] min-h-screen fixed top-0 pt-10 mt-16'>
            <div className=''>
                <nav className='flex flex-col gap-3 z-50'>
                    {navLinks.map((link) => (
                        <NavLink to={link.link} className={`${location.pathname === link.link ? 'bg-white text-[#50B426]' : 'text-white'} flex items-center justify-center border-2 border-white mx-4 rounded-md p-2`}>
                            <div className='flex justify-center items-center'>{link.icon}</div>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </section>
    )
}