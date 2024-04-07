import React from 'react'

import { handleStatus } from '../../functions/handleStatus'

export const ProductPriceAndType = ({data, isLoading}) => {

    return (
    <div className='w-[80%] mx-auto'>
        <div className={` ${!isLoading && data.product.pieces_per_unit > 1 ? 'h-[18rem]' : 'h-[13rem]'} mt-10 flex gap-5`}>
            <div className='w-[90%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Product Price Informations</h2>
                <div className='flex items-center gap-10 justify-center my-10 ml-8'>
                    <div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/average-2.png" alt="average-2" className='bg-[#50B426] rounded-full p-2'/>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="font-bold">Unit Cost</p>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[18px] w-[70px] rounded-lg'></div>
                                ):(
                                    <p className="text-gray-400 font-bold">${data.product.cost_unit}</p>
                                )}
                            </div>
                        </div>
                        {!isLoading && data.product.pieces_per_unit > 1 && (
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                <img width="50" height="50" src="https://img.icons8.com/dusk/64/average-2.png" alt="average-2" className='bg-[#50B426] rounded-full p-2'/>
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="font-bold">Piece Price</p>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[18px] w-[70px] rounded-lg'></div>
                                    ):(
                                        <p className="text-gray-400 font-bold">${data.product.cost_piece}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/small-business.png" alt="small-business" className='bg-[#50B426] rounded-full p-2'/>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="font-bold">Unit Retail Price</p>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[18px] w-[70px] rounded-lg'></div>
                                ):(
                                    <p className="text-gray-400 font-bold">${data.product.retail_price_unit}</p>
                                )}
                            </div>
                        </div>
                        {!isLoading && data.product.pieces_per_unit > 1 && (
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                <img width="50" height="50" src="https://img.icons8.com/dusk/64/small-business.png" alt="small-business" className='bg-[#50B426] rounded-full p-2'/>
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="font-bold">Piece Retail Price</p>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[18px] w-[70px] rounded-lg'></div>
                                    ):(
                                        <p className="text-gray-400 font-bold">${data.product.retail_price_piece}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/move-by-trolley.png" alt="move-by-trolley" className='bg-[#50B426] rounded-full p-2'/>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="font-bold">Unit Wholesale Price</p>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[18px] w-[70px] rounded-lg'></div>
                                ):(
                                    <p className="text-gray-400 font-bold">${data.product.wholesale_price_unit}</p>
                                )}
                            </div>
                        </div>
                        {!isLoading && data.product.pieces_per_unit > 1 && (
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                <img width="50" height="50" src="https://img.icons8.com/dusk/64/move-by-trolley.png" alt="move-by-trolley" className='bg-[#50B426] rounded-full p-2'/>
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="font-bold">Piece Wholesale Price</p>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[18px] w-[70px] rounded-lg'></div>
                                    ):(
                                        <p className="text-gray-400 font-bold">${data.product.wholesale_price_piece}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/price-tag.png" alt="price-tag" className='bg-[#50B426] rounded-full p-2'/>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="font-bold">Unit Sale Price</p>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[18px] w-[70px] rounded-lg'></div>
                                ):(
                                    <p className="text-gray-400 font-bold">${data.product.on_sale ? data.product.sale_price_unit : '0'}</p>
                                )}
                            </div>
                        </div>
                        {!isLoading && data.product.pieces_per_unit > 1 && (
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                <img width="50" height="50" src="https://img.icons8.com/dusk/64/price-tag.png" alt="price-tag" className='bg-[#50B426] rounded-full p-2'/>
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="font-bold">Piece Sale Price</p>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[18px] w-[70px] rounded-lg'></div>
                                    ):(
                                        <p className="text-gray-400 font-bold">${data.product.on_sale ? data.product.sale_price_piece : '0'}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/discount.png" alt="discount" className='bg-[#50B426] rounded-full p-2'/>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="font-bold">Unit On Sale?</p>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[18px] w-[50px] rounded-lg'></div>
                                ):(
                                    <p class="text-gray-400">
                                        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">{handleStatus(data.product.on_sale)}</span>
                                    </p>
                                )}
                                
                            </div>
                        </div>
                        {!isLoading && data.product.pieces_per_unit > 1 && (
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                <img width="50" height="50" src="https://img.icons8.com/dusk/64/discount.png" alt="discount" className='bg-[#50B426] rounded-full p-2'/>
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="font-bold">Piece On Sale?</p>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[18px] w-[50px] rounded-lg'></div>
                                    ):(
                                        <p className="text-gray-400">
                                            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">{handleStatus(data.product.on_sale)}</span>
                                        </p>
                                    )}
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='w-[15%] rounded-sm p-8 shadow-xl bg-white'>
                <h3 className="mt-0.5 text-lg font-bold text-gray-900">Category</h3>
                <div className="mt-4 flex flex-col gap-1">
                    {isLoading ? (
                        <div className='bg-slate-500 animate-pulse h-[18px] w-[100px] rounded-lg'></div>
                    ):(
                        <span className="min-w-[60%] rounded-full bg-gray-200 px-2.5 py-0.5 text-sm text-[#50B426]">
                            {data.product.category_id ? data.product.category.name: '-'}
                        </span>
                    )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-5">Brand</h3>
                <div className="mt-4 flex flex-col gap-1">
                    {isLoading ? (
                        <div className='bg-slate-500 animate-pulse h-[18px] w-[100px] rounded-lg'></div>
                    ):(
                        <span className="min-w-[60%] rounded-full bg-gray-200 px-2.5 py-0.5 text-sm text-[#50B426]">
                            {data.product.brand_id ? data.product.brand.name : '-'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
