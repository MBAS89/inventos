import React, { useState } from 'react'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { ExpensesTable } from '../../components/expenses/ExpensesTable'
import { AddAndEditPopUp } from '../../components/expenses/AddAndEditPopUp'
import { DeletePopup } from '../../components/DeletePopup'
export const Expenses = () => {
    const [openPopup, setOpenPopup] = useState(false)
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
            <SearchComponents placeholder="Search for expenses" actionName="Add Expenses" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setOpenDeletePopup={setOpenDeletePopup}/>
            <ExpensesTable headItems={headItems}/>
            {openPopup && 
                <AddAndEditPopUp setOpenPopup={setOpenPopup} />
            }
           {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} />
            }
        </div>
    )
}
