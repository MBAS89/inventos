import React from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'

//icons
import { MdOutlineEmail } from "react-icons/md"
import { AiOutlinePhone } from "react-icons/ai"
export const ExpensesTable = ({headItems}) => {
    const data = [
        {
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        },{
            info:"Ilie Corina",
            amount:120,
            type:"wholesale",
            createdDate:"24/05/1995",
            description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            updatedDate:"24/05/1995"
        }
    ]

    return (
        <div className='px-6 mt-2'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} />
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index} className=' h-16'>
                                <td className="px-4 py-2">
                                    <input className="h-5 w-5 rounded border-gray-300" type="checkbox" id="Row1"/>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                    <div className='w-[80%]'>
                                        <span className='capitalize'>{item.info}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-bold text-[#4454DC]">${item.amount}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm text-purple-700 bg-purple-100`}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700 w-[40%]">{item.description}</td>
                                <td className="px-4 py-2 text-gray-700">{item.createdDate}</td>
                                <td className="px-4 py-2 text-gray-700">{item.updatedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination />
            </div>
        </div>
    )
}
