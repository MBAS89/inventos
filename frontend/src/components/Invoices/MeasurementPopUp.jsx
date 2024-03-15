import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
export const MeasurementPopUp = () => {
  return (
    <div className='absolute w-1/2 -top-20 rounded-lg p-5 z-10 shadow-lg shadow-slate-300 right-56 bg-white h-[20rem] border-2 border-gray-800'>
        <div className='relative w-full bg-black'>
            <AiOutlineCloseCircle className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-2 top-2'/>
        </div>
    </div>
  )
}
