import React, { useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from 'react-icons/bi'
import { DropZone } from '../../DropZone'
import { ReusablePhoneInputDash } from '../../reusable-components/ReusablePhoneInputDash'
import { toast } from 'react-toastify'


import { useCreateDashMutation, useEditDashMutation, useReadStoreQuery } from '../../../features/api/stores/storeApiSlice'
import { useEffect } from 'react'

export const AddAndEditStorePopup = ({ setOpenPopup, editMode, selected, setEditMode }) => {

    const [file, setFile] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState('');

    const [storeData, setStoreData] = useState({
        storeName:'',
        ownerFirstName:'',
        ownerLastName:'',
        password:'',
        confirmPassword:'',
        ownerEmail:'',
        phoneNumber:''
    })

    const onChange = (e) => {
        setStoreData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value

        }))

        setStoreData((prevState) => ({
            ...prevState,
            phoneNumber: phoneNumber
        }));
    }

    const { storeName, ownerFirstName, ownerLastName, ownerEmail, password, confirmPassword } = storeData

    const [createDash, {isLoading, error}] = useCreateDashMutation()

    const handleCreateStore = async (e) => {
        e.preventDefault()

        if(!phoneNumber || !ownerFirstName || !ownerLastName || !ownerEmail || !password || !confirmPassword || !storeName ){
            return toast.error('All fields are required')
        }
    
        if (storeData.password.trim() !== storeData.confirmPassword.trim()) {
            return toast.error('Passwords do not match');
        }

        const payload = {
            file: file || '',
            storeName,
            ownerFirstName,
            ownerLastName,
            ownerEmail,
            confirmPassword,
            password,
            phoneNumber
        }

        try {
            const res = await createDash(payload).unwrap()
            toast.success(res.message)
            setStoreData({
                storeName:'',
                ownerFirstName:'',
                ownerLastName:'',
                password:'',
                confirmPassword:'',
                ownerEmail:'',
                PhoneNumber:''
            })
            setPhoneNumber('')
            setFile(null)
            setOpenPopup(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    const { data } = editMode 
    ? useReadStoreQuery({ storeId: selected[Object.keys(selected)[0]] }, 'readStore')
    : { data: null, isLoading: false };


    useEffect(() => {
        if(data){

            setStoreData(perviousState => ({
                ...perviousState,
                storeName: data.store.store_name,
                ownerFirstName: data.store.owner_first_name,
                ownerLastName: data.store.owner_last_name,
                ownerEmail: data.store.owner_email,
                PhoneNumber: data.store.phone_number,
            }))

            setPhoneNumber(data.store.phone_number)
    
            setFile(perviousState => ({
                ...perviousState,
                imageUrl:data.store.store_image
            }))

        }
    },[editMode, data])

    const [editDash, { isEditLoading }] = useEditDashMutation()

    const handleEditStore = async (e) => {
        e.preventDefault()

        if(!phoneNumber || !ownerFirstName || !ownerLastName || !ownerEmail || !storeName ){
            return toast.error('All fields are required')
        }

        const payload = {
            file: file || '',
            storeName,
            ownerFirstName,
            ownerLastName,
            ownerEmail,
            confirmPassword,
            password,
            phoneNumber,
            storeId:data.store.id
        }

        try {
            const res = await editDash(payload).unwrap()
            toast.success(res.message)
            setStoreData({
                storeName:'',
                ownerFirstName:'',
                ownerLastName:'',
                password:'',
                confirmPassword:'',
                ownerEmail:'',
                PhoneNumber:''
            })
            setPhoneNumber('')
            setFile(null)
            setOpenPopup(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    return (
        <section className="overflow-auto bg-white left-[32%] pb-16 top-[3%] h-[52rem] w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Store' : 'Add Store'}</h2>
            <form onSubmit={editMode ? handleEditStore : handleCreateStore} className='flex flex-col gap-8 w-[70%] mx-auto mt-5'>
                <DropZone setFile={setFile} file={file} className="border-[2px] border-dashed py-8 border-[#50B426] cursor-pointer w-[60%] text-center px-2" />
                <label htmlFor="storeName" className="relative block overflow-hidden rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={storeName} onChange={onChange} name="storeName" type="text" id="storeName" placeholder="Store Name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Store Name
                    </span>
                </label>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="ownerFirstName" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={ownerFirstName} onChange={onChange} name='ownerFirstName' type="text" id="ownerFirstName" placeholder="ownerFirstName" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Owner First Name
                        </span>
                    </label>
                    <label htmlFor="ownerLastName" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={ownerLastName} onChange={onChange} type="text" name='ownerLastName' id="ownerLastName" placeholder="ownerLastName" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Owner Last Name
                        </span>
                    </label>
                </div>
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
                <ReusablePhoneInputDash phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                <label htmlFor="ownerEmail" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={ownerEmail} onChange={onChange} name='ownerEmail' type="email" id="ownerEmail" placeholder="ownerEmail" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Owner Email
                    </span>
                </label>
                <button type='submit' disabled={isLoading} className="flex items-center justify-center gap-3 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none active:bg-green-500 text-[1.3rem]">
                    {( isLoading || isEditLoading ) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ?'Edit Store' :'Add Store'}
                </button>
            </form>
        </section>
    )
}
