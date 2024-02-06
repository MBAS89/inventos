import React from 'react'
import millify from "millify";

export const CustomersProfile = ({isLoading, customer}) => {
  return (
    <div className='w-[80%] mx-auto'>
        {isLoading ? (
            <div>
                Loading...
            </div>
        ):
        <div className='h-[15rem] mt-10 flex gap-5'>
            <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Customer Information</h2>
                <div className='flex items-center gap-10 h-[90%] pr-16 pl-10 '>
                    <div className=' bg-[#50B426] rounded-full w-[128px] h-[128px] p-1'>
                        <img  width="128" height="128"  src={customer.image} className='rounded-full' alt={`customer ${customer.full_name} image`} />
                    </div>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <h5 className='text-gray-400'>Full Name</h5>
                                <p className='font-bold'>{customer.full_name}</p>
                            </div>
                            <div>
                                <h5 className='text-gray-400'>Phone</h5>
                                <p className='font-bold'>{customer.phone_number}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <h5 className='text-gray-400'>Address</h5>
                                <p className='font-bold'>{customer.address}</p>
                            </div>
                            <div>
                                <h5 className='text-gray-400'>Email</h5>
                                <p className='font-bold'>{customer.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white w-[40%] h-full rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center'>
                <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                    ${millify(customer.total_transactions)}
                </dd>
                <dt className="text-lg font-medium text-gray-500">
                    Total Transactions
                </dt>
            </div> 
        </div>
        }
    </div>
  )
}


