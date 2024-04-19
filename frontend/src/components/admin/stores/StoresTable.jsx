import React, { useState } from 'react'
import { useFecthStoresQuery } from '../../../features/api/stores/storeApiSlice';
import { TableHead } from '../../TableHead';
import { Loader } from '../../reusable-components/Loader';
import { TablePagination } from '../../TablePagination';
import { format, parseISO } from 'date-fns';
import { MdOutlineEmail } from "react-icons/md"
import { AiOutlinePhone } from "react-icons/ai"
export const StoresTable = ({ headItems, selectedSuppliers, setSelectedSuppliers, searchQuery, sortBy }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const { data:stores, isLoading } = useFecthStoresQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'fecthStores')
    
    const handleCheckboxChange = (storeId, imageId) => {
        setSelectedSuppliers({
            storeId,
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
                        {stores.stores.map((store) => (
                            <tr key={store.id}>
                                <td className="px-4 py-2">
                                    <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${store.id}`}
                                        onChange={() => handleCheckboxChange(store.id, store.store_image_id)}
                                        checked={selectedSuppliers.storeId == store.id}
                                    />
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                    <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                        <img width="40" height="40" src={store.store_image} alt={store.store_name}/>
                                    </div>
                                    <div className='w-[80%]'>
                                        <span className='capitalize font-bold'>{store.store_name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-bold text-[#4454DC]">{store.id}</td>
                                <td className="px-4 py-2 text-gray-700">{store.owner_first_name}</td>
                                <td className="px-4 py-2 text-gray-700">{store.owner_last_name}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail className='text-[1.2rem]'/>
                                        <span>{store.owner_email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <AiOutlinePhone className='text-[1.2rem]'/>
                                        <span>{store.phone_number}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(store.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(store.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
                {stores &&
                    <TablePagination currentPage={currentPage} totalPages={stores.totalPages} setCurrentPage={setCurrentPage} totalCount={stores.totalCount}  count={stores.stores.length}/>
                }
            </div>
        </div>
    )
}
