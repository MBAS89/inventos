import {React,useState} from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import {TableToolsComponent} from '../../../components/TableToolsComponent'
import { SuppliersTable } from '../../../components/suppliers/SuppliersTable'
import { AddAndEditSuppliersPopup } from '../../../components/suppliers/AddAndEditSuppliersPopup'
import { DeletePopup } from '../../../components/DeletePopup'

export const Suppliers = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
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
            <SearchComponents placeholder="Search for Supplier" actionName="Add Supplier" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setOpenDeletePopup={setOpenDeletePopup}/>
            <SuppliersTable headItems={headItems}/>
            {openPopup && 
                <AddAndEditSuppliersPopup setOpenPopup={setOpenPopup} />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} />
            }
        </div>
    )
}
