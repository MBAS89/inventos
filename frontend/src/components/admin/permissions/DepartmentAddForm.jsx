import React, { useState } from 'react'
import { BiLoaderCircle } from "react-icons/bi";
import { useAddDepartmentMutation } from '../../../features/api/permissions/departmentsApiSlice';
import { toast } from 'react-toastify';

export const DepartmentAddForm = () => {

    const [departmentName, setDepartmentName] = useState('')

    const [addDepartment, {isLoading }] = useAddDepartmentMutation()

    const handleAddingDepartment = async (e) => {
        e.preventDefault()
    
        if(!departmentName){
            return toast.error('Department Name Is Required!')
        }
        
        const payload = {
            departmentName
        }
    
        try {
            const res = await addDepartment(payload).unwrap()
            toast.success(res.message)
            setDepartmentName('')
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <div className='p-4 w-[88%] mx-auto'>
            <form onSubmit={handleAddingDepartment} className='flex gap-4 bg-white p-5 rounded-lg w-[35rem] ml-10 shadow-md'>
                <label htmlFor="roleName" className="relative block overflow-hidden w-[25rem] bg-white rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} name='roleName' type="text" id="roleName" placeholder="roleName" className="peer h-10 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Department Name
                    </span>
                </label>
                <button type='submit' className='bg-[#50B426] flex justify-center items-center rounded-md w-[16rem] text-white hover:bg-[#68b148]'>
                    {isLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {isLoading ?'Adding Department' :'Add Department'}
                </button>
            </form>
        </div>
    )
}
