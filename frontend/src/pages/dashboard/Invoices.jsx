import React, { useState } from 'react'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { InvoicesTable } from '../../components/Invoices/InvoicesTable'
import { DeletePopup } from '../../components/DeletePopup'
export const Invoices = () => {
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
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
        <SearchComponents placeholder="Search for Invoice" actionName="Create Invoice"/>
        <TableToolsComponent setOpenDeletePopup={setOpenDeletePopup}/>
        <InvoicesTable headItems={headItems}/>
        {openDeletePopup && 
            <DeletePopup setOpenDeletePopup={setOpenDeletePopup} />
        }
    </div>
  )
}
