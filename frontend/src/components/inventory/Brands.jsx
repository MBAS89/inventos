import React, { useState } from 'react'

import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { AddAndEditBrand } from './AddAndEditBrand'

export const Brands = () => {

    const [openPopup, setOpenPopup] = useState(false)

    const headItems = [
        {
            title:"name"
        },
        {
            title:"products"
        },
        {
            title:"created date"
        },
        {
            title:"updated date"
        }
    ]

    const data = [
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            products:2,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        }
    ]
  return (
    <div>
        <SearchComponents placeholder="Search for brand" actionName="Add Brand" setOpenPopup={setOpenPopup}/>
        <TableToolsComponent/>
        <div className='px-6 mt-6'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} />
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2">
                                    <input className="h-5 w-5 rounded border-gray-300" type="checkbox" id="Row1"/>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                    <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                        <img width="40" height="40" src={item.image} alt="nut"/>
                                    </div>
                                    <div className='w-[80%]'>
                                        <span className='capitalize'>{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{item.products}</td>
                                <td className="px-4 py-2 text-gray-700">{item.createdDate}</td>
                                <td className="px-4 py-2 text-gray-700">{item.updatedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination />
            </div>
        </div>
        {openPopup && 
            <AddAndEditBrand setOpenPopup={setOpenPopup} />
        }
    </div>
  )
}
