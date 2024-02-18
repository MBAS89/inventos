import React from 'react'

export const RoleAddForm = () => {
  return (
    <div className='mt-2 p-4'>
        <form className='flex gap-4 bg-white p-5 rounded-lg w-[35rem] ml-10'>
            <label htmlFor="roleName" className="relative block overflow-hidden w-[25rem] bg-white rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input name='roleName' type="text" id="roleName" placeholder="roleName" className="peer h-8 border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Role Name
                </span>
            </label>
            <button className='bg-[#50B426] rounded-md w-[8rem] text-white hover:bg-[#68b148]'>Add Role</button>
        </form>
    </div>
  )
}
