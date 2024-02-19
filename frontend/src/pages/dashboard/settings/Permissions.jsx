import React from 'react'
import { RoleAddForm } from '../../../components/settings/RoleAddForm'
import { RoleBox } from '../../../components/settings/RoleBox'
import { useReadRolesQuery } from '../../../features/api/permissions/rolesApiSlice'
import { Loader } from '../../../components/reusable-components/Loader'
export const Permissions = () => {
  const {data, isLoading } = useReadRolesQuery()


  return (
    <div className='flex flex-col pb-10'>
      <h1 className='text-[2rem] mt-2 ml-10 font-bold text-gray-500 p-5'>Permissions And Roles Manager</h1>
      <RoleAddForm />
      <div className='w-[93%] mx-auto flex gap-6 flex-wrap'>
        {isLoading ? (
          <div className='w-full h-[30rem] flex justify-center items-center'>
            <Loader />
          </div>
        ) : data.roles.map((role) => (
          <RoleBox roleData={role} />
        ))}
      </div>
    </div>
  )
}
