import React, { useState } from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import { TableToolsComponent } from '../../../components/TableToolsComponent'
import { DeletePopup } from '../../../components/DeletePopup'
import { OwnersTable } from '../../../components/admin/owners/OwnersTable'
import { EditOwnerPopup } from '../../../components/admin/owners/EditOwnerPopup'

export const Owners = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)

    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [selectedOwners, setSelectedOwners] = useState('');

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
            title:"owner Contacts"
        },
        {
            title:"Stores"
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
            <SearchComponents searchQuery={searchQuery} setsearchQuery={setsearchQuery} placeholder="Search for owner" actionName="Add Owner" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedOwners} department="Owners" setReset={setSelectedOwners} />
            <OwnersTable searchQuery={searchQuery} sortBy={sortBy} headItems={headItems} setSelectedOwners={setSelectedOwners} selectedOwners={selectedOwners} />
            {openPopup && 
                <EditOwnerPopup selected={selectedOwners} setSelected={setSelectedOwners} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup}  />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedOwners} setReset={setSelectedOwners} department="Owners"/>
            }
        </div>
    )
}
