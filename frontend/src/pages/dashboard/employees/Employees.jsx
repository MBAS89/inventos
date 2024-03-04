import {React,useState} from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import { TableToolsComponent } from '../../../components/TableToolsComponent'
import { EmployeesTable } from '../../../components/employees/EmployeesTable'
import { AddAndEditEmpolyeesPopup } from '../../../components/employees/AddAndEditEmployeesPopup'
import { DeletePopup } from '../../../components/DeletePopup'

export const Employees = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)

    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [selectedEmployee, setSelectedEmployee] = useState('');


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
            title:"Role"
        },
        {
            title:"work type"
        },
        {
            title:"contract"
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
            title:"updated date"
        }
        
    ]

    return (
        <div className={`bg-gray-100 h-[calc(100vh-64px)] ${openDeletePopup ? 'overflow-hidden' : ''}`}>
            <SearchComponents placeholder="Search for employee" searchQuery={searchQuery} setsearchQuery={setsearchQuery} actionName="Add Employee" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedEmployee} department="Employees" setReset={setSelectedEmployee} />
            <EmployeesTable searchQuery={searchQuery} sortBy={sortBy} headItems={headItems} setSelectedEmployee={setSelectedEmployee} selectedEmployee={selectedEmployee} />
            {openPopup && 
                <AddAndEditEmpolyeesPopup selected={selectedEmployee} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup} />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedEmployee} setReset={setSelectedEmployee} department="Employees" />
            }
        </div>
    )
}
