import React, { useState } from 'react'

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';

//redux 
import { useEditEmployeeJobDetailsMutation } from '../../features/api/employees/employeeApiSlice'

//toast for error handling 
import { toast } from 'react-toastify'

export const JobDetailsEditPopUp = ({action, setOpenEditPopUp, data }) => {

    const [employmentDate, setEmploymentDate] = useState('')
    const [expectedEndDate, setExpectedEndDate] = useState('')

    const handleTitle = () => {
        if(action === "change-employment-date"){
            return 'Change Employment Date'
        }else{
            return 'Change Expected End Date'
        }
    }

    const [editEmployeeJobDetails, {isLoading:isEditEmployeeLoading}] = useEditEmployeeJobDetailsMutation()
    const handleChangeEmployeeJobDetails = async (e) => {
        e.preventDefault()

        if(!action){
            return toast.error("Please Select An Action First!")
        }

        const payload = {
            employeeId:data.employee.id,
            action,
            employmentDate,
            expectedEndDate
        }

        try {
            const res = await editEmployeeJobDetails(payload).unwrap()
            toast.success(res.message)
            setEmploymentDate('')
            setExpectedEndDate('')
            setOpenEditPopUp(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }
    

    return (
        <div tabindex="0" className='w-full h-full fixed top-[0] left-0 flex justify-center items-center overflow-hidden'>
            <div className="rounded-lg bg-white shadow-2xl border-gray-300 border-2 text-center">
                <div className='relative w-full'>
                    <AiOutlineCloseCircle onClick={() => {setOpenEditPopUp(false); setEmploymentDate(''); setExpectedEndDate('')}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-2 top-2'/>
                </div>
                <div className='p-4 mt-7 w-[35rem]'>
                    <h2 className='font-bold text-[1.5rem]'>{handleTitle()}</h2>
                    <form onSubmit={handleChangeEmployeeJobDetails} className='flex flex-col gap-5 w-[90%] mx-auto mt-6'>
                        <label htmlFor="date" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input 
                                value={action === "change-employment-date" ? employmentDate : expectedEndDate} 
                                onChange={(e) => action === "change-employment-date" ? setEmploymentDate(e.target.value) : setExpectedEndDate(e.target.value)} 
                                type="date" 
                                id="date" 
                                name='endDate' 
                                placeholder="date" 
                                className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" 
                            />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                {action === "change-employment-date" ? 'Employment Date' : 'Expected End Date'}
                            </span>
                        </label>
                        <button type='submit' className="flex justify-center rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium hover:bg-green-200 text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                            {isEditEmployeeLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} Submit Change
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
