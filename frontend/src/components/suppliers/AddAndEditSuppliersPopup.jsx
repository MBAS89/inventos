import React, { useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from "react-icons/bi";
import { DropZone } from '../DropZone'
import { useReadSuppliersTypesQuery } from '../../features/api/suppliers/suppliersTypesApiSlice'
import { useAddSupplierMutation, useEditSupplierMutation, useReadSupplierQuery } from '../../features/api/suppliers/suppliersApiSlice'
import { checkRequiredFields } from '../../functions/checkRequiredFileds'
import { toast } from 'react-toastify'
import { useEffect } from 'react';

export const AddAndEditSuppliersPopup = ({ setOpenPopup, editMode, selected, setEditMode }) => {

    const {data:types, isLoading} = useReadSuppliersTypesQuery({}, 'readSuppliersTypes')

    const [file, setFile] = useState(null)
    const [supplierData, setSupplierData] = useState({
        supplierName:'',
        address:'',
        email:'',
        phone:'',
        supplierType:'Please select'
    })

    const { supplierName, address, email, phone, supplierType } = supplierData

    const onChange = (e) => {
        const { name, value } = e.target;

        setSupplierData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const [addSupplier, {isLoading:isAddingLoading }] = useAddSupplierMutation()

    const handleAddSupplier = async (e) => {
        e.preventDefault()

        const requiredFileds = ['supplierName', 'address', 'email', 'phone', 'supplierType']
        const notEmpty = checkRequiredFields(supplierData, requiredFileds)

        if(notEmpty || !file){
            return toast.error(notEmpty || 'Missing Image Please Upload image!')
        }


        const payload = {
            file,
            supplierName,
            address,
            email,
            phone,
            supplierType
        }

        try {
            const res = await addSupplier(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setSupplierData({
                supplierName:'',
                address:'',
                email:'',
                phone:'',
                supplierType:'Please select'
            })

            setOpenPopup(false); 
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const[oldImage, setOldImage] = useState('')

    const { data } = editMode 
    ? useReadSupplierQuery({ supplierId: selected[Object.keys(selected)[0]] }, 'readSupplier')
    : { data: null, isLoading: false };

    useEffect(() => {
        if(data){

            setSupplierData({
                supplierName:data.supplier.supplier_name,
                address:data.supplier.address,
                email:data.supplier.email,
                phone:data.supplier.phone_number,
                supplierType:data.supplier.supplier_type_id
            })
    
            setFile(perviousState => ({
                ...perviousState,
                imageUrl:data.supplier.image
            }))

            setOldImage(data.supplier.image)
        }
    },[editMode, data])

    const [editSupplier, {isLoading:isEditLoading}] = useEditSupplierMutation()

    const handleEditSupplier = async (e) => {
        e.preventDefault()

        const requiredFileds = ['supplierName', 'address', 'email', 'phone', 'supplierType']
        const notEmpty = checkRequiredFields(supplierData, requiredFileds)

        if(notEmpty || !file){
            return toast.error(notEmpty || 'Missing Image Please Upload image!')
        }


        const payload = {
            file,
            supplierName,
            address,
            email,
            phone,
            supplierType,
            oldImage,
            supplierId:data.supplier.id
        }

        try {
            const res = await editSupplier(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setSupplierData({
                supplierName:'',
                address:'',
                email:'',
                phone:'',
                supplierType:'Please select'
            })

            setOpenPopup(false); 
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    
    return (
    <section className="overflow-auto bg-white left-[32%] top-[7%] h-[52rem] w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
        <div className='relative w-full bg-black'>
            <AiOutlineCloseCircle onClick={() => { setOpenPopup(false); setEditMode(false);}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
        </div>
        <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Supplier' : 'Add Supplier'}</h2>
        <form onSubmit={editMode ? handleEditSupplier : handleAddSupplier} className='flex flex-col gap-8 w-[70%] mx-auto mt-5'>
            <DropZone  setFile={setFile} file={file} className="border-[2px] border-dashed py-8 border-[#50B426] cursor-pointer w-[60%] text-center px-2" />
            <label htmlFor="supplierName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input value={supplierName} onChange={onChange} name="supplierName"  type="text" id="supplierName" placeholder="Full Name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Full Name
                </span>
            </label>
            <div className='flex items-center w-full gap-4'>
                <label htmlFor="email" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={email} onChange={onChange} type="text" name="email" id="email" placeholder="Email" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Email
                    </span>
                </label>
                <label htmlFor="phone" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={phone} onChange={onChange} type="text" id="phone" name="phone" placeholder="Phone" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Phone
                    </span>
                </label>
            </div>
            <label htmlFor="address" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input value={address} onChange={onChange} name="address" type="text" id="address" placeholder="Address" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Address
                </span>
            </label>
            <div>
                <label htmlFor="supplierType" className="block text-sm font-medium text-gray-900">
                    Supplier Type
                </label>
                <select  disabled={isLoading} value={supplierType} onChange={onChange} name="supplierType" id="supplierType" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                    <option disabled value="Please select">Please select</option>
                    {types && types.supplierTypes.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>{supplier.type_name}</option>
                    ))}
                </select>
            </div>
            <button type='submit' disabled={isAddingLoading || isEditLoading} className={` ${isAddingLoading || isEditLoading  ? 'bg-gray-300 text-gray-200': 'text-[#50B426] border-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]' } flex gap-4 justify-center mb-20 rounded border w-full  px-12 py-4 text-sm font-medium`}>
                {(isAddingLoading || isEditLoading) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>}
                {editMode ? 'Edit Supplier' : 'Add Supplier'}
            </button>
        </form>
    </section>
  )
}
