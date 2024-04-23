import React from 'react'
import { DepartmentAddForm } from '../../../components/admin/permissions/DepartmentAddForm'
import { DepartmentBox } from '../../../components/admin/permissions/DepartmentBox'
import { useReadDepartmentsQuery } from '../../../features/api/permissions/departmentsApiSlice'
import { Loader } from '../../../components/reusable-components/Loader'

export const AdminPermissions = () => {
    
    const {data, isLoading } = useReadDepartmentsQuery()

    console.log(data)
    return (
        <div className='flex flex-col pb-10 bg-gray-100 min-h-[calc(100vh-64px)]'>
            <h1 className='text-[2rem] mt-2 w-[84%] mx-auto font-bold text-gray-500 p-5'>Permissions And Departments</h1>
            <DepartmentAddForm />
            <div className='w-[94%] mt-2 mx-auto justify-center flex gap-14 flex-wrap'>
                {isLoading ? (
                    <div className='w-full h-[30rem] flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : data.departments.map((department) => (
                    <DepartmentBox department={department} key={department.id}/>
                ))}
            </div>
        </div>
    )
}
