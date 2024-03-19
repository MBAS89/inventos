import React, { useEffect, useState } from 'react'
import { BiSearch } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";
import { TbRulerMeasure } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import { useProductSearchHelperQuery } from '../../features/api/sales/innerInvoicesApiSlice';
import { TableHead } from '../TableHead';
import { MeasurementPopUp } from './MeasurementPopUp';
import { MdOutlineEdit } from "react-icons/md";


export const AddAndEditOuterInvoicePopup = ({setOpenPopup, setEditMode, editMode}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const { data:search, isLoading } = useProductSearchHelperQuery({searchQuery},'productSearchHelper')

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
                        costUnit:search.product.cost_unit,
                        costPiece:search.product.cost_piece ? search.product.cost_piece : search.product.cost_unit,
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
                costUnit:product.cost_unit,
                costPiece:product.cost_piece ? product.cost_piece : product.cost_unit,
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

    const handleCostChange = (e, productId) => {

        if(e.target.name === "costUnit"){
            setItems(previousState => {
                const index = previousState.findIndex(item => item.product_id === productId);
                if (index !== -1) {
                    if(e.target.value !== previousState.costUnit){
                        const updatedState = [...previousState];
                        updatedState[index] = {
                            ...updatedState[index],
                            costUnit: e.target.value
                        };
                        return updatedState;
                    }
                }
                return previousState;
            })
        }else{
            setItems(previousState => {
                const index = previousState.findIndex(item => item.product_id === productId);
                if (index !== -1) {
    
                    const updatedState = [...previousState];
                    updatedState[index] = {
                        ...updatedState[index],
                        costPiece: e.target.value
                    };
                    return updatedState;
                }
                return previousState;
            })
        }

    }


    console.log(items)


    return (
        <section className="overflow-auto bg-white left-[13%] top-[7%] h-[50rem] w-[90rem] border-gray-500 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setItems([]); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Outer Invoice' : 'Add Outer Invoice' }</h2>
            <form className='flex flex-col gap-10 w-[70%] mx-auto mt-5 relative'>
                <div className='w-full'>
                    <label htmlFor="Casher" className="block text-sm font-medium text-gray-900">
                    Casher
                    </label>
                    <select className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                        <option disabled>Please select</option>
                    </select>   
                </div>
                <div className='w-full'>
                    <label htmlFor="Casher" className="block text-sm font-medium text-gray-900">
                    Suppier
                    </label>
                    <select className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                        <option disabled>Please select</option>
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
                <div className="overflow-x-auto relative">
                {items.length > 0 ? (
                    <table className="w-full  min-h-[5rem] divide-y-2 divide-gray-200 bg-white text-sm border-2 border-[#35ad25]">
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
                                <th className="px-4 py-2 font-medium text-gray-900">
                                Piece Cost 
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
                                        <span className='mr-1 text-[1.1rem]'>${item.costUnit}</span> <MdOutlineEdit className='text-[1.2rem] text-purple-600 cursor-pointer'/>
                                    </div>
                                </td>
                                <td className="font-bold text-[#50B426]">
                                    <div className='flex items-center justify-center ml-2'>
                                        <span className='mr-1 text-[1.1rem]'>${item.costPiece}</span> <MdOutlineEdit className='text-[1.2rem] text-purple-600 cursor-pointer'/>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-red-500 cursor-pointer text-xl">
                                    <div className='flex justify-center hover:bg-slate-200 hover:rounded-full p-2'>
                                        <MdOutlineDelete onClick={() => handleRemoveItemFromItems(item)} className='cursor-pointer hover:scale-110' />
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
            </form>
        </section>
    )
}
