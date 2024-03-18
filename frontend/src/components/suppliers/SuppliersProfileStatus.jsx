import React from 'react'
import millify from 'millify'


export const SuppliersProfileStatus = ({ data, isLoading}) => {

    return (
    <div>
        <div className="mt-8 sm:mt-5 w-[80%] mx-auto">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Total Debts for
                    </dt>
                    {isLoading ? (
                        <dd className='bg-slate-500 animate-pulse h-[65px] w-[140px] rounded-lg'></dd>
                    ):(
                        <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                            ${millify(data.supplier.total_debt_for)}
                        </dd>
                    )}
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                    Total Debts us
                    </dt>
                    {isLoading ? (
                        <dd className='bg-slate-500 animate-pulse h-[65px] w-[140px] rounded-lg'></dd>
                    ):(
                        <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                            ${millify(data.supplier.total_debt_us)}
                        </dd>
                    )}
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Type
                    </dt>
                    {isLoading ? (
                        <dd className='bg-slate-500 animate-pulse h-[65px] w-[140px] rounded-lg'></dd>
                    ):(
                        <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                            {data.supplier.suppliers_type.type_name}
                        </dd>
                    )}
                </div>
            </dl>
        </div>
    </div>
  )
}
