import React, { useState } from 'react'

import { format, parseISO } from 'date-fns';
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'
import { SearchComponents } from '../../components/SearchComponents'
import {TableToolsComponent} from '../../components/TableToolsComponent'
import { AddAndEditBrand } from './AddAndEditBrand'
import { DeletePopup } from '../../components/DeletePopup'
import { useReadBrandsQuery } from '../../features/api/inventory/brandApiSlice'
import { Loader } from '../reusable-components/Loader'
export const Brands = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState('');
    const [currentPage, setCurrentPage] = useState(1)

    const {data:brands, isLoading, isFetching, isError, error } = useReadBrandsQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readBrands')

    const handleCheckboxChange = (brandId, imageId) => {
        setSelectedBrand({
            brandId,
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
        <SearchComponents placeholder="Search for brand" searchQuery={searchQuery} setsearchQuery={setsearchQuery} actionName="Add Brand" setOpenPopup={setOpenPopup}/>
        <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedBrand} department="Brands" setReset={setSelectedBrand}/>
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
                            {brands.brands.map((brand) => (
                                <tr key={brand.brand_id}>
                                    <td className="px-4 py-2">
                                        <input
                                            className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                            type="checkbox"
                                            id={`Row${brand.brand_id}}`}
                                            onChange={() => handleCheckboxChange(brand.brand_id, brand.image_id)}
                                            checked={selectedBrand.brandId == brand.brand_id}
                                        />
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                        <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                            <img width="40" height="40" src={brand.image} alt={brand.name}/>
                                        </div>
                                        <div className='w-[80%]'>
                                            <span className='capitalize'>{brand.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {brands.brandProductCounts.find(count => count.brandId === brand.brand_id)?.productCount || 0}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">{format(parseISO(brand.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                    <td className="px-4 py-2 text-gray-700">{format(parseISO(brand.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
                {brands &&
                    <TablePagination currentPage={currentPage} totalPages={brands.totalPages} setCurrentPage={setCurrentPage} totalCount={brands.totalCount}  count={brands.brands.length}/>
                }
            </div>
        </div>
        {openPopup && 
            <AddAndEditBrand setSelected={setSelectedBrand} selected={selectedBrand} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup} />
        }
        {openDeletePopup && 
            <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedBrand} setReset={setSelectedBrand} department="Brands"/>
        }
    </div>
  )
}
