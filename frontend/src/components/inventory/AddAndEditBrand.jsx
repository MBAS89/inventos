import React, { useEffect, useState } from 'react'

//icons
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from "react-icons/bi";

import { DropZone } from '../DropZone'
import { useAddBrandMutation, useEditBrandMutation, useReadBrandQuery } from '../../features/api/inventory/brandApiSlice'
import { toast } from 'react-toastify'


export const AddAndEditBrand = ({ setOpenPopup, editMode, selected, setEditMode, setSelected }) => {
    const [addBrand, {isLoading, error}] = useAddBrandMutation()

    const { data, isLoading: isdataLoading } = editMode 
    ? useReadBrandQuery({brandId: selected[Object.keys(selected)[0]], products:false }, 'readBrand')
    : { data: null, isLoading: false };

    const [brandName, setBrandName] = useState('')
    const [file, setFile] = useState(null)

    const handleAddBrand = async (e) => {
        e.preventDefault()

        if(!brandName || !file){
            return toast.error('All Fileds Are Required!')
        }

        const payload = {
            file,
            brandName,
        }

        try {
            const res = await addBrand(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setBrandName('')
            setOpenPopup(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }

    }

    useEffect(() => {
        if(data){    
            setFile(perviousState => ({
                ...perviousState,
                imageUrl:data.brand.image
            }))
    
            setBrandName(data.brand.name)
        }
    },[editMode, data])
    
    const [editBrand, {isLoading:isEditLoading , error:editError}] = useEditBrandMutation()

    const handleEditBrand = async (e) => {
        e.preventDefault()

        if(!file){
            return toast.error('Missing Image Please Upload image!')
        }

        if(!brandName){
            return toast.error('Missing Brand Name')
        }

        const payload = {
            file,
            brandName,
            brandId:data.brand.brand_id
        }

        try {
            const res = await editBrand(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setBrandName('')
            setEditMode(false)
            setOpenPopup(false); 
            setSelected('')
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    return (
        <section className="overflow-auto bg-white left-[32%] top-[7%] h-[37rem] w-[40rem] border-gray-500 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>
                {editMode ?'Edit Brand' :'Add Brand'}
            </h2>
            <form onSubmit={editMode ? handleEditBrand : handleAddBrand} className='flex flex-col gap-10 w-[70%] mx-auto mt-5'>
                <DropZone setFile={setFile} file={file} className="border-[2px] border-dashed py-8 border-[#50B426] cursor-pointer w-[60%] text-center px-2" />
                <label htmlFor="CategoryName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={brandName} onChange={(e) => setBrandName(e.target.value)} type="text" id="BrandName" placeholder="Brand Name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Brand Name
                    </span>
                </label>
                <button type='submit' disabled={isLoading} className="flex items-center gap-2 justify-center mb-20 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]">
                {(isLoading || isEditLoading) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ?'Edit Brand' :'Add Brand'}
                </button>
            </form>
        </section>
    )
}
