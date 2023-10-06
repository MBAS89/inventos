import React from 'react'
import { CategoryAndBrands } from '../../components/casher/CategoryAndBrands'
import { BilingSection } from '../../components/casher/subcomponents/BilingSection'
export const Casher = () => {
  return (
    <div className=' bg-gray-100 h-[calc(100vh-64px)] flex p-8'>
        <div className='w-[65%]'>
            <CategoryAndBrands/>
        </div>
        <div className='w-[35%] bg-white'><BilingSection/></div>
    </div>
  )
}
