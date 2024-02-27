import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useReadExpensesTypesQuery } from '../../features/api/expenses/expensesTypesApiSlice'
import { useAddExpenseMutation, useEditExpenseMutation, useReadExpenseQuery } from '../../features/api/expenses/expensesApiSlice'
import { checkRequiredFields } from '../../functions/checkRequiredFileds'
import { toast } from 'react-toastify'
import { BiLoaderCircle } from "react-icons/bi";


export const AddAndEditPopUp = ({ setOpenPopup, editMode, selected, setEditMode }) => {

    const { data:expensesTypes } = useReadExpensesTypesQuery({}, 'readExpensesTypes')

    const [expensesData, setExpensesData] = useState({
        expensesTitle:'',
        amount:0,
        description:'',
        expensesTypeId:'Please select'
    })

    const { expensesTitle, amount, description, expensesTypeId } = expensesData

    const onChange = (e) => {
        const { name, value } = e.target;

        setExpensesData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
    }

    const [addExpense, {isLoading:isAddExpenseLoading }] = useAddExpenseMutation()

    const handleAddExpense = async (e) => {
        e.preventDefault()

        const requiredFileds = ['expensesTitle', 'amount', 'description']
        const notEmpty = checkRequiredFields(expensesData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        const payload = {
            expensesTitle,
            amount,
            description,
            expensesTypeId
        }

        try {
            const res = await addExpense(payload).unwrap()
            toast.success(res.message)

            setExpensesData({
                expensesTitle:'',
                amount:0,
                description:'',
                expensesTypeId:'Please select'
            })

            setOpenPopup(false); 
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const { data } = editMode 
    ? useReadExpenseQuery({ expenseId: selected[Object.keys(selected)[0]] }, 'readExpense')
    : { data: null, isLoading: false };

    useEffect(() => {
        if(data){
            setExpensesData({
                expensesTitle:data.expense.expenses_title,
                amount:data.expense.amount,
                description:data.expense.description,
                expensesTypeId:data.expense.expenses_type_id
            })
        }
    },[editMode, data])


    const [editExpense, {isLoading:isEditLoading}] = useEditExpenseMutation()

    const handleEditExpense = async (e) => {
        e.preventDefault()


        const requiredFileds = ['expensesTitle', 'amount', 'description']
        const notEmpty = checkRequiredFields(expensesData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        if(expensesTitle.length > 20){
            return toast.error('The title is quite lengthy!')
        }

        const payload = {
            expensesTitle,
            amount,
            description,
            expensesTypeId,
            expenseId:data.expense.id
        }

        try {
            const res = await editExpense(payload).unwrap()
            toast.success(res.message)

            setExpensesData({
                expensesTitle:'',
                amount:0,
                description:'',
                expensesTypeId:'Please select'
            })

            setEditMode(false)
            setOpenPopup(false); 
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }



    return (
    <section className="overflow-auto bg-white left-[32%] pb-16 top-[7%] h-[44rem] w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
        <div className='relative w-full bg-black'>
            <AiOutlineCloseCircle onClick={() => setOpenPopup(false)} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
        </div>
        <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Expenses' : 'Add Expenses'}</h2>
        <form onSubmit={editMode ? handleEditExpense : handleAddExpense} className='flex flex-col gap-8 w-[70%] mx-auto mt-5'>
            <label htmlFor="expensesTitle" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input value={expensesTitle} onChange={onChange} type="text" id="expensesTitle" name='expensesTitle' placeholder="expensesTitle" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Expense Information
                </span>
            </label>
            <label htmlFor="amount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input value={amount}  onChange={onChange} type="Number" id="amount" name='amount' placeholder="amount" className="peer h-12 remove-arrow w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Amount
                </span>
            </label>
           <div>
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <textarea value={description} onChange={onChange} id="description" name='description' className="w-full border-none align-top focus:ring-0 sm:text-sm p-3 focus:outline-none" rows="4" placeholder="Description..."></textarea>
                </div>
            </div>
            <div>
                <label htmlFor="expensesTypeId" className="block text-sm font-medium text-gray-900">
                    Expense Type
                </label>
                <select value={expensesTypeId} onChange={onChange} name="expensesTypeId" id="expensesTypeId" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                    <option disabled>Please select</option>
                    {expensesTypes && expensesTypes.expensesTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.type_name}</option>
                    ))}
                </select>
            </div>
            <button type='submit' className="inline-block rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]">
                {(isAddExpenseLoading || isEditLoading) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ? 'Edit Expense' :'Add Expense'}
            </button>
        </form>
    </section>
  )
}

