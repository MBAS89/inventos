import React, { useEffect, useState } from 'react'

//components
import { DiscountAndCouponPopup } from '../DiscountAndCouponPopup';

//icons
import { GrEdit } from 'react-icons/gr'
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useAddInvoiceMutation } from '../../../../features/api/sales/innerInvoicesApiSlice';
import { useSelector } from 'react-redux';
import { authInfoState } from '../../../../features/slices/authSlice';
import { toast } from 'react-toastify';


export const BillingNumbers = ({items, pickedCustomer, setIndexChange, setInventoryIndex, setPickedCustomer, setItems, hideNumbers, setHideNumbers }) => {
    const [showDiscountAndCouponPopup, setShowDiscountAndCouponPopup] = useState(false)
    const [couponPopup, setCouponPopup] = useState(false)

    const [totalAmount, setTotalAmount] = useState(0)
    const [itemsDiscount, setItemsDiscount] = useState(0)
    const [customerDiscount, setCustomerDiscount] = useState(0)
    const [extraDiscount, setExtraDiscount] = useState(0)
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [totalToPay, setTotalToPay] = useState(0)
    const [totalDue, setTotalDue] = useState(0)
    const [totalPaid, setTotalPaid] = useState(0)
    const [includeItemsDiscount, setIncludeItemsDiscount] = useState(false)
    const [couponDiscount, setCouponDiscount] = useState(0)
    const [status, setStatus] = useState('No-status')
    const [couponCode, setCouponCode] = useState('')

    useEffect(() => {
        if(items.length > 0){
            const totalAmount = items.reduce((total, currentItem) => {
                const itemTotal = currentItem.qty * currentItem.price;
                return total + itemTotal;
            }, 0);
            setTotalAmount(totalAmount);
            
            if(pickedCustomer){
                if(pickedCustomer.customerType.discount_value > 0 || pickedCustomer.customerType.wholeSalePrice === true){
                    if(pickedCustomer.customerType.discount_value > 0 && pickedCustomer.customerType.wholeSalePrice === false){
                        setCustomerDiscount(totalAmount * (pickedCustomer.customerType.discount_value / 100))
                        if(includeItemsDiscount){
                            const totalDiscountPrice = items.reduce((total, currentItem) => {

                                const salePrice = currentItem.salePricePeice ? currentItem.salePricePeice : currentItem.salePriceUnit;
        
                                const itemTotal = salePrice * currentItem.qty;
        
                                return total + itemTotal;
                            }, 0);
                            setItemsDiscount(totalDiscountPrice ? totalAmount - totalDiscountPrice : 0);
                        }else{
                            setItemsDiscount(0)
                        }

                    }else{
                        const totalForCustomer = items.reduce((total, currentItem) => {
                            const itemTotal = currentItem.qty * currentItem.wholeSalePrice;
                            return total + itemTotal;
                        }, 0);
                        setCustomerDiscount(totalAmount - totalForCustomer)

                        if(includeItemsDiscount){
                            const totalDiscountPrice = items.reduce((total, currentItem) => {

                                const salePrice = currentItem.salePricePeice ? currentItem.salePricePeice : currentItem.salePriceUnit;
        
                                const itemTotal = salePrice * currentItem.qty;
        
                                return total + itemTotal;
                            }, 0);
                            setItemsDiscount(totalDiscountPrice ? totalAmount - totalDiscountPrice : 0);
                        }else{
                            setItemsDiscount(0)
                        }
                    }
                }else{
                    setIncludeItemsDiscount(true)
                    const totalDiscountPrice = items.reduce((total, currentItem) => {

                        const salePrice = currentItem.salePricePeice ? currentItem.salePricePeice : currentItem.salePriceUnit;

                        const itemTotal = salePrice * currentItem.qty;

                        return total + itemTotal;
                    }, 0);
                    setItemsDiscount(totalDiscountPrice ? totalAmount - totalDiscountPrice : 0);
                    setCustomerDiscount(0)
                }
            }else{
                setIncludeItemsDiscount(true)
                const totalDiscountPrice = items.reduce((total, currentItem) => {

                    const salePrice = currentItem.piecesPerUnit > 1 ? currentItem.salePricePeice : currentItem.salePriceUnit;

                    const itemTotal = salePrice * currentItem.qty;

                    return total + itemTotal;
                }, 0);
                setItemsDiscount(totalDiscountPrice ? totalAmount - totalDiscountPrice : 0);
                setCustomerDiscount(0)
            }

           setTotalDiscount(itemsDiscount + customerDiscount + Number(extraDiscount) + couponDiscount)
           setTotalToPay(totalAmount - totalDiscount)
           
           setTotalDue(totalToPay - totalPaid)

            if(totalDue > 0){
                setStatus('partially')
            }else{
                setStatus('paid')
            }

        }else{
            setTotalAmount(0);
            setItemsDiscount(0);
            setCustomerDiscount(0);
            setExtraDiscount(0)
            setTotalDiscount(0)
            setTotalToPay(0)
            setTotalDue(0)
            setTotalPaid(0)
            setIncludeItemsDiscount(false);
            setStatus('No-status')
            setIndexChange([])
            setInventoryIndex(0)
            setCouponDiscount(0)
            setCouponCode('')
            setHideNumbers(false)
        }
    },[items, includeItemsDiscount, couponDiscount, pickedCustomer, customerDiscount, itemsDiscount, totalToPay,  extraDiscount, totalDiscount, totalPaid, totalDue])


    const { authInfo } = useSelector(authInfoState)

    const [addInvoice, {isLoading:isAddLoading}] = useAddInvoiceMutation()

    const handleAddInvoice = async () => {

        if(!authInfo.id){
            return toast.error('Cahser Is Required!')
        }

        if(items.length == 0){
            return toast.error('Invoice Should Have Items!')
        }

        const payload = {
            totalAmount,
            itemsDiscount, 
            customerDiscount,
            extraDiscount,
            totalDiscount, 
            totalToPay, 
            totalPaid, 
            totalDue,
            status, 
            employeeId:authInfo.role === 'owner' ? null : authInfo.id, 
            employeeName:`${authInfo.name} ${authInfo.role === 'owner' ? '(OWNER)' : ''}`,
            customerId:pickedCustomer.id,
            customerExtraInfo:pickedCustomer ? pickedCustomer.customerType.wholeSalePrice ? 'This Invoice Counted This Customer As A Wholesaler And Take Whole Sale Price' : `This Invoice Counted This Customer As A ${pickedCustomer.customerType.type_name} And Have A Discount Value Of ${pickedCustomer.customerType.discount_value}%` : '',
            items,
            includeItemsDiscount,
            couponCode      
        }

        try {
            const res = await addInvoice(payload).unwrap()
            toast.success(res.message)
            setItems([])
            setTotalAmount(0);
            setItemsDiscount(0);
            setCustomerDiscount(0);
            setExtraDiscount(0)
            setTotalDiscount(0)
            setTotalToPay(0)
            setTotalDue(0)
            setTotalPaid(0)
            setIncludeItemsDiscount(false);
            setStatus('No-status')
            setCouponCode('')
            setPickedCustomer('')
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <div className='w-[94%] mx-auto'>
            {!hideNumbers && 
            <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                    <div>Include Product Discount:</div>
                    <div className="toggle-switch">
                        <input checked={includeItemsDiscount} onChange={() => setIncludeItemsDiscount(!includeItemsDiscount)} className="toggle-input" id="toggle" type="checkbox" />
                        <label className="toggle-label" for="toggle"></label>
                    </div>
                </div>
                <hr />
                <div className='flex justify-between items-center capitalize'>
                    <div>Actual Total:</div>
                    <div>{totalAmount}$</div>
                </div>
                <div className='flex justify-between items-center capitalize'>
                    <div>Items Discount:</div>
                    <div>{itemsDiscount}$</div>
                </div>
                <div className='flex justify-between items-center capitalize'>
                    <div>Customer Discount:</div>
                    <div>{customerDiscount}$</div>
                </div>
                <div className='flex justify-between items-center capitalize'>
                    <div>Extra Discount:</div>
                    <div className='flex items-center gap-1'>
                        <span className='cursor-pointer' onClick={() =>{
                            setShowDiscountAndCouponPopup(true) 
                            setCouponPopup(false)
                        }} ><GrEdit className='hover:scale-110'/></span>
                        <span>{extraDiscount}$</span>
                    </div>
                    {showDiscountAndCouponPopup &&
                        !couponPopup && <DiscountAndCouponPopup 
                            couponPopup={couponPopup} 
                            setShowDiscountAndCouponPopup={setShowDiscountAndCouponPopup} 
                            setCouponPopup={setCouponPopup}
                            extraDiscount={extraDiscount}
                            setExtraDiscount={setExtraDiscount} 
                        />
                    }
                </div>
                <div className='flex justify-between items-center capitalize'>
                    <div>coupon discount:</div>
                    <div className='flex items-center gap-1'>
                        <span className='cursor-pointer' onClick={() => {
                            setShowDiscountAndCouponPopup(true) 
                            setCouponPopup(true)
                        }}><GrEdit className='hover:scale-110'/></span>
                        <span>{couponDiscount}$</span>
                    </div>
                    {showDiscountAndCouponPopup &&
                        couponPopup && <DiscountAndCouponPopup 
                            couponPopup={couponPopup} 
                            setShowDiscountAndCouponPopup={setShowDiscountAndCouponPopup} 
                            setCouponPopup={setCouponPopup} 
                            setCouponDiscount={setCouponDiscount}
                            setCouponCode={setCouponCode}
                            couponDiscount={couponDiscount}
                            totalAmount={totalAmount}
                        />
                    }
                </div>
                <div className='flex justify-between items-center capitalize'>
                    <div>Total Discount:</div>
                    <div>{totalDiscount}$</div>
                </div>
            </div>
            }
            <div className='flex justify-between items-center capitalize font-bold mt-2'>
                <div className='flex gap-10'>
                    <div>total:</div>
                    <div className='text-blue-500'>{totalToPay}$</div>
                </div>
                <div className='flex gap-10'>
                    <div>total Paid:</div>
                    <div className='text-green-500'>{totalPaid}$</div>
                </div>
                <div className='flex gap-10'>
                    <div>total Due:</div>
                    <div className=' text-red-500'>{totalDue}$</div>
                </div>
            </div>
            <div className='flex justify-between mt-4 gap-5'>
                <div className='w-full'>
                    <input 
                        type='number'
                        placeholder='Paid Amount'
                        className="w-full py-4 text-[1.5rem] px-2 rounded-md border-[#50B426] border-[1px] outline-none border-solid shadow-sm sm:text-sm"
                        value={totalPaid}
                        onChange={(e) => e.target.value <= totalToPay && setTotalPaid(e.target.value)}
                    />
                </div>
                <button onClick={handleAddInvoice} className="w-full flex justify-center items-center gap-4 rounded border border-[#50B426] bg-[#50B426] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#50B426] focus:outline-none active:bg-green-500 active:text-white">
                    <span>Order Done</span> 
                    <AiOutlineCheckCircle className='text-lg'/>
                </button>
            </div>
        </div>
    )
}
