import React, { useState } from 'react'

//fromt for time 
import { format, parseISO } from 'date-fns';

//icons 
import { PiShieldStarThin } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";

//redux
import { useEditExpenseTypeMutation, useRemoveExpenseTypeMutation } from '../../../features/api/expenses/expensesTypesApiSlice'

//toast 
import { toast } from 'react-toastify'

export const ExpensesTypeBox = ({typeData}) => {
    const [typeName, setTypeName] = useState(typeData.type_name)

    const [removeExpenseType] = useRemoveExpenseTypeMutation()

    const handleDeleteType = async () => {
        try {
            const payload = {
                typeId:typeData.id,
            }

            const res = await removeExpenseType(payload).unwrap()
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    const [editMode, setEditMode] = useState(false)
    const [editExpenseType] = useEditExpenseTypeMutation()

    const handleSubmitEdit = async () => {

        if(!typeName){
            return toast.error('Type Name is Required')
        }

        if(typeName.length > 20){
            return toast.error('Type Name Is So Long!')
        }


        try {
            const payload = {
                typeId:typeData.id,
                typeName
            }

            const res = await editExpenseType(payload).unwrap()
            setEditMode(false)
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <div className='w-[22rem] h-[7rem] p-5 bg-white rounded-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <PiShieldStarThin className='text-[#50B426] text-[1.7rem]'/>
                    {editMode ? (
                        <input value={typeName} onChange={(e) => setTypeName(e.target.value)} className='bg-white w-[10rem] h-8 rounded-md border border-gray-200 px-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]'/>
                    ) : (
                        <h4 className='font-bold text-gray-700 text-[1rem] uppercase'>{typeData.type_name}</h4>
                    ) }
                </div>
                <div className='flex gap-4 items-center'>
                    {editMode ? (
                        <div className='flex gap-2 items-center justify-center'>
                            <div onClick={handleSubmitEdit} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                                <FaRegCircleCheck className='text-[1.2rem] text-[#50B426] '/>
                            </div>
                            <div  onClick={() => setEditMode(false)}  className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                                <IoMdCloseCircleOutline className='text-[1.4rem] text-red-500 '/>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => setEditMode(true)} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                            <MdEdit className='text-[1.3rem] text-[#50B426] '/>
                        </div>
                    )}
                    <div onClick={handleDeleteType} className='hover:bg-gray-200  rounded-full p-2 cursor-pointer'>
                        <MdDelete className='text-[1.3rem] text-red-500'/>
                    </div>
                </div>
            </div>
            <div className='text-right mt-4 italic text-gray-400 text-[0.8rem]'>
                {format(parseISO(typeData.createdAt), "dd/MM/yyyy")}
            </div>
        </div>
    )
}
