import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { AiOutlinePlus } from "react-icons/ai"

export const SearchComponents = ({ placeholder, actionName, setOpenPopup }) => {
  return (
    <div className='flex justify-between items-center p-4'>
      <div className="relative w-[500px]">
        <input type="text" id="Search" placeholder={placeholder} className="w-[500px] outline-none rounded-md border-[#50B426] border-[2px] border-solid py-2 ps-3 pe-5 shadow-sm sm:text-sm"/>
          <button type="button" className="text-gray-600 hover:text-gray-700 absolute right-2 top-2">
            <BiSearch className='text-[1.5rem]'/>
          </button>
      </div>
      <div>
        <button onClick={() => setOpenPopup(true)} className="w-full flex justify-center items-center gap-4 rounded border border-[#50B426] bg-[#50B426] px-8 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-[#50B426]">
          <span>{actionName}</span> 
          <AiOutlinePlus className='text-lg'/>
        </button>
      </div>     
    </div>
  )
}
