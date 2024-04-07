import React from 'react'
import { handleStatus } from '../../functions/handleStatus'
import { format, parseISO } from 'date-fns'

export const ProductOldInventories = ({data, isLoading}) => {

    return (
        <div className='w-[80%] p-5 mt-10 mx-auto bg-white rounded-md'>
            <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Product Old Inventories Record</h2>
            <div className='flex flex-col gap-10'>
                {!isLoading ? data.product.old_inventories.map((inventory) => (
                    <div className='mt-2 border-2 border-gray-200 rounded-lg w-[95%] mx-auto relative'>
                        <div className='absolute left-10 top-4 text-gray-500'>
                            <h4>Outer Invoice ID: <span className='font-bold text-[#50B426]'>#{inventory.outer_invoice_id}</span></h4>
                        </div>
                        <div className='flex items-center gap-10 justify-center  mt-14 mb-10'>
                            <div>
                                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <img width="50" height="50" src="https://img.icons8.com/dusk/64/average-2.png" alt="average-2" className='bg-[#50B426] rounded-full p-2'/>
                                    <div className="mt-1.5 sm:mt-0">
                                        <p className="font-bold">Unit Cost</p>
                                        <p className="text-gray-400 font-bold">${inventory.cost_unit}</p>
                                    </div>
                                </div>
                                {inventory.pieces_per_unit > 1 && (
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                        <img width="50" height="50" src="https://img.icons8.com/dusk/64/average-2.png" alt="average-2" className='bg-[#50B426] rounded-full p-2'/>
                                        <div className="mt-1.5 sm:mt-0">
                                            <p className="font-bold">Piece Price</p>
                                            <p className="text-gray-400 font-bold">${inventory.cost_piece}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <img width="50" height="50" src="https://img.icons8.com/dusk/64/small-business.png" alt="small-business" className='bg-[#50B426] rounded-full p-2'/>
                                    <div className="mt-1.5 sm:mt-0">
                                        <p className="font-bold">Unit Retail Price</p>
                                        <p className="text-gray-400 font-bold">${inventory.retail_price_unit}</p>
                                    </div>
                                </div>
                                {inventory.pieces_per_unit > 1 && (
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                        <img width="50" height="50" src="https://img.icons8.com/dusk/64/small-business.png" alt="small-business" className='bg-[#50B426] rounded-full p-2'/>
                                        <div className="mt-1.5 sm:mt-0">
                                            <p className="font-bold">Piece Retail Price</p>
                                            <p className="text-gray-400 font-bold">${inventory.retail_price_piece}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <img width="50" height="50" src="https://img.icons8.com/dusk/64/move-by-trolley.png" alt="move-by-trolley" className='bg-[#50B426] rounded-full p-2'/>
                                    <div className="mt-1.5 sm:mt-0">
                                        <p className="font-bold">Unit Wholesale Price</p>
                                        <p className="text-gray-400 font-bold">${inventory.wholesale_price_unit}</p>
                                    </div>
                                </div>
                                {inventory.pieces_per_unit > 1 && (
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                        <img width="50" height="50" src="https://img.icons8.com/dusk/64/move-by-trolley.png" alt="move-by-trolley" className='bg-[#50B426] rounded-full p-2'/>
                                        <div className="mt-1.5 sm:mt-0">
                                            <p className="font-bold">Piece Wholesale Price</p>
                                            <p className="text-gray-400 font-bold">${inventory.wholesale_price_piece}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <img width="50" height="50" src="https://img.icons8.com/dusk/64/price-tag.png" alt="price-tag" className='bg-[#50B426] rounded-full p-2'/>
                                    <div className="mt-1.5 sm:mt-0">
                                        <p className="font-bold">Unit Sale Price</p>
                                        <p className="text-gray-400 font-bold">${inventory.on_sale ? inventory.sale_price_unit : '0'}</p>
                                    </div>
                                </div>
                                {inventory.pieces_per_unit > 1 && (
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                        <img width="50" height="50" src="https://img.icons8.com/dusk/64/price-tag.png" alt="price-tag" className='bg-[#50B426] rounded-full p-2'/>
                                        <div className="mt-1.5 sm:mt-0">
                                            <p className="font-bold">Piece Sale Price</p>
                                            <p className="text-gray-400 font-bold">${inventory.on_sale ? inventory.sale_price_piece : '0'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <img width="50" height="50" src="https://img.icons8.com/dusk/64/discount.png" alt="discount" className='bg-[#50B426] rounded-full p-2'/>
                                    <div className="mt-1.5 sm:mt-0">
                                        <p className="font-bold">Unit On Sale?</p>
                                        <p class="text-gray-400">
                                            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">{handleStatus(inventory.on_sale)}</span>
                                        </p>
                                    </div>
                                </div>
                                {inventory.pieces_per_unit > 1 && (
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 mt-9">
                                        <img width="50" height="50" src="https://img.icons8.com/dusk/64/discount.png" alt="discount" className='bg-[#50B426] rounded-full p-2'/>
                                        <div className="mt-1.5 sm:mt-0">
                                            <p className="font-bold">Piece On Sale?</p>
                                            <p className="text-gray-400">
                                                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">{handleStatus(inventory.on_sale)}</span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                    <img width="50" height="50" src="https://img.icons8.com/fluency/64/warehouse-1.png" alt="warehouse-1" className='bg-[#50B426] rounded-full p-2'/>
                                    <div className="mt-1.5 sm:mt-0">
                                        <p className="font-bold">Inventory QTY</p>
                                        <p className="text-blue-400 font-bold">{inventory.qty}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full text-gray-500 justify-between flex p-3'>
                            <div>
                                Created At: {format(parseISO(inventory.createdAt), "dd/MM/yyyy h:mmaaa")}
                            </div>
                            <div>
                                Updated At: {format(parseISO(inventory.updatedAt), "dd/MM/yyyy h:mmaaa")}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className='w-[95%] mx-auto flex flex-col gap-10'>
                        <div className='bg-slate-500 animate-pulse h-[8rem] w-full rounded-lg'></div>
                        <div className='bg-slate-500 animate-pulse h-[8rem] w-full rounded-lg'></div>
                        <div className='bg-slate-500 animate-pulse h-[8rem] w-full rounded-lg'></div>
                    </div>
                )}

            </div>

        </div>
    )
}
