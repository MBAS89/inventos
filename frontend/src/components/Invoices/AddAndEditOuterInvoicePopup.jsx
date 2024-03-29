import React, { useEffect, useState } from 'react'
import { BiSearch } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";
import { TbRulerMeasure } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import { useProductSearchHelperQuery, useReadInvoiceQuery } from '../../features/api/sales/innerInvoicesApiSlice';
import { TableHead } from '../TableHead';
import { MeasurementPopUp } from './MeasurementPopUp';
import { MdOutlineEdit } from "react-icons/md";
import { useAddOuterInvoiceHelperQuery, useAddOuterInvoiceMutation, useEditOuterInvoiceMutation, useReadOuterInvoiceQuery } from '../../features/api/sales/outerInvoicesApiSlice';
import { toast } from 'react-toastify';


export const AddAndEditOuterInvoicePopup = ({ setOpenPopup, editMode, selectedInvoice, setEditMode }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const { data:search, isLoading } = useProductSearchHelperQuery({searchQuery},'productSearchHelper')
    const { data:helper } = useAddOuterInvoiceHelperQuery()

    const [pickedSupplier, setPickedSupplier] = useState('Please select')
    const [pickedEmployee, setPickedEmployee] = useState('Please select')

    const [items, setItems] = useState([])

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
                        costUnit:search.product.cost_unit,
                        costPiece:search.product.cost_piece ? search.product.cost_piece : search.product.cost_unit,
                        defaultProductQty:search.product.qty,
                        unitValue:search.product.unit_value,
                        piecesPerUnit:search.product.pieces_per_unit,
                        salePriceUnit:search.product.sale_price_unit,
                        salePricePeice:search.product.sale_price_piece,
                        retailPriceUnit: search.product.retail_price_unit ? search.product.retail_price_unit : 0,
                        retailPricePiece: search.product.retail_price_piece ? search.product.retail_price_piece : 0,
                        wholeSalePriceUnit: search.product.wholesale_price_unit ? search.product.wholesale_price_unit : 0,
                        wholeSalePricePiece: search.product.wholesale_price_piece ? search.product.wholesale_price_piece : 0,
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
                costUnit:product.cost_unit,
                costPiece:product.cost_piece ? product.cost_piece : product.cost_unit,
                defaultProductQty:product.qty,
                unitValue:product.unit_value,
                piecesPerUnit:product.pieces_per_unit,
                salePriceUnit:product.sale_price_unit,
                salePricePeice:product.sale_price_piece,
                retailPriceUnit: product.retail_price_unit ? product.retail_price_unit : 0,
                retailPricePiece: product.retail_price_piece ? product.retail_price_piece : 0,
                wholeSalePriceUnit: product.wholesale_price_unit ? product.wholesale_price_unit : 0,
                wholeSalePricePiece: product.wholesale_price_piece ?product.wholesale_price_piece : 0,
                unitOfMeasurement:product.unit_of_measurement,
                unitCategory:product.unit_catergory
            }]);
        }
        setSearchQuery('')
    }


    const handleRemoveItemFromItems = (item) => {
        setItems(previousState => previousState.filter(product => product.product_id !== item.product_id));
    }

    
    const increaseQuantity = (productId, piecesPerUnit) => {
        setItems(previousState => {
            // Find the index of the product with the given product_id in the state
            const index = previousState.findIndex(item => item.product_id === productId);
            if (index !== -1) { 
                const updatedState = [...previousState];
                updatedState[index] = {
                    ...updatedState[index],
                    qty: updatedState[index].qty + piecesPerUnit,
                    unitValue: updatedState[index].unitValue + 1
                };

                return updatedState;
                
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

    const handleUnitChange = (productId, newUnitValue, piecesPerUnit) => {
        if(newUnitValue > 50){
            return toast.error('Max unit value 50')
        }
        
        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === productId);
            if (index !== -1) {

                const updatedState = [...previousState];
                updatedState[index] = {
                    ...updatedState[index],
                    unitValue: newUnitValue,
                    qty: newUnitValue * piecesPerUnit
                };
    
                return updatedState;
            }
            return previousState;
        });
    };

    const [showMeasurementPopUp, setShowMeasurementPopUp] = useState(false)
    const [itemsUnits, setItemsUnits] = useState([])
    const [selectedItem, setSelectedItem] = useState('')

    const handleUsingCustomUnits = (unit) => {
        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === selectedItem);
            if (index !== -1) {

                const updatedState = [...previousState];
                updatedState[index] = {
                    ...updatedState[index],
                    qty: Number(unit.pieces),
                    unitValue:updatedState[index].piecesPerUnit > 1 ? Number(unit.pieces)/updatedState[index].piecesPerUnit: Number(unit.pieces)
                };
    
                return updatedState;
            }
            return previousState;
        });

        setShowMeasurementPopUp(false)
        setItemsUnits([])
    }

    const handleAddCustomMeasure = (result) => {
        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === selectedItem);
            if (index !== -1) {
                const updatedState = [...previousState];
                updatedState[index] = {
                    ...updatedState[index],
                    qty: Number(result.qty),
                    unitValue:Number(result.qty)
                };
    
                return updatedState;
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

    const handlePiecesChange = (productId, newQtyValue, piecesPerUnit) => {
        if(newQtyValue > 900){
            return toast.error('Max unit value 900')
        }

        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === productId);
            if (index !== -1) {

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
            return previousState;
        });
    }

    const[priceMenu, setPriceMenu] = useState('')

    const periceMenuOnChange = (e, id) => {
        const targetName = e.target.name;
        
        setItems(previousState => {
            const index = previousState.findIndex(item => item.product_id === id);
            if (index !== -1) {
                const updatedState = [...previousState];
                updatedState[index] = {
                    ...updatedState[index],
                    [targetName]: Number(e.target.value)
                };
                return updatedState;
            }
            return previousState;
        });
    };


    const [totalQty, setTotalQty] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [extraDiscount, setExtraDiscount] = useState(0)
    const [totalToPay, setTotalToPay] = useState(0)
    const [totalDue, setTotalDue] = useState(0)
    const [totalPaid, setTotalPaid] = useState(0)
    const [status, setStatus] = useState(0)

    useEffect(() => {
        if(items.length > 0){
            const totalqty = items.reduce((total, currentItem) => {
                return total + currentItem.qty;
            }, 0);

            setTotalQty(totalqty)
            const totalAmount = items.reduce((total, currentItem) => {
                const itemTotal = currentItem.piecesPerUnit > 1 ? currentItem.qty * currentItem.costPiece : currentItem.qty * currentItem.costUnit;
                return total + itemTotal;
            }, 0);
            setTotalAmount(totalAmount);
            setTotalToPay(totalAmount - extraDiscount)
            setTotalDue(totalToPay - totalPaid)

            if(totalDue > 0){
                setStatus('partially')
            }else{
                setStatus('paid')
            }

        }else{
            setTotalAmount(0);
            setExtraDiscount(0);
            setTotalToPay(0);
            setTotalDue(0)
            setTotalPaid(0)
            setStatus('No-status')
        }
    },[items, totalToPay,  extraDiscount, totalPaid, totalDue])

    const [oldInventoryStatus, setOldInventoryStatus] = useState('sell-this-on-old-price')

    const [addOuterInvoice, {isLoading:isAddLoading}] = useAddOuterInvoiceMutation()

    const handleAddOuterInvoice = async (e) => {
        e.preventDefault()

        if(pickedSupplier === "Please select"){
            return toast.error('Please Select A Supplier First!')
        }

        if(pickedEmployee === "Please select"){
            return toast.error('Please Select A Employee First!')
        }

        if(items.length == 0){
            return toast.error('Invoice Should Have Items!')
        }

        const payload = {
            totalAmount,
            extraDiscount,
            totalToPay, 
            totalPaid, 
            totalDue,
            status, 
            employeeId:pickedEmployee, 
            suppliersId:pickedSupplier,
            items,
            inventoryStatus:oldInventoryStatus
        }

        try {
            const res = await addOuterInvoice(payload).unwrap()
            toast.success(res.message)
            setItems([])
            setTotalAmount(0);
            setExtraDiscount(0)
            setTotalToPay(0)
            setTotalDue(0)
            setTotalPaid(0)
            setStatus('No-status')
            setOldInventoryStatus('sell-this-on-old-price')
            setOpenPopup(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    const { data:invoice } = editMode ? useReadOuterInvoiceQuery({ invoiceId:selectedInvoice.invoiceId }, 'readOuterInvoice') : { data: null, isLoading: false };


    useEffect(() => {
        setItems([])
        if(invoice && helper && editMode){
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
                            costUnit:item.product.cost_unit,
                            costPiece:item.product.cost_piece ? item.product.cost_piece : item.product.cost_unit,
                            defaultProductQty:item.product.qty,
                            unitValue:item.product.pieces_per_unit > 1 ? item.qty / item.product.pieces_per_unit : item.qty,
                            piecesPerUnit:item.product.pieces_per_unit,
                            salePriceUnit:item.product.sale_price_unit,
                            salePricePeice:item.product.sale_price_piece,
                            retailPriceUnit: item.product.retail_price_unit ? item.product.retail_price_unit : 0,
                            retailPricePiece: item.product.retail_price_piece ? item.product.retail_price_piece : 0,
                            wholeSalePriceUnit: item.product.wholesale_price_unit ? item.product.wholesale_price_unit : 0,
                            wholeSalePricePiece: item.product.wholesale_price_piece ? item.product.wholesale_price_piece : 0,
                            unitOfMeasurement:item.product.unit_of_measurement,
                            unitCategory:item.product.unit_catergory
                        }
                    ]);
                }
            });

            setOldInventoryStatus(invoice.items[0].product.old_inventories.length > 0 ? invoice.items[0].product.old_inventories[0].status : 'sell-this-on-old-price')
            setPickedSupplier(invoice.suppliersId);
            setPickedEmployee(invoice.employeeId);
            setTotalAmount(invoice.total_amount);
            setExtraDiscount(invoice.extra_discount ? invoice.extra_discount : 0);
            setTotalToPay(invoice.total_to_pay);
            setTotalDue(invoice.total_due);
            setTotalPaid(invoice.total_paid);
            setStatus(invoice.status);

        }
    } ,[invoice, editMode])

    console.log(invoice)

    const [editOuterInvoice, {isLoading:isEditLoading}] = useEditOuterInvoiceMutation()

    const handleEditInvoice = async (e) => {
        e.preventDefault()

        if(pickedEmployee === "Please select"){
            return toast.error('Please Select A Cahser First!')
        }

        if(pickedSupplier === "Please select"){
            return toast.error('Please Select A Supplier First!')
        }

        if(items.length == 0){
            return toast.error('Invoice Should Have Items!')
        }

        const payload = {
            invoiceId:invoice.id,
            totalAmount,
            extraDiscount,
            totalToPay, 
            totalPaid, 
            totalDue,
            status, 
            employeeId:pickedEmployee, 
            suppliersId:pickedSupplier,
            items,
            inventoryStatus:oldInventoryStatus
        }

        try {
            const res = await editOuterInvoice(payload).unwrap()
            toast.success(res.message)
            setItems([])
            setTotalAmount(0);
            setExtraDiscount(0)
            setTotalToPay(0)
            setTotalDue(0)
            setTotalPaid(0)
            setStatus('No-status')
            setOldInventoryStatus('sell-this-on-old-price')
            setOpenPopup(false)
            setEditMode(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <section className="overflow-auto bg-white left-[13%] top-[7%] h-[50rem] w-[90rem] border-gray-500 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setItems([]); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Outer Invoice' : 'Add Outer Invoice' }</h2>
            <form onSubmit={editMode ? handleEditInvoice : handleAddOuterInvoice} className='flex flex-col gap-10 w-[70%] mx-auto mt-5 mb-24 relative'>
                <div className='w-full'>
                    <label htmlFor="Casher" className="block text-sm font-medium text-gray-900">
                    Casher
                    </label>
                    <select value={pickedEmployee} onChange={(e) => {setPickedEmployee(e.target.value)}} className="mt-1.5 h-16 remove-arrow w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                        <option disabled>Please select</option>
                        {helper && helper.employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>{employee.full_name}</option>
                        ))}
                    </select>   
                </div>
                <div className='w-full'>
                    <label htmlFor="Casher" className="block text-sm font-medium text-gray-900">
                    Suppier
                    </label>
                    <select value={pickedSupplier} onChange={(e) => {setPickedSupplier(e.target.value)}} className="mt-1.5 h-16 remove-arrow w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                        <option disabled>Please select</option>
                        {helper && helper.suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>{supplier.supplier_name}</option>
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
                                <table className="min-w-full relative divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
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
                <div className="overflow-x-auto relative">
                {items.length > 0 ? (
                    <table className="w-full  min-h-[8rem] divide-y-2 divide-gray-200 bg-white text-sm border-2 border-[#35ad25]">
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
                                Unit Cost 
                                </th>
                                {items.some(item => item.piecesPerUnit > 1) && (
                                    <th className="px-4 py-2 font-medium text-gray-900">
                                    Piece Cost 
                                    </th>
                                )}
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
                                    <div className=' bg-gray-100 p-1 rounded-md w-16 remove-arrow flex items-center justify-center'>
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
                                            <input value={item.unitValue} onChange={(e) => handleUnitChange(item.product_id, parseInt(e.target.value), item.piecesPerUnit, item.defaultProductQty)}   type="number"className="h-8 w-7 rounded border-none bg-transparent font-medium p-0 text-center text-s [-moz-appearance:_textfield] focus:outline-none-inset-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"/>
                                        </div>
                                        <span className="h-4 w-px bg-gray-300"></span>
                                        <button type='button' onClick={() => increaseQuantity(item.product_id, item.piecesPerUnit)} className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
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
                                <td className="px-4 py-2 font-bold text-blue-400 text-center text-[1.1rem]">{item.qty}</td>
                                <td className="font-bold text-[#50B426]">
                                    <div className='flex items-center justify-center'>
                                        <span className='mr-1 text-[1.1rem]'>${item.costUnit}</span> <MdOutlineEdit onClick={() => setPriceMenu(item.product_id)} className='text-[1.2rem] text-purple-600 cursor-pointer'/>
                                    </div>
                                    {priceMenu === item.product_id &&
                                    <div className='w-[100%] h-full bg-white border-2 border-[#50B426] absolute top-0 left-0 flex justify-center items-center'>
                                        <div className='absolute right-2 top-2 '>
                                            <AiOutlineCloseCircle onClick={() => setPriceMenu('')} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 '/>
                                        </div>
                                        <div>
                                            <table className='w-[95%] h-[7.6rem]'>
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2 font-medium text-gray-900">
                                                        Unit Cost
                                                        </th>
                                                        {items.some(item => item.piecesPerUnit > 1) && (
                                                            <th className="px-4 py-2 font-medium text-gray-900">
                                                            Piece Cost 
                                                            </th>
                                                        )}
                                                        <th className="px-4 py-2 font-medium text-gray-900">
                                                        Retail Price Unit
                                                        </th>
                                                        {items.some(item => item.piecesPerUnit > 1) && (
                                                            <th className="px-4 py-2 font-medium text-gray-900">
                                                            Retail Price Piece
                                                            </th>
                                                        )}    
                                                        <th className="px-4 py-2 font-medium text-gray-900">
                                                        Wholesale Price Unit
                                                        </th>
                                                        {items.some(item => item.piecesPerUnit > 1) && ( 
                                                        <th className="px-4 py-2 font-medium text-gray-900">
                                                        Wholesale Price Piece 
                                                        </th>
                                                        )}
                                                        <th className="px-4 py-2 font-medium text-gray-900">
                                                        Sale Price Unit
                                                        </th>
                                                        {items.some(item => item.piecesPerUnit > 1) && (
                                                            <th className="px-4 py-2 font-medium text-gray-900">
                                                            Sale Price Piece 
                                                            </th>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 text-center">
                                                    <tr>
                                                        <td className="px-4 py-2 ">
                                                            <input value={item.costUnit} onChange={(e) => periceMenuOnChange(e, item.product_id)} name='costUnit' className='w-16 remove-arrow rounded-md border-[#50B426] border-2' type='number'pattern="[0-9]+([\.,][0-9]+)?" step="0.01"/>
                                                        </td>
                                                        {items.some(item => item.piecesPerUnit > 1) && (
                                                            <td className="px-4 py-2">
                                                                <input value={item.costPiece} onChange={(e) => periceMenuOnChange(e, item.product_id)} name='costPiece' className='w-16 remove-arrow rounded-md border-[#50B426] border-2' type='number' pattern="[0-9]+([\.,][0-9]+)?" step="0.01"/>
                                                            </td>
                                                        )}
                                                        <td className="px-4 py-2">
                                                            <input value={item.retailPriceUnit} onChange={(e) => periceMenuOnChange(e, item.product_id)} name='retailPriceUnit' className='w-16 remove-arrow rounded-md border-[#50B426] border-2' type='number' pattern="[0-9]+([\.,][0-9]+)?" step="0.01"/>   
                                                        </td>
                                                        {items.some(item => item.piecesPerUnit > 1) && (
                                                            <td className="px-4 py-2">
                                                                <input value={item.retailPricePiece} onChange={(e) => periceMenuOnChange(e, item.product_id)} name='retailPricePiece' className='w-16 remove-arrow rounded-md border-[#50B426] border-2' type='number' pattern="[0-9]+([\.,][0-9]+)?" step="0.01"/>
                                                            </td>
                                                        )}
                                                        <td className="px-4 py-2">
                                                            <input value={item.wholeSalePriceUnit} onChange={(e) => periceMenuOnChange(e, item.product_id)} name='wholeSalePriceUnit' className='w-16 remove-arrow rounded-md border-[#50B426] border-2' type='number' pattern="[0-9]+([\.,][0-9]+)?" step="0.01"/>
                                                        </td>
                                                        {items.some(item => item.piecesPerUnit > 1) && (
                                                            <td className="px-4 py-2">
                                                                <input value={item.wholeSalePricePiece} onChange={(e) => periceMenuOnChange(e, item.product_id)} name='wholeSalePricePiece' className='w-16 remove-arrow rounded-md border-[#50B426] border-2' type='number' pattern="[0-9]+([\.,][0-9]+)?" step="0.01"/>
                                                            </td>
                                                        )}
                                                        <td className="px-4 py-2">
                                                            <input value={item.salePriceUnit} onChange={(e) => periceMenuOnChange(e, item.product_id)} name='salePriceUnit' className='w-16 remove-arrow rounded-md border-[#50B426] border-2' type='number' pattern="[0-9]+([\.,][0-9]+)?" step="0.01"/>
                                                        </td>
                                                        {items.some(item => item.piecesPerUnit > 1) && (
                                                            <td className="px-4 py-2">
                                                                <input value={item.salePricePeice} onChange={(e) => periceMenuOnChange(e, item.product_id)} name='salePricePeice' className='w-16 remove-arrow rounded-md border-[#50B426] border-2' type='number' pattern="[0-9]+([\.,][0-9]+)?" step="0.01"/>
                                                            </td>
                                                        )}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    }
                                </td>
                                {items.some(item => item.piecesPerUnit > 1) && (
                                    <td className="font-bold text-[#50B426]">
                                        <div className='flex items-center justify-center ml-2'>
                                            <span className='mr-1 text-[1.1rem]'>${item.costPiece}</span> <MdOutlineEdit onClick={() => setPriceMenu(item.product_id)}  className='text-[1.2rem] text-purple-600 cursor-pointer'/>
                                        </div>
                                    </td>
                                )}
                                <td className="px-4 py-2 text-red-500 cursor-pointer text-xl">
                                    <div onClick={() => handleRemoveItemFromItems(item)} className='flex justify-center hover:bg-slate-200 hover:rounded-full p-2'>
                                        <MdOutlineDelete  className='cursor-pointer hover:scale-110' />
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-[#50B426]  text-xl">
                                    <div  onClick={() => { setShowMeasurementPopUp(true); setItemsUnits(item.unitOfMeasurement); setSelectedItem(item.product_id)}} className='flex justify-center cursor-pointer hover:bg-slate-200 hover:rounded-full p-2'>
                                        <TbRulerMeasure  className='cursor-pointer hover:scale-110'/>
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
                </div>
                <div className='w-full h-50 bg-slate-200 rounded-lg p-4 flex '>
                    <div className=' w-1/2'>
                        <h4 className='font-bold'>Invoice Items Information</h4>
                        <div className='text-[0.9rem] italic'>All new items will be added to the store inventory</div>
                        <div className='flex justify-center items-center mt-8 gap-2 text-[1.4rem] font-bold'>
                            <div className='font-bold'>Total New Qty:</div>
                            <span className='text-[#35ad25] text-[1.6rem]'>{totalQty}</span>
                        </div>
                        <h5 className='text-[0.9rem] mt-5'>When adjusting prices, it's imperative to acknowledge that such changes render existing inventory as <span className='font-bold'>'old inventory.'</span></h5>
                    </div>
                    <div className='flex flex-col gap-4 justify-center items-center w-1/2'>
                        <h5>How would you prefer to manage old inventory?</h5>
                        <button 
                            onClick={() => setOldInventoryStatus('sell-this-on-old-price')} 
                            type='button' 
                            className={` ${oldInventoryStatus === 'sell-this-on-old-price' ? 'bg-[#35ad25] text-white' : 'bg-white text-[#35ad25]'}  w-64 rounded-lg h-10 border-2 border-[#34ad25] hover:bg-green-400`}
                        >
                            Sell Old On Old Price
                        </button>
                        <button 
                            type='button' 
                            onClick={() => setOldInventoryStatus('sell-on-old-price')} 
                            className={` ${oldInventoryStatus === 'sell-on-old-price' ? 'bg-[#35ad25] text-white' : 'bg-white text-[#35ad25]'}  w-64 rounded-lg h-10 border-2 border-[#34ad25] hover:bg-green-400`}
                        >
                            Sell Old & New On Old Price
                        </button>
                        <button 
                            type='button' 
                            onClick={() => setOldInventoryStatus('sell-on-new-price')} 
                            className={` ${oldInventoryStatus === 'sell-on-new-price' ? 'bg-[#35ad25] text-white' : 'bg-white text-[#35ad25]'}  w-64 rounded-lg h-10 border-2 border-[#34ad25] hover:bg-green-400`}
                        >
                            Sell Old On New Price
                        </button>
                    </div>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="totalAmount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalAmount} readOnly disabled type="number" id="totalAmount" placeholder="totalAmount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Actual Total Cost
                        </span>
                    </label>
                    <label htmlFor="itemsDiscount" className="relative block overflow-hidden w-full ring-[#50B426] ring-2  rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={extraDiscount} onChange={(e) => setExtraDiscount(e.target.value)} type="number" id="itemsDiscount" placeholder="itemsDiscount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Extra Discount
                        </span>
                    </label>
                    <label htmlFor="customerDiscount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalToPay} readOnly disabled  type="number" id="customerDiscount" placeholder="customerDiscount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total To Pay
                        </span>
                    </label>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="totalAmount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 ring-[#50B426] ring-2 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalPaid} onChange={(e) => setTotalPaid(e.target.value)} type="number" id="totalAmount" placeholder="totalAmount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Paid
                        </span>
                    </label>
                    <label htmlFor="itemsDiscount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={totalDue} readOnly disabled  type="number" id="itemsDiscount" placeholder="itemsDiscount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Due
                        </span>
                    </label>
                    <div className='w-[50rem] flex flex-col gap-1 border-2 border-[#35ad25] p-1 rounded-md'>
                        <div className='flex items-center gap-2 font-bold'>
                            <div>Discount Percentage:</div>
                            <div className='text-[#35ad25]'>{((extraDiscount/totalAmount) * 100).toFixed(2)}%</div>
                        </div>
                        <div className='flex items-center gap-2 font-bold'>
                            <div>Discount Percentage:</div>
                            <div className='text-[#35ad25]'>2%</div>
                        </div>
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
                <button type='submit' className={` ${false ? 'bg-gray-300 text-gray-200': 'text-[#50B426] border-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]' } flex gap-4 justify-center rounded border w-full  px-12 py-4 text-sm font-medium`}>
                    {false && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>}
                    {false ? 'Confirm Edits' : 'Submit Invoice' }
                </button>
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
                        cost={true}
                    />
                }
            </form>
        </section>
    )
}
