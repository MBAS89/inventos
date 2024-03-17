import React from 'react'
import { useParams } from 'react-router-dom'

//components
import { InvoiceBasicInfo } from '../../../components/Invoices/invoiceInfoPage/InvoiceBasicInfo'
import { Breadcrumb } from '../../../components/Breadcrumb'

//redux tool kit query
import { useReadInvoiceQuery } from '../../../features/api/sales/innerInvoicesApiSlice'
import { InvoiceNumbers } from '../../../components/Invoices/invoiceInfoPage/InvoiceNumbers'
import { InvoiceItems } from '../../../components/Invoices/invoiceInfoPage/InvoiceItems'
import { InvoiceCalculation } from '../../../components/Invoices/invoiceInfoPage/InvoiceCalculation'

export const InvoiceInfoPage = () => {
  const { invoiceId } = useParams();
  const { data, isLoading } = useReadInvoiceQuery({invoiceId}, 'readInvoice')

  return (
    <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
      <div>
        {data ? 
          <div>
            <Breadcrumb from="Inner Invoices" current={data.id} width="w-[80%]"/>
          </div>
          :
          <div className='w-[80%] mx-auto pt-20'>
            <div className='bg-slate-500 animate-pulse h-[33px] w-[400px] rounded-lg'></div>
          </div> 
        }
        <InvoiceBasicInfo data={data}/>
        <InvoiceNumbers data={data}/>
        <InvoiceItems data={data}/>
        {data && 
        <InvoiceCalculation data={data} />
        }
      </div>
    </div>
  )
}
