import React, { useState } from 'react'

//date fns
import { format, parseISO } from 'date-fns';

//reusable components
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination';

//resuable function
import { ObjectEqual } from '../../functions/ObjectEqual';

//icons
import { MdOutlinePaid, MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { BsSortUp } from "react-icons/bs";
import { BsSortDownAlt } from "react-icons/bs";
import { BiLoaderCircle } from 'react-icons/bi';
import { CgAddR } from "react-icons/cg";

//redux
import { usePayPaymentMutation, useReadPaymentsQuery, useRemovePaymentMutation } from '../../features/api/employees/paymentApiSlice';

//toast for error handling 
import { toast } from 'react-toastify'

export const DuePayments = ({ data, setOpenAddEditPaymentPopUp, setEditMode, setSelectedPayment }) => {

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

    const headItems = [
        {
            title:"date",
        },{
            title:"Amount"
        },{
            title:"claimed"
        },{
            title:"Hours"
        },{
            title:"action"
        }
    ]

    const handleOnclaimedStatus = (status) => {
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


    const [currentPage, setCurrentPage] = useState(1)
    const {data:payments, isLoading } = useReadPaymentsQuery({employeeId:data.employee.id, status:'due',page:currentPage, sortBy:sortBy},'readPayments')


    const [payPayment, {isLoading:isPayLoading}] = usePayPaymentMutation()

    const handlePayOrCancel = (paid, id) => async () => {

        const payload = {
            paymentId:id,
            paid
        }

        try {
            const res = await payPayment(payload).unwrap()

            toast.success(res.message)
            
        } catch (error) {
           toast.error(error.data.error)
        }
    }



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
                    <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Due Payments</h2>
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
                                        {handleOnclaimedStatus(payment.claimed)}
                                    </td>
                                    <td className="px-4 py-2 text-[#952db4] font-bold">{payment.hoursWorked || '-' }</td>
                                    <td>
                                        <div className='flex gap-3 items-center'>
                                            {isPayLoading ? (
                                                <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                            ) : (
                                                <MdOutlinePaid onClick={handlePayOrCancel(true, payment.id)} className='text-[1.5rem] text-[#50B426] cursor-pointer hover:scale-110'/>
                                            )}
                                            {isPayLoading ? (
                                                <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                            ) : (
                                                <ImCancelCircle onClick={handlePayOrCancel(false, payment.id)} className='text-[1.2rem] text-[#ff0000a8] cursor-pointer hover:scale-110'/>
                                            )}
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
                            There are no payments due
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
