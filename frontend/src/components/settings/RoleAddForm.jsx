import React, { useState } from 'react'
import { useAddRoleMutation } from '../../features/api/permissions/rolesApiSlice'
import { toast } from 'react-toastify'
import { BiLoaderCircle } from "react-icons/bi";

export const RoleAddForm = () => {
  const [roleName, setRoleName] = useState('')
  const [addRole, {isLoading }] = useAddRoleMutation()
  
  const handleAddingRole = async (e) => {
    e.preventDefault()

    if(!roleName){
      return toast.error('Role Name Is Required!')
    }

    const payload = {
      roleName
    }

    try {
      const res = await addRole(payload).unwrap()
      toast.success(res.message)
      setRoleName('')
    } catch (error) {
      toast.error(error.data.error)
    }
  }

  return (
    <div className='mt-2 p-4'>
      <form onSubmit={handleAddingRole} className='flex gap-4 bg-white p-5 rounded-lg w-[35rem] ml-10'>
        <label htmlFor="roleName" className="relative block overflow-hidden w-[25rem] bg-white rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
          <input value={roleName} onChange={(e) => setRoleName(e.target.value)} name='roleName' type="text" id="roleName" placeholder="roleName" className="peer h-8 border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Role Name
          </span>
        </label>
        <button type='submit' className='bg-[#50B426] flex justify-center items-center rounded-md w-[9rem] text-white hover:bg-[#68b148]'>
          {isLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {isLoading ?'Adding Role' :'Add Role'}
        </button>
      </form>
    </div>
  )
}
