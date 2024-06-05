import React, { useState } from 'react'

//icons
import { AiOutlineMail, AiOutlinePhone, AiOutlineCloseCircle } from "react-icons/ai"
import { RiAdminLine } from "react-icons/ri"
import { FaRegCheckCircle } from "react-icons/fa";


//redux
import { useReadRolesQuery } from '../../features/api/permissions/rolesApiSlice'
import { useEditEmployeeRoleMutation } from '../../features/api/employees/employeeApiSlice'
import { toast } from 'react-toastify'
import { EmployeeWarningPopUp } from './EmployeeWarningPopUp'

export const EmployeeInfo = ({ data, isLoading }) => {
    const { data:roles } = useReadRolesQuery({}, 'readRoles')

    const [editRoleMode, setEditRoleMode] = useState(false)

    const [employeeRole, setEmployeeRole] = useState('Please select')

    const [editEmployeeRole, {isLoading:isEmployeeLoading }] = useEditEmployeeRoleMutation()
    const handleEmployeeRoleChnage = async () => {
        if(!employeeRole || employeeRole == 'Please select'){
            return toast.error("Please Select A Role Before Edit!")
        }

        const payload = {
            employeeId:data.employee.id,
            roleId:employeeRole
        }

        try {
            const res = await editEmployeeRole(payload).unwrap()
            toast.success(res.message)

            setEditRoleMode(false)
            setEmployeeRole('Please select')

        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [openWarningPopUp, setOpenWarningPopUp] = useState(false)
    const [action, setAction] = useState("")

    return (
        <div className='w-[60%] mx-auto'>
            <div className='h-[15rem] mt-10 flex gap-5'>
                <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Employee Details</h2>
                    <div className='flex justify-between items-center h-[90%] pr-16 pl-10'>
                        {isLoading ? (
                            <div className='bg-slate-500 animate-pulse h-[128px] w-[128px] rounded-full'></div>
                        ) : (
                            <div className=' bg-[#50B426] rounded-full w-[128px] h-[128px] p-1'>
                                <img  src={data.employee.image} className='w-full h-full scale-110 rounded-full' alt={data.employee.full_name} />
                            </div>
                        )}
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <h5 className='text-gray-400'>Full Name</h5>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    ) : (
                                        <p className='font-bold'>{data.employee.full_name}</p>
                                    )}

                                </div>
                                <div>
                                    <h5 className='text-gray-400'>Status</h5>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    ) : (
                                        <p className='font-bold'>{data.employee.status}</p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <h5 className='text-gray-400'>Address</h5>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    ) : (
                                        <p className='font-bold'>{data.employee.address}</p>
                                    )}
                                </div>
                                <div>
                                    <h5 className='text-gray-400'>Work Type</h5>
                                    {isLoading ? (
                                        <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                    ) : (
                                        <p className='font-bold'>{data.employee.work_type}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white w-[40%] h-full rounded-md border-2 border-gray-200 p-4'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Role & Permissons</h2>
                    <div className={`flex items-center gap-3 flex-wrap ${editRoleMode ? 'h-[27%]' : 'h-[55%]'} pl-4`}>
                        {isLoading ? (
                            <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                        ) : (
                            !data.employee.roleId ? (
                                <div className='capitalize italic text-center text-gray-500 w-full'>This Employee have Permissons</div>
                            ) : (
                                <span className="whitespace-nowrap capitalize rounded-full bg-green-200 px-4 py-2 text-sm text-green-700">
                                    {data.employee.role.name}
                                </span>
                            )
                        )}
                    </div>
                    {editRoleMode && 
                        <div className='w-[90%] mx-auto'>
                            <select onChange={(e) => setEmployeeRole(e.target.value)} value={employeeRole} disabled={isEmployeeLoading}  name="role" id="role" className=" w-full mb-2 text-center mt-1.5 p-4 border border-[#50B426] rounded-md text-gray-700 sm:text-sm">
                                <option disabled>Please select</option>
                                {roles && roles.roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                    }
                    <div className='flex gap-3 w-[90%] mx-auto'>
                        <button onClick={editRoleMode ? handleEmployeeRoleChnage : () => setEditRoleMode(true)} className="w-[100%] flex justify-center items-center gap-4 rounded border border-[#50B426] hover:bg-[#50B426] px-12 py-3 text-sm font-medium hover:text-white bg-transparent text-[#50B426] focus:outline-none active:bg-green-500 active:text-white">
                            <span>{editRoleMode ? 'Confirm Edit' : 'Edit/Add Role'}</span> 
                            <RiAdminLine className='text-lg'/>
                        </button>
                        {editRoleMode && <button disabled={isEmployeeLoading} onClick={() => setEditRoleMode(false)} className="w-[30%] rounded border-gray-600 hover:bg-gray-400 active:bg-gray-700 hover:text-white border-2 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">Cancel</button>}
                    </div>

                </div>
            </div>
            <div className='flex mt-4 gap-5'>
                <div className='h-[8rem] w-[60%] bg-white border-gray-200 border-2 p-4 rounded-md'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Contact</h2>
                    <div className='flex justify-evenly p-5'>
                        <div className='flex justify-center items-center gap-3'>
                            <AiOutlinePhone className='text-[1.5rem] text-[#50B426]'/>
                            {isLoading ? (
                                <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                            ) : (
                                <h5>{data.employee.phone_number}</h5>
                            )}
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            <AiOutlineMail className='text-[1.5rem] text-[#50B426]'/>
                            {isLoading ? (
                                <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                            ) : (
                                <h5>{data.employee.email}</h5>
                            )}
                        </div>
                    </div>
                </div>
                <div className='bg-white w-[40%] h-[8rem] rounded-md border-2 border-gray-200 p-4 '>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Other Actions</h2>
                    <div className='pl-4'>
                        {!isLoading ? (
                            <div>
                                {data.employee.status === "on-payroll" ? 
                                    <button onClick={() => {setOpenWarningPopUp(true); setAction("End Employee Service")}} className='flex items-center gap-2 py-1'>
                                        <AiOutlineCloseCircle className="text-red-500 text-[1.3rem]" /> <span className='capitalize text-red-500'>End Employee Service</span>
                                    </button>
                                :
                                    <button onClick={() => {setOpenWarningPopUp(true); setAction("Start Employee Service")}} className='flex items-center gap-2 py-1'>
                                        <FaRegCheckCircle className="text-[#50B426] text-[1.3rem]" /> <span className='capitalize text-[#50B426]'>Start Employee Service</span>
                                    </button>
                                }
                                <button onClick={() => {setOpenWarningPopUp(true); setAction("Delete An Employee")}} className='flex items-center gap-2 py-1'>
                                    <AiOutlineCloseCircle className="text-red-500 text-[1.3rem]" /> <span className='capitalize text-red-500'>Delete Employee</span>
                                </button>
                            </div>
                        ):(
                            <div className=' flex flex-col gap-4'>
                                <div className='bg-slate-500 animate-pulse h-[20px] w-[240px] rounded-lg'></div>
                                <div className='bg-slate-500 animate-pulse h-[20px] w-[240px] rounded-lg'></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {openWarningPopUp && 
                <EmployeeWarningPopUp 
                    setOpenWarningPopUp={setOpenWarningPopUp}
                    action={action}
                    data={data}
                />
            }
        </div>
    )
}
