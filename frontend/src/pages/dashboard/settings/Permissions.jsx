import React from 'react'
import { RoleAddForm } from '../../../components/settings/RoleAddForm'
import { RoleBox } from '../../../components/settings/RoleBox'

export const Permissions = () => {
  return (
    <div className='flex flex-col pb-10'>
      <h1 className='text-[2rem] mt-2 ml-10 font-bold text-gray-500 p-5'>Permissions And Roles Manager</h1>
      <RoleAddForm />
      <div className='w-[93%] mx-auto flex gap-6 flex-wrap'>
        <RoleBox />
      </div>
    </div>
  )
}
