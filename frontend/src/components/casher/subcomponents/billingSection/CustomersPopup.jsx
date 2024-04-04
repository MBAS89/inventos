import React, { useState } from 'react'

//Icons
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiSearch } from 'react-icons/bi'

//Components
import { TableHead } from '../../../TableHead'
import { TablePagination } from '../../../TablePagination'
import { SmallLoader } from '../../../reusable-components/SmallLoader'

//Redux
import { authInfoState } from '../../../../features/slices/authSlice';
import { useSelector } from 'react-redux';
import { useReadCustomersQuery } from '../../../../features/api/customers/customersApiSlice';
import { handleStatus } from '../../../../functions/handleStatus'




export const CustomersPopup = ({ setShowCustomersList, setPickedCustomer }) => {


    const [customerSearch, setCustomerSeach] = useState('')

    const [currentPage, setCurrentPage] = useState(1)

    const { authInfo } = useSelector(authInfoState)
    const {data:cutomers, isLoading, isSuccess } = useReadCustomersQuery({
        storeId:authInfo.store_id, 
        page:currentPage, 
        searchQuery:customerSearch, 
        sortBy:{sort:'', column:''}
    },'readCustomers')

    const headItems = [
        {
            title:"customer info",
        },{
            title:"type"
        },{
            title:"Discount Value"
        },{
            title:"wholeSaler"
        }
    ]

    return (
        <section className="absolute left-3 top-16 w-[95%] z-10 bg-gray-100 overflow-hidden border-2 border-solid border-gray-200 rounded-lg shadow-2xl h-[26.5rem]">
            <div className='flex justify-between items-center px-4 py-4'>
                <div className="relative">
                    <input value={customerSearch} onChange={(e) => setCustomerSeach(e.target.value)} type="text" id="Search" placeholder="Search Customer" className="w-[300px] rounded-md border-gray-200 py-2.5 ps-3 pe-5 shadow-sm sm:text-sm"/>
                    <button type="button" className="text-gray-600 hover:text-gray-700 absolute right-2 top-2">
                        <BiSearch className='text-[1.5rem]'/>
                    </button>
                </div>
                <div>
                    <AiOutlineCloseCircle onClick={() => setShowCustomersList(false)} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105'/>
                </div>
            </div>
            <div className="overflow-x-auto overflow-y-auto h-[18rem] px-4">
                {!isLoading ? (
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                        <TableHead headItems={headItems} withoutSelecthead={true} selectAll={true} dont={true}/>
                        <tbody className="divide-y divide-gray-200">
                            {cutomers.customers.length > 0 ? cutomers.customers.map((item) => (
                                <tr onClick={() => {setPickedCustomer(item); setShowCustomersList(false)}} key={item.id} className=' cursor-pointer hover:bg-green-100'>
                                    <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                        <div className=' bg-gray-100 p-1 rounded-md flex items-center justify-center'>
                                            <img width="40" height="40" src={item.image} alt="nut"/>
                                        </div>
                                        <div>
                                            <span className='capitalize'>{item.full_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${item.customerType.type_name === "wholesale" ? 'text-purple-700 bg-purple-100' : 'text-blue-500 bg-blue-100'}`}>
                                            {item.customerType.type_name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm font-bold text-[#50B426] text-[1.2rem]`}>
                                            {item.customerType.discount_value}%
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {handleStatus(item.customerType.wholeSalePrice)}
                                    </td>
                                </tr>
                            )):(
                                <div className='text-[2rem] italic text-slate-300 absolute left-[8rem] top-[14rem]'>No Customer Founds!</div>
                            )}
                        </tbody>
                    </table>
                ):(
                    <div className='flex justify-center items-center text-center h-full w-full'>
                        <SmallLoader w="12" h="12" color="[#50B426]"/>
                    </div>
                )}
            </div>
            {isSuccess && 
                <div className='w-[95%] mx-auto'>
                    <TablePagination casher={true} currentPage={currentPage} totalPages={cutomers.totalPages} setCurrentPage={setCurrentPage} totalCount={cutomers.totalCount}  count={cutomers.customers.length}/>
                </div>
            }
        </section>
    )
}
