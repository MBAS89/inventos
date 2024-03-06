import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { handleContract } from '../../functions/handleContract';
import { format, parseISO } from 'date-fns';
import { handleSalary } from '../../functions/handleSalary';
import { useReadSalaryTypesQuery } from '../../features/api/employees/salaryTypesApiSlice';
import { BiLoaderCircle } from 'react-icons/bi';
import { useEffect } from 'react';
import { checkRequiredFields } from '../../functions/checkRequiredFileds';
import { toast } from 'react-toastify';
import { useAddContractToEmployeeMutation, useEditContractMutation, useRemoveContractMutation } from '../../features/api/employees/contractApiSlice';


export const ContractPopUp = ({ setOpenPopUp, contract, editMode, setEditMode, addMode, setAddMode, employee, deleteMode, setDeleteMode }) => {
    const { data:salaryTypes } = useReadSalaryTypesQuery({}, 'readSalaryTypes')

    const [contractData, setContractData] = useState({
        status:'',
        salaryType:'Please select',
        salaryTypeValue:'',
        rate:'',
        startDate:'',
        endDate:'',
        details:''
    })

    const { status, salaryType, salaryTypeValue, rate, startDate, endDate, details } = contractData

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === 'checkbox') {
            setContractData(prevState => ({
                ...prevState,
                [name]: checked ? 'Active' : 'Canceled'
            }));
        } else if (name === 'salaryType') {
            const selectedType = salaryTypes.salaryTypes.find(type => type.id === value);
            
            setContractData(prevState => ({
                ...prevState,
                [name]: value, 
                salaryTypeValue: selectedType ? selectedType.type : '' 
            }));
        } else {
            setContractData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    useEffect(() => {
        if(contract){
            const findRate = (typeValue, monthly, hourly, yearly) => {
                if(typeValue === 'monthly'){
                    return monthly
                }else if(typeValue === 'hourly'){
                    return hourly
                }else if(typeValue === 'yearly'){
                    return yearly
                }else{
                    return 0
                }
            }

            setContractData({
                status:contract.status,
                salaryType:contract.salary_type_id ? contract.salary_type_id : 'Please select',
                rate:contract.salary_type_id ? findRate(contract.salary_type.type, contract.monthly_salary, contract.hourly_rate, contract.yearly_salary) : '',
                startDate:new Date(contract.start_date).toISOString().substring(0, 10),
                endDate:new Date(contract.end_date).toISOString().substring(0, 10),
                salaryTypeValue:contract.salary_type_id ? contract.salary_type.type : '',
                details:contract.details
            })
        }

        if(addMode){
            setContractData({
                status:'',
                salaryType:'Please select',
                salaryTypeValue:'',
                rate:'',
                startDate:'',
                endDate:'',
                details:''
            })
        }
    },[editMode, contract, addMode])

    const [addContractToEmployee, {isLoading:isAddContractLoading}] = useAddContractToEmployeeMutation()

    const handleAddNewContract = async (e) => {
        e.preventDefault()

        const requiredFileds = ['rate', 'salaryType', 'startDate', 'endDate', 'details']
        const notEmpty = checkRequiredFields(contractData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        const payload = {
            details,
            startDate, 
            salaryType,
            salaryTypeValue, 
            rate, 
            endDate, 
            employeeId:employee.id
        }

        try {
            const res = await addContractToEmployee(payload).unwrap()
            toast.success(res.message)
            setContractData({
                status:'',
                salaryType:'Please select',
                salaryTypeValue:'',
                rate:'',
                startDate:'',
                endDate:'',
                details:''
            })

            setOpenPopUp(false)
            setAddMode(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [editContract, {isLoading:isEditContractLoading}] = useEditContractMutation()

    const handleEditContract = async () => {
        const requiredFileds = ['rate', 'salaryType', 'startDate', 'endDate', 'details']
        const notEmpty = checkRequiredFields(contractData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        const payload = {
            details,
            startDate, 
            salaryType,
            salaryTypeValue, 
            rate, 
            endDate, 
            employeeId:employee.id,
            contractId:contract.id,
            status
        }

        try {
            const res = await editContract(payload).unwrap()
            toast.success(res.message)
            setContractData({
                status:'',
                salaryType:'Please select',
                salaryTypeValue:'',
                rate:'',
                startDate:'',
                endDate:'',
                details:''
            })

            setEditMode(false)
            setOpenPopUp(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }

    }

    const [removeContract, {isLoading:isRemovingContractLoading} ] = useRemoveContractMutation()

    const handleDeleteContract = async () => {
        if(!contract.id){
            return toast.error('Contract ID is required!')
        }

        try {
            const res = await removeContract({contractId:contract.id, employeeId:employee.id}).unwrap()
            toast.success(res.message)
            setDeleteMode(false)
            setOpenPopUp(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }

    }
    
    if(deleteMode){
        return(
            <div tabIndex="0" className='w-full h-full fixed top-[0] left-0 flex justify-center items-center overflow-hidden'>
                <div className="rounded-lg bg-white p-8 shadow-2xl border-gray-300 border-2 text-center">
                    <h2 className="text-lg font-bold">Are you sure you want to do delete it?</h2>
                    <p className="mt-2 text-sm text-gray-500">Deleting anything may affect in losing important data</p>
                    <div className="mt-4 flex gap-2 justify-center">
                        <button onClick={handleDeleteContract} disabled={isRemovingContractLoading} type="button" className="rounded flex gap-2 hover:bg-red-400 hover:text-white active:bg-red-700 border-red-600 border-2 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                            {isRemovingContractLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} Yes, I'm sure
                        </button>
                        <button onClick={() => {setDeleteMode(false); setOpenPopUp(false)}} type="button" className="rounded border-gray-600 hover:bg-gray-400 active:bg-gray-700 hover:text-white border-2 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                            No, go back
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div tabindex="0" className='w-full h-full fixed top-[0] left-0 flex justify-center items-center overflow-hidden'>
            <div className="rounded-lg bg-white shadow-2xl border-gray-300 border-2 text-center">
                <div className='relative w-full'>
                    <AiOutlineCloseCircle onClick={() => {setOpenPopUp(false); setEditMode(false); setAddMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-2 top-2'/>
                </div>
                {addMode ? (
                    <div className='p-4 mt-7 w-[35rem] '>
                        <h2 className='font-bold text-[1.5rem]'>Add New Contract</h2>
                        <form onSubmit={handleAddNewContract} className='flex flex-col gap-5 mt-4'>
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
                            <div className='flex items-center w-full gap-4'>
                                <label htmlFor="startDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                    <input value={startDate} onChange={onChange}  type="date" id="startDate" name='startDate' placeholder="startDate" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                        Start Date
                                    </span>
                                </label>
                                <label htmlFor="endDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                    <input value={endDate} onChange={onChange}  type="date" id="endDate" name='endDate' placeholder="endDate" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                        End Date
                                    </span>
                                </label>
                            </div>
                            <label htmlFor="details" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                <textarea  rows="4" value={details} onChange={onChange} id="details" name='details' placeholder="details" className="peer resize-none  w-full border-none bg-transparent pt-5 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"></textarea>
                                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                    Contract Detailes
                                </span>
                            </label>
                            <button type='submit' className="flex justify-center rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                                {isAddContractLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} Add Contract
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className='p-4 mt-7 w-[35rem]'>
                        <h2 className="text-lg font-bold">Contract info</h2>
                        <div className='flex flex-col items-center mt-5 gap-5'>
                            <div className='flex gap-8'>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold'>Start Date</h4>
                                    {editMode ? (
                                        <input type='date' value={startDate} onChange={onChange} name='startDate' className='h-12 w-full border-2 border-[#50B426] bg-transparent px-2 rounded-lg placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'/>
                                    ) : (
                                        <span>{format(parseISO(contract.start_date), "dd/MM/yyyy h:mmaaa")}</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold'>End Date</h4>
                                    {editMode ? (
                                        <input type='date' value={endDate} onChange={onChange} name='endDate' className='h-12 w-full border-2 border-[#50B426] bg-transparent px-2 rounded-lg placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'/>
                                    ) : (
                                        <span>{format(parseISO(contract.end_date), "dd/MM/yyyy h:mmaaa")}</span>
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold'>Status</h4>
                                    {editMode ? (
                                        <div className='flex gap-2 items-center'>
                                            <span>Active:</span>
                                            <input  type="checkbox" checked={status === 'Active' ? true : false} onChange={onChange} name='status' className="switch appearance-none focus:ring-0" />
                                        </div>

                                    ):(
                                        <span>{handleContract(contract.status)}</span>
                                    )}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold'>Salary</h4>
                                    {editMode ? (
                                        <div className='flex gap-2 items-center'>
                                            <select value={salaryType} onChange={onChange} name="salaryType" id="salaryType" className="p-4 w-28 border border-gray-200 rounded-md text-gray-700 sm:text-sm focus:border-[#50B426] focus:ring-0">
                                                <option disabled>Please select</option>
                                                {salaryTypes && salaryTypes.salaryTypes.map((type) => (
                                                    <option key={type.id} value={type.id}>{type.type}</option>
                                                ))}
                                            </select>
                                            <input type="number" value={rate} onChange={onChange} name='rate' placeholder='Salary' className='h-12 w-28 border-2 border-[#50B426] bg-transparent px-2 rounded-lg focus:outline-none  focus:border-[#50B426] focus:ring-0  sm:text-sm'/>
                                        </div>

                                    ):(
                                        <span>{handleSalary(contract)}</span>
                                    )}
                                    
                                </div>
                            </div>
                            <div className='w-full '>
                                <h4 className='text-center font-bold'>Details</h4>
                                {editMode ? (
                                    <textarea value={details} onChange={onChange} rows="4" name='details' placeholder="details" className="resize-none  w-[90%] focus:border-[#50B426]  mx-auto rounded-md bg-transparent pt-5 border-2 border-[#50B426]  focus:outline-none focus:ring-0 sm:text-sm"></textarea>
                                ):(
                                    <p>{contract.details}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {editMode && (
                    <div className='w-full'>
                        <button onClick={handleEditContract} className="flex mb-8 justify-center rounded border w-[85%] mx-auto border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                        {isEditContractLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} Submit Changes
                        </button>
                    </div>
                )}
            </div>
        </div>

    )
}
