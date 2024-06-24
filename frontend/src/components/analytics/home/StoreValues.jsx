import React from 'react'

import { PieChart } from './PieChart'

export const StoreValues = () => {
    return (
        <div className='bg-white h-[45rem] w-[35%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <h2 className='font-bold text-[1.6rem]'>Store Value</h2>
            <div className='w-[full] h-full pb-5'>
                <PieChart />
            </div>
        </div>
    )
}
