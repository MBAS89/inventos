import React from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'

//icons
import { AiOutlineCheckCircle } from "react-icons/ai"
import { HiOutlineReceiptRefund } from "react-icons/hi"
import { CiWarning } from "react-icons/ci"
import { MdOutlineDelete } from "react-icons/md"
import { FiEdit2 } from "react-icons/fi"
import { Loader } from '../reusable-components/Loader'
import { handleStatus } from '../../functions/HandleInvoiceStatus'
import { format, parseISO } from 'date-fns'

export const SuppliersInvoicesTable = ({data, isLoading, currentPage, setCurrentPage}) => {

    console.log(data)

    const headItems = [
        {
          title:"items"
        },
        {
          title:"Id"
        },
        {
          title:"Total Amount"
        },
        {
            title:"Total Discount"
        },
        {
            title:"Total To Pay"
        },
        {
          title:"Total Paid"
        },
        {
          title:"Total due"
        },
        {
          title:"status"
        },
        {
          title:"casher"
        },
        {
            title:"Created At"
        }
    ]

    return (
        <div className='mt-6 w-[80%] mx-auto'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} withoutSelecthead={true} />
                    {isLoading ? (
                        <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                            <tr><td><Loader /></td></tr>
                        </tbody>
                    ) :
                    <tbody className="divide-y divide-gray-200">
                        {data.invoices.map((invoice) => (
                            <tr key={invoice.id} className='h-16'>
                                <td className="px-4 py-2 font-medium text-gray-900 flex flex-col gap-2 w-[30rem]">
                                    {invoice.items.map((item) => (
                                        <div key={item.id} className='flex items-center gap-3'>
                                            <div className='font-bold w-[10%]'>{item.qty} X</div>
                                            <div className=' bg-gray-100 p-1 rounded-md w-[10%] flex items-center justify-center'>
                                                <img width="40" height="40" src={item.product.image} alt="nut"/>
                                            </div>
                                            <div className='w-[80%] flex flex-col gap-2'>
                                                <span className='capitalize'>{item.product.name}</span>
                                                <span className='font-bold text-[#4454DC]'>${item.product.pieces_per_unit > 1 ? item.product.retail_price_piece : item.product.retail_price_unit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-4 py-2 font-bold">{invoice.id}</td>
                                <td className="px-4 py-2 font-bold text-[#362993]">${invoice.total_amount}</td>
                                <td className="px-4 py-2 font-bold text-[#d9c512]">${invoice.extra_discount}</td>
                                <td className="px-4 py-2 font-bold text-[#ff32eb]">${invoice.total_to_pay}</td>
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
