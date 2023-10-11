import React from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { InventoryTable } from '../../components/inventory/InventoryTable'
export const Categories = ({headItems}) => {
  return (
    <div>
        <SearchComponents placeholder="Search for product" actionName="Add Prodcut"/>
        <TableToolsComponent/>
        {/*<InventoryTable headItems={headItems}/>*/}
    </div>
  )
}
