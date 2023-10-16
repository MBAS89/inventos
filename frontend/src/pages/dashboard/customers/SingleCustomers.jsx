import React from 'react'
import { CustomersProfile } from '../../../components/customers/CustomersProfile'
import { TotalTransaction } from '../../../components/customers/TotalTransaction'
import { DashHeader } from '../../../components/DashHeader'

export const SingleCustomers = () => {
    return (
    <div className='bg-slate-200'>
        <DashHeader/>
        <div className='grid grid-cols-3 gap-5 mx-[500px] mt-6'>
            <CustomersProfile/>
            <TotalTransaction/>
        </div>
    </div>
  )
}


