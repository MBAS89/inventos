import {React,useState} from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import {TableToolsComponent} from '../../../components/TableToolsComponent'
import { SuppliersTable } from '../../../components/suppliers/SuppliersTable'
import { AddAndEditSuppliersPopup } from '../../../components/suppliers/AddAndEditSuppliersPopup'
import { DeletePopup } from '../../../components/DeletePopup'

export const Suppliers = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)

    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [selectedSuppliers, setSelectedSuppliers] = useState('');


    const headItems = [
        {
            title:"Supplier Name"
        },
        {
            title:"Contact"
        },
        {
            title:"Address"
        },
        {
            title:"Type"
        },
        {
            title:"total transactions"
        },
        {
            title:"total debt for"
        },
        {
            title:"total debt us"
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
            <SearchComponents searchQuery={searchQuery} setsearchQuery={setsearchQuery} placeholder="Search for Supplier" actionName="Add Supplier" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedSuppliers} department="Suppliers" setReset={setSelectedSuppliers} />
            <SuppliersTable searchQuery={searchQuery} sortBy={sortBy} headItems={headItems} setSelectedSuppliers={setSelectedSuppliers} selectedSuppliers={selectedSuppliers} />
            {openPopup && 
                <AddAndEditSuppliersPopup selected={selectedSuppliers} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup}  />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedSuppliers} setReset={setSelectedSuppliers} department="Suppliers"/>
            }
        </div>
    )
}
