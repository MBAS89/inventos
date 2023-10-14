import React from 'react'

export const CustomersProfile = () => {
  return (
    <div className=''>
        <div className='bg-red-300 flex items-center gap-6 rounded-lg p-5 w-[1000px]'>
            <img width="120" height="120" src="https://img.icons8.com/dusk/64/cat--v1.png" alt="cat--v1"/>
            <div className=''>
                <h1 className='font-bold capitalize text-2xl'>natalie wheeler</h1>
                <span className=''>
                    <p className='text-xl font-bold line-through text-gray-400'>+972546789</p>
                    <p className='text-xl font-bold text-[#50B426]'>los angelos Calefornia</p>
                    <p className='text-[14px] font-bold text-[#50B426]'>natalie@gmail.com</p>
                </span>
            </div>
        </div>
  </div>
  )
}
