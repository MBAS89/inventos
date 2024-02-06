import React from 'react'
import { CustomersProfile } from '../../../components/customers/CustomersProfile'
import { DashHeader } from '../../../components/DashHeader'
import { CustomersProfileStatus } from '../../../components/customers/CustomersProfileStatus'
import { CustomersInvoicesTable } from '../../../components/customers/CustomersInvoicesTable'
import { useReadCustomerQuery } from '../../../features/api/customers/customersApiSlice'
import { authInfoState } from '../../../features/slices/authSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const SingleCustomers = () => {
    const { customerId } = useParams();
    const { authInfo } = useSelector(authInfoState)
    const {data, isLoading, isFetching, isError, error } = useReadCustomerQuery({storeId:authInfo.store_id,customerId:customerId},'readCustomer')

    
    return (
    <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
        <DashHeader/>
        <div>
            <CustomersProfile customer={data?.customer} isLoading={isLoading} />
            <CustomersProfileStatus customer={data?.customer} isLoading={isLoading} />
            <CustomersInvoicesTable invoices={data?.invoices} isLoading={isLoading} />
        </div>
    </div>
  )
}
