import React, { useState } from 'react'
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const Invoices = () => {
    const location = useLocation()
    
    return (
    <div className=' bg-gray-100 h-[calc(100vh-64px)]'>
        <div className="hidden sm:block p-4">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6 px-6" aria-label="Tabs">
                    <NavLink to='inner-invoices' className={({isActive}) => isActive || location.pathname === "/dashboard/invoices" ? 'border-[#50B426] text-[#50B426] border-b-2' : 'text-gray-500 hover:border-b-1'} >
                        <div className='inline-flex shrink-0 items-center gap-2  px-1 pb-4 text-sm font-medium'>
                            <LiaFileInvoiceDollarSolid className='text-lg'/>
                            Inner Invoices
                        </div>
                    </NavLink>
                    <NavLink to='outer-invoices' className={({isActive}) => isActive ? 'border-[#50B426] text-[#50B426] border-b-2' : 'text-gray-500 hover:border-b-1'}>
                        <div className='inline-flex shrink-0 items-center gap-2  px-1 pb-4 text-sm font-medium'>
                            <FaMoneyBillTrendUp className='text-lg'/>
                            Outer Invoices
                        </div>
                    </NavLink>
                </nav>
                <Outlet/>
            </div>
        </div>
        
    </div>
  )
}
