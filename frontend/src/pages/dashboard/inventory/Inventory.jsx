import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { TbBrandZeit } from 'react-icons/tb'
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const Inventory = () => {
    
    const location = useLocation()

    return (
    <div className=' bg-gray-100 h-[calc(100vh-64px)]'>
        <div className="hidden sm:block p-4">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6 px-6" aria-label="Tabs">
                    <NavLink to='products' className={({isActive}) => isActive || location.pathname === "/dashboard/inventory" ? 'border-[#50B426] text-[#50B426] border-b-2' : 'text-gray-500 hover:border-b-1'} >
                        <div className='inline-flex shrink-0 items-center gap-2  px-1 pb-4 text-sm font-medium'>
                            <MdOutlineProductionQuantityLimits className='text-lg'/>
                            Products
                        </div>
                    </NavLink>
                    <NavLink to='categories' className={({isActive}) => isActive ? 'border-[#50B426] text-[#50B426] border-b-2' : 'text-gray-500 hover:border-b-1'}>
                        <div className='inline-flex shrink-0 items-center gap-2  px-1 pb-4 text-sm font-medium'>
                            <BiCategory className='text-lg'/>
                            Category
                        </div>
                    </NavLink>
                    <NavLink to='brands' className={({isActive}) => isActive ? 'border-[#50B426] text-[#50B426] border-b-2' : 'text-gray-500 hover:border-b-1'}>
                        <div className='inline-flex shrink-0 items-center gap-2  px-1 pb-4 text-sm font-medium'>
                            <TbBrandZeit className='text-lg'/>
                            Brands
                        </div>
                    </NavLink>
                    <NavLink to='coupons' className={({isActive}) => isActive ? 'border-[#50B426] text-[#50B426] border-b-2' : 'text-gray-500 hover:border-b-1'}>
                        <div className='inline-flex shrink-0 items-center gap-2  px-1 pb-4 text-sm font-medium'>
                            <RiCoupon2Line className='text-lg'/>
                            Coupons
                        </div>
                    </NavLink>
                </nav>
                <Outlet/>
            </div>
        </div>
        
    </div>
  )
}
