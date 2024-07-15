import React from 'react'

//react router dom
import { NavLink, useLocation } from 'react-router-dom';

//icons
import { AiFillHome } from "react-icons/ai";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { TbCash } from "react-icons/tb";
import { TiBusinessCard } from "react-icons/ti";
import { BsBoxSeam } from "react-icons/bs";



export const AnalyticsSideBar = () => {
    const location = useLocation()

    const navLinks = [
        {
            title:'home',
            link:'/dashboard/analytics',
            icon: <AiFillHome className='text-[1.5rem]' />
        },
        {
            title:'Employee',
            link:'/dashboard/analytics/employees',
            icon: <TiBusinessCard className='text-[1.5rem]' />
        },
        {
            title:'customers',
            link:'/dashboard/analytics/customers',
            icon: <IoPeopleSharp className='text-[1.5rem]' />
        },
        {
            title:'suppliers',
            link:'/dashboard/analytics/suppliers',
            icon: <FaTruck className='text-[1.5rem]' />
        },
        {
            title:'expenses-sales',
            link:'/dashboard/analytics/expenses-sales',
            icon: <TbCash className='text-[1.5rem]' />
        },
        {
            title:'inventroy',
            link:'/dashboard/analytics/inventory',
            icon: <BsBoxSeam className='text-[1.5rem]' />
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
