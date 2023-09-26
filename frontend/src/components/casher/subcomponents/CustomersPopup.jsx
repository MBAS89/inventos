import React from 'react'

import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiSearch } from 'react-icons/bi'

import { TableHead } from '../../TableHead'


export const CustomersPopup = () => {
    const headItems = [
        {
            title:"customer info",
        },{
            title:"type"
        }
    ]
    
    const data = [
        {
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            type:"wholesale",
           
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            type:"wholesale",
           
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            type:"wholesale",
           
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            type:"wholesale",
           
        }
    ]

    return (
    <section className="absolute left-3 top-16 w-[95%] z-10 bg-gray-100 overflow-hidden border-2 border-solid border-gray-200 rounded-lg shadow-2xl h-[25rem]">
        <div className='flex justify-between items-center px-4 py-4'>
            <div className="relative">
                <input type="text" id="Search" placeholder="Add by Item Code" className="w-[300px] rounded-md border-gray-200 py-2.5 ps-3 pe-5 shadow-sm sm:text-sm"/>
                <button type="button" className="text-gray-600 hover:text-gray-700 absolute right-2 top-2">
                    <BiSearch className='text-[1.5rem]'/>
                </button>
            </div>
            <div>
                <AiOutlineCloseCircle className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105'/>
            </div>
        </div>
        <div className="overflow-x-auto px-4">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} selectAll={true} dont={true}/>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index} className=' cursor-pointer hover:bg-slate-50'>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                    <div className=' bg-gray-100 p-1 rounded-md flex items-center justify-center'>
                                        <img width="40" height="40" src={item.image} alt="nut"/>
                                    </div>
                                    <div>
                                        <span className='capitalize'>{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${item.type === "wholesale" ? 'text-purple-700 bg-purple-100' : 'text-blue-500 bg-blue-100'}`}>
                                        {item.type}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </section>
  )
}
