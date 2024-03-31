import React, { useState } from 'react'

import { format, parseISO } from 'date-fns';

import { handleStatus } from '../../../functions/handleStatus'

//icons 
import { PiShieldStarThin } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useEditCustomersTypesMutation, useRemoveCustomersTypesMutation } from '../../../features/api/customers/customersTypeApiSlice';
import { toast } from 'react-toastify';


export const CustomerTypesBox = ({typeData}) => {

    const [typeName, setTypeName] = useState(typeData.type_name)
    const [discountValue, setDiscountValue] = useState(typeData.discount_value)
    const [wholesaler, setWholesaler] = useState(typeData.wholeSalePrice)


    const [removeCustomersTypes] = useRemoveCustomersTypesMutation()

    const handleDeleteType = async () => {
        try {
            const payload = {
                typeId:typeData.id,
            }

            const res = await removeCustomersTypes(payload).unwrap()
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    const [editMode, setEditMode] = useState(false)
    const [editCustomersTypes] = useEditCustomersTypesMutation()

    const handleSubmitEdit = async () => {

        if(!typeName || !discountValue){
            return toast.error('Type Name And Discount Value is Required')
        }

        try {
            const payload = {
                typeId:typeData.id,
                typeName,
                discountValue,
                wholeSalePrice:wholesaler

            }

            const res = await editCustomersTypes(payload).unwrap()
            setEditMode(false)
            toast.success(res.message)
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    return (
        <div className='w-[22rem] h-[13rem] p-5 bg-white rounded-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <PiShieldStarThin className='text-[#50B426] text-[1.7rem]'/>
                    {editMode ? (
                        <input value={typeName} onChange={(e) => setTypeName(e.target.value)} className='bg-white w-[10rem] h-8 rounded-md border border-gray-200 px-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]'/>
                    ) : (
                        <h4 className='font-bold text-gray-600 text-[1.4rem] uppercase'>{typeData.type_name}</h4>
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
            <div className='flex mt-4 justify-center gap-10'>
                <div className='flex justify-center items-center flex-col gap-2'> 
                    <div className='font-bold'>Discount Value</div>
                    {editMode ? (
                        <input value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className='bg-white w-[3rem] h-10 mt-3 rounded-md border border-gray-200 px-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]'/>
                    ) : (
                        <div className='text-[1.5rem] font-bold text-[#50B426]'>{typeData.discount_value}%</div>
                    )}
                </div>
                <div className='flex justify-center items-center flex-col gap-4'>
                    <div className='font-bold '>WholeSaler</div>
                    {editMode ? (
                        <div className='w-[6rem]'>
                            <select
                                name="HeadlineAct"
                                id="HeadlineAct"
                                className="w-full h-10 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                                value={wholesaler} onChange={(e) => setWholesaler(e.target.value)}
                            >
                                <option disabled >WholeSale?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    ) : (
                        <div>{handleStatus(typeData.wholeSalePrice)}</div>
                    )}
                </div>
            </div>
            <div className='text-right mt-4 italic text-gray-400 text-[0.8rem]'>
                {format(parseISO(typeData.createdAt), "dd/MM/yyyy")}
            </div>
        </div>
    )
}
