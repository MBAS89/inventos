import React, { useState } from 'react'
import { SearchComponents } from '../SearchComponents'
import { TableToolsComponent } from '../TableToolsComponent'
import { InvoicesTable } from './InvoicesTable'
import { AddAndEditInvoicePopup } from './AddAndEditInvoicePopup'
import { DeletePopup } from '../DeletePopup'
import { useReadInvoicesQuery } from '../../features/api/sales/innerInvoicesApiSlice'


export const InnerInvoices = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState('');

    const [currentPage, setCurrentPage] = useState(1)

    const {data:innerInvoices, isLoading, isFetching, isError, error } = useReadInvoicesQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readInvoices')
    
    const handleCheckboxChange = (invoiceId, imageId) => {
        setSelectedInvoice({
            invoiceId,
            imageId
        })
    };


    console.log(innerInvoices)

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
        <SearchComponents placeholder="Search for Invoice" actionName="Create Invoice" setOpenPopup={setOpenPopup} searchQuery={searchQuery} setsearchQuery={setsearchQuery}/>
        <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedInvoice} department="invoices" setReset={setSelectedInvoice}/>
        <InvoicesTable 
            headItems={headItems} 
            data={innerInvoices} 
            isLoading={isLoading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectedInvoice={selectedInvoice}
            handleCheckboxChange={handleCheckboxChange}
        />
        {openPopup && 
            <AddAndEditInvoicePopup setOpenPopup={setOpenPopup}/>
        }
        {openDeletePopup && 
            <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedInvoice} setReset={setSelectedInvoice} department="invoices" />
        }
        </div>
    )
}
