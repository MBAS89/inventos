import React, { useState } from 'react'

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';

//redux
import { useEditEmployeePaidTypeMutation } from '../../features/api/employees/employeeApiSlice';

//toast for error handling 
import { toast } from 'react-toastify'


export const PaidTypePopUp = ({ setOpenPaidTypePopUp, data }) => {

    const [paidType, setPaidType] = useState(data?.employee.paid_type)

    const [editEmployeePaidType, {isLoading}] = useEditEmployeePaidTypeMutation()

    const handlePaidTypeChange = async (e) => {
        e.preventDefault()

        if(!paidType){
            toast.error("Please Select A Paid Type!")
        }

        const payload = {
            employeeId:data.employee.id,
            type:paidType
        }

        try {
            const res = await editEmployeePaidType(payload).unwrap()

            toast.success(res.message)

            setOpenPaidTypePopUp(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <div tabIndex="0" className='w-full h-full fixed top-[0] left-0 flex justify-center items-center overflow-hidden'>
            <div className="rounded-lg bg-white shadow-2xl border-gray-300 border-2 text-center">
                <div className='relative w-full'>
                    <AiOutlineCloseCircle onClick={() => {setOpenPaidTypePopUp(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-2 top-2'/>
                </div>
                <div className='p-4 mt-7 w-[35rem]'>
                    <h2 className='font-bold text-[1.5rem]'>Change Paid Type</h2>
                    <form onSubmit={handlePaidTypeChange} className='flex flex-col gap-5 w-[90%] mx-auto mt-6'>
                        <div>
                            <label htmlFor="paidType" className="block text-sm text-left font-medium text-gray-900">
                                Paid Type
                            </label>
                            <select value={paidType} onChange={(e) => setPaidType(e.target.value)} name="paidType" id="paidType" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                                <option disabled>Please select</option>
                                <option value="weekly">weekly</option>
                                <option value="monthly">monthly</option>
                                <option value="yearly">yearly</option>
                            </select>
                        </div>
                        <button type='submit' disabled={isLoading} className="flex justify-center mb-10 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium hover:bg-green-100 text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                            {isLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} Submit Change
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
