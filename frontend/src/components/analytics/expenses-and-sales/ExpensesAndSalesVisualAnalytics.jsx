import React from 'react'

//components
import { ExpensesAndSalesBarChart } from './ExpensesAndSalesBarChart'

export const ExpensesAndSalesVisualAnalytics = () => {
    return (
        <div className='bg-white h-[45rem] w-[65%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-[1.6rem]'>Expenses And Sales Analytics</h2>
                <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                    <button
                        className="inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                    >
                        Weekly
                    </button>

                    <button
                        className="inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                    >
                        Montly
                    </button>

                    <button
                        className="inline-block rounded-md bg-white px-4 py-2 text-sm text-[#50B426] shadow-sm focus:relative"
                    >
                        Yearly
                    </button>
                </div>
            </div>
            <div className='border-2 border-solid ml-4 border-gray-200 rounded-2xl h-[5rem] w-[20rem] min-w-fit tracking-wider gap-8 mt-5 flex items-center px-4'>
                <div className='font-bold text-[2rem] min-w-[55%]'>$3550.00</div>
                <div className='w-[10rem]'>
                    <h4 className='capitalize'>Total Profit</h4>
                    <span className={`bg-green-100 w-[4.5rem] h-[1.5rem] flex justify-center items-center text-center rounded-xl text-sm ${10 > 0 ? 'text-green-500' : 'text-red-500'}`}>+22%</span>
                </div>
            </div>
            <div className='h-[33rem]'>
                <ExpensesAndSalesBarChart />
            </div>
        </div>
    )
}
