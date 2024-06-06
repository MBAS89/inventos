import React, { useState } from 'react'

//reusable funtions 
import { handleSalary } from '../../functions/handleSalary'

//date fns
import { format, parseISO } from 'date-fns'

//resuable componets
import { JobDetailsEditPopUp } from './JobDetailsEditPopUp'
import { SalaryPopUp } from './SalaryPopUp'
import { PaidTypePopUp } from './PaidTypePopUp'

export const JobDetails = ({data, isLoading}) => {

    const [openEditPopUp, setOpenEditPopUp] = useState(false)
    const [action, setAction] = useState('')

    const [openSalaryPopUp, setOpenSalaryPopUp] = useState(false)

    const [openPaidTypePopUp, setOpenPaidTypePopUp] = useState(false)

    return (
        <div className='w-[60%] mx-auto flex gap-5'>
            <div className='rounded-md border-2 border-gray-200 p-4 bg-white mt-4 w-[59%]'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Job Details</h2>
                <div className='pl-4 flex justify-between w-[98%]'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='font-bold capitalize'>Employment Date:</h4>
                        <h4 className='font-bold capitalize'>Expected End Date:</h4>
                        <h4 className='font-bold capitalize'>agreed salary:</h4>
                        <h4 className='font-bold capitalize'>Paid Type:</h4>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {isLoading ? (
                                <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                            ) : (
                                <span>{data.employee.employment_date !== null && format(parseISO(data.employee.employment_date), "dd/MM/yyyy h:mmaaa")}</span>
                            )
                        }
                        {isLoading ? (
                                <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                            ) : (
                                <span>{data.employee.end_of_service !== null  ? format(parseISO(data.employee.end_of_service), "dd/MM/yyyy h:mmaaa") : 'Unspecified'}</span>
                            )
                        }
                        {isLoading ? (
                                <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                            ) : (
                                <span>{handleSalary(data.employee)}</span>
                            )
                        }
                        {isLoading ? (
                                <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                            ) : (
                                <span className='capitalize'>{data.employee.paid_type}</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <button onClick={() => {setAction('change-employment-date'); setOpenEditPopUp(true)} } className='font-bold text-[#50B426] hover:text-green-600 active:text-green-900'>Change Date</button>
                        <button onClick={() => {setAction('change-expected-end-date'); setOpenEditPopUp(true)}} className='font-bold text-[#50B426] hover:text-green-600 active:text-green-900'>Change Date</button>
                        <button onClick={() => setOpenSalaryPopUp(true)} className='font-bold text-[#50B426] hover:text-green-600 active:text-green-900'>Change Salary</button>
                        <button onClick={() => setOpenPaidTypePopUp(true)} className='font-bold text-[#50B426] hover:text-green-600 active:text-green-900'>Change Paid Type</button>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-md border-2 border-gray-200 p-4 mt-4 w-[39%]'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Employee Documents</h2>
            </div>
            {openEditPopUp && 
                <JobDetailsEditPopUp 
                    action={action} 
                    setOpenEditPopUp={setOpenEditPopUp}
                    data={data}
                />
            }

            {openSalaryPopUp && 
                <SalaryPopUp 
                    setOpenSalaryPopUp={setOpenSalaryPopUp}
                    data={data}
                />
            }

            {openPaidTypePopUp && 
                <PaidTypePopUp 
                    setOpenPaidTypePopUp={setOpenPaidTypePopUp}
                    data={data}
                />
            }
        </div>
    )
}
