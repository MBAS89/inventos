import React, { useState } from 'react'


import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { InvoicesTable } from '../../components/Invoices/InvoicesTable'
import { AddAndEditInvoicePopup } from '../../components/Invoices/AddAndEditInvoicePopup'

export const Invoices = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const headItems = [
        {
            title:"items"
        },
        {
            title:"Id"
        },
        {
            title:"Total Amount"
        },
        {
            title:"Total Paid"
        },
        {
            title:"Total due"
        },
        {
            title:"status"
        },
        {
            title:"casher"
        },
        {
            title:"created date"
        },
        {
            title:"updated date"
        }
        
    ]
    
  return (
    <div className=' bg-gray-100 h-[calc(100vh-64px)]'>
        <SearchComponents placeholder="Search for Invoice" actionName="Create Invoice" setOpenPopup={setOpenPopup} />
        <TableToolsComponent/>
        <InvoicesTable headItems={headItems}/>
        {openPopup && 
            <AddAndEditInvoicePopup setOpenPopup={setOpenPopup}/>
        }
    </div>
  )
}
