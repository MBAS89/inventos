import React from 'react'
import millify from 'millify'


export const ExpenseProfileStatus = ({data, isLoading}) => {

    console.log(data)
    return (
        <div className="mt-8 sm:mt-5 w-[80%] mx-auto">
            <dl className="flex  gap-10">
                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center w-1/2 justify-center items-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Expense Title
                    </dt>
                    {isLoading ? (
                        <dd className='bg-slate-500 animate-pulse h-[65px] w-[550px] rounded-lg'></dd>
                    ):(
                        <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                            {data.expense.expenses_title}
                        </dd>
                    )}
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center w-[25%] justify-center items-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Expense Amount
                    </dt>
                    {isLoading ? (
                        <dd className='bg-slate-500 animate-pulse h-[65px] w-[250px] rounded-lg'></dd>
                    ):(
                        <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                            ${millify(data.expense.amount)}
                        </dd>
                    )}
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center w-[25%] justify-center items-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Type
                    </dt>
                    {isLoading ? (
                        <dd className='bg-slate-500 animate-pulse h-[65px] w-[270px] rounded-lg'></dd>
                    ):(
                        <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                            {data.expense.expenses_type_id ? data.expense.expenses_type.type_name : 'No Type'}
                        </dd>
                    )}
                </div>
            </dl>
        </div>
    )
}
