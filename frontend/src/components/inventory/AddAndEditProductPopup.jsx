import React, { useEffect, useState } from 'react'

//icons
import { AiOutlineCloseCircle } from "react-icons/ai"
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiBarcode } from "react-icons/ci";
import { BiLoaderCircle } from "react-icons/bi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiSolidTrashAlt } from "react-icons/bi";
import { MdAutoFixHigh } from "react-icons/md";




import { DropZone } from '../DropZone'
import { useAddProductMutation, useEditProductMutation, useGenerateSkuMutation, useReadBrandsAndCategoriesQuery, useReadProductQuery } from '../../features/api/inventory/productApiSlice'

import { allUnitsBasedOnCategory } from 'uniti-price-tool'
import { toast } from 'react-toastify';
import { TableHead } from '../TableHead';
import { checkRequiredFields } from '../../functions/checkRequiredFileds';

export const AddAndEditProductPopup = ({ setOpenPopup, editMode, selected, setEditMode, setSelected }) => {       

    const { data:brandsAndCategories, isSuccess } = useReadBrandsAndCategoriesQuery()

    const [showPieceFileds, setShowPieceFileds] = useState(false)

    const [productData, setProductData] = useState({
        productName:'',
        sku:'',
        unit:'',
        unitCatergory:'',
        unitValue:'',
        costUnit:'',
        retailUnitPrice:'',
        wholesaleUnitPrice:'',
        piecesPerUnit:'',
        unitOfMeasurement:[],
        pieceCost:'',
        retailPiece:'',
        wholesalePiece:'',
        qty:'',
        unitSalePrice:'',
        pieceSalePrice:'',
        onSale:false,
        description:'',
        brand:'',
        category:''
    })

    const { productName, sku, unit, unitCatergory,
        unitValue, costUnit, retailUnitPrice, wholesaleUnitPrice,
        piecesPerUnit, pieceCost, retailPiece, wholesalePiece,
        qty, unitSalePrice, pieceSalePrice, onSale, description, 
        brand, category, unitOfMeasurement
    } = productData


    useEffect(() => {
        if(unit === "pcs"){
            setShowPieceFileds(true)
            setProductData((prevState) => ({
                ...prevState,
                unitValue:1,
                pieceCost:costUnit,
                retailPiece:retailUnitPrice,
                wholesalePiece:wholesaleUnitPrice,
                piecesPerUnit:1
            }));
        }else if(unit === "pk" || unit === "set" || unit === "box" || unit === "carton"){
            setShowPieceFileds(true)
            setProductData((prevState) => ({
                ...prevState,
                unitValue:1,
                pieceCost:costUnit/piecesPerUnit,
                retailPiece:retailUnitPrice/piecesPerUnit,
                wholesalePiece:wholesaleUnitPrice/piecesPerUnit,
                qty:piecesPerUnit
            }));
        }else if(unit === "cart" || unit === "bag" || unit === "pieces"){
            setShowPieceFileds(true)
        }else{
            setShowPieceFileds(false)
            setProductData((prevState) => ({
                ...prevState,
                unitValue:1,
            }));
        }
    },[unit, costUnit, retailUnitPrice, wholesaleUnitPrice, piecesPerUnit])

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

    const [generateSku, {isLoading:generateSkuLoading}] = useGenerateSkuMutation()
    const [genrateDisabled, setGenrateDisabled] = useState(false)
    const [countdown, setCountdown] = useState(60); 

    const handleGenrateSku = (main) => async () => {
        try {
            const res = await generateSku().unwrap()
            toast.success('SKU Generated')

            if(main){
                setProductData((prevState) => ({
                    ...prevState,
                    sku: res.newSKU,
                }));
            }else{
                setCustomUnitData((prevState) => ({
                    ...prevState,
                    sku: res.newSKU,
                }));
            }

            setGenrateDisabled(true)

            setTimeout(() => {
                setGenrateDisabled(false);
                setCountdown(60);
            }, 60000);

        } catch (error) {
            toast.error(error.data.error)
        }
    }

    useEffect(() => {
        let timer;
        if (genrateDisabled) {
            timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
    return () => clearInterval(timer);
    }, [genrateDisabled]);

    const [showCustomUnitsFileds, setShowCustomUnitsFileds] = useState(false)

    const [customUnitData, setCustomUnitData] = useState({
        name:'',
        sku:'',
        pieces:''
    })

    const onCustomChange = (e) => {
        setCustomUnitData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleAddCustomUnit = () => {
        setProductData(prevState => ({
            ...prevState,
            unitOfMeasurement: [
                ...(prevState?.unitOfMeasurement || []),
                customUnitData
            ]
        }));

        setCustomUnitData({
            name:'',
            sku:'',
            pieces:''
        })

        setShowCustomUnitsFileds(false)
    }

    const handleRemoveCustomunit = (indexToRemove) => () => {
        setProductData(prevState => ({
            ...prevState,
            unitOfMeasurement: prevState.unitOfMeasurement.filter((_, index) => index !== indexToRemove)
        }));
    }


    const headItems = [
        {
            title:"Name",
        },{
            title:"Sku"
        },{
            title:"Pieces"
        },{
            title:"Action"
        }
    ]

    const [addProduct, {isLoading, error}] = useAddProductMutation()

    const handleAddProdcut = async (e) => {
        e.preventDefault()

        const requiredFileds = ['productName', 'sku', 'unit', 'unitCatergory','costUnit', 
            'retailUnitPrice', 'wholesaleUnitPrice','qty' 
        ]

        const notEmpty = checkRequiredFields(productData, requiredFileds)

        if(notEmpty || !file){
            return toast.error(notEmpty || 'Missing Image Please Upload image!')
        }

        const payload = {
            file,
            productName,
            sku,
            unit,
            unitCatergory,
            unitValue,
            costUnit,
            retailUnitPrice,
            wholesaleUnitPrice,
            piecesPerUnit,
            unitOfMeasurement,
            pieceCost,
            retailPiece,
            wholesalePiece,
            qty,
            unitSalePrice,
            pieceSalePrice,
            onSale,
            description,
            brand,
            category
        }

        try {
            const res = await addProduct(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setProductData({
                productName:'',
                sku:'',
                unit:'',
                unitCatergory:'',
                unitValue:'',
                costUnit:'',
                retailUnitPrice:'',
                wholesaleUnitPrice:'',
                piecesPerUnit:'',
                unitOfMeasurement:[],
                pieceCost:'',
                retailPiece:'',
                wholesalePiece:'',
                qty:'',
                unitSalePrice:'',
                pieceSalePrice:'',
                onSale:false,
                description:'',
                brand:'',
                category:''
            })
            setOpenPopup(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }

    }


    const { data, isLoading: isdataLoading } = editMode 
    ? useReadProductQuery({productId: selected[Object.keys(selected)[0]]}, 'readProduct')
    : { data: null, isLoading: false };

    useEffect(() => {
        if(data){    
            setFile(perviousState => ({
                ...perviousState,
                imageUrl:data.product.image
            }))
    
            setProductData(perviousState => ({
                ...perviousState,
                productName:data.product.name,
                sku:data.product.sku,
                unit:data.product.unit,
                unitCatergory:data.product.unit_catergory,
                unitValue:data.product.unit_value,
                costUnit:data.product.cost_unit,
                retailUnitPrice:data.product.retail_price_unit,
                wholesaleUnitPrice:data.product.wholesale_price_unit,
                piecesPerUnit:data.product.pieces_per_unit,
                unitOfMeasurement:data.product.unit_of_measurement,
                pieceCost:data.product.cost_piece,
                retailPiece:data.product.retail_price_piece,
                wholesalePiece:data.product.wholesale_price_piece,
                qty:data.product.qty,
                unitSalePrice:data.product.sale_price_unit,
                pieceSalePrice:data.product.sale_price_piece,
                onSale:data.product.on_sale,
                description:data.product.description,
                brand:data.product.brand_id,
                category:data.product.store_id
            }))
        }
    },[editMode, data])

    const [editProduct, {isLoading:isEditLoading , error:editError}] = useEditProductMutation()

    const handleEditProduct = async (e) => {
        e.preventDefault()

        const requiredFileds = ['productName', 'sku', 'unit', 'unitCatergory','costUnit', 
            'retailUnitPrice', 'wholesaleUnitPrice','qty' 
        ]

        const notEmpty = checkRequiredFields(productData, requiredFileds)

        if(notEmpty || !file){
            return toast.error(notEmpty || 'Missing Image Please Upload image!')
        }

        const payload = {
            file,
            productName,
            sku,
            unit,
            unitCatergory,
            unitValue,
            costUnit,
            retailUnitPrice,
            wholesaleUnitPrice,
            piecesPerUnit,
            unitOfMeasurement,
            pieceCost,
            retailPiece,
            wholesalePiece,
            qty,
            unitSalePrice,
            pieceSalePrice,
            onSale,
            description,
            brand,
            category,
            productId:data.product.product_id
        }


        try {
            const res = await editProduct(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setProductData({
                productName:'',
                sku:'',
                unit:'',
                unitCatergory:'',
                unitValue:'',
                costUnit:'',
                retailUnitPrice:'',
                wholesaleUnitPrice:'',
                piecesPerUnit:'',
                unitOfMeasurement:[],
                pieceCost:'',
                retailPiece:'',
                wholesalePiece:'',
                qty:'',
                unitSalePrice:'',
                pieceSalePrice:'',
                onSale:false,
                description:'',
                brand:'',
                category:''
            })
            setEditMode(false)
            setOpenPopup(false); 
            setSelected('')
        } catch (error) {
            toast.error(error.data.error)
        }
    }


    return (
        <section className="overflow-auto bg-white left-[20%] top-[7%] h-[50rem] w-[70rem] border-gray-500 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>
                {editMode ?'Edit Product' :'Add Product'}
            </h2>
            <form onSubmit={editMode ? handleEditProduct : handleAddProdcut} className='flex flex-col gap-10 w-[70%] mx-auto mt-5'>
                <DropZone setFile={setFile} file={file} className="border-[2px] border-dashed py-8 border-[#50B426] cursor-pointer w-[60%] text-center px-2" />
                <label htmlFor="productName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={productName} onChange={onChange} type="text" id="productName" placeholder='' name="productName"  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Product Name
                    </span>
                </label>
                <div className='flex items-center gap-2'>
                    <label htmlFor="sku" className="relative w-[70%] block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={sku} onChange={onChange} type="text" id="sku" name='sku' placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Sku
                        </span>
                    </label>
                    <div className={`flex items-center gap-2 w-[30%]`}>
                        <button disabled={genrateDisabled} type="button" onClick={handleGenrateSku(true)} className={` ${!sku ? 'w-[100%]' : 'w-[90%]'} ${genrateDisabled ? 'bg-gray-300' : 'bg-[#50B426] hover:bg-[#80e057]' }  flex gap-1 items-center  text-white p-4 rounded-md`}>
                            {generateSkuLoading &&
                                <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                            }
                            {!generateSkuLoading ? genrateDisabled ? `Disabled (${countdown}) ` : 'Generate SKU' : 'Genrating..'} 
                        </button>
                        {sku && (
                            <button className='bg-[#50B426] hover:bg-[#80e057] text-white p-3 rounded-md'>
                                <CiBarcode className='text-[2rem]'/>
                            </button>
                        )}
                    </div>
                </div>

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
                            <option value="Others">Others</option>
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
                <div className='bg-slate-200 h-10 w-full flex rounded-md justify-evenly items-center px-5'>
                    <div className='flex justify-center gap-6'>
                        <div className='capitalize'>estimated unit profit:</div>
                        <div className={`font-bold ${retailUnitPrice - costUnit > 0 ? 'text-[#50B426]' :'text-red-400'}`}>{(retailUnitPrice - costUnit).toFixed(2)}</div>
                    </div>
                    <div className='flex justify-center gap-6'>
                        <div>estimated unit profit percentage:</div>
                        <div className={`font-bold ${((retailUnitPrice - costUnit) / costUnit) * 100 > 0 ? 'text-[#50B426]' :'text-red-400'}`}>{(((retailUnitPrice - costUnit) / costUnit) * 100).toFixed(2)}%</div>
                    </div>
                </div>
                <div className='bg-slate-200 h-10 w-full flex rounded-md justify-evenly items-center px-5'>
                    <div className='flex justify-center gap-6'>
                        <div>estimated piece profit:</div>
                        <div className={`font-bold ${retailPiece - pieceCost > 0 ? 'text-[#50B426]' :'text-red-400'}`}>{(retailPiece - pieceCost).toFixed(2)}</div>
                    </div>
                    <div className='flex justify-center gap-6'> 
                        <div>estimated piece profit percentage:</div>
                        <div className={`font-bold ${((retailPiece - pieceCost) / pieceCost) * 100 > 0 ? 'text-[#50B426]' :'text-red-400'}`}>{(((retailPiece - pieceCost) / pieceCost) * 100).toFixed(2)}%</div>
                    </div>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="unitValue" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input disabled value={unitValue} onChange={onChange} type="number" id="unitValue" name='unitValue'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Unit Value
                        </span>
                    </label>
                    <label htmlFor="costUnit" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={costUnit} onChange={onChange} type="number" id="costUnit" name='costUnit' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Cost unit	
                        </span>
                    </label>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="retailUnitPrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={retailUnitPrice} onChange={onChange} type="number" id="retailUnitPrice" name='retailUnitPrice'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Retail Unit Price
                            </span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="wholesaleUnitPrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={wholesaleUnitPrice} onChange={onChange} type="number" id="wholesaleUnitPrice" name='wholesaleUnitPrice'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Wholesale Unit Price
                            </span>
                        </label>
                    </div>
                </div>
                {showPieceFileds && (
                    <div className='flex items-center w-full gap-4'>
                        <label htmlFor="piecesPerUnit" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={piecesPerUnit ? piecesPerUnit : ''} onChange={onChange} type="number" id="piecesPerUnit" name='piecesPerUnit' placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Pieces Per Unit
                            </span>
                        </label>
                        <label htmlFor="pieceCost" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input  value={pieceCost ? pieceCost : ''} onChange={onChange} type="number" id="pieceCost" name='pieceCost' placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Piece Cost
                            </span>
                        </label>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <label htmlFor="retailPiece" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                <input value={retailPiece ? retailPiece : ''} onChange={onChange} type="number" id="retailPiece" name='retailPiece'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                    Retail Piece
                                </span>
                            </label>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <label htmlFor="wholesalePiece" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                <input value={wholesalePiece ? wholesalePiece : ''} onChange={onChange} type="number" id="wholesalePiece" name='wholesalePiece'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                    Wholesale Piece
                                </span>
                            </label>
                        </div>
                    </div>
                )}
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="qty" className="relative block overflow-hidden w-full rounded-md border-2 border-[#ffa347] px-3 pt-3 shadow-sm focus-within:border-[#ff7045] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={qty} onChange={onChange} type="number" id="qty" name='qty'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Qty
                        </span>
                    </label>
                    <label htmlFor="unitSalePrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input disabled={!onSale} value={unitSalePrice ? unitSalePrice : ''} onChange={onChange} type="number" id="unitSalePrice" name='unitSalePrice' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Unit Sale Price	
                        </span>
                    </label>
                    {showPieceFileds && (
                        <div className='w-full flex flex-col justify-center items-center'>
                            <label htmlFor="pieceSalePrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                <input disabled={!onSale} value={pieceSalePrice ? pieceSalePrice : ''} onChange={onChange} type="number" id="pieceSalePrice" name='pieceSalePrice'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                    Piece Sale Price
                                </span>
                            </label>
                        </div>
                    )}
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
                <div className='border-b-2 border-gray-300 pb-5'>
                    <div className='border-gray-300 border-t-2 flex justify-between'>
                        <h4 className='text-[#50B426] mt-2'>Custom Unit Measurement</h4>
                        {showCustomUnitsFileds ? (
                            <button type="button" onClick={() => setShowCustomUnitsFileds(false)}><IoMdCloseCircleOutline className='text-[1.4rem] text-[#ee5454] hover:scale-110'/></button>
                        ) : (
                            <button type="button" onClick={() => setShowCustomUnitsFileds(true)}><IoMdAddCircleOutline className='text-[1.4rem] text-[#50B426] hover:scale-110'/></button>
                        )}

                    </div>
                    {showCustomUnitsFileds && 
                        <div className='w-[100%] mt-3 rounded-md p-5 h-[30%] bg-slate-200'>
                            <div className='flex items-center w-full gap-4'>
                                <label htmlFor="customUnitName" className="relative bg-white block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                    <input value={customUnitData.name} onChange={onCustomChange} type="text" id="customUnitName" name='name'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                        Name 
                                    </span>
                                </label>
                                <div className='w-full flex items-center'>
                                    <label htmlFor="customUnitSku" className="relative bg-white block w-[60%] overflow-hidden  rounded-tl-md rounded-bl-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                        <input value={customUnitData.sku} onChange={onCustomChange} type="text" id="customUnitSku" name='sku' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                            SKU	
                                        </span>
                                    </label>
                                    <button type='button' onClick={handleGenrateSku(false)} className={`p-5 ${genrateDisabled ? 'bg-gray-300' : 'bg-[#50B426] hover:bg-[#80e057]' } rounded-tr-md rounded-br-md w-[40%] flex items-center justify-center`}>
                                    {!generateSkuLoading ? 
                                        genrateDisabled ? 
                                            `(${countdown}) ` : <MdAutoFixHigh className='text-[1.5rem] cursor-pointer hover:scale-110 text-white'/> 
                                        : <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                    } 
                                    </button>
                                </div>
                                <label htmlFor="custonUnitPecies" className="relative bg-white block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                                    <input value={customUnitData.pieces} onChange={onCustomChange} type="number" id="custonUnitPecies" name='pieces' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                        Pecies	
                                    </span>
                                </label>
                                <button type="button" onClick={handleAddCustomUnit} className='bg-[#50B426] p-4 rounded-md text-white'>
                                    Add
                                </button>
                            </div>
                        </div>
                    }
                    {unitOfMeasurement && unitOfMeasurement.length >= 1 ?
                    <div className=' bg-slate-300 text-center'>
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md mt-4">
                            <thead>
                                <tr>
                                    {headItems.map((item, index) => (
                                        <th key={index}>{item.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 w-full">
                                {unitOfMeasurement && unitOfMeasurement.map((unit, index) => (
                                    <tr key={index} className='cursor-pointer hover:bg-slate-100'>
                                        <td className="px-4 py-2 text-[#0070E0] font-bold">
                                            {unit.name}
                                        </td>
                                        <td className="px-4 py-2 text-[#0070E0] font-bold">
                                            {unit.sku}
                                        </td>
                                        <td className="px-4 py-2 text-[#35ad25] font-bold">
                                            {unit.pieces}
                                        </td>
                                        <td className="flex items-center justify-center h-10">
                                            <BiSolidTrashAlt onClick={handleRemoveCustomunit(index)} className='text-red-400 text-[1.3rem] cursor-pointer hover:scale-125'/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :(
                        <div className='w-full text-center mt-3 text-gray-300'>
                            No Custom Unit Measurement For This Product 
                        </div>
                    )}
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <textarea value={description} onChange={onChange} id="description" name='description' className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-3 focus:outline-none" rows="4" placeholder="Specifications..."></textarea>
                </div>
                <button type='submit' disabled={isLoading} className="flex items-center gap-2 justify-center mb-20 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none focus:ring active:bg-green-500 text-[1.3rem]">
                    {(isLoading || isEditLoading) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ?'Edit Product' :'Add Product'}
                </button>
            </form>
        </section>
    )
}
