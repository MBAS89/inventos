import { format, parseISO } from 'date-fns'
import React from 'react'


export const ExpenseDescription = ({data, isLoading}) => {
    return (
        <div>
            <div className="mt-10 w-[80%] min-h-[5rem] mx-auto bg-white rounded-lg p-7">
                <h2 className='text-[1.4rem] font-bold text-gray-400'>Description:</h2>
                {isLoading ? (
                    <div className='bg-slate-500 animate-pulse min-h-[5rem] w-full rounded-lg'></div>
                ):(
                    <p className='overflow-hidden mt-4 w-[97%] mx-auto'>
                        {data.expense.description}
                    </p>
                )}
            </div>
            <div className='w-[80%] mx-auto mt-5 italic flex justify-between text-gray-400 uppercase'>
                {isLoading ? (
                    <div className='bg-slate-500 animate-pulse h-5 w-[15rem] rounded-lg'></div>
                ):(
                    <div>Created At: {format(parseISO(data.expense.createdAt), "dd/MM/yyyy h:mmaaa")}</div>
                )}

                {isLoading ? (
                    <div className='bg-slate-500 animate-pulse h-5 w-[15rem] rounded-lg'></div>
                ):(
                    <div>Updated At: {format(parseISO(data.expense.updatedAt), "dd/MM/yyyy h:mmaaa")}</div>
                )}
            </div>
        </div>
    )
}
