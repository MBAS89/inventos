import React from 'react'

//reusable components
import { Widgets } from '../../../components/analytics/home/Widgets'

//components
import { CustomersVisualAnalytics } from '../../../components/analytics/customers/CustomersVisualAnalytics';
import { CustomersStatus } from '../../../components/analytics/customers/CustomersStatus';

//icons
import { FaPeopleGroup } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbTableOptions } from "react-icons/tb";





export const CustomersAnalytics = () => {
    const widgetData = [
        {
            color: "bg-blue-200",
            icon: <FaPeopleGroup className='text-[1.5rem] text-blue-800' />,
            value: "350",
            change: "2.5",
            title: "total Customers"
        },
        {
            color: "bg-green-200",
            icon: <FaMoneyBillTrendUp className='text-[1.5rem] text-green-800' />,
            value: "228",
            change: "2.5",
            title: "total transactions"
        },
        {
            color: "bg-yellow-200",
            icon: <FaMoneyBillTrendUp className='text-[1.5rem] text-yellow-800 rotate-180 scale-x-[-1]' />,
            value: "150",
            change: "-4",
            title: "total Debt"
        },
        {
            color: "bg-purple-200",
            icon: <TbTableOptions className='text-[1.5rem] text-purple-800' />,
            value: "25",
            change: "25",
            title: "Total Customers Types"
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
                <CustomersVisualAnalytics />
                <CustomersStatus />
            </div>
        </div>
    )
}
