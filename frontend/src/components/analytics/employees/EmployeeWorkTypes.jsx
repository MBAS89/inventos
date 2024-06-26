import React from 'react'

//components
import { EmployeePieChart } from './EmployeePieChart'

export const EmployeeWorkTypes = () => {
    return (
        <div className='bg-white h-[40rem] w-[35%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <h2 className='font-bold text-[1.6rem]'>Work Type Overview</h2>
            <div className='w-[full] h-full pb-5'>
                <EmployeePieChart />
            </div>
        </div>
    )
}
