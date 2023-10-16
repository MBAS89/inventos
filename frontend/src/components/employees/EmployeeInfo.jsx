import React from 'react'
import { AiOutlineMail, AiOutlinePhone, AiOutlineCloseCircle } from "react-icons/ai"
import { RiAdminLine } from "react-icons/ri"

export const EmployeeInfo = () => {

    const Permissions = [
        'inventory','cahser', 'edit', 'delete'
    ]

    return (
        <div className='w-[60%] mx-auto'>
            <div className='h-[15rem] mt-10 flex gap-5'>
                <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Employee Details</h2>
                    <div className='flex justify-between items-center h-[90%] pr-16 pl-10'>
                        <div className=' bg-[#50B426] rounded-full w-[128px] h-[128px] p-1'>
                            <img  width="128" height="128"  src="https://res.cloudinary.com/dcbc4t7bq/image/upload/v1687997283/IMG_-o3dpre_tquqrs.jpg" className='rounded-full' alt='employee image' />
                        </div>
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <h5 className='text-gray-400'>Full Name</h5>
                                    <p className='font-bold'>Takuma Asahi</p>
                                </div>
                                <div>
                                    <h5 className='text-gray-400'>Department</h5>
                                    <p className='font-bold'>wholesale</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <h5 className='text-gray-400'>Address</h5>
                                    <p className='font-bold'>United States-Winchester</p>
                                </div>
                                <div>
                                    <h5 className='text-gray-400'>Work Type</h5>
                                    <p className='font-bold'>Full Time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white w-[40%] h-full rounded-md border-2 border-gray-200 p-4'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Permissions</h2>
                    <div className='flex items-center gap-3 flex-wrap h-[55%] pl-4'>
                        {Permissions.map((permission, index)=>(
                            <span key={index} className="whitespace-nowrap capitalize rounded-full bg-green-200 px-4 py-2 text-sm text-green-700">
                            {permission}
                            </span>
                        ))}

                    </div>
                    <button className="w-[90%] mx-auto flex justify-center items-center gap-4 rounded border border-[#50B426] hover:bg-[#50B426] px-12 py-3 text-sm font-medium hover:text-white bg-transparent text-[#50B426] focus:outline-none active:bg-green-500 active:text-white">
                    <span>Edit/Add Permissions</span> 
                    <RiAdminLine className='text-lg'/>
                    </button>
                </div>
            </div>
            <div className='flex mt-4 gap-5'>
                <div className='h-[8rem] w-[60%] bg-white border-gray-200 border-2 p-4 rounded-md'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Contact</h2>
                    <div className='flex justify-evenly p-5'>
                        <div className='flex justify-center items-center gap-3'>
                            <AiOutlinePhone className='text-[1.5rem] text-[#50B426]'/>
                            <h5>+12734076561</h5>
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            <AiOutlineMail className='text-[1.5rem] text-[#50B426]'/>
                            <h5>example2351@gmail.com</h5>
                        </div>
                    </div>
                </div>
                <div className='bg-white w-[40%] h-[8rem] rounded-md border-2 border-gray-200 p-4 '>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Other Actions</h2>
                    <div className='pl-4'>
                        <button className='flex items-center gap-2 py-1'>
                            <AiOutlineCloseCircle className="text-red-500 text-[1.3rem]" /> <span className='capitalize text-red-500'>cancel employment</span>
                        </button>
                        <button className='flex items-center gap-2 py-1'>
                            <AiOutlineCloseCircle className="text-red-500 text-[1.3rem]" /> <span className='capitalize text-red-500'>cancel employment</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
