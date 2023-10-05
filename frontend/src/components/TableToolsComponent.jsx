import React from 'react'
import { SiMicrosoftexcel } from 'react-icons/si';
import { GrEdit } from 'react-icons/gr';
import { MdOutlineDelete } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { BsSortDown,BsPencil } from "react-icons/bs";
export const TableToolsComponent = () => {
  return (
    <div className='flex justify-between items-center px-6'>
        <div className='flex items-center gap-6 capitalize'>
            <span>0 selected</span>
            <button className='capitalize flex items-center gap-1 cursor-pointer hover:scale-105'>
                <SiMicrosoftexcel className='text-[#50B426] text-xl'/>
                <span>export to excel</span>
            </button>
            <button className='capitalize flex items-center gap-1 cursor-pointer hover:scale-105'>
                <BsPencil className='text-[#50B426] text-xl'/>
                <span>edit</span>
            </button>
            <button className='flex items-center capitalize gap-1 cursor-pointer hover:scale-105'>
                <MdOutlineDelete className='text-[#50B426] text-xl'/>
                <span>delete</span>
            </button>
        </div>
        <div className='flex gap-6'>
            <div className=''>
                <div className="relative">
                    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                        <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                            <div className='capitalize flex items-center gap-2'>
                                <FiFilter className='text-[#50B426] text-xl'/>
                                <span>filter</span>
                            </div>
                        </button>
                    </div>
                    {false && (
                    <div className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg" role="menu">
                        <div className="p-2">
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                View on Storefront
                            </a>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                View Warehouse Info
                            </a>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                Duplicate Product
                            </a>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                Unpublish Product
                            </a>
                            <form method="POST" action="#">
                                <button type="submit" className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50" role="menuitem">
                                    <MdOutlineDelete/>
                                    Delete Product
                                </button>
                            </form>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className=''>
                <div className="relative">
                    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                        <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                            <div className='capitalize flex items-center gap-2'>
                                <BsSortDown className='text-[#50B426] text-xl'/>
                                <span>sort by</span>
                            </div>
                        </button>
                    </div>
                    {false && (
                    <div className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg" role="menu">
                        <div className="p-2">
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                View on Storefront
                            </a>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                View Warehouse Info
                            </a>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                Duplicate Product
                            </a>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                Unpublish Product
                            </a>
                            <form method="POST" action="#">
                                <button type="submit" className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50" role="menuitem">
                                    <MdOutlineDelete/>
                                    Delete Product
                                </button>
                            </form>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
