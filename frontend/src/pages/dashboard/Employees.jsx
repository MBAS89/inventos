import React from 'react'

import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { EmployeesTable } from '../../components/employees/EmployeesTable'

export const Employees = () => {

    const headItems = [
        {
            title:"Employee Name"
        },
        {
            title:"Contact"
        },
        {
            title:"Address"
        },
        {
            title:"department"
        },
        {
            title:"total paid"
        },
        {
            title:"total due"
        },
        {
            title:"Salary"
        },
        {
            title:"employment date"
        },
        {
            title:"End of service"
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
            <SearchComponents placeholder="Search for employee" actionName="Add Employee" />
            <TableToolsComponent/>
            <EmployeesTable headItems={headItems}/>
        </div>
    )
}
