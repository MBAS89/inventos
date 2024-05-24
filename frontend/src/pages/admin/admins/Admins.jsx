import React, { useState } from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import { TableToolsComponent } from '../../../components/TableToolsComponent'
import { DeletePopup } from '../../../components/DeletePopup'
import { AdminsTable } from '../../../components/admin/admins/AdminsTable'
import { AddEditAdminPopup } from '../../../components/admin/admins/AddEditAdminPopup'

export const Admins = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)

    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [selectedAdmins, setSelectedAdmins] = useState('');

    const headItems = [
        {
            title:"First Name"
        },
        {
            title:"Last Name"
        },
        {
            title:"ID"
        },
        {
            title:"Super"
        },
        {
            title:"Contact Info"
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
            <SearchComponents searchQuery={searchQuery} setsearchQuery={setsearchQuery} placeholder="Search for admin" actionName="Add Admin" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedAdmins} department="Admins" setReset={setSelectedAdmins} />
            <AdminsTable searchQuery={searchQuery} sortBy={sortBy} headItems={headItems} setSelectedAdmins={setSelectedAdmins} selectedAdmins={selectedAdmins} />
            {openPopup && 
                <AddEditAdminPopup selected={selectedAdmins} setSelected={setSelectedAdmins} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup}  />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedAdmins} setReset={setSelectedAdmins} department="Admins"/>
            }
        </div>
    )
}
