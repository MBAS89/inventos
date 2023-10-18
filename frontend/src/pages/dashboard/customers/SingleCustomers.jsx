import React from 'react'
import { CustomersProfile } from '../../../components/customers/CustomersProfile'
import { DashHeader } from '../../../components/DashHeader'
import { CustomersProfileStatus } from '../../../components/customers/CustomersProfileStatus'
import { CustomersInvoicesTable } from '../../../components/customers/CustomersInvoicesTable'

export const SingleCustomers = () => {
    return (
    <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
        <DashHeader/>
        <div>
            <CustomersProfile/>
            <CustomersProfileStatus/>
            <CustomersInvoicesTable/>
        </div>
    </div>
  )
}
