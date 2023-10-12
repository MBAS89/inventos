import React from 'react'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { InventoryTable } from '../../components/inventory/InventoryTable'
import { BiCategory } from 'react-icons/bi'
import { TbBrandZeit } from 'react-icons/tb'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { NavLink, Outlet, useLocation } from "react-router-dom";
export const Inventory = () => {

    const location = useLocation()
    const headItems = [
        {
            title:"product info"
        },
        {
            title:"Sku"
        },
        {
            title:"qty"
        },
        {
            title:"price"
        },
        {
            title:"retail price"
        },
        {
            title:"wholesale price"
        },
        {
            title:"category"
        },
        {
            title:"brand"
        },
        {
            title:"created date"
        },
        {
            title:"updated date"
        }
    ]

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
                </nav>
                <Outlet/>
            </div>
        </div>
       
    </div>
  )
}
