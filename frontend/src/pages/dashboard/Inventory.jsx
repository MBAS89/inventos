import React from 'react'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { InventoryTable } from '../../components/inventory/InventoryTable'
import { BiCategory } from 'react-icons/bi'
import { TbBrandZeit } from 'react-icons/tb'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { Link,Outlet } from "react-router-dom";
export const Inventory = () => {
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
                <nav className="-mb-px flex gap-6" aria-label="Tabs">
                    <Link to='products' className="inline-flex shrink-0 items-center gap-2 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600">
                    <MdOutlineProductionQuantityLimits className='text-lg'/>
                    Products
                    </Link>
                    <Link to='categories' className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                    <BiCategory className='text-lg'/>
                    Category
                    </Link>
                    <Link to='brands' className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                    <TbBrandZeit className='text-lg'/>
                    Brands
                    </Link>
                </nav>
                <Outlet/>
            </div>
        </div>
       
    </div>
  )
}
