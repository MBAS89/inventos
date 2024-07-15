import React from 'react'

//reusbale components 
import { Widgets } from '../../../components/analytics/home/Widgets'

//icons
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { ExpensesAndSalesVisualAnalytics } from '../../../components/analytics/expenses-and-sales/ExpensesAndSalesVisualAnalytics';
import { SalesVisualAnalytics } from '../../../components/analytics/expenses-and-sales/SalesVisualAnalytics';
import { InvoicesAnalytics } from '../../../components/analytics/expenses-and-sales/InvoicesAnalytics';
import { LatestExpenses } from '../../../components/analytics/expenses-and-sales/LatestExpenses';


export const ExpensesAndSalesAnalytics = () => {

    const widgetData = [
        {
            color: "bg-red-200",
            icon: <GiPayMoney className='text-[1.5rem] text-red-800' />,
            value: "350",
            change: "2.5",
            title: "Total Expenses"
        },
        {
            color: "bg-green-200",
            icon: <FaMoneyBillTrendUp className='text-[1.5rem] text-green-800' />,
            value: "228",
            change: "2.5",
            title: "Total Sales"
        },
        {
            color: "bg-yellow-200",
            icon: <FaMoneyBillTrendUp className='text-[1.5rem] text-yellow-800 rotate-180 scale-x-[-1]' />,
            value: "150",
            change: "-4",
            title: "Total Debt"
        },
        {
            color: "bg-orange-200",
            icon: <GiReceiveMoney className='text-[1.5rem] text-orange-800' />,
            value: "25",
            change: "25",
            title: "Total Dues"
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
                <ExpensesAndSalesVisualAnalytics />
                <SalesVisualAnalytics />
            </div>
            <div className='w-[90%] mx-auto flex gap-10'>
                <InvoicesAnalytics />
                <LatestExpenses />
            </div>
        </div>
    )
}
