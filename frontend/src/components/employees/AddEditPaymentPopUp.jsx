import React, { useEffect, useState } from 'react'

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';

//reusable function
import { checkRequiredFields } from '../../functions/checkRequiredFileds';

//toast for error handling 
import { toast } from 'react-toastify'

//redux
import { useAddPaymentMutation, useEditPaymentMutation, useReadPaymentQuery } from '../../features/api/employees/paymentApiSlice';

export const AddEditPaymentPopUp = ({ setOpenAddEditPaymentPopUp, employeeData, setEditMode, editMode, selectedPayment, setSelectedPayment }) => {

    const [paymentData, setPaymentData] = useState({
        amount:Number,
        status:'Please select',
        paymentDate:'',
        paidDate:'',
        hoursWorked:Number
    })

    const { amount, status, paymentDate, paidDate, hoursWorked} = paymentData

    const onChange = (e) => {
        const { name, value } = e.target;

        setPaymentData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
    }

    const [addPayment, {isLoading:isAddingLoading}] = useAddPaymentMutation()

    const handleAddPayment = async (e) => {
        e.preventDefault()

        const requiredFileds = ['amount', 'status', 'paymentDate']
        const notEmpty = checkRequiredFields(paymentData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        const payload = {
            employeeId:employeeData.employee.id,
            amount,
            status,
            paymentDate,
            paidDate,
            hoursWorked
        }

        try {
            const res = await addPayment(payload).unwrap()

            toast.success(res.message)

            setPaymentData({
                amount:Number,
                status:'Please select',
                paymentDate:'',
                paidDate:'',
                hoursWorked:Number
            })

            setOpenAddEditPaymentPopUp(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    const { data } = editMode 
    ? useReadPaymentQuery({ paymentId: selectedPayment }, 'readPayment')
    : { data: null, isLoading: false };


    console.log(paymentData)
    useEffect(() => {
        if(data){

            setPaymentData({
                amount:data.payment.amount,
                status:data.payment.status,
                paymentDate:data.payment.paymentDate.split('T')[0],
                paidDate:data.payment.paidDate ? data.payment?.paidDate.split('T')[0] : '',
                hoursWorked:data.payment.hoursWorked || ''
            })

        }
    },[editMode, data])


    const [editPayment, {isLoading:isEditingLoading}] = useEditPaymentMutation()

    const handleEditPayment = async (e) => {
        e.preventDefault()

        const requiredFileds = ['amount', 'status', 'paymentDate']
        const notEmpty = checkRequiredFields(paymentData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        const payload = {
            paymentId:data.payment.id,
            amount,
            status,
            paymentDate,
            paidDate,
            hoursWorked
        }

        try {
            const res = await editPayment(payload).unwrap()

            toast.success(res.message)

            setPaymentData({
                amount:Number,
                status:'Please select',
                paymentDate:'',
                paidDate:'',
                hoursWorked:Number
            })

            setEditMode(false)
            setSelectedPayment('')
            setOpenAddEditPaymentPopUp(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <div tabIndex="0" className='w-full h-full fixed top-[0] left-0 flex justify-center items-center overflow-hidden'>
            <div className="rounded-lg bg-white shadow-2xl border-gray-300 border-2 text-center">
                <div className='relative w-full'>
                    <AiOutlineCloseCircle onClick={() => {setOpenAddEditPaymentPopUp(false); setEditMode(false); setSelectedPayment('')}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-2 top-2'/>
                </div>
                <div className='p-4 mt-7 w-[35rem]'>
                    <h2 className='font-bold text-[1.5rem]'>{editMode ? 'Edit' : 'Add'} Payment</h2>
                    <form onSubmit={editMode ? handleEditPayment : handleAddPayment} className='flex flex-col gap-5 w-[90%] mx-auto mt-6'>
                        <label htmlFor="amount" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={amount} onChange={onChange} name='amount' type="Number" id="amount" placeholder="amount" className="peer h-12 remove-arrow w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Payment Amount
                            </span>
                        </label>
                        <div className='flex justify-between gap-3'>
                            <label htmlFor="paymentDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                <input 
                                    value={paymentDate} 
                                    onChange={onChange}
                                    type="date" 
                                    id="paymentDate" 
                                    name='paymentDate' 
                                    placeholder="paymentDate" 
                                    className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" 
                                />
                                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                    Payment Data
                                </span>
                            </label>
                            <label htmlFor="paidDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                <input 
                                    value={paidDate} 
                                    onChange={onChange}
                                    type="date" 
                                    id="paidDate" 
                                    name='paidDate' 
                                    placeholder="paidDate" 
                                    className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" 
                                />
                                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                    Paid Data
                                </span>
                            </label>
                        </div>
                        <label htmlFor="hoursWorked" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={hoursWorked} onChange={onChange} name='hoursWorked' type="Number" id="hoursWorked" placeholder="hoursWorked" className="peer remove-arrow h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Work Hours
                            </span>
                        </label>
                        <div>
                            <label htmlFor="status" className="block text-sm text-left font-medium text-gray-900">
                                Status
                            </label>
                            <select value={status} onChange={onChange} name="status" id="status" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                                <option disabled>Please select</option>
                                <option value="due">Due</option>
                                <option value="paid">Paid</option>
                                <option value="canceled">Canceled</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                        <button type='submit' disabled={isAddingLoading || isEditingLoading} className="flex justify-center mb-10 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium hover:bg-green-100 text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                            {isAddingLoading || isEditingLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ? 'Submit Change' : 'Submit Payment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
