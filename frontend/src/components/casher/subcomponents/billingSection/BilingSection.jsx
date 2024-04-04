import React, { useEffect, useState } from 'react'

//components


//icons
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TbRulerMeasure } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
//icons

import { BiSearch } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import {AiOutlineMinus, AiOutlinePlus, AiOutlineCheckCircle, AiOutlineEye, AiOutlinePoweroff, AiOutlineClose} from "react-icons/ai";
import { useProductSearchHelperQuery } from '../../../../features/api/sales/innerInvoicesApiSlice';
import { TableHead } from '../../../TableHead';
import { handleStatus } from '../../../../functions/handleStatus';
import { BillingNumbers } from './BillingNumbers';
import { CustomerSelection } from './CustomerSelection';


import { MeasurementPopUp } from '../../../Invoices/MeasurementPopUp';
import { useSelector } from 'react-redux';
import { authInfoState } from '../../../../features/slices/authSlice';


export const BilingSection = ({setItems, items, handleAddItemToItems, searchQuery, setSearchQuery}) => {

    const navigate = useNavigate()

    const { authInfo } = useSelector(authInfoState)



    const [hideNumbers, setHideNumbers] = useState(false)

    const { data:search, isLoading } = useProductSearchHelperQuery({searchQuery},'productSearchHelper') 


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

    const [pickedCustomer, setPickedCustomer] = useState('')



    const [inventoryIndex, setInventoryIndex] = useState(0)
    const [indexChange, setIndexChange] = useState([])


    useEffect(() => {
        if(search){
            if(search.type === "unitSku" || search.type === "sku"){
                if(search.product.old_inventories.length > 0){

                    if(search.product.old_inventories.length >= inventoryIndex){
                        const oldestInventory = search.product.old_inventories[inventoryIndex]

                        if(oldestInventory){
                            const inventoryExists = items.some(item => item.inventoryId === oldestInventory.id)


                            if(!inventoryExists){
                                setItems(previousState => [...previousState, {
                                    product_id:search.product.product_id,
                                    qty:search.product.pieces_per_unit > 1 ? search.product.qty > search.product.pieces_per_unit ? search.product.pieces_per_unit : search.product.qty : 1,
                                    image:search.product.image,
                                    name:search.product.name,
                                    unit:search.product.unit,
                                    sku:search.product.sku,
                                    cost:search.product.pieces_per_unit > 1 ? oldestInventory.cost_piece : oldestInventory.cost_unit,
                                    price:oldestInventory.retail_price_piece ? oldestInventory.retail_price_piece : oldestInventory.retail_price_unit,
                                    defaultProductQty:oldestInventory.qty,
                                    unitValue:search.product.pieces_per_unit > 1 ? search.product.qty < search.product.pieces_per_unit ? (search.product.qty / search.product.pieces_per_unit) : search.product.unit_value : search.product.unit_value,
                                    piecesPerUnit:search.product.pieces_per_unit,
                                    salePriceUnit:oldestInventory.sale_price_unit ? oldestInventory.sale_price_unit : 0,
                                    salePricePeice:oldestInventory.sale_price_piece ? oldestInventory.sale_price_piece : 0,
                                    wholeSalePrice: oldestInventory.wholesale_price_piece ? oldestInventory.wholesale_price_piece : oldestInventory.wholesale_price_unit ? oldestInventory.wholesale_price_unit : 0,
                                    unitOfMeasurement:search.product.unit_of_measurement,
                                    unitCategory:search.product.unit_catergory,
                                    inventoryId:oldestInventory.id
                                }]);
        
                                setSearchQuery('')
                            }
                        }else{
                            const productExists = items.some(item => item.inventoryId !== null);
                            if(productExists){
                                setItems(previousState => [...previousState, {
                                    product_id:search.product.product_id,
                                    qty:search.product.pieces_per_unit > 1 ? search.product.qty > search.product.pieces_per_unit ? search.product.pieces_per_unit : search.product.qty : 1,
                                    image:search.product.image,
                                    name:search.product.name,
                                    unit:search.product.unit,
                                    sku:search.product.sku,
                                    cost:search.product.pieces_per_unit > 1 ? search.product.cost_piece : search.product.cost_unit,
                                    price:search.product.retail_price_piece ? search.product.retail_price_piece : search.product.retail_price_unit,
                                    defaultProductQty:search.product.qty,
                                    unitValue:search.product.pieces_per_unit > 1 ? search.product.qty < search.product.pieces_per_unit ? (search.product.qty / search.product.pieces_per_unit) : search.product.unit_value : search.product.unit_value,
                                    piecesPerUnit:search.product.pieces_per_unit,
                                    salePriceUnit:search.product.sale_price_unit ? search.product.sale_price_unit : 0,
                                    salePricePeice:search.product.sale_price_piece ? search.product.sale_price_piece : 0,
                                    wholeSalePrice: search.product.wholesale_price_piece ? search.product.wholesale_price_piece : search.product.wholesale_price_unit ? search.product.wholesale_price_unit : 0,
                                    unitOfMeasurement:search.product.unit_of_measurement,
                                    unitCategory:search.product.unit_catergory,
                                    inventoryId:null
                                }]);
        
                                setSearchQuery('')
                            }
                        }

                    }

                }else{
                    const productExists = items.some(item => item.product_id === search.product.product_id);
                    if (!productExists) {
                        setItems(previousState => [...previousState, {
                            product_id:search.product.product_id,
                            qty:search.product.pieces_per_unit > 1 ? search.product.qty > search.product.pieces_per_unit ? search.product.pieces_per_unit : search.product.qty : 1,
                            image:search.product.image,
                            name:search.product.name,
                            unit:search.product.unit,
                            sku:search.product.sku,
                            cost:search.product.pieces_per_unit > 1 ? search.product.cost_piece : search.product.cost_unit,
                            price:search.product.retail_price_piece ? search.product.retail_price_piece : search.product.retail_price_unit,
                            defaultProductQty:search.product.qty,
                            unitValue:search.product.pieces_per_unit > 1 ? search.product.qty < search.product.pieces_per_unit ? (search.product.qty / search.product.pieces_per_unit) : search.product.unit_value : search.product.unit_value,
                            piecesPerUnit:search.product.pieces_per_unit,
                            salePriceUnit:search.product.sale_price_unit ? search.product.sale_price_unit : 0,
                            salePricePeice:search.product.sale_price_piece ? search.product.sale_price_piece : 0,
                            wholeSalePrice: search.product.wholesale_price_piece ? search.product.wholesale_price_piece : search.product.wholesale_price_unit ? search.product.wholesale_price_unit : 0,
                            unitOfMeasurement:search.product.unit_of_measurement,
                            unitCategory:search.product.unit_catergory,
                            inventoryId:null
                        }]);

                        setSearchQuery('')
                    }
                }
            }
        }
    },[search])

    const handleRemoveItemFromItems = (index) => {
        // Create a copy of the items array
        const updatedItems = [...items];
        const updatedIndexs = [...indexChange]

        // Remove the item at the specified index
        updatedItems.splice(index, 1);
        updatedIndexs.splice(index, 1);
        // Update the state with the modified items array
        setItems(updatedItems);
        setIndexChange(updatedIndexs)
        setInventoryIndex(0)
    }

    const increaseQuantity = (productId, defaultQty, piecesPerUnit, product) => {
        setItems(previousState => {
            // Find the index of the product with the given product_id in the state

            const index = previousState.findIndex(item => item.inventoryId === product.inventoryId && item.product_id === product.product_id);

            if (index !== -1) { 
                // If the current quantity is less than the default quantity, increase the quantity and unit value by one
                if (previousState[index].qty < defaultQty) {
                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        qty: updatedState[index].qty + piecesPerUnit > defaultQty ? defaultQty : updatedState[index].qty + piecesPerUnit,
                        unitValue: updatedState[index].unitValue + 1
                    };
    
                    return updatedState;
                }else{

                    const there = indexChange.filter(i => i === index)

                    if(there.length === 0){
                        setInventoryIndex(inventoryIndex + 1)
                        setIndexChange([
                            ...indexChange,
                            index
                        ])
                        setSearchQuery(product.sku)
                    }else{
                        setSearchQuery('')
                    }

                }
            } 
            // Return previous state if no updates are made
            return previousState;
        });
    };

    const decreaseQuantity = (productId, piecesPerUnit, product) => {
        setItems(previousState => {
            // Find the index of the product with the given product_id in the state
            const index = previousState.findIndex(item => item.inventoryId === product.inventoryId && item.product_id === productId);

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

    const handleUnitChange = (productId, newUnitValue, piecesPerUnit, defaultProductQty, product) => {
        if(newUnitValue > 50){
            return toast.error('Max unit value 50')
        }
        
        setItems(previousState => {
            const index = previousState.findIndex(item => item.inventoryId === product.inventoryId && item.product_id === productId);
            if (index !== -1) {
                if(newUnitValue < defaultProductQty && piecesPerUnit < defaultProductQty && ((newUnitValue * piecesPerUnit) <= defaultProductQty)){
                    
                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        unitValue: newUnitValue,
                        qty: newUnitValue * piecesPerUnit
                    };
        
                    return updatedState;
                }

                return previousState
            }
            return previousState;
        });
    };


    const handleExtraInfo = () => {
        if(pickedCustomer !== 'Please select -optinal-'){
            const selectedCustomer = helper.customers.filter(cutomer => cutomer.id === pickedCustomer)

            return (
                <div className='flex flex-col gap-1'>
                    <div>Customer Discount Vlaue:
                        <span className='text-[#50B426] ml-1 font-bold'>{selectedCustomer[0].customerType.discount_value.toFixed(1)}%</span>
                    </div>
                    <div>Is Customer Wholesale:{selectedCustomer[0].customerType.wholeSalePrice ?
                        <span className='text-white bg-[#50B426] ml-1 rounded-full px-5 py-1'>Yes</span>
                    :   <span className='text-white bg-[#ee574c] ml-1 rounded-full px-4 py-1'>No</span>}
                    </div>
                </div>
            )
        }else{
            return (
                <div className='flex flex-col gap-1'>
                    <div>Itmes Discount Percent:
                        <span className='text-[#50B426] ml-1 font-bold'>{((itemsDiscount / totalAmount) * 100).toFixed(1)}%</span>
                    </div>
                    <div>Extra Discount Percent:
                        <span className='text-[#50B426] ml-1 font-bold'>{((extraDiscount / totalAmount) * 100).toFixed(1)}%</span>
                    </div>
                </div>
            )
        }
    }


    const [showMeasurementPopUp, setShowMeasurementPopUp] = useState(false)
    const [itemsUnits, setItemsUnits] = useState([])
    const [selectedItem, setSelectedItem] = useState('')

    const handleUsingCustomUnits = (unit) => {
        const item = items.filter(item => item.product_id === selectedItem)

        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === selectedItem);
            if (index !== -1) {
                if(Number(unit.pieces) < item[0].defaultProductQty && Number(unit.pieces) < item[0].defaultProductQty){

                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        qty: Number(unit.pieces)
                    };
        
                    return updatedState;
                }

                return previousState
            }
            return previousState;
        });

        setShowMeasurementPopUp(false)
        setItemsUnits([])
    }


    const handleAddCustomMeasure = (result) => {
        const item = items.filter(item => item.product_id === selectedItem)
        
        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === selectedItem);
            if (index !== -1) {
                if(Number(result.qty) < item[0].defaultProductQty && Number(result.qty) < item[0].defaultProductQty){

                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        qty: Number(result.qty),
                        unitValue:Number(result.qty)
                    };
        
                    return updatedState;
                }

                toast.error('Qty is so high in compare with inventory')
                return previousState
            }
            return previousState;
        });

        setShowMeasurementPopUp(false)
        setItemsUnits([])
    }

    const handleDecreasePiecesQty = (productId, piecesPerUnit, product) => {
        setItems(previousState => {
            const index = previousState.findIndex(item => item.inventoryId === product.inventoryId && item.product_id === productId);
    
            if (index !== -1) { 
                if (previousState[index].qty > 1 ) {
                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        qty: updatedState[index].qty - 1
                    };

                    updatedState[index] = {
                        ...updatedState[index],
                        unitValue: updatedState[index].qty / piecesPerUnit
                    };
    
                    return updatedState;
                }
            } 
            // Return previous state if no updates are made or the quantity is already at 1
            return previousState;
        });
    }

    const handleIncreasePiecesQty = (productId, piecesPerUnit, product) => {
        setItems(previousState => {
            const index = previousState.findIndex(item => item.inventoryId === product.inventoryId && item.product_id === productId);
    
            if (index !== -1) { 
                if (previousState[index].qty > 1 && previousState[index].qty < product.defaultProductQty) {
                    const updatedState = [...previousState];

                    updatedState[index] = {
                        ...updatedState[index],
                        qty: updatedState[index].qty + 1,
                    };

                    updatedState[index] = {
                        ...updatedState[index],
                        unitValue: updatedState[index].qty / piecesPerUnit
                    };
    
                    return updatedState;
                }
            } 
            // Return previous state if no updates are made or the quantity is already at 1
            return previousState;
        });
    }

    const handlePiecesChange = (productId, newQtyValue, piecesPerUnit, defaultProductQty, product) => {
        if(newQtyValue > 900){
            return toast.error('Max unit value 900')
        }

        setItems(previousState => {
            const index = previousState.findIndex(item => item.inventoryId === product.inventoryId && item.product_id === productId);

            if (index !== -1) {
                if(newQtyValue <= defaultProductQty && piecesPerUnit <= defaultProductQty){

                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        qty: newQtyValue
                    };

                    updatedState[index] = {
                        ...updatedState[index],
                        unitValue: updatedState[index].qty / piecesPerUnit
                    };
    
        
                    return updatedState;
                }

                return previousState
            }
            return previousState;
        });
    }

    return (
    <div className='relative'>
        <CustomerSelection pickedCustomer={pickedCustomer} setPickedCustomer={setPickedCustomer} />
        <div className='flex justify-between py-1 px-5'>
            <div className='flex items-center gap-3 font-bold '>
                <div className=' bg-gray-100 p-1 rounded-md flex items-center justify-center'>
                    <img width="40" height="40" src={authInfo.image} alt={authInfo.name}/>
                </div>
                <div>
                    <span className='capitalize'>{authInfo.name}</span>
                    {authInfo.role !== 'owner' && 
                        <div onClick={() => navigate(`/dashboard/employees/employee-information/${authInfo.id}`)} className='flex items-center gap-3'>
                            <AiOutlineEye className='cursor-pointer text-[1.2rem] hover:scale-110'/>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className='flex gap-3 px-5 pt-1 pb-3 relative'>
            <div className="relative w-full">
                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type="text" id="Search" placeholder="Add by Item Code" autoFocus className="w-full rounded-md border-gray-200 py-2.5 ps-3 pe-5 shadow-sm sm:text-sm"/>
                <button onClick={searchQuery && (() => setSearchQuery(''))} type="button" className="text-gray-600 hover:text-gray-700 absolute right-2 top-2">
                    {searchQuery ? (
                        <IoClose className='text-[1.5rem] text-red-500'/>
                    ): (
                        <BiSearch className='text-[1.5rem]'/>
                    )}
                </button>
            </div>
            {(search && search.type === "search") && (
                <div className={`rounded-2xl border border-blue-200 bg-white absolute top-[3.2rem] right-[9.4rem] z-10 p-4 shadow-lg ${search.product.length > 0 ? 'min-h-[15rem]' : 'min-h-[5rem]'} w-full `}>
                    {search.product.length > 0 ? 
                        <div className="overflow-x-auto overflow-y-auto min-h-[10rem] max-h-[20rem] px-4">
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
                                              {handleStatus(product.on_sale)}
                                            </td>
                                            <td className="px-4 py-2 text-[#35ad25] font-bold">${product.sale_price_unit ? product.sale_price_unit : 0}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    : <div className='capitalize text-gray-400 italic text-center mt-3 text-[1.2rem]'>No result found!</div>}
                </div>
            )}
            <button onClick={() => setItems([])} className='border w-40 border-red-500 hover:border-transparent hover:text-white hover:bg-red-500 text-red-500 py-2 px-1 text-sm font-medium rounded-md capitalize active:bg-red-300'>clear cart</button>
        </div>
        <div className={`overflow-x-auto overflow-y-auto w-[94%] mx-auto ${hideNumbers ? 'h-[29rem]' : 'h-[12rem] ]'} min-h-[12rem`}>
            {items.length > 0 ? (
                <table className="min-w-[100%] relative divide-y-2 divide-gray-200 bg-white text-sm border-2">
                    <thead className='sticky -top-[1px] bg-white'>
                        <tr>
                            <th className="px-4 py-2 font-medium text-gray-900">
                            Item
                            </th>
                            <th className="px-4 py-2 font-medium text-gray-900">
                            QTY
                            </th>
                            <th className="px-4 py-2 font-medium text-gray-900">
                            Price
                            </th>
                            <th className="px-4 py-2 font-medium text-gray-900">
                            Action
                            </th>
                        </tr>
                        <button onClick={() => setHideNumbers(!hideNumbers)} className='absolute top-[0.23rem] left-2 rounded-full hover:bg-slate-200 w-8 h-8 z-10'>
                            {hideNumbers ? 
                                <MdOutlineKeyboardDoubleArrowUp className='text-[2rem] text-red-400'/> 
                            : 
                                <MdKeyboardDoubleArrowDown className='text-[2rem] text-[#50B426]'/>
                            }
                        </button>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {items.map((item, index) => (
                        <tr key={index}>
                            <td className={`px-4 py-2 font-medium text-gray-900 flex ${item.piecesPerUnit > 1 ? 'min-h-[8rem]' : 'min-h-[4rem]' } items-center gap-3 w-[100%]`}>
                                <div className=' bg-gray-100 p-1 rounded-md w-16 flex items-center justify-center'>
                                    <img width="40" height="40" src={item.image} alt={item.name}/>
                                </div>
                                <div className=' w-32 break-words'>
                                    {item.name.length > 30 ? `${item.name.substring(0, 30)}...` : item.name}
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <div className="inline-flex items-center justify-center rounded border-[1.8px] border-solid border-gray-300">
                                    <button type='button' onClick={() => decreaseQuantity(item.product_id, item.piecesPerUnit, item)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                        <AiOutlineMinus/>
                                    </button>
                                    <span className="h-4 w-px bg-gray-300"></span>
                                    <div>
                                        <input onChange={(e) => handleUnitChange(item.product_id, parseInt(e.target.value), item.piecesPerUnit, item.defaultProductQty, item)}  value={item.unitValue} type="number"className="h-8 w-12 rounded border-none bg-transparent font-medium p-0 text-center text-s [-moz-appearance:_textfield] focus:outline-none-inset-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"/>
                                    </div>
                                    <span className="h-4 w-px bg-gray-300"></span>
                                    <button type='button' onClick={() => increaseQuantity(item.product_id, item.defaultProductQty, item.piecesPerUnit, item)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                        <AiOutlinePlus/>
                                    </button>
                                </div>
                                {item.piecesPerUnit > 1 && 
                                    <>
                                        <br />
                                        <br />
                                        <div className="inline-flex items-center justify-center rounded border-[1.8px] border-solid border-gray-300">
                                            <button type='button' onClick={() => handleDecreasePiecesQty(item.product_id, item.piecesPerUnit, item)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                                <AiOutlineMinus/>
                                            </button>
                                            <span className="h-4 w-px bg-gray-300"></span>
                                            <div>
                                                <input value={item.qty} onChange={(e) => handlePiecesChange(item.product_id, parseInt(e.target.value), item.piecesPerUnit, item.defaultProductQty, item)} type="number"className="h-8 w-12 rounded border-none bg-transparent font-medium p-0 text-center text-s [-moz-appearance:_textfield] focus:outline-none-inset-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" min="1"/>
                                            </div>
                                            <span className="h-4 w-px bg-gray-300"></span>
                                            <button type='button' onClick={() => handleIncreasePiecesQty(item.product_id, item.piecesPerUnit, item)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                                <AiOutlinePlus/>
                                            </button>
                                        </div>
                                    </>
                                }
                            </td>
                            <td className="px-4 py-2 font-bold text-[#50B426]">
                                <div>${item.piecesPerUnit > 1 ? item.piecesPerUnit * item.price : item.price}</div>
                                {item.piecesPerUnit > 1 && 
                                    <>
                                        <br />
                                        <br />
                                        <div>${item.price}</div>
                                    </>
                                }
                            </td>
                            <td className="px-4 py-2 text-red-500 cursor-pointer text-xl flex ">
                                <div onClick={() => handleRemoveItemFromItems(index)}  className='flex justify-center hover:bg-slate-200 hover:rounded-full p-2'>
                                    <MdOutlineDelete className='cursor-pointer hover:scale-110' />
                                </div>
                                <div  onClick={() => { setShowMeasurementPopUp(true); setItemsUnits(item.unitOfMeasurement); setSelectedItem(item.product_id)}} className='flex justify-center cursor-pointer hover:bg-slate-200 hover:rounded-full p-2'>
                                    <TbRulerMeasure  className='cursor-pointer text-[#50B426] hover:scale-110'/>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            ):(
                <div className="min-w-[94%] min-h-[12rem] bg-white text-sm border-2 flex justify-center items-center">
                    <div className='text-center mt-7 text-[1.3rem] italic text-gray-400'>No Items Added!</div>
                </div>
            )}
        </div>
        {showMeasurementPopUp && 
            <MeasurementPopUp
                casher={true}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                items={items}
                unitOfMeasurement={itemsUnits} 
                setItemsUnits={setItemsUnits} 
                setShowMeasurementPopUp={setShowMeasurementPopUp} 
                handleUsingCustomUnits={handleUsingCustomUnits}
                handleAddCustomMeasure={handleAddCustomMeasure}
            />
        }
        <BillingNumbers setHideNumbers={setHideNumbers} hideNumbers={hideNumbers} setItems={setItems} items={items} pickedCustomer={pickedCustomer} setPickedCustomer={setPickedCustomer} setIndexChange={setIndexChange} setInventoryIndex ={setInventoryIndex}/>
    </div>
  )
}
