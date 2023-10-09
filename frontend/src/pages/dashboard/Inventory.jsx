import React from 'react'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { InventoryTable } from '../../components/inventory/InventoryTable'
export const Inventory = () => {
    const headItems = [
        {
            title:"product info"
        },
        {
            title:"Sku"
        },
        {
            title:"qty"
        },
        {
            title:"price"
        },
        {
            title:"retail price"
        },
        {
            title:"wholesale price"
        },
        {
            title:"category"
        },
        {
            title:"brand"
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
        <SearchComponents placeholder="Search for product" actionName="Add Prodcut" />
        <TableToolsComponent/>
        <InventoryTable headItems={headItems}/>
    </div>
  )
}
