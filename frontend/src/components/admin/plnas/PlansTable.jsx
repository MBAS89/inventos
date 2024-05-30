import React, { useState } from 'react'

//date fns
import { format, parseISO } from 'date-fns';

//Reusable Components
import { TableHead } from '../../TableHead';
import { Loader } from '../../reusable-components/Loader';
import { TablePagination } from '../../TablePagination';

//Reusable Funtions 
import { handleStatus } from '../../../functions/handleStatus'

//redux
import { useReadPlansQuery } from '../../../features/api/plnas/plansApiSlice';

export const PlansTable = ({ headItems, selectedPlans, setSelectedPlans, searchQuery, sortBy }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const { data:plans, isLoading } = useReadPlansQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readPlnas')
    
    const handleCheckboxChange = (planId, imageId) => {
        setSelectedPlans({
            planId,
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
                        {plans.plans.map((plan) => (
                            <tr key={plan.id}>
                                <td className="px-4 py-2">
                                    <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${plan.id}`}
                                        onChange={() => handleCheckboxChange(plan.id, plan.name)}
                                        checked={selectedPlans.planId == plan.id}
                                    />
                                </td>
                                <td className="px-4 py-2 text-gray-700">{plan.name}</td>
                                <td className="px-4 py-2 text-gray-700">{plan.customers}</td>
                                <td className="px-4 py-2 text-gray-700">{plan.suppliers}</td>
                                <td className="px-4 py-2 text-gray-700">{plan.categories}</td>
                                <td className="px-4 py-2 text-gray-700">{plan.brands}</td>
                                <td className="px-4 py-2 text-gray-700">{plan.employees}</td>
                                <td className="px-4 py-2 text-gray-700">{plan.expenses}</td>
                                <td className="px-4 py-2 text-gray-700">{plan.inner_invoices}</td>
                                <td className="px-4 py-2 text-gray-700">{plan.outer_invoices}</td>
                                <td className="px-4 py-2 text-green-500 text-[1rem] font-bold">${plan.price}</td>
                                <td className="px-4 py-2 text-gray-700">{handleStatus(plan.on_sale)}</td>
                                <td className="px-4 py-2 text-red-500 text-[1rem] font-bold">{plan.sale_price && plan.sale_price > 0 ? '$' : ''}{plan.sale_price}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(plan.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(plan.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
                {plans &&
                    <TablePagination currentPage={currentPage} totalPages={plans.totalPages} setCurrentPage={setCurrentPage} totalCount={plans.totalCount}  count={plans.plans.length}/>
                }
            </div>
        </div>
    )
}
