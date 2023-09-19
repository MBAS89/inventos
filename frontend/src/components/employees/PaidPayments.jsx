import React from 'react'
import { TableHead } from '../TableHead'

export const PaidPayments = () => {
    const headItems = [
        {
            title:"Month",
        },{
            title:"Payment"
        },{
            title:"claimed"
        },{
            title:"action"
        }
    ]

    const data = [
        {
            month:"April",
            payment:1700,
            claimed:true
           
        },{
            month:"May",
            payment:1700,
            claimed:true
           
        },{
            month:"June",
            payment:1700,
            claimed:false
           
        },{
            month:"July",
            payment:1700,
            claimed:true
           
        }
    ]

    const handleOnclaimedStatus = (status) => {
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
        <div className='w-[60%] mx-auto'>
            <div className='rounded-md border-2 border-gray-1700 p-4 bg-white mt-4 w-[59%] min-h-[10rem]'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Paid Payments</h2>
                {data.length > 0 ?
                <table className="min-w-full divide-y-2 divide-gray-1700 bg-white text-sm rounded-md ">
                    <TableHead headItems={headItems} selectAll={true} dont={true}/>
                    <tbody className="divide-y divide-gray-1700">
                        {data.map((item, index) => (
                            <tr key={index} className=' cursor-pointer hover:bg-sclaimed-100'>
                                <td className="px-4 py-2 font-medium text-gray-900">
                                    {item.month}
                                </td>
                                <td className="px-4 py-2 text-[#0070E0] font-bold">${item.payment}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    {handleOnclaimedStatus(item.claimed)}
                                </td>
                                <td>
                                    <button className='w-[40px] ml-4 h-[30px] hover:bg-[#50B426] border-[2px] border-[#50B426] border-solid hover:text-white rounded-md bg-transparent text-[#50B426]'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :(
                    <div className='text-center text-[1.4rem] mt-8 text-[#50B426]'>
                        There are no payments Paid
                    </div>
                )}
            </div>
        </div>
    )
}
