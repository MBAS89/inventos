import React, { useState } from 'react'

//redux
import { useAddExpenseTypeMutation } from '../../../features/api/expenses/expensesTypesApiSlice'

//toast 
import { toast } from 'react-toastify'

//icons 
import { BiLoaderCircle } from "react-icons/bi";

export const ExpensesAddType = () => {
    const [typeName, setTypeName] = useState('')

    const [addExpenseType, { isLoading }] = useAddExpenseTypeMutation()

    const handleAddExpenseType = async (e) => {
        e.preventDefault()

        if(!typeName){
            return toast.error('Type Name Is Required!')
        }

        if(typeName.length > 20){
            return toast.error('Type Name Is So Long!')
        }

        const payload = {
            typeName
        }

        try {
            const res = await addExpenseType(payload).unwrap()
            toast.success(res.message)
            setTypeName('')
        } catch (error) {
            toast.error(error.data.error)
        }
    } 

    return (
        <div className='mt-2 p-4'>
            <form onSubmit={handleAddExpenseType} className='flex gap-4 bg-white p-5 rounded-lg w-[40rem] ml-10'>
                <label htmlFor="typeName" className="relative block overflow-hidden w-[25rem] bg-white rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={typeName} onChange={(e) => setTypeName(e.target.value)} name='typeName' type="text" id="typeName" placeholder="typeName" className="peer h-12 border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Type Name
                    </span>
                </label>
                <button type='submit' className='bg-[#50B426] flex justify-center items-center rounded-md w-[14rem] text-white hover:bg-[#68b148]'>
                    {isLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {isLoading ?'Adding Type' :'Add Type'}
                </button>
            </form>
        </div>
    )
}
