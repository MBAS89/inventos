import React, { useState } from 'react'

//icons
import { BiSearch } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";
import { TbRulerMeasure } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";

import { TableHead } from '../TableHead'
import { useAddInvoiceHelperQuery, useAddInvoiceMutation, useEditInvoiceMutation, useProductSearchHelperQuery, useReadInvoiceQuery } from '../../features/api/sales/innerInvoicesApiSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { MeasurementPopUp } from './MeasurementPopUp';

export const AddAndEditInvoicePopup = ({ setOpenPopup, editMode, selectedInvoice, setEditMode }) => {

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
                        salePriceUnit:search.product.sale_price_unit,
                        salePricePeice:search.product.sale_price_piece,
                        wholeSalePrice: search.product.wholesale_price_piece ? search.product.wholesale_price_piece : search.product.wholesale_price_unit ? search.product.wholesale_price_unit : 0,
                        unitOfMeasurement:search.product.unit_of_measurement,
                        unitCategory:search.product.unit_catergory
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
                salePriceUnit:product.sale_price_unit,
                salePricePeice:product.sale_price_piece,
                wholeSalePrice: product.wholesale_price_piece ? product.wholesale_price_piece : product.wholesale_price_unit ? product.wholesale_price_unit : 0,
                unitOfMeasurement:product.unit_of_measurement,
                unitCategory:product.unit_catergory
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

    const handleUnitChange = (productId, newUnitValue, piecesPerUnit, defaultProductQty) => {
        if(newUnitValue > 50){
            return toast.error('Max unit value 50')
        }
        
        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === productId);
            if (index !== -1) {
                if(newUnitValue < defaultProductQty && piecesPerUnit < defaultProductQty){

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

    const [totalAmount, setTotalAmount] = useState(0)
    const [itemsDiscount, setItemsDiscount] = useState(0)
    const [customerDiscount, setCustomerDiscount] = useState(0)
    const [extraDiscount, setExtraDiscount] = useState(0)
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [totalToPay, setTotalToPay] = useState(0)
    const [totalDue, setTotalDue] = useState(0)
    const [totalPaid, setTotalPaid] = useState(0)
    const [includeItemsDiscount, setIncludeItemsDiscount] = useState(false)
    const [status, setStatus] = useState('No-status')

    useEffect(() => {
        if(items.length > 0){
            const totalAmount = items.reduce((total, currentItem) => {
                const itemTotal = currentItem.qty * currentItem.price;
                return total + itemTotal;
            }, 0);
            setTotalAmount(totalAmount);
            
            const selectedCustomer = helper.customers.filter(cutomer => cutomer.id === pickedCustomer)
            
            if(selectedCustomer.length > 0){
                if(selectedCustomer[0].customerType.discount_value > 0 || selectedCustomer[0].customerType.wholeSalePrice === true){
                    if(selectedCustomer[0].customerType.discount_value > 0 && selectedCustomer[0].customerType.wholeSalePrice === false){
                        setCustomerDiscount(totalAmount * (selectedCustomer[0].customerType.discount_value / 100))
                        if(includeItemsDiscount){
                            const totalDiscountPrice = items.reduce((total, currentItem) => {

                                const salePrice = currentItem.salePricePeice ? currentItem.salePricePeice : currentItem.salePriceUnit;
        
                                const itemTotal = salePrice * currentItem.qty;
        
                                return total + itemTotal;
                            }, 0);
                            setItemsDiscount(totalAmount - totalDiscountPrice);
                        }else{
                            setItemsDiscount(0)
                        }

                    }else{
                        const totalForCustomer = items.reduce((total, currentItem) => {
                            const itemTotal = currentItem.qty * currentItem.wholeSalePrice;
                            return total + itemTotal;
                        }, 0);
                        setCustomerDiscount(totalAmount - totalForCustomer)

                        if(includeItemsDiscount){
                            const totalDiscountPrice = items.reduce((total, currentItem) => {

                                const salePrice = currentItem.salePricePeice ? currentItem.salePricePeice : currentItem.salePriceUnit;
        
                                const itemTotal = salePrice * currentItem.qty;
        
                                return total + itemTotal;
                            }, 0);
                            setItemsDiscount(totalAmount - totalDiscountPrice);
                        }else{
                            setItemsDiscount(0)
                        }
                    }
                }else{
                    setIncludeItemsDiscount(true)
                    const totalDiscountPrice = items.reduce((total, currentItem) => {

                        const salePrice = currentItem.salePricePeice ? currentItem.salePricePeice : currentItem.salePriceUnit;

                        const itemTotal = salePrice * currentItem.qty;

                        return total + itemTotal;
                    }, 0);
                    setItemsDiscount(totalAmount - totalDiscountPrice);
                    setCustomerDiscount(0)
                }
            }else{
                setIncludeItemsDiscount(true)
                const totalDiscountPrice = items.reduce((total, currentItem) => {

                    const salePrice = currentItem.salePricePeice ? currentItem.salePricePeice : currentItem.salePriceUnit;

                    const itemTotal = salePrice * currentItem.qty;

                    return total + itemTotal;
                }, 0);
                setItemsDiscount(totalAmount - totalDiscountPrice);
                setCustomerDiscount(0)
           }

           setTotalDiscount(itemsDiscount + customerDiscount + Number(extraDiscount))
           setTotalToPay(totalAmount - totalDiscount)
           
           setTotalDue(totalToPay - totalPaid)
            if(totalDue > 0){
                    setStatus('partially')
            }else{
                    setStatus('paid')
            }

        }else{
            setTotalAmount(0);
            setItemsDiscount(0);
            setCustomerDiscount(0);
            setExtraDiscount(0)
            setTotalDiscount(0)
            setTotalToPay(0)
            setTotalDue(0)
            setTotalPaid(0)
            setIncludeItemsDiscount(false);
            setStatus('No-status')
        }
    },[items, includeItemsDiscount, customerDiscount, itemsDiscount, totalToPay,  extraDiscount, totalDiscount, totalPaid, totalDue, helper])


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

    const handleDecreasePiecesQty = (productId, piecesPerUnit) => {
        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === productId);
    
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

    const handleIncreasePiecesQty = (productId, piecesPerUnit) => {
        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === productId);
    
            if (index !== -1) { 
                if (previousState[index].qty > 1 ) {
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

    const handlePiecesChange = (productId, newQtyValue, piecesPerUnit, defaultProductQty) => {
        if(newQtyValue > 900){
            return toast.error('Max unit value 900')
        }

        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === productId);
            if (index !== -1) {
                if(newQtyValue < defaultProductQty && piecesPerUnit < defaultProductQty){

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


    const [addInvoice, {isLoading:isAddLoading}] = useAddInvoiceMutation()

    const handleAddInvoice = async (e) => {
        e.preventDefault()

        if(pickedEmployee === "Please select"){
            return toast.error('Please Select A Cahser First!')
        }

        if(items.length == 0){
            return toast.error('Invoice Should Have Items!')
        }

        const selectedCustomer = helper.customers.filter(cutomer => cutomer.id === pickedCustomer)

        console.log(selectedCustomer)
        const payload = {
            totalAmount,
            itemsDiscount, 
            customerDiscount,
            extraDiscount,
            totalDiscount, 
            totalToPay, 
            totalPaid, 
            totalDue,
            status, 
            employeeId:pickedEmployee, 
            customerId:pickedCustomer === "Please select -optinal-" ? null : pickedCustomer,
            customerExtraInfo:selectedCustomer[0] ? selectedCustomer[0].customerType.wholeSalePrice ? 'This Invoice Counted This Customer As A Wholesaler And Take Whole Sale Price' : `This Invoice Counted This Customer As A ${selectedCustomer[0].customerType.type_name} And Have A Discount Value Of ${selectedCustomer[0].customerType.discount_value}%` : '',
            items
        }

        try {
            const res = await addInvoice(payload).unwrap()
            toast.success(res.message)
            setItems([])
            setTotalAmount(0);
            setItemsDiscount(0);
            setCustomerDiscount(0);
            setExtraDiscount(0)
            setTotalDiscount(0)
            setTotalToPay(0)
            setTotalDue(0)
            setTotalPaid(0)
            setIncludeItemsDiscount(false);
            setStatus('No-status')
            setOpenPopup(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    const { data:invoice } = editMode ? useReadInvoiceQuery({ invoiceId:selectedInvoice.invoiceId }, 'readInvoice') : { data: null, isLoading: false };

    useEffect(() => {
        setItems([])
        if(invoice && helper){
            invoice.items.forEach(item => {
                // Check if the product already exists in the items array
                const productExists = items.some(existingItem => existingItem.product_id === item.product_id);

                // If the product doesn't exist, add it to the items array
                if (!productExists) {

                    setItems(previousState => [
                        ...previousState,
                        {
                            product_id:item.product_id,
                            qty:item.qty,
                            image:item.product.image,
                            name:item.product.name,
                            unit:item.product.unit,
                            price:item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit,
                            defaultProductQty:item.product.qty,
                            unitValue:item.product.unit_value,
                            piecesPerUnit:item.product.pieces_per_unit,
                            salePriceUnit:item.product.sale_price_unit,
                            salePricePeice:item.product.sale_price_piece,
                            wholeSalePrice: item.product.wholesale_price_piece ? item.product.wholesale_price_piece : item.product.wholesale_price_unit ? item.product.wholesale_price_unit : 0,
                            unitOfMeasurement:item.product.unit_of_measurement,
                            unitCategory:item.product.unit_catergory
                        }
                    ]);
                }
            });

            setTotalAmount(invoice.total_amount);
            setItemsDiscount(invoice.items_discount);
            setCustomerDiscount(invoice.customer_discount ? invoice.customer_discount : 0);
            setExtraDiscount(invoice.extra_discount ? invoice.extra_discount : 0)
            setTotalDiscount(invoice.total_discount)
            setTotalToPay(invoice.total_to_pay)
            setTotalDue(invoice.total_due)
            setTotalPaid(invoice.total_paid)
            setStatus(invoice.status)
            setPickedCustomer(invoice.customerId ? invoice.customerId : 'Please select -optinal-')
            setPickedEmployee(invoice.employeeId)

        }
    } ,[invoice])

    const [editInvoice, {isLoading:isEditLoading}] = useEditInvoiceMutation()

    const handleEditInvoice = async (e) => {
        e.preventDefault()

        if(pickedEmployee === "Please select"){
            return toast.error('Please Select A Cahser First!')
        }

        if(items.length == 0){
            return toast.error('Invoice Should Have Items!')
        }

        const payload = {
            invoiceId:invoice.id,
            totalAmount,
            itemsDiscount, 
            customerDiscount,
            extraDiscount,
            totalDiscount, 
            totalToPay, 
            totalPaid, 
            totalDue,
            status, 
            employeeId:pickedEmployee, 
            customerId:pickedCustomer === "Please select -optinal-" ? null : pickedCustomer,
            items
        }

        try {
            const res = await editInvoice(payload).unwrap()
            toast.success(res.message)
            setItems([])
            setTotalAmount(0);
            setItemsDiscount(0);
            setCustomerDiscount(0);
            setExtraDiscount(0)
            setTotalDiscount(0)
            setTotalToPay(0)
            setTotalDue(0)
            setTotalPaid(0)
            setIncludeItemsDiscount(false);
            setStatus('No-status')
            setOpenPopup(false)
            setEditMode(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    return (
        <section className="overflow-auto bg-white left-[20%] top-[7%] h-[50rem] w-[80rem] border-gray-500 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setItems([]); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Invoice' : 'Add Invoice' }</h2>
            <form onSubmit={editMode ?  handleEditInvoice : handleAddInvoice} className='flex flex-col gap-10 w-[70%] mx-auto mt-5 relative'>
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
                    <table className="min-w-[94%] relative min-h-[5rem] divide-y-2 divide-gray-200 bg-white text-sm border-2 border-[#35ad25]">
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
                                {items.some(item => item.piecesPerUnit > 1) && (
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
                                        <button type='button' onClick={() => decreaseQuantity(item.product_id, item.piecesPerUnit, item.defaultProductQty)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                            <AiOutlineMinus/>
                                        </button>
                                        <span className="h-4 w-px bg-gray-300"></span>
                                        <div>
                                            <input onChange={(e) => handleUnitChange(item.product_id, parseInt(e.target.value), item.piecesPerUnit, item.defaultProductQty)}  value={item.unitValue} type="number"className="h-8 w-7 rounded border-none bg-transparent font-medium p-0 text-center text-s [-moz-appearance:_textfield] focus:outline-none-inset-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"/>
                                        </div>
                                        <span className="h-4 w-px bg-gray-300"></span>
                                        <button type='button' onClick={() => increaseQuantity(item.product_id, item.defaultProductQty, item.piecesPerUnit)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                            <AiOutlinePlus/>
                                        </button>
                                    </div>
                                </td>
                                {item.piecesPerUnit > 1 ? 
                                    <td className="px-4 py-2">
                                        <div className="inline-flex items-center justify-center rounded border-[1.8px] border-solid border-gray-300">
                                            <button type='button' onClick={() => handleDecreasePiecesQty(item.product_id, item.piecesPerUnit)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                                <AiOutlineMinus/>
                                            </button>
                                            <span className="h-4 w-px bg-gray-300"></span>
                                            <div>
                                                <input value={item.qty} onChange={(e) => handlePiecesChange(item.product_id, parseInt(e.target.value), item.piecesPerUnit, item.defaultProductQty)} type="number"className="h-8 w-12 rounded border-none bg-transparent font-medium p-0 text-center text-s [-moz-appearance:_textfield] focus:outline-none-inset-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" min="1" max="1000"/>
                                            </div>
                                            <span className="h-4 w-px bg-gray-300"></span>
                                            <button type='button' onClick={() => handleIncreasePiecesQty(item.product_id, item.piecesPerUnit)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                                <AiOutlinePlus/>
                                            </button>
                                        </div>
                                    </td>
                                    :
                                    items.some(item => item.piecesPerUnit > 1) &&
                                    <td className='text-center text-[#50B426] font-bold'>
                                        -
                                    </td>
                                }
                                <td className="px-4 py-2 font-bold text-blue-400 text-center">{item.qty}</td>
                                <td className="px-4 py-2 font-bold text-[#50B426]">${item.price}</td>
                                <td className="px-4 py-2 text-red-500 cursor-pointer text-xl">
                                    <div className='flex justify-center hover:bg-slate-200 hover:rounded-full p-2'>
                                        <MdOutlineDelete onClick={() => handleRemoveItemFromItems(item)} className='cursor-pointer hover:scale-110' />
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-[#50B426]  text-xl">
                                    <div  onClick={() => { setShowMeasurementPopUp(true); setItemsUnits(item.unitOfMeasurement); setSelectedItem(item.product_id)}} className='flex justify-center cursor-pointer hover:bg-slate-200 hover:rounded-full p-2'>
                                        <TbRulerMeasure  className='cursor-pointer hover:scale-110'/>
                                    </div>
                                    {showMeasurementPopUp && 
                                        <MeasurementPopUp 
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
                <div className='flex justify-end'>
                    <div className='flex gap-2 items-center'>
                        <span>Include Product Discount:</span>
                        <input checked={includeItemsDiscount} onChange={() => setIncludeItemsDiscount(!includeItemsDiscount)} type="checkbox" name='status' className="switch appearance-none focus:ring-0" />
                    </div>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="totalAmount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalAmount.toFixed(2)} readOnly disabled type="number" id="totalAmount" placeholder="totalAmount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Actual Total
                        </span>
                    </label>
                    <label htmlFor="itemsDiscount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={itemsDiscount.toFixed(2)} readOnly disabled type="number" id="itemsDiscount" placeholder="itemsDiscount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Items Discount
                        </span>
                    </label>
                    <label htmlFor="customerDiscount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={customerDiscount.toFixed(2)}  readOnly disabled  type="number" id="customerDiscount" placeholder="customerDiscount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Customer Discount
                        </span>
                    </label>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="extraDiscount" className="relative block overflow-hidden w-full rounded-md border-3 border-[#50B426] px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={extraDiscount.toFixed(2)} onChange={(e) => setExtraDiscount(e.target.value)} type="number" id="extraDiscount" placeholder="extraDiscount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Extra Discount
                        </span>
                    </label>
                    <label htmlFor="totalDiscount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalDiscount.toFixed(2)} disabled readOnly type="number" id="totalDiscount" placeholder="totalDiscount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Discount
                        </span>
                    </label>
                    <label htmlFor="totalToPay" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalToPay.toFixed(2)} readOnly disabled type="number" id="totalToPay" placeholder="totalToPay" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total To Pay	
                        </span>
                    </label>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="totalPaid" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalPaid} onChange={(e) => setTotalPaid(e.target.value)} type="number" id="totalPaid" placeholder="totalPaid" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span  className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Paid
                        </span>
                    </label>
                    <label htmlFor="totalDue" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalDue.toFixed(2)} readOnly disabled type="number" id="totalDue" placeholder="totalDue" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Due
                        </span>
                    </label>
                    <div className='flex-col text-left text-[0.9rem] p-1 w-[50rem] gap-2'>
                        {handleExtraInfo()}
                    </div>
                </div>
                <div className='w-full'>
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-900">
                        Status
                    </label>
                    <select value={status} readOnly name="Status" id="Status" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                        <option value="No-status">No status</option>
                        <option value="paid">Paid</option>
                        <option value="partially">Partially</option>
                    </select>
                </div>
                <button type='submit' disabled={isAddLoading || isEditLoading} className={` ${isAddLoading || isEditLoading  ? 'bg-gray-300 text-gray-200': 'text-[#50B426] border-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]' } flex gap-4 justify-center mb-20 rounded border w-full  px-12 py-4 text-sm font-medium`}>
                    {(isAddLoading || isEditLoading) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>}
                    {editMode ? 'Confirm Edits' : 'Submit Invoice' }
                </button>
            </form>
        </section>
    )
}

