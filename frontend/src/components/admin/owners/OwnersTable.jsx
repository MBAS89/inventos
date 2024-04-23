import React, { useState } from 'react'
import { TablePagination } from '../../TablePagination';
import { TableHead } from '../../TableHead';
import { useReadOwnersQuery } from '../../../features/api/owners/ownerApiSlice';
import { format, parseISO } from 'date-fns';
import { MdOutlineEmail } from "react-icons/md"
import { AiOutlinePhone } from "react-icons/ai"
import { Loader } from '../../reusable-components/Loader';

export const OwnersTable = ({ headItems, selectedOwners, setSelectedOwners, searchQuery, sortBy }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const { data:owners, isLoading } = useReadOwnersQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readOwners')
    
    const handleCheckboxChange = (ownerId, imageId) => {
        setSelectedOwners({
            ownerId,
            imageId
        })
    };


    console.log(owners)


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
                        {owners.owners.map((owner) => (
                            <tr key={owner.id}>
                                <td className="px-4 py-2">
                                    <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${owner.id}`}
                                        onChange={() => handleCheckboxChange(owner.id, owner.first_name)}
                                        checked={selectedOwners.ownerId == owner.id}
                                    />
                                </td>
                                <td className="px-4 py-2 text-gray-700">{owner.first_name}</td>
                                <td className="px-4 py-2 text-gray-700">{owner.last_name}</td>
                                <td className="px-4 py-2 text-gray-700 font-bold">{owner.id}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail className='text-[1.2rem]'/>
                                        <span>{owner.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <AiOutlinePhone className='text-[1.2rem]'/>
                                        <span>{owner.phone_number}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-green-500 text-[1rem] font-bold">{owner.stores.length}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(owner.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(owner.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
                {owners &&
                    <TablePagination currentPage={currentPage} totalPages={owners.totalPages} setCurrentPage={setCurrentPage} totalCount={owners.totalCount}  count={owners.owners.length}/>
                }
            </div>
        </div>
    )
}
