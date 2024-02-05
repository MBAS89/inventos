import React, { useState } from 'react'

import { format, parseISO } from 'date-fns';

import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
//icons
import { MdOutlineEmail } from "react-icons/md"
import { AiOutlinePhone } from "react-icons/ai"
import { useSelector } from 'react-redux'
import { authInfoState } from '../../features/slices/authSlice'
import { useReadCustomersQuery } from '../../features/api/customers/customersApiSlice'
import { Loader } from '../reusable-components/Loader';

export const CustomersTable = ({ headItems, selectedCustomers, setSelectedCustomers }) => {

    const { authInfo } = useSelector(authInfoState)

    const [currentPage, setCurrentPage] = useState(1)

    const {data:cutomers, isLoading, isFetching, isError, error } = useReadCustomersQuery({storeId:authInfo.store_id,page:currentPage},'readCustomers')

    const handleCheckboxChange = (customerId) => {
        setSelectedCustomers(prevSelectedCustomers => {
            // Check if the maximum number of items has been reached
            if (prevSelectedCustomers.length >= 5 && !prevSelectedCustomers.includes(customerId)) {
                // If maximum reached and the current item is not already selected, return the previous array without modification
                return prevSelectedCustomers;
            } else {
                if (prevSelectedCustomers.includes(customerId)) {
                    // If already selected, remove it from the array
                    return prevSelectedCustomers.filter(id => id !== customerId);
                } else {
                    // If not selected, add it to the array
                    return [...prevSelectedCustomers, customerId];
                }
            }
        });
    };


    return (
        <div className='px-6 mt-2'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead selectedCount={selectedCustomers.length} headItems={headItems} />
                    {isLoading ? (
                            <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                                <tr><td><Loader /></td></tr>
                            </tbody>
                    ) :
                    <tbody className="divide-y divide-gray-200">
                        {cutomers.customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="px-4 py-2">
                                    <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${customer.id}`}
                                        onChange={() => handleCheckboxChange(customer.id)}
                                        checked={selectedCustomers.includes(customer.id)}
                                    />
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                    <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                        <img width="40" height="40" src={customer.image} alt="nut"/>
                                    </div>
                                    <div className='w-[80%]'>
                                        <span className='capitalize'>{customer.full_name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail className='text-[1.2rem]'/>
                                        <span>{customer.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <AiOutlinePhone className='text-[1.2rem]'/>
                                        <span>{customer.phone_number}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{customer.address}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${customer.customerType.type_name === "wholesale" ? 'text-purple-700 bg-purple-100' : 'text-blue-500 bg-blue-100'}`}>
                                        {customer.customerType.type_name}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-[#50B426] font-bold">${customer.total_transactions}</td>
                                <td className="px-4 py-2 font-bold text-[#4454DC]">${customer.total_debt}</td>
                                <td className="px-4 py-2 text-orange-400 font-bold">{customer.total_paid}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(customer.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(customer.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
                {cutomers &&
                    <TablePagination currentPage={currentPage} totalPages={cutomers.totalPages} setCurrentPage={setCurrentPage} totalCount={cutomers.totalCount}  count={cutomers.customers.length}/>
                }
            </div>
        </div>
    )
}
