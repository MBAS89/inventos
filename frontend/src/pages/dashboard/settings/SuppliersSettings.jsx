import React from 'react'
import { useReadSuppliersTypesQuery } from '../../../features/api/suppliers/suppliersTypesApiSlice'
import { SupplierAddType } from '../../../components/settings/suppliers/SupplierAddType'
import { Loader } from '../../../components/reusable-components/Loader'
import { SuplliersTypeBox } from '../../../components/settings/suppliers/SuplliersTypeBox'

export const SuppliersSettings = () => {
    const {data, isLoading } = useReadSuppliersTypesQuery()

    return (
        <div className='flex flex-col pb-10'>
            <h1 className='text-[2rem] mt-2 ml-10 font-bold text-gray-500 p-5'>Suppliers Types</h1>
            <SupplierAddType />
            <div className='w-[93%] mx-auto flex gap-7 flex-wrap'>
                {isLoading ? (
                    <div className='w-full h-[30rem] flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : data.supplierTypes.length == 0 ? (
                    <div className='text-center text-gray-300 italic w-full text-[3rem] mt-10'>
                        No Supllier Types Found!
                    </div>
                ) : data.supplierTypes.map((type) => (
                    <SuplliersTypeBox typeData={type} />
                ))}
            </div>
        </div>
    )
}
