import React from 'react'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { ExpensesTable } from '../../components/expenses/ExpensesTable'
export const Expenses = () => {
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
            <TableToolsComponent/>
            <ExpensesTable headItems={headItems}/>
        </div>
    )
}
