import React from 'react'
import { Widgets } from '../../components/analytics/home/Widgets'

//icons
import { CiBoxes } from "react-icons/ci";
import { TbStars } from "react-icons/tb";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { SalesAnalytics } from '../../components/analytics/home/SalesAnalytics';
import { StoreValues } from '../../components/analytics/home/StoreValues';


export const Analytics = () => {
    return (
        <div>
            <div className='mt-10 w-[90%] mx-auto flex gap-8'>
                <Widgets
                    color="bg-blue-200" 
                    icon={<CiBoxes className='text-[1.5rem] text-blue-800'/>}
                    vlaue="350"
                    change="2.5"
                    title="total prodcuts"
                />
                <Widgets
                    color="bg-green-200" 
                    icon={<FaMoneyBillTrendUp className='text-[1.5rem] text-green-800'/>}
                    vlaue="228"
                    change="2.5"
                    title="Completed Sales"
                />
                <Widgets
                    color="bg-red-200" 
                    icon={<FaMoneyBillTrendUp className='text-[1.5rem] text-red-800 rotate-180 scale-x-[-1]'/>}
                    vlaue="150"
                    change="-4"
                    title="total expenses"
                />
                <Widgets
                    color="bg-purple-200" 
                    icon={<TbStars className='text-[1.5rem] text-purple-800'/>}
                    vlaue="25"
                    change="25"
                    title="top prodcuts"
                />
            </div>
            <div className='mt-10 w-[90%] mx-auto flex gap-10'>
                <SalesAnalytics />
                <StoreValues />
            </div>
        </div>
    )
}
