import React from 'react'

//components
import { CutomersBarChart } from './CutomersBarChart'

export const CustomersVisualAnalytics = () => {
    return (
        <div className='bg-white h-[40rem] w-[65%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-[1.6rem]'>Customers Analytics</h2>
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
            <div className='h-[33rem]'>
                <CutomersBarChart />
            </div>
        </div>
    )
}
