import React, { useState } from 'react'

//date fns
import { format, parseISO } from 'date-fns';

//resuable function
import { ObjectEqual } from '../../functions/ObjectEqual';

//reusable components
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination';

//icons
import { MdOutlineEdit, MdDeleteOutline, MdErrorOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { BsSortUp } from "react-icons/bs";
import { BsSortDownAlt } from "react-icons/bs";
import { BiLoaderCircle } from 'react-icons/bi';
import { CgAddR } from "react-icons/cg";

//redux
import { useReadPaymentsQuery, useRemovePaymentMutation } from '../../features/api/employees/paymentApiSlice';

//toast for error handling 
import { toast } from 'react-toastify'


export const PaidPayments = ({data, setOpenAddEditPaymentPopUp, setEditMode, setSelectedPayment}) => {
    const headItems = [
        {
            title:"date",
        },{
            title:"Amount"
        },{
            title:"Status"
        },{
            title:"Paid Date"
        },{
            title:"Hours"
        },{
            title:"action"
        }
    ]

    const statusConfig = {
        paid: {
            bgColor: "bg-emerald-100",
            textColor: "text-emerald-700",
            icon: <FaRegCheckCircle className='scale-125' />,
            label: "Paid"
        },
        due: {
            bgColor: "bg-[#ff9130a8]",
            textColor: "text-[#ffffff]",
            icon: <IoTimeOutline className='scale-125' />,
            label: "Due"
        },
        failed: {
            bgColor: "bg-[#000000]",
            textColor: "text-[#ffffff]",
            icon: <MdErrorOutline className='scale-125' />,
            label: "Failed"
        },
        canceled: {
            bgColor: "bg-[#ff0000a8]",
            textColor: "text-[#ffffff]",
            icon: <ImCancelCircle className='scale-125' />,
            label: "Canceled"
        }
    };
    
    const handleOnclaimedStatus = (status) => {
        const config = statusConfig[status];
    
        if (config) {
            return (
                <div className={`flex items-center justify-center gap-2 rounded-full ${config.bgColor} w-[7rem] py-2 ${config.textColor}`}>
                    {config.icon}
                    <span className='capitalize'>{config.label}</span>
                </div>
            );
        }
    
        return null;
    };

    const [sortBy, setSortBy] = useState({sort:'asc', column:'id'})

    const sortsTypes = [
        {
            sort:'asc',
            column:'id'
        },
        {
            sort:'desc', 
            column:'id'
        }
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const {data:payments, isLoading } = useReadPaymentsQuery({employeeId:data.employee.id, status:'',page:currentPage, sortBy:sortBy},'readPayments')

    const [removePayment, {isLoading:isDeleteLoading}] = useRemovePaymentMutation()

    const handleDeletePayment = (id) => async () => {
        const payload = {
            paymentId:id
        }

        try {
            const res = await removePayment(payload).unwrap()

            toast.success(res.message)
            
        } catch (error) {
           toast.error(error.data.error)
        }
    }


    return (
        <div className='w-[60%] mx-auto'>
            <div className='rounded-md border-2 border-gray-1700 p-4 bg-white mt-4 w-[59%] min-h-[10rem]'>
                <div className='flex justify-between'>
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Paid Payments</h2>
                    <div className='flex gap-4'>
                        {ObjectEqual(sortBy, sortsTypes[0]) ? (
                            <BsSortUp onClick={() => setSortBy(sortsTypes[1])} className='text-[#50B426] text-[1.5rem] cursor-pointer hover:scale-110'/>
                        ) : (
                            <BsSortDownAlt onClick={() => setSortBy(sortsTypes[0])} className='text-[#50B426] text-[1.5rem] cursor-pointer hover:scale-110'/>
                        )}
                    <CgAddR onClick={() => setOpenAddEditPaymentPopUp(true)} className='text-[#50B426] text-[1.5rem] cursor-pointer hover:scale-110'/>
                    </div>
                </div>
                {!isLoading? 
                    payments.payments.length > 0 ?
                        <table className="min-w-full divide-y-2 divide-gray-1700 bg-white text-sm rounded-md ">
                            <TableHead headItems={headItems} selectAll={true} dont={true} withoutSelecthead={true}/>
                            <tbody className="divide-y divide-gray-1700">
                                {payments.payments.map((payment) => (
                                    <tr key={payment.id} className='hover:bg-slate-100'>
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            {format(parseISO(payment.paymentDate), "dd/MM/yyyy")}
                                        </td>
                                        <td className="px-4 py-2 text-[#0070E0] font-bold">${payment.amount}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {handleOnclaimedStatus(payment.status)}
                                        </td>
                                        <td className={`px-4 py-2 ${payment.paidDate ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>{payment.paidDate ? format(parseISO(payment.paidDate), "dd/MM/yyyy") : 'Not Paid'}</td>
                                        <td className="px-4 py-2 text-[#952db4] font-bold">{payment.hoursWorked || '-'}</td>
                                        <td>
                                            <div className='flex gap-3'>
                                                <MdOutlineEdit onClick={() => {setOpenAddEditPaymentPopUp(true); setEditMode(true); setSelectedPayment(payment.id);}} className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                                {isDeleteLoading ? (
                                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                                ) : (
                                                    <MdDeleteOutline onClick={handleDeletePayment(payment.id)} className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    :(
                        <div className='text-center text-[1.4rem] mt-8 text-[#50B426]'>
                            There are no payments Paid
                        </div>
                    )
                : <div className='bg-slate-500 animate-pulse w-[100%] min-h-[10rem] rounded-md'></div>}
                <div className='mt-3'>
                    {payments && <TablePagination currentPage={currentPage} totalPages={payments.totalPages} setCurrentPage={setCurrentPage} totalCount={payments.totalCount}  count={payments.payments.length}/>}
                </div>
            </div>
        </div>
    )
}
