import React, { useState } from 'react'
import { SearchComponents } from '../SearchComponents'
import { TableToolsComponent } from '../TableToolsComponent'
import { TableHead } from '../TableHead'
import { Loader } from '../reusable-components/Loader'
import { TablePagination } from '../TablePagination'
import { DeletePopup } from '../DeletePopup'
import { useReadCouponsQuery } from '../../features/api/inventory/couponsApiSlice'
import { format, parseISO } from 'date-fns'
import { handleStatus } from '../../functions/handleStatus'
import { AddAndEditCoupon } from './AddAndEditCoupon'

export const Coupons = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [searchQuery, setsearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [selectedCoupon, setSelectedCoupon] = useState('');
    const [currentPage, setCurrentPage] = useState(1)

    const {data, isLoading} = useReadCouponsQuery({page:currentPage, searchQuery:searchQuery, sortBy:sortBy},'readCoupons')

    const handleCheckboxChange = (couponId, imageId) => {
        setSelectedCoupon({
            couponId,
            imageId
        })
    };

    const headItems = [
        {
            title:"Code"
        },
        {
            title:"Kind"
        },
        {
            title:"Value"
        },
        {
            title:"Used"
        },
        {
            title:"Use Times"
        },
        {
            title:"Expires In"
        },
        {
            title:"Created At"
        }
    ]

    return (
        <div>
            <SearchComponents placeholder="Search for coupon" searchQuery={searchQuery} setsearchQuery={setsearchQuery} actionName="Add Coupon" setOpenPopup={setOpenPopup}/>
            <TableToolsComponent setEditMode={setEditMode} setOpenPopup={setOpenPopup} setSortBy={setSortBy} sortBy={sortBy}  setOpenDeletePopup={setOpenDeletePopup} selected={selectedCoupon} department="Coupons" setReset={setSelectedCoupon}/>
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
                            {data.coupon.map((coupon) => (
                                <tr key={coupon.id}>
                                    <td className="px-4 py-2">
                                        <input
                                            className="h-5 w-5 cursor-pointer rounded border-gray-300 focus:outline-none focus:ring-2 checked:bg-[#50B426] focus:ring-[#50B426]"
                                            type="checkbox"
                                            id={`Row${coupon.id}}`}
                                            onChange={() => handleCheckboxChange(coupon.id, coupon.code)}
                                            checked={selectedCoupon.couponId == coupon.id}
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {coupon.code}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {coupon.kind}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {coupon.value}{coupon.kind === 'percent' ? '%' : ''}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {handleStatus(coupon.used)}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {coupon.can_be_used_times}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">{coupon.expires_in ? format(parseISO(coupon.expires_in), "dd/MM/yyyy h:mmaaa") : '-'}</td>
                                    <td className="px-4 py-2 text-gray-700">{format(parseISO(coupon.createdAt), "dd/MM/yyyy h:mmaaa")}</td>
                                </tr>
                            ))}
                        </tbody>
                    }
                    </table>
                    {data &&
                        <TablePagination currentPage={currentPage} totalPages={data.totalPages} setCurrentPage={setCurrentPage} totalCount={data.totalCount}  count={data.coupon.length}/>
                    }
                </div>
            </div>
            {openPopup && 
                <AddAndEditCoupon setSelected={setSelectedCoupon} selected={selectedCoupon} setEditMode={setEditMode} editMode={editMode} setOpenPopup={setOpenPopup} />
            }
            {openDeletePopup && 
                <DeletePopup setOpenDeletePopup={setOpenDeletePopup} selected={selectedCoupon} setReset={setSelectedCoupon} department="Coupons"/>
            }
        </div>
    )
}
