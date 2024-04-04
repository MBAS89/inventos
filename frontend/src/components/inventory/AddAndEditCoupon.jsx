import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from "react-icons/bi";
import { useAddCouponMutation, useEditCouponMutation, useReadCouponQuery } from '../../features/api/inventory/couponsApiSlice';
import { checkRequiredFields } from '../../functions/checkRequiredFileds';
import { toast } from 'react-toastify';

import { FaDollarSign } from "react-icons/fa6";
import { MdOutlinePercent } from "react-icons/md";


export const AddAndEditCoupon = ({ setOpenPopup, editMode, selected, setEditMode }) => {

    const [couponData, setCouponData] = useState({
        code:'',
        kind:'percent',
        value:0,
        usedTimes:1,
        expiresIn:'',
    })

    const { code, kind, value, usedTimes, expiresIn } = couponData

    const onChange = (e) => {
        const { name, value } = e.target;

        setCouponData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
    }

    const [addCoupon, {isLoading:isCouponLoading }] = useAddCouponMutation()

    const handleAddCoupon = async (e) => {
        e.preventDefault()

        const requiredFileds = ['code', 'kind', 'value']
        const notEmpty = checkRequiredFields(couponData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty || 'Missing Image Please Upload image!')
        }

        const payload = {
            code,
            expiresIn, 
            used:false,
            kind,
            value: parseInt(value), 
            usedTimes: parseInt(usedTimes)
        }

        try {
            const res = await addCoupon(payload).unwrap()
            toast.success(res.message)
            setCouponData({
                code:'',
                kind:'percent',
                value:0,
                usedTimes:1,
                expiresIn:'',
            })

            setOpenPopup(false); 
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [used, setUsed] = useState(false)

    const { data } = editMode 
    ? useReadCouponQuery({ couponId: selected[Object.keys(selected)[0]] }, 'readCoupon')
    : { data: null, isLoading: false };


    useEffect(() => {
        if(data){

            setCouponData({
                code: data.coupon.code,
                kind: data.coupon.kind,
                value: data.coupon.value,
                usedTimes: data.coupon.can_be_used_times,
                expiresIn: data.coupon.expires_in,
            })

            setUsed(data.coupon.used)
    
        }
    },[editMode, data])


    const [editCoupon, {isLoading:isEditCouponLoading }] = useEditCouponMutation()

    const handleEditEmployee = async (e) => {
        e.preventDefault()

        const requiredFileds = ['code', 'kind', 'value']
        const notEmpty = checkRequiredFields(couponData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty || 'Missing Image Please Upload image!')
        }

        const payload = {
            code,
            expiresIn, 
            used:used,
            kind,
            value: parseInt(value), 
            usedTimes: parseInt(usedTimes),
            couponId:data.coupon.id
        }


        try {
            const res = await editCoupon(payload).unwrap()
            toast.success(res.message)
            setCouponData({
                code:'',
                kind:'percent',
                value:0,
                usedTimes:1,
                expiresIn:'',
            })

            setUsed(false)
            setEditMode(false)
            setOpenPopup(false); 
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <section className={`overflow-auto bg-white left-[32%] top-[7%] ${editMode ? 'h-[46rem]': 'h-[40rem]'} w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl`}>
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => { setOpenPopup(false); setEditMode(false);}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Coupon' : 'Add Coupon'}</h2>
            <form onSubmit={editMode ? handleEditEmployee : handleAddCoupon} className='flex flex-col gap-8 w-[70%] mx-auto mt-5 mb-10'>
                <label htmlFor="fullName" className="relative block overflow-hidden rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={code} onChange={onChange} type="text" name='code' id="code" placeholder="code" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Code
                    </span>
                </label>
                <div>
                    <label htmlFor="kind" className="block text-sm font-medium text-gray-900">
                        Coupon Kind
                    </label>
                    <select value={kind} onChange={onChange}  name="kind" id="kind" className="mt-1.5 p-4 w-full border border-gray-300 rounded-md text-gray-700 sm:text-sm">
                        <option disabled>Please select coupon kind</option>
                        <option value="percent">Percent</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="value" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={value} onChange={onChange} type="number" id="value" name='value' placeholder="value" className="peer remove-arrow relative h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Coupon Value
                        </span>
                        {kind === 'percent' ? 
                            <MdOutlinePercent className='text-[#50B426] text-[1.6rem] absolute right-2 top-5'/> 
                        : 
                            <FaDollarSign className='text-[#50B426] text-[1.4rem] absolute right-2 top-5'/>
                        }
                    </label>
                    <label htmlFor="usedTimes" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={usedTimes || 1} onChange={onChange} type="number" id="usedTimes" name='usedTimes' placeholder="Confirm Password" className="peer remove-arrow h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Used Times
                        </span>
                    </label>
                </div>
                <label htmlFor="expiresIn" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={expiresIn ? expiresIn : ''} onChange={onChange} type="date" id="expiresIn" name='expiresIn' placeholder="expiresIn" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Expires In
                    </span>
                </label>
                {editMode && 
                    <div>
                        <label htmlFor="kind" className="block text-sm font-medium text-gray-900">
                            Used Coupon?
                        </label>
                        <select value={used} onChange={(e) => setUsed(e.target.value)}  name="kind" id="kind" className="mt-1.5 p-4 w-full border border-gray-300 rounded-md text-gray-700 sm:text-sm">
                            <option disabled>Please select coupon kind</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                }
                <button type='submit' disabled={isCouponLoading} className="flex gap-3 justify-center rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                    {(isCouponLoading || isEditCouponLoading) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>}{editMode ? 'Edit Coupon' : 'Add Coupon'}
                </button>
            </form>
        </section>
    )
}
