import React, { useState } from 'react'

import { format, parseISO } from 'date-fns';

import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { AddAndEditCategory } from './AddAndEditCategory'
import { DeletePopup } from '../../components/DeletePopup'
import { authInfoState } from '../../features/slices/authSlice'
import { useReadCategoriesQuery } from '../../features/api/inventory/categoryApiSlice'
import { useSelector } from 'react-redux'
import { Loader } from '../reusable-components/Loader'

export const Categories = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('');

    const { authInfo } = useSelector(authInfoState)

    const [currentPage, setCurrentPage] = useState(1)
    
    const {data:categories, isLoading, isFetching, isError, error } = useReadCategoriesQuery({storeId:authInfo.store_id,page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readCustomers')
    
    const handleCheckboxChange = (categoryId, imageId) => {
        setSelectedCategory({
            categoryId,
            imageId
        })
    };
    
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

  return (
        <div>
          <SearchComponents placeholder="Search for category" searchQuery={searchQuery} setsearchQuery={setsearchQuery} actionName="Add Category" setOpenPopup={setOpenPopup}/>
          <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedCategory} department="Categoires" setReset={setSelectedCategory}/>
            <div className='px-6 mt-6'>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                        <TableHead headItems={headItems}/>
                        {isLoading ? (
                            <tbody className=' absolute w-[80%] mx-auto min-h-[50vh] left-[10%] justify-center items-center flex'>
                                <tr><td><Loader /></td></tr>
                            </tbody>
                        ) :
                            <tbody className="divide-y divide-gray-200">
                                {categories.categories.map((category) => (
                                    <tr key={category.category_id}>
                                        <td className="px-4 py-2">
                                            <input
                                                className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                                type="checkbox"
                                                id={`Row${category.category_id}`}
                                                onChange={() => handleCheckboxChange(category.category_id, category.image_id)}
                                                checked={selectedCategory.categoryId == category.category_id}
                                            />
                                        </td>
                                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                                <img width="40" height="40" src={category.image} alt={category.name}/>
                                            </div>
                                            <div className='w-[80%]'>
                                                <span className='capitalize'>{category.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {categories.categoryProductCounts.find(count => count.categoryId === category.category_id)?.productCount || 0}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">{format(parseISO(category.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                        <td className="px-4 py-2 text-gray-700">{format(parseISO(category.updatedAt), "dd/MM/yyyy h:mmaaa")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                    {categories &&
                        <TablePagination currentPage={currentPage} totalPages={categories.totalPages} setCurrentPage={setCurrentPage} totalCount={categories.totalCount}  count={categories.categories.length}/>
                    }
                </div>
            </div>
            {openPopup && 
                <AddAndEditCategory setSelected={setSelectedCategory} selected={selectedCategory} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup} />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedCategory} setReset={setSelectedCategory} department="Categoires" />
            }
        </div>
  )
}
