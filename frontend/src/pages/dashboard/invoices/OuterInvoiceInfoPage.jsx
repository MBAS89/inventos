import React from 'react'

//react router 
import { useParams } from 'react-router-dom'

//reusable components
import { Breadcrumb } from '../../../components/Breadcrumb'
import { OuterInvoiceBasicInfo } from '../../../components/Invoices/outerInvoiceInfoPage/OuterInvoiceBasicInfo';

//redux
import { useReadOuterInvoiceQuery } from '../../../features/api/sales/outerInvoicesApiSlice';



export const OuterInvoiceInfoPage = () => {
    const { invoiceId } = useParams();

    const { data, isLoading } = useReadOuterInvoiceQuery({invoiceId}, 'readOuterInvoice')

    console.log(data)

    return (
        <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
            <div>
                {data ? 
                    <div>
                    <Breadcrumb from="Outer Invoices" current={data.id} width="w-[80%]"/>
                    </div>
                    :
                    <div className='w-[80%] mx-auto pt-20'>
                    <div className='bg-slate-500 animate-pulse h-[33px] w-[400px] rounded-lg'></div>
                    </div> 
                }
            </div>
            <OuterInvoiceBasicInfo data={data}/>
        </div>
    )
}
