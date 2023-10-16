import React from 'react'

export const JobDetails = () => {
    return (
        <div className='w-[60%] mx-auto '>
            <div className='rounded-md border-2 border-gray-200 p-4 bg-white mt-4 w-[59%]'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Job Details</h2>
                <div className='pl-4 flex justify-between w-[98%]'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='font-bold capitalize'>Employment Date:</h4>
                        <h4 className='font-bold capitalize'>Expected End Date:</h4>
                        <h4 className='font-bold capitalize'>agreed salary:</h4>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span>16th Oct, 2023</span>
                        <span>16th Oct, 2023</span>
                        <span>$20k</span>
                    </div>
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <button className='font-bold text-[#50B426] hover:text-green-600 active:text-green-900'>Change Date</button>
                        <button className='font-bold text-[#50B426] hover:text-green-600 active:text-green-900'>Change Date</button>
                        <button className='font-bold text-[#50B426] hover:text-green-600 active:text-green-900'>Change Salary</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
