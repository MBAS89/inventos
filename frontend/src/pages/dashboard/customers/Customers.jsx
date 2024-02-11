import React, { useState } from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import {TableToolsComponent} from '../../../components/TableToolsComponent'
import { CustomersTable } from '../../../components/customers/CustomersTable'
import { AddAndEditCustomersPopup } from '../../../components/customers/AddAndEditCustomersPopup'
import { DeletePopup } from '../../../components/DeletePopup'

export const Customers = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [selectedCustomers, setSelectedCustomers] = useState('');

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
            <SearchComponents placeholder="Search for customer" searchQuery={searchQuery} setsearchQuery={setsearchQuery} actionName="Add Customer" setOpenPopup={setOpenPopup} />
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedCustomers} department="Customers" setReset={setSelectedCustomers} />
            <CustomersTable searchQuery={searchQuery} sortBy={sortBy} headItems={headItems} setSelectedCustomers={setSelectedCustomers} selectedCustomers={selectedCustomers} />
            {openPopup && 
                <AddAndEditCustomersPopup selected={selectedCustomers} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup} />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedCustomers} setReset={setSelectedCustomers} department="Customers" />
            }
        </div>
    )
}
