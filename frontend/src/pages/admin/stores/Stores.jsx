import React, { useState } from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import { TableToolsComponent } from '../../../components/TableToolsComponent'
import { DeletePopup } from '../../../components/DeletePopup'
import { StoresTable } from '../../../components/admin/stores/StoresTable'
import { AddAndEditStorePopup } from '../../../components/admin/stores/AddAndEditStorePopup'

export const Stores = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)

    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [selectedSuppliers, setSelectedSuppliers] = useState('');

    const headItems = [
        {
            title:"Store Name"
        },
        {
            title:"ID"
        },
        {
            title:"owner first name"
        },
        {
            title:"owner last name"
        },
        {
            title:"owner Contacts"
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
            <SearchComponents searchQuery={searchQuery} setsearchQuery={setsearchQuery} placeholder="Search for Store" actionName="Add Store" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedSuppliers} department="Stores" setReset={setSelectedSuppliers} />
            <StoresTable searchQuery={searchQuery} sortBy={sortBy} headItems={headItems} setSelectedSuppliers={setSelectedSuppliers} selectedSuppliers={selectedSuppliers} />
            {openPopup && 
                <AddAndEditStorePopup selected={selectedSuppliers} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup}  />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedSuppliers} setReset={setSelectedSuppliers} department="Stores"/>
            }
        </div>
    )
}
