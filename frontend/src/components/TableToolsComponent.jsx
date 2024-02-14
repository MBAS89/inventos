import React, { useEffect, useState } from 'react'

//icons
import { SiMicrosoftexcel } from 'react-icons/si';
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineDelete,MdOutlineRemoveRedEye } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { BsSortDown,BsPencil } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCustomersTypesMutation } from '../features/api/customers/customersTypeApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { authInfoState } from '../features/slices/authSlice';
import { setCustomerTypes } from '../features/slices/customerTypesSlice';


export const TableToolsComponent = ({ setOpenDeletePopup, setReset, department, selected, setSortBy, sortBy, setOpenPopup, setEditMode }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { authInfo } = useSelector(authInfoState)

    const [openFilter, setOpenFilter] = useState(false)
    const [openSortBy, setOpenSortBy] = useState(false)
    const [sortElements, setSortElements] = useState([])

    useEffect(() => {
        const sortElementsFunc = () => {
            if(department === 'Customers'){
                setSortElements([
                    {
                        title:'Ascending',
                        value:{sort:'asc', column:'full_name'}
                    },{
                        title:'Descending',
                        value:{sort:'desc', column:'full_name'}
                    },{
                        title:'Highest Transactions',
                        value:{sort:'desc', column:'total_transactions'}
                    },{
                        title:'Lowest Transactions',
                        value:{sort:'asc', column:'total_transactions'}
                    }
                ])
            }else if(department === 'Categoires' || department === 'Brands'){
                setSortElements([
                    {
                        title:'Ascending',
                        value:{sort:'asc', column:'name'}
                    },{
                        title:'Descending',
                        value:{sort:'desc', column:'name'}
                    }
                ])
            }
        }
    
        sortElementsFunc()
    },[department])

    const [getCustomersTypes] = useGetCustomersTypesMutation()


    const handleCustomerTypes = async () => {
        if(department === 'Customers'){
            try {
                const res = await getCustomersTypes(authInfo.store_id).unwrap()
                dispatch(setCustomerTypes({...res.data.customersTypes}))
            } catch (error) {
                toast.error(error.data.error)
            }
        }
    }

    const handleView = () => {
        if(department === 'Customers'){
            navigate(`/dashboard/customers/single-customer/${selected[Object.keys(selected)[0]]}`)
        }else if(department === 'Categoires'){
            navigate(`/dashboard/inventory/single-category/${selected[Object.keys(selected)[0]]}`)
        }else if(department === "Brands"){
            navigate(`/dashboard/inventory/single-brand/${selected[Object.keys(selected)[0]]}`)
        }
    }


    return (
    <div className='flex justify-between items-center px-6'>
        <div className='flex items-center gap-6 capitalize'>
            <span className='flex items-center gap-1'>
                {selected ? '1' : '0'} selected 
                {selected && 
                    <MdOutlineCancel onClick={() => setReset('')} className='text-red-700 cursor-pointer hover:scale-110'/>
                }
            </span>
            <button className='capitalize flex items-center gap-1 cursor-pointer hover:scale-105'>
                <SiMicrosoftexcel className='text-[#50B426] text-xl'/>
                <span>export to excel</span>
            </button>
            {selected && 
                <button onClick={handleView} className='capitalize flex items-center gap-1 cursor-pointer hover:scale-105'>
                    <MdOutlineRemoveRedEye className='text-[#50B426] text-xl'/>
                    <span>view</span>
                </button>
            }
            {selected && 
                <button onClick={() => {
                    setOpenPopup(true);
                    setEditMode(true);
                    handleCustomerTypes();
                }} className='capitalize flex items-center gap-1 cursor-pointer hover:scale-105'>
                    <BsPencil className='text-[#50B426] text-xl'/>
                    <span>edit</span>
                </button>
            }
            {selected  && 
                <button onClick={() => setOpenDeletePopup(true)} className='flex items-center capitalize gap-1 cursor-pointer hover:scale-105'>
                    <MdOutlineDelete className='text-[#50B426] text-xl'/>
                    <span>delete</span>
                </button>
            }
        </div>
        <div className='flex gap-6'>
            <div className=''>
                <div className="relative">
                    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                        <button onClick={() => {
                            setOpenFilter(!openFilter)
                            setOpenSortBy(false)
                        }} className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                            <div className='capitalize flex items-center gap-2'>
                                <FiFilter className='text-[#50B426] text-xl'/>
                                <span>filter</span>
                            </div>
                        </button>
                    </div>
                    {openFilter && (
                    <div className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-400 bg-white shadow-lg" role="menu">
                        <div className="p-2">
                            {sortElements.map((e, index) => (
                                <button key={index} onClick={() => setSortBy(e.value)} className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                    {e.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className=''>
                <div className="relative">
                    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                        <button onClick={() => {
                            setOpenFilter(false)
                        }} className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 flex justify-between items-center gap-2">
                            <div onClick={() => setOpenSortBy(!openSortBy)} className='capitalize flex items-center gap-2'>
                                <BsSortDown className='text-[#50B426] text-xl'/>
                                <span>sort by</span>
                            </div>
                            {sortBy &&
                            <div className='text-gray-600 hover:bg-gray-50'>
                                <MdOutlineCancel onClick={() => setSortBy('')} className='text-red-700 text-[1.3rem] cursor-pointer hover:scale-110'/>
                            </div>
                            }
                        </button>
                    </div>
                    {openSortBy && (
                    <div className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-400 bg-white shadow-lg" role="menu">
                        <div className="p-2">
                            {sortElements.map((e, index) => (
                                <button key={index} className={`block rounded-lg px-4 py-2 text-sm  ${sortBy === e.value ? 'text-white bg-green-500 w-full flex justify-between items-center' : 'text-gray-500 hover:text-gray-700'}`}>
                                    <span onClick={() => setSortBy(e.value)}>{e.title}</span>
                                    {sortBy === e.value &&
                                        <MdOutlineCancel onClick={() => setSortBy('')} className='text-red-700 text-[1.3rem] cursor-pointer hover:scale-110'/>
                                    }
                                </button>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
