import React from 'react'
import millify from 'millify'

export const SuppliersProfile = ({ data, isLoading }) => {
    return (
    <div className='w-[80%] mx-auto'>
        <div className='h-[15rem] mt-10 flex gap-5'>
            <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4 '>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Supplier Information</h2>
                <div className='flex  items-center gap-10 h-[90%] pr-16 pl-10 '>
                    <div className=' bg-[#50B426] rounded-full w-[128px] h-[128px]'>
                        {isLoading ? (
                            <div className='bg-slate-500 animate-pulse h-[128px] w-[128px] rounded-full'></div>
                        ) : (
                            <img src={data.supplier.image} className='rounded-full p-2 w-full h-full' alt='customer info image' />
                        )}
                    </div>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <h5 className='text-gray-400'>Full Name</h5>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[20px] w-[120px] rounded-lg'></div>
                                ) : (
                                    <p className='font-bold'>{data.supplier.supplier_name}</p>
                                )}
                            </div>
                            <div>
                                <h5 className='text-gray-400'>Phone</h5>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[20px] w-[120px] rounded-lg'></div>
                                ) : (
                                    <p className='font-bold'>{data.supplier.phone_number}</p>
                                )}

                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <h5 className='text-gray-400'>Address</h5>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                ) : (
                                    <p className='font-bold'>{data.supplier.address}</p>
                                )}
                            </div>
                            <div>
                                <h5 className='text-gray-400'>Email</h5>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                ) : (
                                    <p className='font-bold'>{data.supplier.email}</p>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white w-[40%] h-full rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center'>
                {isLoading ? (
                    <dd className='bg-slate-500 animate-pulse h-[65px] w-[140px] rounded-lg'></dd>
                ):(
                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                        ${millify(data.supplier.total_transactions)}
                    </dd>
                )}
                <dt className="text-lg font-medium text-gray-500">
                Total Transactions
                </dt>
            </div> 
        </div>
    </div>
  )
}
