import React from 'react'

//reusbale components 
import { Widgets } from '../../../components/analytics/home/Widgets'

//icons
import { CiBoxes } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { TbBrandSnapseed } from "react-icons/tb";
import { RiCoupon2Line } from "react-icons/ri";
import { InventoryVisualAnalytics } from '../../../components/analytics/inventory/InventoryVisualAnalytics';
import { TopProducts } from '../../../components/analytics/inventory/TopProducts';





export const InventoryAnalytics = () => {

    const widgetData = [
        {
            color: "bg-emerald-200",
            icon: <CiBoxes className='text-[1.5rem] text-emerald-800' />,
            value: "350",
            change: "2.5",
            title: "Total Products"
        },
        {
            color: "bg-blue-200",
            icon: <BiCategoryAlt className='text-[1.5rem] text-blue-800' />,
            value: "228",
            change: "2.5",
            title: "Total Categories"
        },
        {
            color: "bg-purple-200",
            icon: <TbBrandSnapseed className='text-[1.5rem] text-purple-800 rotate-180 scale-x-[-1]' />,
            value: "150",
            change: "-4",
            title: "Total Brands"
        },
        {
            color: "bg-pink-200",
            icon: <RiCoupon2Line className='text-[1.5rem] text-pink-800' />,
            value: "25",
            change: "25",
            title: "Total Coupons"
        }
    ];


    return (
        <div>
            <div className='mt-10 w-[90%] mx-auto flex gap-8'>
                {widgetData.map((widget, index) => (
                    <Widgets
                        key={index}
                        color={widget.color}
                        icon={widget.icon}
                        vlaue={widget.value}
                        change={widget.change}
                        title={widget.title}
                    />
                ))}
            </div>
            <div className='mt-10 w-[90%] mx-auto flex gap-10'>
                <InventoryVisualAnalytics />
                <TopProducts />
            </div>
        </div>
    )
}
