import React, { useEffect, useState } from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'

//icons
import { useReadExpensesQuery } from '../../features/api/expenses/expensesApiSlice'
import { Loader } from '../reusable-components/Loader'
import { format, parseISO } from 'date-fns'

export const ExpensesTable = ({ headItems, selectedExpenses, setSelectedExpenses, searchQuery, sortBy }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

    const {data:expenses, isLoading } = useReadExpensesQuery({page:currentPage, searchQuery:debouncedSearchQuery, sortBy:sortBy},'readExpenses')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setDebouncedSearchQuery(searchQuery);
        }, 1500);
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, [searchQuery]);

    const handleCheckboxChange = (expensesId, imageId) => {
        setSelectedExpenses({
            expensesId,
            imageId
        })
    };


    return (
        <div className='px-6 mt-2'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead selectedCount={selectedExpenses.length} headItems={headItems} />
                    {isLoading ? (
                            <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                                <tr><td><Loader /></td></tr>
                            </tbody>
                    ) :
                    <tbody className="divide-y divide-gray-200">
                        {expenses.expenses.map((expense) => (
                            <tr key={expense.id} className=' h-16'>
                                <td className="px-4 py-2">
                                    <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${expense.id}`}
                                        onChange={() => handleCheckboxChange(expense.id, expense.expenses_title)}
                                        checked={selectedExpenses.expensesId == expense.id}
                                    />
                                </td>
                                <td className="font-medium text-gray-900 flex items-center justify-center gap-3 h-[8rem]">
                                    <div className='capitalize text-[1.2rem] '>{expense.expenses_title.length > 20 ? `${expense.expenses_title.substring(0, 20)}...` : expense.expenses_title}</div>
                                </td>
                                <td className="px-4 py-2 font-bold text-[#4454DC]">${expense.amount}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm text-purple-700 bg-purple-100`}>
                                        {expense.expenses_type_id ? expense.expenses_type.type_name : 'No Type Found!'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700 w-[40rem]">{expense.description.length > 170 ? `${expense.description.substring(0, 240)}...` : expense.description}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(expense.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(expense.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
                {expenses &&
                    <TablePagination currentPage={currentPage} totalPages={expenses.totalPages} setCurrentPage={setCurrentPage} totalCount={expenses.totalCount}  count={expenses.expenses.length} />
                }
            </div>
        </div>
    )
}
