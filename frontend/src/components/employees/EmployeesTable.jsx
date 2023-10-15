import React from 'react'

import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'

//icons
import { MdOutlineEmail } from "react-icons/md"
import { AiOutlinePhone } from "react-icons/ai"

export const EmployeesTable = ({ headItems }) => {

    const data = [
        {
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"part time",
            contract:false,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"full time",
            contract:true,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"remote",
            contract:false,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"remote",
            contract:false,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"part time",
            contract:true,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"full time",
            contract:false,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"remote",
            contract:false,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"remote",
            contract:true,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"part time",
            contract:false,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },{
            image:"https://img.icons8.com/dusk/64/futurama-leela.png",
            name:"Takuma Asahi",
            email:"example2351@gmail.com",
            phone:"+12734076561",
            address:"United States-Winchester",
            department:"wholesale",
            workType:"full time",
            contract:false,
            totalPaid:22000,
            totalDue:10000,
            salary:"20k",
            employmentDate:"24/05/1995",
            endOfService:"24/05/1995",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        }
    ]

    const handleContract = (status) => {
        if(status === true){
            return(
                <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    Yes
                </span>
            )
        }else{ 
            return(
                <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                    No
                </span>
            )
        }
    } 

    return (
        <div className='px-6 mt-2'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} />
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2">
                                    <input className="h-5 w-5 rounded border-gray-300" type="checkbox" id="Row1"/>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                    <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                        <img width="40" height="40" src={item.image} alt="nut"/>
                                    </div>
                                    <div className='w-[80%]'>
                                        <span className='capitalize'>{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail className='text-[1.2rem]'/>
                                        <span>{item.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <AiOutlinePhone className='text-[1.2rem]'/>
                                        <span>{item.phone}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{item.address}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm text-purple-700 bg-purple-100`}>
                                        {item.department}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap capitalize rounded-full px-2.5 py-0.5 text-sm text-purple-700 bg-purple-100`}>
                                        {item.workType}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    {handleContract(item.contract)}
                                </td>
                                <td className="px-4 py-2 text-[#50B426] font-bold">${item.totalPaid}</td>
                                <td className="px-4 py-2 font-bold text-[#4454DC]">${item.totalDue}</td>
                                <td className="px-4 py-2 text-orange-400 font-bold">{item.salary}</td>
                                <td className="px-4 py-2 text-gray-700">{item.employmentDate}</td>
                                <td className="px-4 py-2 text-gray-700">{item.endOfService}</td>
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
