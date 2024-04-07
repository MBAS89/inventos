import React, { useState } from 'react'
import { CustomersProfile } from '../../../components/customers/CustomersProfile'
import { DashHeader } from '../../../components/DashHeader'
import { CustomersProfileStatus } from '../../../components/customers/CustomersProfileStatus'
import { CustomersInvoicesTable } from '../../../components/customers/CustomersInvoicesTable'
import { useReadCustomerQuery } from '../../../features/api/customers/customersApiSlice'
import { authInfoState } from '../../../features/slices/authSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Breadcrumb } from '../../../components/Breadcrumb'

export const SingleCustomers = () => {
    const { customerId } = useParams();
    const { authInfo } = useSelector(authInfoState)

    const [currentPage, setCurrentPage] = useState(1)

    const {data, isLoading, isFetching, isError, error } = useReadCustomerQuery({storeId:authInfo.store_id,customerId:customerId,page:currentPage},'readCustomer')

    
    return (
    <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
        <DashHeader/>
        <div>
            {data ? 
                <div>
                    <Breadcrumb from="Customers" current={data.customer.full_name} width="w-[80%]"/>
                </div>
            :
                <div className='w-[80%] mx-auto pt-20'>
                    <div className='bg-slate-500 animate-pulse h-[32px] w-[400px] rounded-lg'></div>
                </div> 
            }
            <CustomersProfile customer={data?.customer} isLoading={isLoading} />
            <CustomersProfileStatus customer={data?.customer} isLoading={isLoading} />
            <CustomersInvoicesTable data={data} isLoading={isLoading} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>
    </div>
  )
}
