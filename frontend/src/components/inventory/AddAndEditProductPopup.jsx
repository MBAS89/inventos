import React, { useState } from 'react'

//icons
import { AiOutlineCloseCircle } from "react-icons/ai"

import { DropZone } from '../DropZone'
import { useAddProductMutation, useReadBrandsAndCategoriesQuery, useReadProductQuery } from '../../features/api/inventory/productApiSlice'

import { allUnitsBasedOnCategory } from 'uniti-price-tool'

export const AddAndEditProductPopup = ({ setOpenPopup, editMode, selected, setEditMode, setSelected }) => {       
    const [addProduct, {isLoading, error}] = useAddProductMutation()

    const { data, isLoading: isdataLoading } = editMode 
    ? useReadProductQuery({productId: selected[Object.keys(selected)[0]]}, 'readProduct')
    : { data: null, isLoading: false };

    const { data:brandsAndCategories, isSuccess } = useReadBrandsAndCategoriesQuery()

    console.log(brandsAndCategories)

    const [productData, setProductData] = useState({
        productName:'',
        sku:'',
        price:'',
        retailPrice:'',
        wholesalePrice:'',
        qty:'',
        description:'',
        salePrice:'',
        onSale:false,
        unit:'',
        unitCatergory:'',
        brand:'',
        category:''
    })

    const { productName, sku, price, retailPrice, wholesalePrice, qty, description, salePrice, onSale, unit, unitCatergory, brand, category } = productData

    const [file, setFile] = useState(null)

    const units = allUnitsBasedOnCategory(productData.unitCatergory) 

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // If the input type is checkbox, handle the toggling of onSale
        if (type === 'checkbox') {
            setProductData((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            // For other input types, handle as usual
            setProductData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }


    const handleAddProdcut = async (e) => {
        e.preventDefault()

        const requiredFileds = ['productName', 'sku', 'price', 'retailPrice','wholesalePrice', 'qty', 'unit']
    }




    return (
        <section className="overflow-auto bg-white left-[32%] top-[7%] h-[50rem] w-[45rem] border-gray-500 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => setOpenPopup(false)} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>Add Product</h2>
            <form className='flex flex-col gap-10 w-[70%] mx-auto mt-5'>
                <DropZone setFile={setFile} file={file} className="border-[2px] border-dashed py-8 border-[#50B426] cursor-pointer w-[60%] text-center px-2" />
                <label htmlFor="productName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={productName} onChange={onChange} type="text" id="productName" placeholder='' name="productName"  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Product Name
                    </span>
                </label>
                <label htmlFor="sku" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={sku} onChange={onChange} type="text" id="sku" name='sku' placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Sku
                    </span>
                </label>
                <div className='flex items-center justify-center gap-4'>
                    <div className='w-1/2'>
                        <label htmlFor="unitCatergory" className="block text-sm font-medium text-gray-900">
                            Unit type
                        </label>
                        <select value={unitCatergory} onChange={onChange} name="unitCatergory" id="unitCatergory" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option value="">Please select</option>
                            <option value="Distance">Distance</option>
                            <option value="Area">Area</option>
                            <option value="Mass">Mass</option>
                            <option value="Volume">Volume</option>
                        </select>
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-900">
                            Unit
                        </label>
                        <select value={unit} onChange={onChange} disabled={!productData.unitCatergory} name="unit" id="unit" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option value="">Please select unit type</option>
                            {typeof units !== 'string' && units.map((unit, index) => (
                                <option key={index} value={unit.unit}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="price" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={price} onChange={onChange} type="text" id="price" name='price' placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Price unit
                        </span>
                    </label>
                    <label htmlFor="RetailPrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={retailPrice} onChange={onChange} type="text" id="RetailPrice" name='retailPrice' placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Retail Price unit
                        </span>
                    </label>
                    <label htmlFor="wholesalePrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={wholesalePrice} onChange={onChange} type="text" id="wholesalePrice" name='wholesalePrice' placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Wholesale Price unit
                        </span>
                    </label>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="qty" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={qty} onChange={onChange} type="text" id="qty" name='qty'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Unit Value
                        </span>
                    </label>
                    <label htmlFor="salePrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={salePrice} onChange={onChange} type="text" id="salePrice" name='salePrice' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Pieces per unit	
                        </span>
                    </label>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="qty" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={qty} onChange={onChange} type="text" id="qty" name='qty'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                price per piece
                            </span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="qty" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={qty} onChange={onChange} type="text" id="qty" name='qty'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Qty
                        </span>
                    </label>
                    <label htmlFor="salePrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={salePrice} onChange={onChange} type="text" id="salePrice" name='salePrice' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Sale Price	
                        </span>
                    </label>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <span>On Sale?</span>
                        <label htmlFor="onSale" className="relative h-8 w-14 cursor-pointer">
                            <input value={onSale} onChange={onChange} type="checkbox" name='onSale' id="onSale" className="peer sr-only" />
                            <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
                            <span className="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
                        </label>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-4'>
                    <div className='w-1/2'>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                            Category
                        </label>
                        <select value={category} onChange={onChange} name="category" id="category" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option value="">Please select</option>
                            {isSuccess && brandsAndCategories.categories.map((category) => (
                                <option key={category.category_id} value={category.category_id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-900">
                            Brand
                        </label>
                        <select value={brand} onChange={onChange} name="brand" id="brand" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option value="">Please select</option>
                            {isSuccess && brandsAndCategories.brands.map((brand) => (
                                <option key={brand.brand_id} value={brand.brand_id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <textarea value={description} onChange={onChange} id="description" name='description' className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-3 focus:outline-none" rows="4" placeholder="Specifications..."></textarea>
                </div>
                <button className="inline-block mb-20 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]">Add Product</button>
            </form>
        </section>
    )
}
