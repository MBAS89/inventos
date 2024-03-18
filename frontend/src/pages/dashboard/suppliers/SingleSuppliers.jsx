import React from 'react'
import { SuppliersProfile } from '../../../components/suppliers/SuppliersProfile'
import { SuppliersProfileStatus } from '../../../components/suppliers/SuppliersProfileStatus'
import { DashHeader } from '../../../components/DashHeader'
import { SuppliersInvoicesTable } from '../../../components/suppliers/SuppliersInvoicesTable'
import { useParams } from 'react-router-dom'
import { useReadSupplierQuery } from '../../../features/api/suppliers/suppliersApiSlice'
import { Breadcrumb } from '../../../components/Breadcrumb'


export const SingleSuppliers = () => {
    const { supplierId } = useParams();

    const { data, isLoading } = useReadSupplierQuery({supplierId}, 'readSupplier')

    console.log(data)
    return (
        <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
        <DashHeader/>
        <div>
            {data ? 
                <div>
                    <Breadcrumb from="Suppliers" current={data.supplier.supplier_name} width="w-[80%]"/>
                </div>
            :
                <div className='w-[80%] mx-auto pt-20'>
                    <div className='bg-slate-500 animate-pulse h-[32px] w-[400px] rounded-lg'></div>
                </div> 
            }
            <SuppliersProfile data={data} isLoading={isLoading}/>
            <SuppliersProfileStatus data={data} isLoading={isLoading}/>
            <SuppliersInvoicesTable/>
        </div>
    </div>
  )
}
