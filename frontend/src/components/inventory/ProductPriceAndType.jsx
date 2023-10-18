import React from 'react'

export const ProductPriceAndType = () => {
    return (
    <div className='w-[80%] mx-auto'>
        <div className='h-[15rem] mt-10 flex gap-5'>
            <div className='w-[80%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Product Price Informations</h2>
                <div className='flex items-center gap-10 h-[90%] pr-16 pl-10'>
                    <div className='flex gap-20'>
                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/average-2.png" alt="average-2" className='bg-[#50B426] rounded-full p-2'/>
                            <div class="mt-1.5 sm:mt-0">
                                <p class="font-bold">Price</p>
                                <p class="text-gray-400">$100</p>
                            </div>
                        </div>
                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/small-business.png" alt="small-business" className='bg-[#50B426] rounded-full p-2'/>
                            <div class="mt-1.5 sm:mt-0">
                                <p class="font-bold">Retail Price</p>
                                <p class="text-gray-400">$100</p>
                            </div>
                        </div>
                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/move-by-trolley.png" alt="move-by-trolley" className='bg-[#50B426] rounded-full p-2'/>
                            <div class="mt-1.5 sm:mt-0">
                                <p class="font-bold">Wholesale Price</p>
                                <p class="text-gray-400">$100</p>
                            </div>
                        </div>
                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/price-tag.png" alt="price-tag" className='bg-[#50B426] rounded-full p-2'/>
                            <div class="mt-1.5 sm:mt-0">
                                <p class="font-bold">Sale Price</p>
                                <p class="text-gray-400">$100</p>
                            </div>
                        </div>
                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/discount.png" alt="discount" className='bg-[#50B426] rounded-full p-2'/>
                            <div class="mt-1.5 sm:mt-0">
                                <p class="font-bold">On Sale</p>
                                <p class="text-gray-400"><span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">Yes</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[20%] rounded-sm p-8 shadow-xl bg-white'>
                <h3 className="mt-0.5 text-lg font-bold text-gray-900">Product Type</h3>
                <div className="mt-4 flex flex-col gap-1">
                    <span className="w-[50%] rounded-full bg-gray-200 px-2.5 py-0.5 text-sm text-[#50B426]">
                        Category
                    </span>
                    <span className="w-[50%] whitespace-nowrap rounded-full bg-gray-200 px-2.5 py-0.5 text-sm text-[#50B426]">
                        Brand
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
