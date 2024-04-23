import React, { useEffect, useState } from 'react'
import { ReusablePhoneInputDash } from '../../reusable-components/ReusablePhoneInputDash'
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from 'react-icons/bi'
import { useEditOwnerMutation, useReadOwnerQuery } from '../../../features/api/owners/ownerApiSlice'
import { toast } from 'react-toastify'

export const EditOwnerPopup = ({ setOpenPopup, editMode, selected, setEditMode, setSelected }) => {

    const [phoneNumber, setPhoneNumber] = useState('');

    const [ownerData, setOwnerData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:''
    })

    const onChange = (e) => {
        setOwnerData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value

        }))

        setOwnerData((prevState) => ({
            ...prevState,
            phoneNumber: phoneNumber
        }));
    }

    const { firstName, lastName, email } = ownerData

    const { data } = editMode 
    ? useReadOwnerQuery({ ownerId: selected[Object.keys(selected)[0]] }, 'readOwner')
    : { data: null, isLoading: false };

    useEffect(() => {
        if(data){

            setOwnerData(perviousState => ({
                ...perviousState,
                firstName: data.owner.first_name,
                lastName: data.owner.last_name,
                email: data.owner.email,
                PhoneNumber: data.owner.phone_number,
            }))

            setPhoneNumber(data.owner.phone_number)

        }
    },[data, editMode])

    const [editOwner, { isLoading:isEditLoading }] = useEditOwnerMutation()

    const handleEditOwner = async (e) => {
        e.preventDefault()

        if(!phoneNumber || !firstName || !lastName || !email){
            return toast.error('All fields are required')
        }

        const payload = {
            firstName,
            lastName,
            email,
            phoneNumber,
            ownerId:data.owner.id
        }

        try {
            const res = await editOwner(payload).unwrap()
            toast.success(res.message)
            setOwnerData({
                firstName:'',
                lastName:'',
                email:'',
                phoneNumber:''
            })
            setPhoneNumber('')
            setOpenPopup(false)
            setEditMode(false)
            setSelected('')
        } catch (error) {
            toast.error(error.data.error)
        }
    }



    return (
        <section className="overflow-auto bg-white left-[32%] pb-16 top-[18%] h-[35rem] w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Owner' : 'Add Owner'}</h2>
            <form onSubmit={handleEditOwner} className='flex flex-col gap-8 w-[70%] mx-auto mt-5'>
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
                    <input value={email} onChange={onChange} name='email' type="email" id="email" placeholder="email" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Email
                    </span>
                </label>
                <button type='submit' disabled={isEditLoading} className="flex items-center justify-center gap-3 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none active:bg-green-500 text-[1.3rem]">
                    { isEditLoading  && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ?'Edit Owner' :'Add Owner'}
                </button>
            </form>
        </section>
    )
}
