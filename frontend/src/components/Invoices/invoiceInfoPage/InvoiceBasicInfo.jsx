import React from 'react'
import millify from 'millify'

//icons
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { handleStatus } from '../../../functions/HandleInvoiceStatus';
import { IoPrint } from "react-icons/io5";

export const InvoiceBasicInfo = ({data}) => {

    const naviagte = useNavigate()

    return (
        <div className='w-[80%] mx-auto'>
            <div className='h-[15rem] mt-10 flex gap-5'>
                <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Invoice Information</h2>
                        {data ? (
                            <div className='font-bold text-[1.3rem] text-[#50B426]'>#{data.id}</div>
                        ) : (
                            <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                        )}
                    </div>
                    <div className='flex pl-4 w-full justify-center gap-4 mt-5'>
                        {data ? 
                            data.customerId ? 
                            <div className='p-4 border-2 border-[#50B426] rounded-lg w-[60%]'>
                                <div className='flex justify-between'>
                                    <h4 className='font-bold'>Customer Info</h4>
                                    <MdOutlineRemoveRedEye onClick={() => naviagte(`/dashboard/customers/single-customer/${data.customer.id}`)} className='text-[#50B426] text-[1.2rem] cursor-pointer hover:scale-125'/>
                                </div>
                                <div className='flex gap-5 mt-4 items-center'>
                                    <div className=' bg-[#50B426] rounded-full w-[60px] h-[60px] p-1'>
                                        <img src={data.customer.image} className='rounded-full w-full h-full' alt={`customer ${data.customer.full_name} image`} />
                                    </div>
                                    <div>
                                        <h5 className='text-gray-600'>Full Name</h5>
                                        <p className='font-bold'>{data.customer.full_name}</p>
                                    </div>
                                    {data.customer.customerType.wholeSalePrice === true ? (
                                        <div>
                                            <h5 className='text-gray-600'>Wholesaler</h5>
                                            <p className='font-bold'>{data.customer.customerType.wholeSalePrice ? 'true' : 'false'}</p>
                                        </div>
                                    ) : (
                                    <div>
                                        <h5 className='text-gray-600'>Discount Value</h5>
                                        <p className='font-bold'>{data.customer.customerType.discount_value}%</p>
                                    </div>
                                    )}
                                </div>
                            </div>
                            :
                            <div className='p-4 border-2 border-[#50B426] rounded-lg w-[60%]'>
                                <div className='flex justify-between'>
                                    <h4 className='font-bold'>Customer Info</h4>
                                </div>
                                <div className='flex gap-5 mt-4 items-center justify-center'>
                                    <div className=' text-gray-400 mt-4 font-bold italic'>No Customer Selected For Invoice</div>
                                </div>
                            </div>
                        :
                        <div className='p-4 border-2 border-[#50B426] rounded-lg pb-5 w-[60%]'>
                            <div className='flex justify-between'>
                                <h4 className='font-bold'>Customer Info</h4>
                            </div>
                            <div className='flex gap-5 mt-4 items-center'>
                                <div className='bg-slate-500 animate-pulse h-[60px] w-[60px] rounded-full'></div>
                                <div>
                                    <h5 className='text-gray-600'>Full Name</h5>
                                    <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                </div>
                                <div>
                                    <h5 className='text-gray-600'>Discount Value</h5>
                                    <div className='bg-slate-500 animate-pulse h-[20px] w-[80px] rounded-lg'></div>
                                </div>
                            </div>
                        </div>
                        }
                        {data ? data.employeeId ? (
                            <div className='p-4 border-2 border-[#50B426] rounded-lg w-[40%]'>
                                <div className='flex justify-between'>
                                    <h4 className='font-bold'>Casher Info</h4>
                                    <MdOutlineRemoveRedEye onClick={() => naviagte(`/dashboard/employees/employee-information/${data.employee.id}`)} className='text-[#50B426] text-[1.2rem] cursor-pointer hover:scale-125'/>
                                </div>
                                <div className='flex gap-5 mt-4 items-center'>
                                    <div className=' bg-[#50B426] rounded-full w-[65px] h-[65px] p-1'>
                                        <img src={data.employee.image} className=' rounded-full w-full h-full' alt={`employee ${data.employee.full_name} image`} />
                                    </div>
                                    <div>
                                        <h5 className='text-gray-600'>Full Name</h5>
                                        <p className='font-bold'>{data.employee.full_name}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='p-4 border-2 border-[#50B426] rounded-lg w-[40%]'>
                                <h5 className='text-gray-600'>Full Name</h5>
                                <p className='font-bold'>{data.employee_name}</p>
                            </div>
                        )
                        :
                            <div className='p-4 border-2 border-[#50B426] rounded-lg pb-5 w-[40%]'>
                                <div className='flex justify-between'>
                                    <h4 className='font-bold'>Casher Info</h4>
                                </div>
                                <div className='flex gap-5 mt-4 items-center'>
                                    <div className='bg-slate-500 animate-pulse h-[60px] w-[60px] rounded-full'></div>
                                    <div>
                                        <h5 className='text-gray-600'>Full Name</h5>
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='w-[60%] flex gap-4'>
                    <div className='bg-white w-[60%] h-full rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center items-center'>
                        {data ? (
                            <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                                ${data.total_to_pay.toFixed(1)}
                            </dd>
                        ) : (
                            <dd className='bg-slate-500 animate-pulse h-[65px] w-[140px] rounded-lg'></dd>
                        )}
                        <dt className="text-lg font-medium text-gray-500">
                            Total To Pay
                        </dt>
                    </div>
                    <div className='bg-white relative w-[60%] h-full rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center items-center'>
                        {data ? (
                            <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl w-full">
                                {handleStatus(data.status)}
                            </dd>
                        ) : (
                            <dd className='bg-slate-500 animate-pulse h-[65px] w-[140px] rounded-lg'></dd>
                        )}
                        <dt className="text-lg font-medium text-gray-500">
                            Status
                        </dt>
                        <IoPrint className='absolute text-[1.8rem] right-5 top-5 cursor-pointer text-[#50B426] hover:scale-125'/>
                    </div>  
                </div>
            </div>
        </div>
    )
}
