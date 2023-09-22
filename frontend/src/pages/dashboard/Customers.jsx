import React, { useState } from 'react'

import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { CustomersTable } from '../../components/customers/CustomersTable'
import { AddAndEditCustomersPopup } from '../../components/customers/AddAndEditCustomersPopup'

export const Customers = () => {
    const [openPopup, setOpenPopup] = useState(false)

    const headItems = [
        {
            title:"Customer Name"
        },
        {
            title:"Contact"
        },
        {
            title:"Address"
        },
        {
            title:"Type"
        },
        {
            title:"total transactions"
        },
        {
            title:"total debt"
        },
        {
            title:"discount"
        },
        {
            title:"created date"
        },
        {
            title:"updated date"
        }
        
    ]

    return (
        <div className=' bg-gray-100 h-[calc(100vh-64px)] relative'>
            <SearchComponents placeholder="Search for customer" actionName="Add Customer" setOpenPopup={setOpenPopup} />
            <TableToolsComponent />
            <CustomersTable headItems={headItems} />
            {openPopup && 
                <AddAndEditCustomersPopup setOpenPopup={setOpenPopup} />
            }
        </div>
    )
}
