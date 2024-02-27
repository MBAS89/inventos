import React from 'react'

//redux
import { useReadExpensesTypesQuery } from '../../../features/api/expenses/expensesTypesApiSlice'

//components
import { ExpensesAddType } from '../../../components/settings/expenses/ExpensesAddType'
import { ExpensesTypeBox } from '../../../components/settings/expenses/ExpensesTypeBox'
import { Loader } from '../../../components/reusable-components/Loader'




export const ExpensesSettings = () => {
    const {data, isLoading } = useReadExpensesTypesQuery()

    return (
        <div className='flex flex-col pb-10'>
            <h1 className='text-[2rem] mt-2 ml-10 font-bold text-gray-500 p-5'>Expenses Types</h1>
            <ExpensesAddType />
            <div className='w-[93%] mx-auto flex gap-7 flex-wrap'>
                {isLoading ? (
                    <div className='w-full h-[30rem] flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : data.expensesTypes.length == 0 ? (
                    <div className='text-center text-gray-300 italic w-full text-[3rem] mt-10'>
                        No Expenses Types Found!
                    </div>
                ) : data.expensesTypes.map((type) => (
                    <ExpensesTypeBox typeData={type} />
                ))}
            </div>
        </div>
    )
}
