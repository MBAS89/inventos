import React, { useState } from 'react'

//icons
import { BiLoaderCircle } from "react-icons/bi";
import { MdPercent } from "react-icons/md";
import { useAddCustomersTypesMutation } from '../../../features/api/customers/customersTypeApiSlice';
import { toast } from 'react-toastify';

export const CustomerAddType = () => {
    const [typeName, setTypeName] = useState('')
    const [discountValue, setDiscountValue] = useState(0)
    const [wholesale, setWholesale] = useState('WholeSale?')

    const [addCustomersTypes, { isLoading }] = useAddCustomersTypesMutation()

    const handleAddCustomerType = async (e) => {
        e.preventDefault()

        if(!typeName){
            return toast.error('Type Name Is Required!')
        }

        const payload = {
            wholeSalePrice: wholesale == 'WholeSale?' ? false : wholesale,
            discountValue,
            typeName
        }

        try {
            const res = await addCustomersTypes(payload).unwrap()
            toast.success(res.message)
            setTypeName('')
            setDiscountValue(0)
            setWholesale('WholeSale?')
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <div className='mt-2 p-4'>
            <form onSubmit={handleAddCustomerType} className='flex gap-4 bg-white p-5 rounded-lg w-[65rem] ml-10'>
                <label htmlFor="typeName" className="relative block overflow-hidden w-[25rem] bg-white rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={typeName} onChange={(e) => setTypeName(e.target.value)} name='typeName' type="text" id="typeName" placeholder="typeName" className="peer h-12 border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Type Name
                    </span>
                </label>
                <label htmlFor="discountValue" className="relative block overflow-hidden w-[25rem] bg-white rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} name='discountValue' type="text" id="discountValue" placeholder="discountValue" className="peer h-12 border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Discount Value
                    </span>
                    <MdPercent className='absolute right-3 top-5 text-[1.7rem] text-[#50B426]'/>
                </label>
                <div className='w-[25rem]'>
                    <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="w-full h-16 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        value={wholesale} onChange={(e) => setWholesale(e.target.value)}
                    >
                        <option disabled >WholeSale?</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button type='submit' className='bg-[#50B426] flex justify-center items-center rounded-md w-[14rem] text-white hover:bg-[#68b148]'>
                    {isLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {isLoading ?'Adding Type' :'Add Type'}
                </button>
            </form>
        </div>
    )
}
