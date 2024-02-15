import React, { useState } from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { AddAndEditProductPopup } from './AddAndEditProductPopup'
import { DeletePopup } from '../../components/DeletePopup'
import { Loader } from '../reusable-components/Loader'

import { format, parseISO } from 'date-fns';
import { useReadProductsQuery } from '../../features/api/inventory/productApiSlice'

export const Products = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState('');

    const [currentPage, setCurrentPage] = useState(1)

    const {data:products, isLoading, isFetching, isError, error } = useReadProductsQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readProducts')
    
    const handleCheckboxChange = (productId, imageId) => {
        setSelectedProduct({
            productId,
            imageId
        })
    };
    

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

  return (
    <div>
        <SearchComponents placeholder="Search for product" searchQuery={searchQuery} setsearchQuery={setsearchQuery} actionName="Add Prodcut" setOpenPopup={setOpenPopup}/>
        <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedProduct} department="Products" setReset={setSelectedProduct} />
        <div className='px-6 mt-6'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} />
                    {isLoading ? (
                        <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                            <tr><td><Loader /></td></tr>
                        </tbody>
                    ) :
                        <tbody className="divide-y divide-gray-200">
                            {products.products.map((product) => (
                                <tr key={product.product_id}>
                                    <td className="px-4 py-2">
                                        <input className="h-5 w-5 rounded border-gray-300" type="checkbox" id="Row1"/>
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                        <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                            <img width="40" height="40" src={product.image} alt={product.name}/>
                                        </div>
                                        <div className='w-[80%]'>
                                            <span className='capitalize'>{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">{product.sku}</td>
                                    <td className="px-4 py-2 text-gray-700">{product.qty}</td>
                                    <td className="px-4 py-2 text-[#0070E0] font-bold">${product.price}</td>
                                    <td className="px-4 py-2 text-[#50B426] font-bold">${product.retail_price}</td>
                                    <td className="px-4 py-2 font-bold text-[#4454DC]">${product.wholesale_price}</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {handleOnSaleStatus(product.on_sale)}
                                    </td>
                                    <td className="px-4 py-2 font-bold text-orange-300">${product.sale_price ? product.sale_price : 0}</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                                        {/*{item.category}*/}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                                        {/*{item.brand}*/}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">{format(parseISO(product.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                    <td className="px-4 py-2 text-gray-700">{format(parseISO(product.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
                {products &&
                    <TablePagination 
                        currentPage={currentPage} 
                        totalPages={products.totalPages} 
                        setCurrentPage={setCurrentPage} 
                        totalCount={products.totalCount}  
                        count={products.products.length}
                    />
                }
            </div>
        </div>
        {openPopup && 
            <AddAndEditProductPopup setSelected={setSelectedProduct} selected={selectedProduct} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup} />
        }
        {openDeletePopup && 
            <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedProduct} setReset={setSelectedProduct} department="Prodcuts" />
        }
    </div>
  )
}
