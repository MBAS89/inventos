import React, { useState } from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
import { useReadCategoryQuery } from '../../features/api/inventory/categoryApiSlice'
import { useParams } from 'react-router-dom'
import { Loader } from '../reusable-components/Loader'

import { format, parseISO } from 'date-fns';

export const CategoryProfile = ({page}) => {
    const { categoryId } = useParams();

    const [currentPage, setCurrentPage] = useState(1)
    const { data:category, isLoading } = useReadCategoryQuery({categoryId: categoryId, products:true, page:currentPage }, 'readCategory')

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
    <div className='w-[80%] mx-auto'>
        <div className='h-[15rem] mt-10 flex gap-5'>
            <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>{page} Information</h2>
                <div className='flex items-center gap-10 h-[90%] pr-16 pl-10'>
                    {isLoading ? (
                        <div className='bg-slate-500 animate-pulse h-[128px] w-[128px] rounded-full'></div>
                    ):(
                        <div className=' bg-[#50B426] rounded-full w-[128px] h-[128px] p-1'>
                            <img  width="128" height="128"  src={category.category.image} className='rounded-full' alt={category.category.name} />
                        </div>
                    )}
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <h5 className='text-gray-400'>{page} Name</h5>
                                {isLoading ? (
                                    <div className='bg-slate-500 animate-pulse h-[20px] w-[140px] rounded-lg'></div>
                                ) : (
                                    <p className='font-bold'>{category.category.name}</p>
                                )}
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white w-[40%] h-full rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center'>
                {isLoading ? (
                    <dd className='bg-slate-400 mx-auto animate-pulse h-[40px] w-[200px] rounded-lg'></dd>
                ) : (
                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                        {category.totalCount}
                    </dd>
                )}
                <dt className="text-lg font-medium text-gray-500">
                    Products
                </dt>
            </div>  
        </div>
        <div>
            <div className='mt-6'>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                        <TableHead headItems={headItems} withoutSelecthead={true} />
                        {isLoading ? (
                            <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                                <tr><td><Loader /></td></tr>
                            </tbody>
                        ) :
                            <tbody className="divide-y divide-gray-200">
                                {category.products.map((product) => (
                                    <tr key={product.product_id} className=' hover:bg-slate-200 cursor-pointer'>
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
                                        <td className="px-4 py-2 text-gray-700">{format(parseISO(product.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                        <td className="px-4 py-2 text-gray-700">{format(parseISO(product.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                    {category &&
                        <TablePagination 
                            currentPage={currentPage} 
                            totalPages={category.totalPages} 
                            setCurrentPage={setCurrentPage} 
                            totalCount={category.totalCount}  
                            count={category.products.length}
                        />
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
