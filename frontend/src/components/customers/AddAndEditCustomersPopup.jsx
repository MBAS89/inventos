import React, { useEffect, useState } from 'react'

//icons
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from "react-icons/bi";

//drop zone for upload pictures
import { DropZone } from '../DropZone'

//redux
import { useSelector } from 'react-redux'
import { useAddCustomerMutation, useEditCustomerMutation, useReadCustomerQuery } from '../../features/api/customers/customersApiSlice'
import { authInfoState } from '../../features/slices/authSlice'

//react toastify to show toast for the user
import { toast } from 'react-toastify'

//reusable funtion to check required fileds
import { checkRequiredFields } from '../../functions/checkRequiredFileds'

export const AddAndEditCustomersPopup = ({ setOpenPopup, editMode, selected, setEditMode } ) => {
    const { customersTypesData } = useSelector((state) => state.customerTypes);
    const { authInfo } = useSelector(authInfoState)


    const { data, isLoading: isdataLoading } = editMode 
    ? useReadCustomerQuery({ storeId: authInfo.store_id, customerId: selected[Object.keys(selected)[0]] }, 'readCustomer')
    : { data: null, isLoading: false };

    const [addCustomer, {isLoading, error}] = useAddCustomerMutation()
    const [editCustomer, {isLoading:isEditLoading, error:editError}] = useEditCustomerMutation()

    const [customerData, setCustomerData] = useState({
        fullName:'',
        email:'',
        phone:'',
        address:'',
        customerType:'Please select type'
    })

    const onChange = (e) => {
        setCustomerData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value

        }))
    }

    const { fullName, email, phone, address,customerType } = customerData

    const [file, setFile] = useState(null)


    const handleAddCustomer = async (e) => {
        e.preventDefault()

        const requiredFileds = ['fullName', 'email', 'phone', 'address','customerType']
        const notEmpty = checkRequiredFields(customerData, requiredFileds)

        if(notEmpty || !file){
            toast.error(notEmpty || 'Missing Image Please Upload image!')
        }

        const payload = {
            file,
            fullName,
            email,
            phone,
            address,
            customerType,
            storeName:authInfo.store_name,
            storeId:authInfo.store_id
        }

        try {
            const res = await addCustomer(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setCustomerData({
                fullName:'',
                email:'',
                phone:'',
                address:'',
                customerType:'Please select type'
            })
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [customerNumbers, setCustomerNumber] = useState({
        totalTransaction:'',
        totalPaid:'',
        totalDebt:''
    })

    const { totalTransaction, totalPaid, totalDebt} = customerNumbers

    const onNumbersChange = (e) => {
        setCustomerNumber((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value

        }))
    }

    useEffect(() => {
        if(data){
            setCustomerData({
                fullName:data.customer.full_name,
                email:data.customer.email,
                phone:data.customer.phone_number,
                address:data.customer.address,
                customerType:data.customer.customerType.id
            })
    
            setFile(perviousState => ({
                ...perviousState,
                imageUrl:data.customer.image
            }))
    
            setCustomerNumber({
                totalTransaction:data.customer.total_transactions,
                totalPaid:data.customer.total_paid,
                totalDebt:data.customer.total_debt
            })

            console.log('test')
        }
    },[editMode, data])


    const handleEditCustomer = async (e) => {

        e.preventDefault()

        const requiredFileds = ['fullName', 'email', 'phone', 'address','customerType']
        const notEmpty = checkRequiredFields(customerData, requiredFileds)

        if(notEmpty || !file){
            toast.error(notEmpty || 'Missing Image Please Upload image!')
        }

        const payload = {
            file,
            fullName,
            email,
            phone,
            address,
            customerType,
            storeName:authInfo.store_name,
            totalTransaction,
            totalPaid,
            totalDebt,
            storeId:authInfo.store_id,
            oldImage:data.customer.image,
            customerId:data.customer.id
        }

        try {
            const res = await editCustomer(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setCustomerData({
                fullName:'',
                email:'',
                phone:'',
                address:'',
                customerType:'Please select type'
            })

            setCustomerNumber({
                totalTransaction:'',
                totalPaid:'',
                totalDebt:''
            })

            setEditMode(false)
            setOpenPopup(false); 
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    return (
        <section className=" overflow-auto pb-16 bg-white left-[32%] top-[7%] h-[45rem] w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => { setOpenPopup(false); setEditMode(false);}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Customer' : 'Add Customer'}</h2>

            <form onSubmit={editMode ? handleEditCustomer : handleAddCustomer} className='flex flex-col gap-8 w-[70%] mx-auto mt-5'>
                <DropZone setFile={setFile} file={file} className="border-[2px] border-dashed py-8 border-[#50B426] cursor-pointer w-[60%] text-center px-2" />
                <label htmlFor="fullName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={fullName} onChange={onChange} name="fullName" type="text" id="fullName" placeholder="Full Name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Full Name
                    </span>
                </label>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="Email" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={email} name="email" onChange={onChange} type="text" id="Email" placeholder="Email" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Email
                        </span>
                    </label>
                    <label htmlFor="Phone" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={phone} name='phone' onChange={onChange} type="text" id="Phone" placeholder="Phone" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Phone
                        </span>
                    </label>
                </div>
                {editMode &&
                    <div className='flex items-center w-full gap-4'>
                        <label htmlFor="totalTransaction" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={totalTransaction} name="totalTransaction" onChange={onNumbersChange} type="number" id="totalTransaction" placeholder="Total Transaction" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Total Transaction
                            </span>
                        </label>
                        <label htmlFor="totalPaid" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={totalPaid} name='totalPaid' onChange={onNumbersChange} type="number" id="totalPaid" placeholder="Total Paid" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Total Paid
                            </span>
                        </label>
                        <label htmlFor="totalDebt" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={totalDebt} name='totalDebt' onChange={onNumbersChange} type="number" id="totalDebt" placeholder="Total Debt" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Total Debt
                            </span>
                        </label>
                    </div>
                }
                <label htmlFor="Address" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={address} name='address' onChange={onChange} type="text" id="Address" placeholder="Address" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Address
                    </span>
                </label>
                <div className='w-full'>
                    <label htmlFor="CustomerTypes" className="block text-sm font-medium text-gray-900">
                        Customer Type
                    </label>
                    <select value={customerType} onChange={onChange} name="customerType" id="CustomerTypes" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                        <option disabled>Please select type</option>
                        {customersTypesData && customersTypesData.map((type) => (
                            <option key={type.id} value={type.id}>{type.type_name}</option>
                        ))}
                    </select>
                </div>
                <button type='submit' disabled={isLoading} className="flex items-center justify-center gap-3 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none active:bg-green-500 text-[1.3rem]">
                    {isLoading || isEditLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ?'Edit Customer' :'Add Customer'}
                </button>
            </form>
        </section>
    )
}
