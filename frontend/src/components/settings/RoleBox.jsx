import React, { useState } from 'react'
import { MdManageAccounts } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";


import { useReadDepartmentsQuery } from '../../features/api/permissions/departmentsApiSlice';
import { useAddRolePermissionMutation, useEditRoleMutation, useRemoveRoleMutation, useRemoveRolePermissionMutation } from '../../features/api/permissions/rolesApiSlice';
import { toast } from 'react-toastify';
import { DepartmentsSkelton } from './DepartmentsSkelton';

export const RoleBox = ({roleData}) => {

    const [roleName, setRoleName] = useState(roleData.name)

    const {data:departments, isLoading } = useReadDepartmentsQuery()

    const headItems = [
        {
            title:"Department",
        },{
            title:"Add"
        },{
            title:"Delete"
        },{
            title:"Edit"
        },{
            title:"Read"
        }
    ]

    const isPermissionChecked = (permission) => {
        return roleData.permissions.some((rolePermission) => rolePermission.role_permissions.permissionId === permission.id);
    };

    const [addRolePermission, {isLoading:isAddingLoading }] = useAddRolePermissionMutation()
    const [removeRolePermission, {isLoading:isRemovingLoading }] = useRemoveRolePermissionMutation()

    const handleAddAndDeleteRolePermisson = async (e, permission ) => {
        
        //when the checkbox is change to unchecked delte
        if (!e.target.checked) {
            let rolePermissionId;
            roleData.permissions.forEach((p) => {
                if (p.role_permissions.permissionId === permission.id) {
                    rolePermissionId = p.role_permissions.id;
                }
            });

            try {
                const payload = {
                    rolePermissionId:rolePermissionId
                }
                const res = await removeRolePermission(payload).unwrap()
                toast.success(res.message)
            } catch (error) {
                toast.error(error.data.error)
            }

        } else {
            try {
                const payload = {
                    roleId:roleData.id,
                    permissionId:permission.id
                }
                const res = await addRolePermission(payload).unwrap()
                toast.success(res.message)
            } catch (error) {
                toast.error(error.data.error)
            }
        }
    }

    const [removeRole, {isLoading:isRemoveLoading }] = useRemoveRoleMutation()

    const handleDeleteRole = async () => {
        try {
            const payload = {
                roleId:roleData.id,
            }

            const res = await removeRole(payload).unwrap()
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [editMode, setEditMode] = useState(false)
    const [editRole, {isLoading:isEditLoading }] = useEditRoleMutation()

    const handleSubmitEdit = async () => {
        try {
            const payload = {
                roleId:roleData.id,
                roleName
            }

            const res = await editRole(payload).unwrap()
            setEditMode(false)
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }



    return (
        <div key={roleData.id} className='w-[30rem] bg-white p-5 rounded-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <MdManageAccounts  className='text-[1.4rem] text-[#50B426]'/>
                    {editMode ? (
                        <input value={roleName} onChange={(e) => setRoleName(e.target.value)} className='bg-white h-8 rounded-md border border-gray-200 px-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]'/>
                    ) : (
                        <h4 className='font-bold text-gray-600 capitalize'>{roleData.name}</h4>
                    )}
                </div>
                <div className='flex gap-4 items-center'>
                    {editMode ? (
                        <div className='flex gap-2 items-center justify-center'>
                            <div onClick={handleSubmitEdit} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                                <FaRegCircleCheck className='text-[1.2rem] text-[#50B426] '/>
                            </div>
                            <div onClick={() => setEditMode(false)}  className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                                <IoMdCloseCircleOutline className='text-[1.4rem] text-red-500 '/>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => setEditMode(true)} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                            <MdEdit className='text-[1.3rem] text-[#50B426] '/>
                        </div>
                    )}
                    <div onClick={handleDeleteRole} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                        <MdDelete className='text-[1.3rem] text-red-500'/>
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <table className="min-w-full divide-y-2 divide-[#50B426] bg-white text-sm rounded-md mt-4">
                    <thead className='text-left w-full'>
                        <tr>
                            {headItems.map((item, index) => (
                                <th className='px-4' key={index}>{item.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 w-full text-left">
                        {isLoading ? ( 
                            <DepartmentsSkelton />
                        ) : departments.departments.map((department) => (
                            <tr key={department.id}>
                                <td className="px-4 py-2 font-bold capitalize ">
                                  {department.name}
                                </td>
                                {department.permissions.map((permission) => (
                                    <td key={permission.id} className="px-4 py-2">
                                        <input
                                            className="h-5 w-5 cursor-pointer rounded border-gray-300  focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                            type="checkbox"
                                            disabled={isAddingLoading || isRemovingLoading}
                                            checked={isPermissionChecked(permission)}
                                            onChange={(e) => handleAddAndDeleteRolePermisson(e, permission)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
