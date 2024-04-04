import React, { useState } from 'react'

//icons
import { AiOutlineCloseCircle } from "react-icons/ai"
import { MdAttachMoney } from "react-icons/md"
import { RiCoupon2Line } from "react-icons/ri"
import { BiLoaderCircle } from "react-icons/bi";
import { useCheckCouponMutation } from '../../../features/api/inventory/couponsApiSlice'
import { toast } from 'react-toastify'

export const DiscountAndCouponPopup = ({ 
    couponPopup, 
    setShowDiscountAndCouponPopup, 
    setCouponPopup, 
    extraDiscount, 
    setExtraDiscount,
    setCouponDiscount,
    setCouponCode,
    totalAmount
}) => {

    const [code, setCode] = useState('')

    const [checkCoupon, { isLoading }] = useCheckCouponMutation()

    const handleCouponCheck = async () => {
        try {
            if(!code){
                return toast.error('Coupon Code Required')
            }

            const res = await checkCoupon({code:code}).unwrap()
            setCouponCode(res.coupon.code)
            setShowDiscountAndCouponPopup(false)
            setCouponPopup(false)

            if(res.coupon.kind === 'percent'){
                setCouponDiscount(totalAmount * (res.coupon.value / 100))
            }else if(res.coupon.kind === 'cash'){
                setCouponDiscount(res.coupon.value)
            }

            setCode('')
            return toast.success('Coupon Discount Added')

        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <section className="absolute left-3 top-[21rem] w-[95%] z-10 bg-gray-100 overflow-hidden border-2 border-solid border-gray-200 rounded-lg shadow-2xl h-[23rem]">
            <div className='relative'>
                <AiOutlineCloseCircle onClick={() => {
                    setShowDiscountAndCouponPopup(false)
                    setCouponPopup(false)
                }} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <div className='flex flex-col justify-center items-center w-[70%] mx-auto gap-8'>
                <h2 className='text-[2rem] font-bold capitalize text-center mt-16 text-gray-500'>{couponPopup ? 'coupon discount' : 'extra discount'}</h2>
                <div className='w-full'>
                    <div className="relative">
                        <input 
                            type={couponPopup ? 'text' : 'number'} 
                            placeholder={couponPopup ? 'Enter coupon discount' : 'Enter discount number'} 
                            className="w-full py-4 text-[1.5rem] px-2 rounded-md border-[#50B426] border-[1px] outline-none border-solid shadow-sm sm:text-sm"
                            value={couponPopup ? code : extraDiscount}
                            onChange={(e) => couponPopup ? setCode(e.target.value) : setExtraDiscount(e.target.value)}
                        />
                        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500" >
                            {couponPopup ? <RiCoupon2Line /> : <MdAttachMoney />}
                        </span>
                    </div>
                </div>
                <button 
                    disabled={isLoading} 
                    onClick={() => couponPopup ? handleCouponCheck() : (setShowDiscountAndCouponPopup(false), setCouponPopup(false))} 
                    className="flex gap-3 items-center justify-center rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]"
                >
                    {isLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} Apply
                </button>
            </div>
        </section>
    )
}
