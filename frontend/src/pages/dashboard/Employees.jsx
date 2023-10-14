import {React,useState} from 'react'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { EmployeesTable } from '../../components/employees/EmployeesTable'
import { AddAndEditEmpolyeesPopup } from '../../components/employees/AddAndEditEmployeesPopup'
import { DeletePopup } from '../../components/DeletePopup'

export const Employees = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
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
            <SearchComponents placeholder="Search for employee" actionName="Add Employee" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setOpenDeletePopup={setOpenDeletePopup}/>
            <EmployeesTable headItems={headItems}/>
            {openPopup && 
                <AddAndEditEmpolyeesPopup setOpenPopup={setOpenPopup} />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} />
            }
        </div>
    )
}
