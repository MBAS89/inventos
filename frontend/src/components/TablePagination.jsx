import React from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

export const TablePagination = () => {
  return (
    <div className='flex font-bold bg-white py-2 items-center justify-center px-8 relative'>
        <div className=' absolute left-5 font-medium '>10<span className=' mx-1'>|</span>200</div>
        <ol className="flex justify-center gap-1 text-xs ">
            <li>
                <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white text-gray-900 rtl:rotate-180">
                    <MdKeyboardArrowLeft className=''/>
                </a>
            </li>
            <li>
                <a href="#" className="block h-8 w-8 rounded border border-gray-200 bg-white text-center leading-8 text-gray-900">1</a>
            </li>
            <li className="block h-8 w-8 rounded border-[#50B426] bg-[#50B426] text-center leading-8 text-white">2</li>
            <li>
                <a href="#" className="block h-8 w-8 rounded border border-gray-200 bg-white text-center leading-8 text-gray-900">3</a>
            </li>
            <li>
                <a href="#" className="block h-8 w-8 rounded border border-gray-200 bg-white text-center leading-8 text-gray-900">4</a>
            </li>
            <li>
                <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white text-gray-900 rtl:rotate-180">
                    <MdKeyboardArrowRight className=''/>
                </a>
            </li>
        </ol>
    </div>
  )
}
