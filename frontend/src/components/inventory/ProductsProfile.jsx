import React from 'react'

export const ProductsProfile = ({data, isLoading}) => {

    return (
        <div className='w-[80%] mx-auto'>
            <div className='h-[15rem] mt-10 flex gap-5'>
                <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4 '>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Product Information</h2>
                    <div className='flex  items-center gap-10 mt-8 pr-16 pl-10 '>
                        {isLoading ? (
                            <div className='bg-slate-500 animate-pulse h-[128px] w-[128px] rounded-full'></div>
                        ):(
                            <div className=' bg-[#50B426] rounded-full w-[128px] h-[128px] p-1'>
                                <img  src={data.product.image} className='rounded-full w-full h-full' alt='customer info image' />
                            </div>
                        )}
                        <div className='flex gap-[14rem]'>
                            <div className='flex flex-col gap-8'>
                                <div>
                                    <h5 className='text-gray-400'>Product Name</h5>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    ):(
                                        <p className='font-bold'>{data.product.name}</p>
                                    )}
                                </div>
                                <div>
                                    <h5 className='text-gray-400'>Unit Category</h5>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    ):(
                                        <p className='font-bold'>{data.product.unit_catergory}</p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <div>
                                    <h5 className='text-gray-400'>Sku</h5>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    ):(
                                        <p className='font-bold'>{data.product.sku}</p>
                                    )}
                                </div>
                                <div>
                                    <h5 className='text-gray-400'>Unit</h5>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    ):(
                                        <p className='font-bold'>{data.product.unit}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white w-[40%] h-full rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center'>
                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                        $4.8m
                    </dd>
                    <dt className="text-lg font-medium text-gray-500">
                        Total Sales
                    </dt>
                </div> 
            </div>
        </div>
    )
}
