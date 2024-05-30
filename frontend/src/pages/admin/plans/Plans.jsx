import React, { useState } from 'react'
import { SearchComponents } from '../../../components/SearchComponents'
import { TableToolsComponent } from '../../../components/TableToolsComponent'
import { DeletePopup } from '../../../components/DeletePopup'
import { PlansTable } from '../../../components/admin/plnas/PlansTable'
import { AddEditPlanPopUp } from '../../../components/admin/plnas/AddEditPlanPopUp'

export const Plans = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)

    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)

    const [selectedPlans, setSelectedPlans] = useState('');

    const headItems = [
        {
            title:"Name"
        },
        {
            title:"Customers"
        },
        {
            title:"suppliers"
        },
        {
            title:"categories"
        },
        {
            title:"brands"
        },
        {
            title:"employees"
        },
        {
            title:"expenses"
        },
        {
            title:"in_invoices"
        },
        {
            title:"out_invoices"
        },
        {
            title:"price"
        },
        {
            title:"on sale"
        },
        {
            title:"sale price"
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
            <SearchComponents searchQuery={searchQuery} setsearchQuery={setsearchQuery} placeholder="Search for plan" actionName="Add Plan" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedPlans} department="Plans" setReset={setSelectedPlans} />
            <PlansTable searchQuery={searchQuery} sortBy={sortBy} headItems={headItems} setSelectedPlans={setSelectedPlans} selectedPlans={selectedPlans} />
            {openPopup && 
                <AddEditPlanPopUp selected={selectedPlans} setSelected={setSelectedPlans} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup}  />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedPlans} setReset={setSelectedPlans} department="Plans"/>
            }
        </div>
    )
}
