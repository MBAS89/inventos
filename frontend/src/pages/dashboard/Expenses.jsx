import React, { useState } from 'react'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { ExpensesTable } from '../../components/expenses/ExpensesTable'
import { DeletePopup } from '../../components/DeletePopup'
export const Expenses = () => {
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
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
            <SearchComponents placeholder="Search for expenses" actionName="Add Expenses" />
            <TableToolsComponent setOpenDeletePopup={setOpenDeletePopup}/>
            <ExpensesTable headItems={headItems}/>
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} />
            }
        </div>
    )
}
