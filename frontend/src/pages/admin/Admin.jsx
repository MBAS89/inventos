import React from 'react'

import { RiAdminLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxSeam, BsPeople } from "react-icons/bs"
import {  FiTruck } from "react-icons/fi"
import { MdOutlineManageAccounts, MdAttachMoney } from "react-icons/md"
import { TbDeviceAnalytics } from "react-icons/tb"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia"
import { useNavigate } from 'react-router-dom';
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

export const Admin = () => {

    const navigate = useNavigate();
    const buttonsData = [
        { Icon: TbDeviceAnalytics, title: "Analytics", link:"analytics" },
        { Icon: HiOutlineBuildingStorefront, title: "Stores",link:"stores" },
        { Icon: BsBoxSeam, title: "Inventory",link:"inventory" },
        { Icon: BsPeople, title: "Customers",link:"customers" },
        { Icon: FiTruck, title: "Suppliers",link:"suppliers" },
        { Icon: MdOutlineManageAccounts, title: "Employees",link:"employees" },
        { Icon: MdAttachMoney, title: "Expenses",link:"expenses" },
        { Icon: LiaFileInvoiceDollarSolid, title: "Invoices",link:"invoices" },
    ];

    return (
        <div className='bg-gray-300 h-[calc(100vh-64px)]'>
            <section className="bg-gray-900 h-full text-white">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                    <div className="mx-auto text-center">
                        <h2 className="text-xl font-bold sm:text-4xl capitalize">Welcome To <span className='text-[#54AD31] uppercase'>inventos </span>Admin Dashboard</h2>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
                    {buttonsData.map((button, index) => (
                        <button  onClick={()=>navigate(button.link)} key={index} className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-[#54AD31]/10 hover:shadow-[#54AD31]/10">
                        <button.Icon className="mx-auto text-[2.2rem] text-[#54AD31]" />
                        <h2 className="mt-4 text-xl font-bold text-white capitalize">
                        {button.title}
                        </h2>
                        </button>
                    ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
