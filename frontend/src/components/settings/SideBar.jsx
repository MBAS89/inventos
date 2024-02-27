import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

//icons
import { MdOutlineSecurity } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { TbCash } from "react-icons/tb";


export const SideBar = () => {
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
    <section className='w-[15%] min-h-screen bg-[#50B426] fixed top-0 pt-10 mt-16'>
        <div className=''>
            <div className='mt-12 flex flex-col items-center gap-5'>
                <img className='rounded-full w-24 h-24' src='https://res.cloudinary.com/dagzd3ntq/image/upload/v1708134622/stores/mango/products/zacoibpuexypyt9lreo0.png' alt='' />
                <div className='text-center'>
                    <h2 className='font-bold text-[1.4rem] text-white uppercase'>Mango</h2>
                    <span className='text-[0.7rem] text-gray-200'>Store private settings dashboard</span>
                </div>
            </div>
            <nav className='mt-10 flex flex-col gap-3 z-50'>
                {navLinks.map((link) => (
                    <NavLink to={link.link} className={`${location.pathname === link.link ? 'bg-white text-[#50B426]' : 'text-white'} flex items-center justify-center border-2 border-white mx-4 rounded-md p-2`}>
                        <div className='w-[20%]'>{link.icon}</div>
                        <div className='text-[1.2rem] w-[70%] font-bold capitalize'>{link.title}</div>
                    </NavLink>
                ))}
            </nav>
        </div>
    </section>
  )
}
