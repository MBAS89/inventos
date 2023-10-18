import React from 'react'

export const ProductSpecificationAndQty = () => {
    return (
    <div className='w-[80%] mx-auto'>
        <div className='h-[15rem] mt-10 flex gap-5'>
            <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Specifications</h2>
                <p class="mt-5 line-clamp-3 text-sm/relaxed text-gray-500 px-5 h-[80%]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                    dolores, possimus pariatur animi temporibus nesciunt praesentium dolore sed
                    nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
                    voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
                    Molestias explicabo corporis voluptatem?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestias explicabo corporis voluptatem?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestias explicabo corporis voluptatem?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestias explicabo corporis voluptatem?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
            </div>
            <div className='bg-white w-[40%] h-full rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center'>
                <dd className="font-extrabold text-[#50B426] text-9xl">
                    478
                </dd>
                <dt className="text-lg font-medium text-gray-500">
                    Quantity
                </dt>
            </div> 
        </div>
    </div>
  )
}
