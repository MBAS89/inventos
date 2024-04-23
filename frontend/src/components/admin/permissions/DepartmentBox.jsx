import React, { useState } from 'react'
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

//icons 
import { PiShieldStarThin } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useAddPermissionToDepartmentMutation, useEditDepartmentMutation, useRemoveDepartmentMutation, useRemovePermissionFromDepartmentMutation } from '../../../features/api/permissions/departmentsApiSlice';
import { BiLoaderCircle } from "react-icons/bi";

export const DepartmentBox = ({department}) => {

    const [departmentName, setDepartmentName] = useState(department.name)

    const permissions = [
        {name:"Read", value:"read"},
        {name:"Add", value:"add"},
        {name:"Edit", value:"edit"},
        {name:"Delete", value:"delete"}
    ]

    const activePermissionNames = department.permissions.map(permission => permission.name);

    const [editMode, setEditMode] = useState(false)

    const [editDepartment, {isLoading:isEditLoading }] = useEditDepartmentMutation()

    const handleSubmitEdit = async () => {
        try {
            const payload = {
                departmentId:department.id,
                departmentName
            }

            const res = await editDepartment(payload).unwrap()
            setEditMode(false)
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [removeDepartment, {isLoading:isRemoveLoading }] = useRemoveDepartmentMutation()

    const handleDeleteDepartment = async () => {
        try {
            const payload = {
                departmentId:department.id,
            }

            const res = await removeDepartment(payload).unwrap()
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [addPermissionToDepartment, {isLoading:isAddLoading }] = useAddPermissionToDepartmentMutation()
    
    const handleAddPermissionToDepartment = async (permissionName) => {
        try {
            const payload = {
                permissionName,
                departmentId:department.id,
            }

            const res = await addPermissionToDepartment(payload).unwrap()
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [removePermissionFromDepartment, {isLoading:isRemovePerLoading }] = useRemovePermissionFromDepartmentMutation()
    
    const handleRemovePermissionFromDepartment = async (permissionId) => {
        try {
            const payload = {
                permissionId
            }

            const res = await removePermissionFromDepartment(payload).unwrap()
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <div className='w-[30rem] h-[16rem] p-5 bg-white rounded-lg shadow-md' key={department?.id}>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <PiShieldStarThin className='text-[#50B426] text-[1.7rem]'/>
                    {editMode ? (
                        <input value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} className='bg-white w-[10rem] h-8 rounded-md border border-gray-200 px-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]'/>
                    ) : (
                        <h4 className='font-bold text-gray-700 text-[1rem] uppercase'>{department?.name}</h4>
                    ) }
                </div>
                <div className='flex gap-4 items-center'>
                    {editMode ? (
                        <div className='flex gap-2 items-center justify-center'>
                            {isEditLoading ? (
                                <div  className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                                    <BiLoaderCircle className='text-[1.2rem] animate-spin text-[#50B426] '/>
                                </div>
                            ) : (
                                <div onClick={handleSubmitEdit} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                                    <FaRegCircleCheck className='text-[1.2rem] text-[#50B426] '/>
                                </div>
                            )}
                            <div  onClick={() => setEditMode(false)}  className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                                <IoMdCloseCircleOutline className='text-[1.4rem] text-red-500 '/>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => setEditMode(true)} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                            <MdEdit className='text-[1.3rem] text-[#50B426] '/>
                        </div>
                    )}
                    {isRemoveLoading ? (
                        <div className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                            <BiLoaderCircle className='text-[1.3rem] text-red-500 animate-spin' />
                        </div>
                    ) : (
                        <div onClick={handleDeleteDepartment} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                            <MdDelete className='text-[1.3rem] text-red-500'/>
                        </div>
                    )}

                </div>
            </div>
            <div className='mt-4'>
                <div className='text-gray-400'>Not Active:</div>
                {permissions.filter(permission => !activePermissionNames.includes(permission.value)).length > 0 ? (
                    <div className='mt-2 flex gap-4'>
                        {permissions
                            .filter(permission => !activePermissionNames.includes(permission.value))
                            .map((permission, index) => (
                                <span key={index} onClick={() => isAddLoading ? null : handleAddPermissionToDepartment(permission.value)} className="whitespace-nowrap cursor-pointer rounded-full bg-gray-200 px-2.5 py-0.5 text-gray-700">
                                    {permission.name}
                                </span>
                        ))}
                    </div>
                ):(
                    <div className='mt-2 text-center italic text-red-300'>All Permissions Are Active</div>
                )}
            </div>
            <div className='mt-4'>
                <div className='text-gray-400'>Active:</div>
                {department.permissions.length > 0 ? (
                    <div className='mt-2 flex gap-4'>
                        {department.permissions.map(permission => (
                            <span key={permission.id} className="whitespace-nowrap capitalize flex items-center gap-2  rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                                {permission.name}
                                <IoMdCloseCircleOutline onClick={() => isRemovePerLoading ? null : handleRemovePermissionFromDepartment(permission.id)} className='text-[1.2rem] text-red-500 cursor-pointer'/>
                            </span>
                        ))}
                    </div>
                ):(
                    <div className='mt-2 text-center italic text-red-300'>No Active Permissions</div>
                )}
            </div>
        </div>
    )
}
