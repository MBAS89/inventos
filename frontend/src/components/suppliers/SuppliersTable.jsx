import React, { useState } from 'react'

import { format, parseISO } from 'date-fns';

import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
import { Loader } from '../reusable-components/Loader';
//icons
import { MdOutlineEmail } from "react-icons/md"
import { AiOutlinePhone } from "react-icons/ai"
import { useReadSuppliersQuery } from '../../features/api/suppliers/suppliersApiSlice'

export const SuppliersTable = ({ headItems, selectedSuppliers, setSelectedSuppliers, searchQuery, sortBy }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const { data:suppliers, isLoading } = useReadSuppliersQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readSuppliers')
    
    const handleCheckboxChange = (supplierId, imageId) => {
        setSelectedSuppliers({
            supplierId,
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
                        {suppliers.suppliers.map((supplier) => (
                            <tr key={supplier.id}>
                                <td className="px-4 py-2">
                                    <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${supplier.id}`}
                                        onChange={() => handleCheckboxChange(supplier.id, supplier.image_id)}
                                        checked={selectedSuppliers.supplierId == supplier.id}
                                    />
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                    <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                        <img width="40" height="40" src={supplier.image} alt={supplier.supplier_name}/>
                                    </div>
                                    <div className='w-[80%]'>
                                        <span className='capitalize'>{supplier.supplier_name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail className='text-[1.2rem]'/>
                                        <span>{supplier.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <AiOutlinePhone className='text-[1.2rem]'/>
                                        <span>{supplier.phone_number}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{supplier.address}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${supplier.suppliers_type.type_name === "wholesale" ? 'text-purple-700 bg-purple-100' : 'text-blue-500 bg-blue-100'}`}>
                                        {supplier.suppliers_type.type_name}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-[#50B426] font-bold">${supplier.total_transactions}</td>
                                <td className="px-4 py-2 font-bold text-[#4454DC]">${supplier.total_debt_for}</td>
                                <td className="px-4 py-2 font-bold text-[#dc4451]">${supplier.total_debt_us}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(supplier.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(supplier.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
                {suppliers &&
                    <TablePagination currentPage={currentPage} totalPages={suppliers.totalPages} setCurrentPage={setCurrentPage} totalCount={suppliers.totalCount}  count={suppliers.suppliers.length}/>
                }
            </div>
        </div>
    )
}
