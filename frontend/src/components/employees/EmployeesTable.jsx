import React, { useState } from 'react'

import { format, parseISO } from 'date-fns';

import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'

//icons
import { MdOutlineEmail } from "react-icons/md"
import { AiOutlinePhone } from "react-icons/ai"
import { useSelector } from 'react-redux'
import { authInfoState } from '../../features/slices/authSlice'
import { useReadEmployeesQuery } from '../../features/api/employees/employeeApiSlice'
import { Loader } from '../reusable-components/Loader';

export const EmployeesTable = ({ headItems, selectedEmployee, setSelectedEmployee, searchQuery, sortBy }) => {
    
    const { authInfo } = useSelector(authInfoState)

    const [currentPage, setCurrentPage] = useState(1)

    const {data:employees, isLoading, isFetching, isError, error } = useReadEmployeesQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readEmployees')

    const handleCheckboxChange = (employeeId, imageId) => {
        setSelectedEmployee({
            employeeId,
            imageId
        })
    };

    console.log(employees)

    const handleContract = (status) => {
        if(status === true){
            return(
                <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    Yes
                </span>
            )
        }else{ 
            return(
                <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                    No
                </span>
            )
        }
    } 

    return (
        <div className='px-6 mt-2'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead selectedCount={selectedEmployee.length} headItems={headItems} />
                    {isLoading ? (
                            <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                                <tr><td><Loader /></td></tr>
                            </tbody>
                    ) :
                    <tbody className="divide-y divide-gray-200">
                        {employees.employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="px-4 py-2">
                                <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${employee.id}`}
                                        onChange={() => handleCheckboxChange(employee.id, employee.image_id)}
                                        checked={selectedEmployee.employeeId == employee.id}
                                    />
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                    <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                        <img width="40" height="40" src={employee.image} alt={employee.image_id}/>
                                    </div>
                                    <div className='w-[80%]'>
                                        <span className='capitalize'>{employee.full_name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail className='text-[1.2rem]'/>
                                        <span>{employee.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <AiOutlinePhone className='text-[1.2rem]'/>
                                        <span>{employee.phone_number}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{employee.address}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${employee.roleId ? 'text-purple-700 bg-purple-100': ''} `}>
                                        {employee.roleId ?  employee.role.name : 'No Role'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap capitalize rounded-full px-2.5 py-0.5 text-sm text-purple-700 bg-purple-100`}>
                                        {employee.work_type}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    {/*handleContract(item.contract)*/}
                                </td>
                                <td className="px-4 py-2 text-[#50B426] font-bold">$</td>
                                <td className="px-4 py-2 font-bold text-[#4454DC]">$</td>
                                <td className="px-4 py-2 text-orange-400 font-bold"></td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(employee.employment_date), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{employee.end_of_service ? format(parseISO(employee.end_of_service), "dd/MM/yyyy h:mmaaa") : 'Not specified'}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(employee.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(employee.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
                {employees &&
                    <TablePagination currentPage={currentPage} totalPages={employees.totalPages} setCurrentPage={setCurrentPage} totalCount={employees.totalCount}  count={employees.employees.length}/>
                }
            </div>
        </div>
    )
}
