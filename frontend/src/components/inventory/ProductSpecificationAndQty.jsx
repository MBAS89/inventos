import React from 'react'

export const ProductSpecificationAndQty = ({data, isLoading}) => {

    return (
        <div className='w-[80%] mx-auto'>
            <div className='min-h-[15rem] mt-10 flex gap-5'>
                <div className='w-[60%] bg-white rounded-md border-gray-200 border-2 p-4'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Specifications</h2>
                    {isLoading ? (
                        <div className='bg-slate-500 animate-pulse h-[80%] w-full rounded-lg'></div>
                    ) : (
                        <p class="mt-5 line-clamp-3 text-sm/relaxed text-gray-500 px-5 h-[80%]">
                            {data.product.description ? data.product.description : 'No Specifications'}
                        </p>
                    )}
                </div>
                <div className='bg-white w-[40%] rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center items-center'>
                    {isLoading ? (
                        <div className='bg-slate-500 animate-pulse h-[5rem] w-[50%] rounded-lg'></div>
                    ) : (
                        <dd className="font-extrabold text-[#50B426] text-9xl">
                            {data.product.qty}
                        </dd>
                    )}
                    <dt className="text-lg font-medium text-gray-500">
                        Quantity
                    </dt>
                </div> 
            </div>
        </div>
  )
}
