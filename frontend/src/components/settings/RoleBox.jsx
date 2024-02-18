import React from 'react'
import { MdManageAccounts } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export const RoleBox = () => {

    const headItems = [
        {
            title:"Department",
        },{
            title:"Read"
        },{
            title:"Edit"
        },{
            title:"Delete"
        }
    ]


    return (
        <div className='w-[30rem] bg-white p-5 rounded-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <MdManageAccounts  className='text-[1.4rem] text-[#50B426]'/>
                    <h4 className='font-bold text-gray-600'>Sale Manger</h4>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                        <MdEdit className='text-[1.3rem] text-[#50B426] '/>
                    </div>
                    <div className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                    <MdDelete className='text-[1.3rem] text-red-500'/>
                    </div>
                </div>
            </div>
            <div>
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md mt-4">
                    <thead className='text-left w-full'>
                        <tr>
                            {headItems.map((item, index) => (
                                <th className='px-4' key={index}>{item.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 w-full text-left">
                        <tr>
                            <td className="px-4 py-2 font-bold">
                                Inventory
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300  focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">
                                Inventory
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">
                                Inventory
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">
                                Inventory
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">
                                Inventory
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">
                                Inventory
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">
                                Inventory
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">
                                Inventory
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <input
                                    className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none  checked:bg-[#50B426] focus:ring-[#50B426]"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
