import React from 'react'

//icons
import { MdKeyboardArrowRight } from "react-icons/md"

export const Breadcrumb = ({ from, current }) => {
    return (
        <div className='w-[60%] mx-auto pt-20'>
            <nav aria-label="Breadcrumb" >
            <ol className="flex items-center gap-1 text-sm text-gray-600">
                <li>
                    <a href="#" className="block transition text-2xl font-bold text-[#50B426] hover:text-green-700"> {from} </a>
                </li>

                <li>
                    <MdKeyboardArrowRight className='text-[2rem]'/>
                </li>

                <li>
                    <a href="#" className="block transition text-2xl hover:text-gray-700"> {current} </a>
                </li>
            </ol>
        </nav>
        </div>
    )
}
