import React, { useState } from 'react'
import { TableHead } from '../../TableHead'
import { useReadAdminsQuery } from '../../../features/api/admin/adminApiSlice'
import { TablePagination } from '../../TablePagination'
import { Loader } from '../../reusable-components/Loader'
import { format, parseISO } from 'date-fns';
import { MdOutlineEmail } from "react-icons/md"
import { AiOutlinePhone } from "react-icons/ai"
import { handleStatus } from '../../../functions/handleStatus'

export const AdminsTable = ({ headItems, selectedAdmins, setSelectedAdmins, searchQuery, sortBy }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const { data:admins, isLoading } = useReadAdminsQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readAdmins')

    const handleCheckboxChange = (adminId, imageId) => {
        setSelectedAdmins({
            adminId,
            imageId
        })
    };

    return (
        <div className='px-6 mt-2'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} />
                    {isLoading ? (
                            <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                                <tr><td><Loader /></td></tr>
                            </tbody>
                    ) :
                    <tbody className="divide-y divide-gray-200">
                        {admins.admins.map((admin) => (
                            <tr key={admin.id}>
                                <td className="px-4 py-2">
                                    <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${admin.id}`}
                                        onChange={() => handleCheckboxChange(admin.id, admin.first_name)}
                                        checked={selectedAdmins.adminId == admin.id}
                                    />
                                </td>
                                <td className="px-4 py-2 text-gray-700">{admin.first_name}</td>
                                <td className="px-4 py-2 text-gray-700">{admin.last_name}</td>
                                <td className="px-4 py-2 text-gray-700 font-bold">{admin.id}</td>
                                <td className="px-4 py-2 text-gray-700 font-bold">{handleStatus(admin.super)}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail className='text-[1.2rem]'/>
                                        <span>{admin.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <AiOutlinePhone className='text-[1.2rem]'/>
                                        <span>{admin.phone_number}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(admin.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(admin.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
                {admins &&
                    <TablePagination currentPage={currentPage} totalPages={admins.totalPages} setCurrentPage={setCurrentPage} totalCount={admins.totalCount}  count={admins.admins.length}/>
                }
            </div>
        </div>
    )
}
