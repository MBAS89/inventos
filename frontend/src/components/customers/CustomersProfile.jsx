import React from 'react'
import { MdPlace} from "react-icons/md";

export const CustomersProfile = () => {
  return (
    <div className='col-span-2 bg-white rounded-lg'>
        <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-8 bg-red-100">
        {/*<span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>*/}
            <div className="sm:flex sm:justify-between sm:gap-4 ">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl w-60 mt-4">Customer Information</h3>
                </div>
                <div className="hidden sm:block sm:shrink-0">
                    <img alt="Paul Clapton" src="https://img.icons8.com/dusk/64/cat--v1.png" className="h-16 w-16 rounded-lg object-cover shadow-sm"/>
                </div>
            </div>
            <div className='flex items-center gap-20'>
                <dl className="mt-2 flex gap-4">
                    <div className="flex flex-col gap-2">
                        <dd className="text-xs text-gray-500">Name</dd>
                        <dt className="text-sm font-medium text-gray-600">Natalia Wheeler</dt>
                        <dd className="text-xs text-gray-500">Phone</dd>
                        <dt className="text-sm font-medium text-gray-600">+9725473490</dt>
                    </div>
                </dl>
                <dl className="mt-2 flex gap-4 ">
                    <div className="flex flex-col gap-2">
                        <dd className="text-xs text-gray-500">Email</dd>
                        <dt className="text-sm font-medium text-gray-600">Natalia@gmail.com</dt>
                        <dd className="text-xs text-gray-500">Address</dd>
                        <dt className="text-sm font-medium text-gray-600">Los Angelos Calefornia</dt>
                    </div>
                </dl>
            </div>
        </div>
    </div>
  )
}

