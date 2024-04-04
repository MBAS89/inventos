import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { unitiCalculator, allUnitsBasedOnCategory  } from 'uniti-price-tool'

export const MeasurementPopUp = ({ setShowMeasurementPopUp, unitOfMeasurement, setItemsUnits, handleUsingCustomUnits, setSelectedItem, items, selectedItem, handleAddCustomMeasure, cost, casher }) => {
    const item = items.filter(item => item.product_id === selectedItem)

    const allUits = allUnitsBasedOnCategory(item[0].unitCategory)

    const [newUnit, setNewUnit] = useState('')
    const [newQty, setNewQty] = useState(0)

    const result = unitiCalculator(item[0].unitCategory, item[0].unit, item[0].cost ? item[0].cost : item[0].price, newUnit, newQty, 2);

    return (
    <div className={`absolute w-[80%] ${casher ? 'top-10 left-20' : '-top-20 right-20'}  rounded-lg p-5 z-10 shadow-lg shadow-slate-300  bg-white min-h-[10rem] border-2 border-gray-800`}>
        <div className='relative w-full bg-black'>
            <AiOutlineCloseCircle onClick={() => {setShowMeasurementPopUp(false); setItemsUnits([]); setSelectedItem('')}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-1 top-1'/>
        </div>
        <h2 className='text-center text-gray-500 font-bold mt-2'>Unit Measurement helper</h2>
        <div className='mt-4'>
            <h4 className='capitalize text-gray-500'>Item Custom Unit Measurement</h4>
            <hr />
            <div className='mt-5 flex flex-wrap gap-3'>
                {unitOfMeasurement.length > 0 ? (
                    unitOfMeasurement.map((unit) => (
                        <span onClick={() => handleUsingCustomUnits(unit)} className='bg-[#50B426] cursor-pointer hover:bg-[#699855] hover:scale-105 text-white px-4 p-2 text-[0.9rem] rounded-full'>{unit.name}</span>
                    ))
                ) : (
                    <span className='italic text-gray-400'>No Custom Unit For This Item</span>
                )}
            </div>
        </div>
        {item[0].unitCategory !== "Others" && 
            <div className='mt-8'>
                <h4 className='capitalize text-gray-500'>Custom Calculation</h4>
                <hr />
                <div className='mt-5 flex gap-3'>
                    <label htmlFor="unit" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={item[0].unit} readOnly disabled type="text" id='unit' placeholder="unit" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Unit
                        </span>
                    </label>
                    <label htmlFor="pricePerUnit" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={item[0].cost} readOnly disabled type="text" id='pricePerUnit' placeholder="pricePerUnit" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            {item[0].cost ? 'Cost Per unit' : 'Price Per unit'}
                        </span>
                    </label>
                    <div className='w-full'>
                        <select value={newUnit}  onChange={(e) => setNewUnit(e.target.value)} name="Status" id="Status" className="h-16 w-full  rounded-md border-3 border-[#50B426] focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option value="" disabled>New Unit</option>
                            {allUits.map((unit) => (
                                <option value={unit.unit}>{unit.name}</option>
                            ))}

                            <option value="partially">Partially</option>
                        </select>
                    </div>
                    <label htmlFor="newUnitQty" className="relative block overflow-hidden w-full rounded-md border  border-3 border-[#50B426] px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={newQty} onChange={(e) => setNewQty(e.target.value)} type="number" id='newUnitQty' placeholder="newUnitQty" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            New Unit Qty
                        </span>
                    </label>
                </div>
                <h5 className='capitalize mt-4 text-gray-500'>Result:</h5>
                <hr />
                <div className='flex flex-col gap-2 mt-4'>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='flex gap-3 items-center'>
                            <div className='text-gray-600 font-bold'>Qty:</div>
                            <div className=' font-bold'>{result.qty}</div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className='text-gray-600 font-bold'>Price:</div>
                            <div className=' font-bold'>{result.totalPrice}</div>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <div className='text-[0.9rem] font-bold'>{result.resultDescription}</div>
                    </div>
                </div>
                <div className='mt-4'>
                    <button type='button' onClick={() => handleAddCustomMeasure(result)} className='text-white bg-[#50B426] w-full py-4 rounded-lg hover:bg-[#87cf68]'>Add Qty To Item</button>
                </div>
            </div>
        }
    </div>
  )
}
