import React from 'react'
import { SuppliersProfile } from '../../../components/suppliers/SuppliersProfile'
import { SuppliersProfileStatus } from '../../../components/suppliers/SuppliersProfileStatus'
import { DashHeader } from '../../../components/DashHeader'
import { SuppliersInvoicesTable } from '../../../components/suppliers/SuppliersInvoicesTable'
export const SingleSuppliers = () => {
    return (
        <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
        <DashHeader/>
        <div>
            <SuppliersProfile/>
            <SuppliersProfileStatus/>
            <SuppliersInvoicesTable/>
        </div>
    </div>
  )
}
