import React from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'

//icons
import { AiOutlineCheckCircle } from "react-icons/ai"
import { HiOutlineReceiptRefund } from "react-icons/hi"
import { CiWarning } from "react-icons/ci"
import { Loader } from '../reusable-components/Loader'
import { format, parseISO } from 'date-fns'



export const InvoicesTable = ({headItems, data, isLoading, currentPage, setCurrentPage, selectedInvoice, handleCheckboxChange}) => {

    const handleStatus = (status) => {
        if(status === "paid"){
            return(
                <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    <AiOutlineCheckCircle />
                    <p className="whitespace-nowrap text-sm">Paid</p>
                </span>
            )
        }else if(status === "Partially" || status === "partially"){
            return(
                <span className="inline-flex items-center justify-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                    <HiOutlineReceiptRefund />
                    <p className="whitespace-nowrap text-sm">Partially</p>
                </span>
            )
        }else if(status === "refunded"){
            return(
                <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                    <HiOutlineReceiptRefund />
                    <p className="whitespace-nowrap text-sm">Refunded</p>
                </span>
            )
        }else{
            return(
                <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-200 px-2.5 py-0.5 text-gray-700">
                    <CiWarning />
                    <p className="whitespace-nowrap text-sm">Unknown</p>
                </span>
            )
        }

    } 


    return (
        <div className='px-6 mt-2'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} invoice={true} />
                    {isLoading ? (
                        <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                            <tr><td><Loader /></td></tr>
                        </tbody>
                    ) :
                    <tbody className="divide-y divide-gray-200">
                        {data.invoices.map((invoice) => (
                            <tr key={invoice.id} className='h-16'>
                                <td className="px-4 py-2">
                                    <input
                                        className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                        type="checkbox"
                                        id={`Row${invoice.id}}`}
                                        onChange={() => handleCheckboxChange(invoice.id, invoice.employeeId)}
                                        checked={selectedInvoice.invoiceId == invoice.id}
                                    />
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex flex-col gap-2">
                                    {invoice.items.map((item) => (
                                        <div key={item.id} className='flex items-center gap-3'>
                                            <div className='font-bold'>{item.qty} X</div>
                                            <div className=' bg-gray-100 p-1 rounded-md w-[10%] flex items-center justify-center'>
                                                <img width="40" height="40" src={item.product.image} alt="nut"/>
                                            </div>
                                            <div className='w-[80%] flex flex-col gap-2'>
                                                <span className='capitalize'>{item.product.name}</span>
                                                <span className='font-bold text-[#4454DC]'>$</span>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-4 py-2 font-bold">{invoice.id}</td>
                                <td className="px-4 py-2 font-bold text-[#362993]">${invoice.total_amount}</td>
                                <td className="px-4 py-2 font-bold text-[#50B426]">${invoice.total_paid}</td>
                                <td className="px-4 py-2 font-bold text-[#f14f4f]">${invoice.total_due}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    {handleStatus(invoice.status)}
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900">
                                    <div className='flex items-center gap-4'>
                                        <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                            <img width="50" height="50" src={invoice.employee.image} alt={invoice.employee.full_name}/>
                                        </div>
                                        <div>{invoice.employee.full_name}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(invoice.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                <td className="px-4 py-2 text-gray-700">{format(parseISO(invoice.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>               
                {data &&
                    <TablePagination 
                        currentPage={currentPage} 
                        totalPages={data.totalPages} 
                        setCurrentPage={setCurrentPage} 
                        totalCount={data.totalCount}  
                        count={data.invoices.length}
                    />
                }
            </div>
        </div>
    )
}

