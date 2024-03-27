import React, { useState } from 'react'
import { SearchComponents } from '../SearchComponents'
import { TableToolsComponent } from '../TableToolsComponent'
import { OuterInvoicesTable } from './OuterInvoicesTable'
import { AddAndEditOuterInvoicePopup } from './AddAndEditOuterInvoicePopup'
import { useReadOuterInvoicesQuery } from '../../features/api/sales/outerInvoicesApiSlice'
import { DeletePopup } from '../DeletePopup'

export const OuterInvoices = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [openDeletePopup, setOpenDeletePopup] = useState(false)
  const [searchQuery, setsearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState('');

  const [currentPage, setCurrentPage] = useState(1)

  const {data:outerInvoices, isLoading, isFetching, isError, error } = useReadOuterInvoicesQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readOuterInvoices')

  const handleCheckboxChange = (invoiceId, imageId) => {
    setSelectedInvoice({
      invoiceId,
      imageId
    })
  };


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
    <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedInvoice} department="outer-invoices" setReset={setSelectedInvoice}/>
    <OuterInvoicesTable 
      headItems={headItems} 
      data={outerInvoices} 
      isLoading={isLoading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      selectedInvoice={selectedInvoice}
      handleCheckboxChange={handleCheckboxChange}
    />
    {openPopup && 
        <AddAndEditOuterInvoicePopup selectedInvoice={selectedInvoice} editMode={editMode} setEditMode={setEditMode} setOpenPopup={setOpenPopup}/>
    }
    {openDeletePopup && 
        <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedInvoice} setReset={setSelectedInvoice} department="outer-invoices" />
    }
    </div>
  )
}
