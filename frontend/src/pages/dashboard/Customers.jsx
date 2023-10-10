import React from 'react'

import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { CustomersTable } from '../../components/customers/CustomersTable'

export const Customers = () => {

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
        <div className=' bg-gray-100 h-[calc(100vh-64px)]'>
            <SearchComponents placeholder="Search for customer" actionName="Add Customer" />
            <TableToolsComponent/>
            <CustomersTable headItems={headItems}/>
        </div>
    )
}
