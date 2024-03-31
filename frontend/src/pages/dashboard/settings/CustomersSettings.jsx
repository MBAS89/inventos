import React from 'react'
import { Loader } from '../../../components/reusable-components/Loader'
import { CustomerAddType } from '../../../components/settings/customers/CustomerAddType'
import { CustomerTypesBox } from '../../../components/settings/customers/CustomerTypesBox'
import { useReadCustomersTypesQuery } from '../../../features/api/customers/customersTypeApiSlice'

export const CustomersSettings = () => {
    const {data, isLoading } = useReadCustomersTypesQuery()

    return (
        <div className='flex flex-col pb-10'>
            <h1 className='text-[2rem] mt-2 ml-10 font-bold text-gray-500 p-5'>Customers Types</h1>
            <CustomerAddType />
            <div className='w-[93%] mx-auto flex gap-7 flex-wrap'>
                {isLoading ? (
                    <div className='w-full h-[30rem] flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : data == undefined ? (
                    <div className='text-center text-gray-300 italic w-full text-[3rem] mt-10'>
                        No Customer Types Found!
                    </div>
                ) : data.data.customersTypes.map((type) => (
                    <CustomerTypesBox typeData={type} />
                ))}
            </div>
        </div>
    )
}
