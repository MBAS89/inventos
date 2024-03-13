import React, { useState } from 'react'

//icons
import { BiSearch } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";
import { TbRulerMeasure } from "react-icons/tb";

import { TableHead } from '../TableHead'
import { useAddInvoiceHelperQuery, useProductSearchHelperQuery } from '../../features/api/sales/innerInvoicesApiSlice';
import { useEffect } from 'react';

export const AddAndEditInvoicePopup = ({ setOpenPopup }) => {

    const [searchQuery, setSearchQuery] = useState('')
    const { data:helper, isLoading:isHelperLoading} = useAddInvoiceHelperQuery()
    const { data:search, isLoading } = useProductSearchHelperQuery({searchQuery},'productSearchHelper') 

    const [pickedCustomer, setPickedCustomer] = useState('Please select -optinal-')
    const [pickedEmployee, setPickedEmployee] = useState('Please select')

    const [items, setItems] = useState([])

    useEffect(() => {
        if(search){
            if(search.type === "unitSku" || search.type === "sku"){
                const productExists = items.some(item => item.product_id === search.product.product_id);
                if (!productExists) {
                    setItems(previousState => [...previousState, {
                        product_id:search.product.product_id,
                        qty:search.product.pieces_per_unit > 1 ? search.product.pieces_per_unit : 1,
                        image:search.product.image,
                        name:search.product.name,
                        unit:search.product.unit,
                        price:search.product.retail_price_piece ? search.product.retail_price_piece : search.product.retail_price_unit,
                        defaultProductQty:search.product.qty,
                        unitValue:search.product.unit_value,
                        piecesPerUnit:search.product.pieces_per_unit,
                    }]);
                }
            }
        }
    },[search])

    const handleAddItemToItems = (product) => {
        const productExists = items.some(item => item.product_id === product.product_id);
        if (!productExists) {
            setItems(previousState => [...previousState, {
                product_id:product.product_id,
                qty:product.pieces_per_unit > 1 ? product.pieces_per_unit : 1,
                image:product.image,
                name:product.name,
                unit:product.unit,
                price:product.retail_price_piece ? product.retail_price_piece : product.retail_price_unit,
                defaultProductQty:product.qty,
                unitValue:product.unit_value,
                piecesPerUnit:product.pieces_per_unit,
            }]);
        }
        setSearchQuery('')
    }

    const handleRemoveItemFromItems = (item) => {
        setItems(previousState => previousState.filter(product => product.product_id !== item.product_id));
    }

    const increaseQuantity = (productId, defaultQty, piecesPerUnit) => {
        setItems(previousState => {
            // Find the index of the product with the given product_id in the state
            const index = previousState.findIndex(item => item.product_id === productId);
    
            if (index !== -1) { 
                // If the current quantity is less than the default quantity, increase the quantity and unit value by one
                if (previousState[index].qty < defaultQty) {
                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        qty: updatedState[index].qty + piecesPerUnit,
                        unitValue: updatedState[index].unitValue + 1
                    };
    
                    return updatedState;
                }
            } 
            // Return previous state if no updates are made
            return previousState;
        });
    };

    const decreaseQuantity = (productId, piecesPerUnit) => {
        setItems(previousState => {
            // Find the index of the product with the given product_id in the state
            const index = previousState.findIndex(item => item.product_id === productId);
    
            if (index !== -1) { 
                // If the current quantity is greater than 1, decrease the quantity and unit value by one
                if (previousState[index].qty > 1 && previousState[index].unitValue > 1) {
                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        qty: updatedState[index].qty - piecesPerUnit,
                        unitValue: updatedState[index].unitValue - 1
                    };
    
                    return updatedState;
                }
            } 
            // Return previous state if no updates are made or the quantity is already at 1
            return previousState;
        });
    };

    console.log(items)

    const headItems = [
        {
            title:"Product Info",
        },{
            title:"price"
        },{
            title:"on Sale"
        },{
            title:"sale price"
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
        <section className="overflow-auto bg-white left-[20%] top-[7%] h-[50rem] w-[80rem] border-gray-500 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => setOpenPopup(false)} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>Add Invoice</h2>
            <form className='flex flex-col gap-10 w-[70%] mx-auto mt-5 relative'>
                <div className='w-full'>
                        <label htmlFor="Casher" className="block text-sm font-medium text-gray-900">
                        Casher
                        </label>
                        <select value={pickedEmployee} onChange={(e) => setPickedEmployee(e.target.value)} className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option disabled>Please select</option>
                            {!isHelperLoading && helper.employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>{employee.full_name}</option>
                            ))}
                        </select>   
                </div>
                <div className='w-full'>
                        <label htmlFor="Casher" className="block text-sm font-medium text-gray-900">
                        Customer
                        </label>
                        <select value={pickedCustomer} onChange={(e) => setPickedCustomer(e.target.value)} className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option disabled>Please select -optinal-</option>
                            {!isHelperLoading && helper.customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>{customer.full_name}</option>
                            ))}
                        </select>   
                </div>
                <label htmlFor="Sku" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type="text" id="Sku" placeholder="Full Name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Search item
                    </span>
                    <BiSearch className='text-[2rem] text-gray-500 absolute top-4 right-3 cursor-pointer'/>
                </label>
                {(search && search.type === "search") && 
                    <div className={`rounded-2xl border border-blue-200 bg-white absolute top-[21rem] right-0 z-10 p-4 shadow-lg ${search.product.length > 0 ? 'min-h-[15rem]' : 'min-h-[5rem]'} w-full `}>
                        {search.product.length > 0 ? 
                            <div className="overflow-x-auto px-4">
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                                    <TableHead headItems={headItems} selectAll={true} dont={true} withoutSelecthead={true}/>
                                    <tbody className="divide-y divide-gray-200">
                                        {search.product.map((product) => (
                                            <tr onClick={() => handleAddItemToItems(product)} key={product.product_id} className=' cursor-pointer hover:bg-slate-100'>
                                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                                    <div className=' bg-gray-100 p-1 rounded-md flex items-center justify-center'>
                                                        <img width="40" height="40" src={product.image} alt={product.name}/>
                                                    </div>
                                                    <div>
                                                        <span className='capitalize break-words'>{product.name.length > 40 ? `${product.name.substring(0, 20)}...` : product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-[#0070E0] font-bold">${product.retail_price_unit}</td>
                                                <td className="px-4 py-2 text-gray-700">
                                                    {handleOnSaleStatus(product.on_sale)}
                                                </td>
                                                <td className="px-4 py-2 text-[#35ad25] font-bold">${product.sale_price_unit ? product.sale_price_unit : 0}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        : <div className='capitalize text-gray-400 italic text-center mt-3 text-[1.2rem]'>No result found!</div>}
                    </div>
                }
                {items.length > 0 ? (
                    <table className="min-w-[94%] min-h-[5rem] divide-y-2 divide-gray-200 bg-white text-sm border-2 border-[#35ad25]">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                Item
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                Unit
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                Unit QTY
                                </th>
                                {items.some(item => item.qty > 1) && (
                                    <th className="px-4 py-2 font-medium text-gray-900">
                                        Unit Pieces QTY
                                    </th>
                                )}
                                <th className="px-4 py-2 font-medium text-gray-900">
                                Actul QTY
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                Price
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                Delete
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                measure
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {items.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3 w-[100%]">
                                    <div className=' bg-gray-100 p-1 rounded-md w-16 flex items-center justify-center'>
                                        <img width="40" height="40" src={item.image} alt={item.name}/>
                                    </div>
                                    <div className=' w-32 break-words'>
                                        {item.name.length > 40 ? `${item.name.substring(0, 20)}...` : item.name}
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-bold text-[#50B426]">{item.unit}</td>
                                <td className="px-4 py-2">
                                    <div className="inline-flex items-center justify-center rounded border-[1.8px] border-solid border-gray-300">
                                        <button type='button' onClick={() => decreaseQuantity(item.product_id, item.piecesPerUnit)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                            <AiOutlineMinus/>
                                        </button>
                                        <span className="h-4 w-px bg-gray-300"></span>
                                        <div>
                                            <input value={item.unitValue} type="number"className="h-8 w-7 rounded border-none bg-transparent font-medium p-0 text-center text-s [-moz-appearance:_textfield] focus:outline-none-inset-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" min="1"/>
                                        </div>
                                        <span className="h-4 w-px bg-gray-300"></span>
                                        <button type='button' onClick={() => increaseQuantity(item.product_id, item.defaultProductQty, item.piecesPerUnit)} className="inline-flex h-8 w-8 items-center justify-center bg-red-300 rtl:rotate-180">
                                            <AiOutlinePlus/>
                                        </button>
                                    </div>
                                </td>
                                {item.piecesPerUnit > 1 && 
                                    <td className="px-4 py-2">
                                        <div className="inline-flex items-center justify-center rounded border-[1.8px] border-solid border-gray-300">
                                            <button className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                                <AiOutlineMinus/>
                                            </button>
                                            <span className="h-4 w-px bg-gray-300"></span>
                                            <div>
                                                <input value={item.qty} type="number"className="h-8 w-7 rounded border-none bg-transparent font-medium p-0 text-center text-s [-moz-appearance:_textfield] focus:outline-none-inset-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" min="1"/>
                                            </div>
                                            <span className="h-4 w-px bg-gray-300"></span>
                                            <button className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                                <AiOutlinePlus/>
                                            </button>
                                        </div>
                                    </td>
                                }
                                <td className="px-4 py-2 font-bold text-blue-400 text-center">{item.qty}</td>
                                <td className="px-4 py-2 font-bold text-[#50B426]">${item.price}</td>
                                <td className="px-4 py-2 text-red-500 cursor-pointer text-xl">
                                    <div className='flex justify-center'>
                                        <MdOutlineDelete onClick={() => handleRemoveItemFromItems(item)}/>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-[#50B426] cursor-pointer text-xl">
                                    <div className='flex justify-center'>
                                        <TbRulerMeasure/>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                ):(
                    <div className="min-w-[94%] min-h-[5rem] bg-white text-sm border-2 border-[#35ad25]">
                        <div className='text-center mt-7 text-[1.3rem] italic text-gray-400'>No Items Added!</div>
                    </div>
                )}
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="SubTotal" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="SubTotal" placeholder="SubTotal" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Actual Total
                        </span>
                    </label>
                    <label htmlFor="ProductDiscount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="ProductDiscount" placeholder="Product Discount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Product Discount
                        </span>
                    </label>
                    <label htmlFor="ExtraDiscount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="ExtraDiscount" placeholder="ExtraDiscount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Customer Discount
                        </span>
                    </label>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="TotalAmount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="TotalAmount" placeholder="Total Amount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Extra Discount
                        </span>
                    </label>
                    <label htmlFor="Totalpaid" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="Totalpaid" placeholder="Totalpaid" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Discount
                        </span>
                    </label>
                    <label htmlFor="TotalDue" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="TotalDue" placeholder="TotalDue" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total To Pay	
                        </span>
                    </label>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="TotalAmount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="TotalAmount" placeholder="Total Amount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Paid
                        </span>
                    </label>
                    <label htmlFor="Totalpaid" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="Totalpaid" placeholder="Totalpaid" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Due
                        </span>
                    </label>
                    <label htmlFor="TotalDue" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="TotalDue" placeholder="TotalDue" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Nothing	
                        </span>
                    </label>
                </div>
                <div className='w-full'>
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-900">
                        Status
                    </label>
                    <select name="Status" id="Status" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                        <option value="">Please select</option>
                        <option value="JM">Paid</option>
                        <option value="SRV">Refunded</option>
                        <option value="JH">Partially</option>
                    </select>
                </div>
                <button className="inline-block mb-20 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]">Submit Invoice</button>
            </form>
        </section>
    )
}

