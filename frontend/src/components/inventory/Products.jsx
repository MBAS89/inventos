import React, { useState } from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { AddAndEditProductPopup } from './AddAndEditProductPopup'
import { DeletePopup } from '../../components/DeletePopup'

export const Products = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
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
            title:"on sale"
        },
        {
            title:"sale price"
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
    
    const handleOnSaleStatus = (status) => {
        if(status === true){
            return(
                <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    Yes
                </span>
            )
        }else{ 
            return(
                <span className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                    No
                </span>
            )
        }
    } 

    const data = [
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:false,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:false,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:false,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:false,
            salePrice:100,
            category:"vegtables",
            brand:"Nike",
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        }
    ]

  return (
    <div>
        <SearchComponents placeholder="Search for product" actionName="Add Prodcut" setOpenPopup={setOpenPopup}/>
        <TableToolsComponent setOpenDeletePopup={setOpenDeletePopup}/>
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
                                <td className="px-4 py-2 text-gray-700">{item.sku}</td>
                                <td className="px-4 py-2 text-gray-700">{item.qty}</td>
                                <td className="px-4 py-2 text-[#0070E0] font-bold">${item.price}</td>
                                <td className="px-4 py-2 text-[#50B426] font-bold">${item.retailPrice}</td>
                                <td className="px-4 py-2 font-bold text-[#4454DC]">${item.wholeSalePrice}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    {handleOnSaleStatus(item.sale)}
                                </td>
                                <td className="px-4 py-2 font-bold text-orange-300">${item.salePrice}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                                    {item.category}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                                    {item.brand}
                                    </span>
                                </td>
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
            <AddAndEditProductPopup setOpenPopup={setOpenPopup} />
        }
        {openDeletePopup && 
            <DeletePopup setOpenDeletePopup={setOpenDeletePopup} />
        }
    </div>
  )
}
