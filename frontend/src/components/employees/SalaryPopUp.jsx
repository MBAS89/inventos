import React, { useState } from 'react'

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';

//redux
import { useReadSalaryTypesQuery } from '../../features/api/employees/salaryTypesApiSlice'
import { useEditEmployeeSalrayMutation } from '../../features/api/employees/employeeApiSlice';

//toast for error handling 
import { toast } from 'react-toastify'

//reusable function
import { checkRequiredFields } from '../../functions/checkRequiredFileds';


export const SalaryPopUp = ({ setOpenSalaryPopUp, data }) => {

    const { data:salaryTypes } = useReadSalaryTypesQuery({}, 'readSalaryTypes')

    const [salaryData, setSalaryData] = useState({
        salaryType:'Please select',
        salaryTypeValue:'',
        rate:''
    })

    const { salaryType, salaryTypeValue, rate } = salaryData

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'salaryType') {
            const selectedType = salaryTypes.salaryTypes.find(type => type.id === value);
            
            setSalaryData(prevState => ({
                ...prevState,
                [name]: value, 
                salaryTypeValue: selectedType ? selectedType.type : '' 
            }));
        } else {
            setSalaryData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }


    const [editEmployeeSalray, {isLoading}] = useEditEmployeeSalrayMutation()

    const handleSalaryChange = async (e) => {
        e.preventDefault()

        const requiredFileds = ['salaryType', 'salaryTypeValue', 'rate']
        const notEmpty = checkRequiredFields(salaryData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        const payload = {
            employeeId:data.employee.id,
            salaryType,
            salaryTypeValue,
            rate
        }

        try {
            const res = await editEmployeeSalray(payload).unwrap()

            toast.success(res.message)

            setSalaryData({
                salaryType:'Please select',
                salaryTypeValue:'',
                rate:''
            })

            setOpenSalaryPopUp(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }



    return (
        <div tabIndex="0" className='w-full h-full fixed top-[0] left-0 flex justify-center items-center overflow-hidden'>
            <div className="rounded-lg bg-white shadow-2xl border-gray-300 border-2 text-center">
                <div className='relative w-full'>
                    <AiOutlineCloseCircle onClick={() => {setOpenSalaryPopUp(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-2 top-2'/>
                </div>
                <div className='p-4 mt-7 w-[35rem]'>
                    <h2 className='font-bold text-[1.5rem]'>Change Salary</h2>
                    <form onSubmit={handleSalaryChange} className='flex flex-col gap-5 w-[90%] mx-auto mt-6'>
                        <div>
                            <label htmlFor="salaryType" className="block text-sm text-left font-medium text-gray-900">
                                Salary Type
                            </label>
                            <select value={salaryType} onChange={onChange} name="salaryType" id="salaryType" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                                <option disabled>Please select</option>
                                {salaryTypes && salaryTypes.salaryTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.type}</option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor="rate" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input disabled={salaryType === 'Please select' ? true : false} value={rate} onChange={onChange} name='rate' type="Number" id="rate" placeholder="Salary" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Salary  {salaryType !== 'Please select' ? salaryTypeValue : ''}
                            </span>
                        </label>
                        <button type='submit' disabled={isLoading} className="flex justify-center mb-10 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium hover:bg-green-100 text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                            {isLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} Submit Change
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
