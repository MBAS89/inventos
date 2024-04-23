import React from 'react'
import { format, parseISO } from 'date-fns';
import { IoEyeOutline } from "react-icons/io5";

export const OwnerStores = ({ data, isLoading }) => {
    return (
        <div className='w-[80%] mx-auto'>
            <div className='min-h-[15rem] mt-10'>
                <div className='w-full bg-white h-full rounded-md border-gray-200 border-2 p-4 mb-14 pb-16'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-7 mt-2'>Owner Stores</h2>
                    {isLoading ? (
                        <div className='flex gap-10 flex-wrap mx-auto w-[95%]'>
                            <div className='bg-slate-500 animate-pulse h-[20rem] w-[20rem] rounded-xl'></div>
                            <div className='bg-slate-500 animate-pulse h-[20rem] w-[20rem] rounded-xl'></div>
                            <div className='bg-slate-500 animate-pulse h-[20rem] w-[20rem] rounded-xl'></div>
                            <div className='bg-slate-500 animate-pulse h-[20rem] w-[20rem] rounded-xl'></div>
                        </div>
                    ) : (
                        <div className='flex gap-10 flex-wrap mx-auto w-[95%]'>
                            {data.length > 0 ? (
                                data.map((store) => (
                                    <div className='bg-slate-100 border-2 border-[#50B426] h-[20rem] w-[20rem] rounded-xl flex items-center flex-col justify-center'>
                                        <div className='w-[90%] mx-auto mb-4 flex justify-between'>
                                            <div className='text-[#50B426] font-bold text-[1.2rem]'>#{store.id}</div>
                                            <div className='cursor-pointer hover:scale-110'><IoEyeOutline className='text-[#50B426] font-bold text-[1.5rem]'/></div>
                                        </div>
                                        <div className='bg-[#50B426] rounded-full w-[128px] h-[128px]'>
                                            <img src={store.store_image} alt={store.store_name} className='rounded-full p-2 w-full h-full' />
                                        </div>
                                        <div className='mt-8'>
                                            <h3 className='font-bold text-[1.4rem]'>{store.store_name}</h3>
                                        </div>
                                        <div className='flex justify-between text-gray-400 w-[95%] mx-auto mt-5'>
                                            <div>C: {format(parseISO(store.createdAt), "dd/MM/yyyy")}</div>
                                            <div>U: {format(parseISO(store.updatedAt), "dd/MM/yyyy")}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='w-full text-center capitalize text-[4rem] italic text-slate-300'>
                                    <p>No stores available</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
