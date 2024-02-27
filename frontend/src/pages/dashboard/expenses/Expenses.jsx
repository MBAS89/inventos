import React, { useState } from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import {TableToolsComponent} from '../../../components/TableToolsComponent'
import { ExpensesTable } from '../../../components/expenses/ExpensesTable'
import { AddAndEditPopUp } from '../../../components/expenses/AddAndEditPopUp'
import { DeletePopup } from '../../../components/DeletePopup'

export const Expenses = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)

    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [selectedExpenses, setSelectedExpenses] = useState('');

    const headItems = [
        {
            title:"Expense Information"
        },
        {
            title:"Amount"
        },
        {
            title:"Type"
        },
        {
            title:"description"
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
            <SearchComponents placeholder="Search for expenses" actionName="Add Expenses" setOpenPopup={setOpenPopup} searchQuery={searchQuery} setsearchQuery={setsearchQuery}/>
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedExpenses} department="Expenses" setReset={setSelectedExpenses} />
            <ExpensesTable headItems={headItems} searchQuery={searchQuery} sortBy={sortBy} setSelectedExpenses={setSelectedExpenses} selectedExpenses={selectedExpenses}/>
            {openPopup && 
                <AddAndEditPopUp selected={selectedExpenses} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup}  />
            }
           {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedExpenses} setReset={setSelectedExpenses} department="Expenses"  />
            }
        </div>
    )
}
