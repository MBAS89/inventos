import React, { useEffect, useState } from 'react'

//icons 
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from 'react-icons/bi'

//reusable phone input 
import { ReusablePhoneInputDash } from '../../reusable-components/ReusablePhoneInputDash'
import { useAddAdminMutation, useEditAdminMutation, useReadAdminQuery } from '../../../features/api/admin/adminApiSlice'
import { toast } from 'react-toastify'


export const AddEditAdminPopup = ({ setOpenPopup, editMode, selected, setEditMode, setSelected }) => {

    const [phoneNumber, setPhoneNumber] = useState('');

    const [adminData, setAdminData] = useState({

        firstName:'',
        lastName:'',
        password:'',
        confirmPassword:'',
        email:'',
        phoneNumber:'',
        superAdmin:false
    })

    const onChange = (e) => {
        setAdminData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value

        }))

        setAdminData((prevState) => ({
            ...prevState,
            phoneNumber: phoneNumber
        }));
    }

    const { firstName, lastName, password, confirmPassword, email, superAdmin } = adminData

    const [addAdmin, {isLoading, error}] = useAddAdminMutation()

    const handleAddAdmin = async (e) => {
        e.preventDefault()

        if(!phoneNumber || !firstName || !lastName || !email || !password || !confirmPassword ){
            return toast.error('All fields are required')
        }
    
        if (adminData.password.trim() !== adminData.confirmPassword.trim()) {
            return toast.error('Passwords do not match');
        }

        const payload = {
            firstName,
            lastName,
            email,
            confirmPassword,
            password,
            phoneNumber
        }

        try {
            const res = await addAdmin(payload).unwrap()
            toast.success(res.message)
            setAdminData({
                firstName:'',
                lastName:'',
                password:'',
                confirmPassword:'',
                email:'',
                PhoneNumber:'',
                superAdmin:false
            })
            setPhoneNumber('')
            setOpenPopup(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const { data } = editMode 
    ? useReadAdminQuery({ adminId: selected[Object.keys(selected)[0]] }, 'readAdmin')
    : { data: null, isLoading: false };

    useEffect(() => {
        if(data){

            setAdminData(perviousState => ({
                ...perviousState,
                firstName: data.admin.first_name,
                lastName: data.admin.last_name,
                email: data.admin.email,
                PhoneNumber: data.admin.phone_number,
                superAdmin:data.admin.super
            }))

            setPhoneNumber(data.admin.phone_number)

        }
    },[editMode, data])

    const [editAdmin, { isEditLoading }] = useEditAdminMutation()

    const handleEditAdmin = async (e) => {
        e.preventDefault()

        if(!phoneNumber || !firstName || !lastName || !email ){
            return toast.error('All fields are required')
        }

        const payload = {
            firstName,
            lastName,
            email,
            confirmPassword,
            password,
            phoneNumber,
            superAdmin,
            adminId:data.admin.id
        }

        try {
            const res = await editAdmin(payload).unwrap()
            toast.success(res.message)
            setAdminData({
                firstName:'',
                lastName:'',
                password:'',
                confirmPassword:'',
                email:'',
                PhoneNumber:'',
                superAdmin:false
            })
            setPhoneNumber('')
            setSelected('')
            setEditMode(false)
            setOpenPopup(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <section className="overflow-auto bg-white left-[32%] pb-16 top-[10%] h-[43rem] w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Admin' : 'Add Admin'}</h2>
            <form onSubmit={editMode ? handleEditAdmin : handleAddAdmin} className='flex flex-col gap-8 w-[70%] mx-auto mt-5'>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="firstName" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={firstName} onChange={onChange} name='firstName' type="text" id="firstName" placeholder="firstName" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            First Name
                        </span>
                    </label>
                    <label htmlFor="lastName" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={lastName} onChange={onChange} type="text" name='lastName' id="lastName" placeholder="lastName" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Last Name
                        </span>
                    </label>
                </div>
                <ReusablePhoneInputDash phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                <label htmlFor="email" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input name='email' value={email} onChange={onChange} type="email" id="email" placeholder="email" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Email
                    </span>
                </label>
                {editMode &&
                    <div className='w-full'>
                        <label htmlFor="superAdmin" className="block text-sm font-medium text-gray-900">
                            Super Admin
                        </label>
                        <select value={superAdmin} onChange={onChange} name="superAdmin" id="superAdmin" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option value="">Please select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                }
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="password" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={password} onChange={onChange} name='password' type="password" id="password" placeholder="ownerFirstName" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Password
                        </span>
                    </label>
                    <label htmlFor="confirmPassword" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={confirmPassword} onChange={onChange} type="password" name='confirmPassword' id="confirmPassword" placeholder="ownerLastName" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Confirm Password
                        </span>
                    </label>
                </div>
                <button type='submit' disabled={isLoading || isEditLoading} className="flex items-center justify-center gap-3 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none active:bg-green-500 text-[1.3rem]">
                    {( isLoading || isLoading ) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ?'Edit Admin' :'Add Admin'}
                </button>
            </form>
        </section>
    )
}
