import React from 'react'

//reusable components
import { TableHead } from '../../TableHead';

//icons
import { MdOutlineEdit, MdDeleteOutline, MdErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { BsSortUp } from "react-icons/bs";
import { BsSortDownAlt } from "react-icons/bs";
import { BiLoaderCircle } from 'react-icons/bi';
import { CgAddR } from "react-icons/cg";



export const EmployeePayments = () => {
    const headItems = [
        {
            title:"date",
        },{
            title:"Amount"
        },{
            title:"Paid Date"
        },{
            title:"Hours"
        },{
            title:"Status"
        },{
            title:"action"
        }
    ]

    const statusConfig = {
        paid: {
            bgColor: "bg-emerald-100",
            textColor: "text-emerald-700",
            icon: <FaRegCheckCircle className='scale-125' />,
            label: "Paid"
        },
        due: {
            bgColor: "bg-[#ff9130a8]",
            textColor: "text-[#ffffff]",
            icon: <IoTimeOutline className='scale-125' />,
            label: "Due"
        },
        failed: {
            bgColor: "bg-[#000000]",
            textColor: "text-[#ffffff]",
            icon: <MdErrorOutline className='scale-125' />,
            label: "Failed"
        },
        canceled: {
            bgColor: "bg-[#ff0000a8]",
            textColor: "text-[#ffffff]",
            icon: <ImCancelCircle className='scale-125' />,
            label: "Canceled"
        }
    };
    
    const handleOnclaimedStatus = (status) => {
        const config = statusConfig[status];
    
        if (config) {
            return (
                <div className={`flex items-center justify-center gap-2 rounded-full ${config.bgColor} w-[7rem] py-2 ${config.textColor}`}>
                    {config.icon}
                    <span className='capitalize'>{config.label}</span>
                </div>
            );
        }
    
        return null;
    };


    return (
        <div className='bg-white h-[35rem] w-[65%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <h2 className='font-bold text-[1.6rem]'>Latest Employee Payments</h2>
            <table className="min-w-full divide-y-2 divide-gray-1700 bg-white text-sm rounded-md mt-10">
                <TableHead headItems={headItems} selectAll={true} dont={true} withoutSelecthead={true}/>
                <tbody className="divide-y divide-gray-1700">
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
