import React, { useEffect, useState } from 'react'

//icons
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from 'react-icons/bi'

//redux
import { useEditPlanMutation, useReadPlanQuery, useAddPlanMutation } from '../../../features/api/plnas/plansApiSlice'

//toast error handling
import { toast } from 'react-toastify'

//Reusable Funtions
import { checkRequiredFields } from '../../../functions/checkRequiredFileds'


export const AddEditPlanPopUp = ({ setOpenPopup, editMode, selected, setEditMode, setSelected }) => {

    const [planData, setPlanData] = useState({
        name:'',
        description:'',
        customers:'',
        suppliers:'',
        categories:'',
        brands:'',
        products:'',
        employees:'',
        expenses:'',
        innerInvoices:'',
        outerInvoices:'',
        price:'',
        onSale:false,
        salePrice:''
    })

    const { 
        name, description, customers, suppliers, categories, 
        brands, products, employees, expenses, innerInvoices, 
        outerInvoices, price, onSale, salePrice
    } = planData


    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // If the input type is checkbox, handle the toggling of onSale
        if (type === 'checkbox') {
            setPlanData((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            // For other input types, handle as usual
            setPlanData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }

    const [addPlan, {isLoading, error}] = useAddPlanMutation()
    
    const handleAddPlan = async (e) => {
        e.preventDefault()

        const requiredFileds = ['name', 'description', 'customers', 'suppliers','categories', 
            'brands', 'products','employees','expenses', 'innerInvoices', 'outerInvoices', 'price' 
        ]

        const notEmpty = checkRequiredFields(planData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        const payload = {
            name, description, customers, suppliers, categories, 
            brands, products, employees, expenses, innerInvoices, 
            outerInvoices, price, onSale, salePrice
        }

        try {
            const res = await addPlan(payload).unwrap()
            toast.success(res.message)
            setPlanData({
                name:'',
                description:'',
                customers:'',
                suppliers:'',
                categories:'',
                brands:'',
                products:'',
                employees:'',
                expenses:'',
                innerInvoices:'',
                outerInvoices:'',
                price:'',
                onSale:false,
                salePrice:''
            })
            setOpenPopup(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const { data, isLoading: isdataLoading } = editMode 
    ? useReadPlanQuery({planId: selected[Object.keys(selected)[0]]}, 'readPlan')
    : { data: null, isLoading: false };

    useEffect(() => {
        if(data){   
    
            setPlanData(perviousState => ({
                ...perviousState,
                name:data.plan.name,
                description:data.plan.description,
                customers:data.plan.customers,
                suppliers:data.plan.suppliers,
                categories:data.plan.categories,
                brands:data.plan.brands,
                products:data.plan.products,
                employees:data.plan.employees,
                expenses:data.plan.expenses,
                innerInvoices:data.plan.inner_invoices,
                outerInvoices:data.plan.outer_invoices,
                price:data.plan.price,
                onSale:data.plan.on_sale,
                salePrice:data.plan.sale_price
            }))
        }
    },[editMode, data])


    const [editPlan, {isLoading:isEditLoading , error:editError}] = useEditPlanMutation()

    const handleEditPlan = async (e) => {
        e.preventDefault()

        const requiredFileds = ['name', 'description', 'customers', 'suppliers','categories', 
            'brands', 'products','employees','expenses', 'innerInvoices', 'outerInvoices', 'price' 
        ]

        const notEmpty = checkRequiredFields(planData, requiredFileds)

        if(notEmpty){
            return toast.error(notEmpty)
        }

        const payload = {
            name, description, customers, suppliers, categories, 
            brands, products, employees, expenses, innerInvoices, 
            outerInvoices, price, onSale, salePrice, planId:data.plan.id
        }

        try {
            const res = await editPlan(payload).unwrap()
            toast.success(res.message)
            setPlanData({
                name:'',
                description:'',
                customers:'',
                suppliers:'',
                categories:'',
                brands:'',
                products:'',
                employees:'',
                expenses:'',
                innerInvoices:'',
                outerInvoices:'',
                price:'',
                onSale:false,
                salePrice:''
            })
            setOpenPopup(false)
            setSelected('')
            setEditMode(false)
        } catch (error) {
            toast.error(error.data.error)
        }
    }
    
    return (
        <section className="overflow-auto bg-white left-[23%] pb-16 top-[10%] h-[48rem] w-[66rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => {setOpenPopup(false); setEditMode(false)}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Plan' : 'Add Plan'}</h2>
            <form onSubmit={editMode ? handleEditPlan : handleAddPlan} className='flex flex-col gap-8 w-[80%] mx-auto mt-5'>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="name" className="relative block overflow-hidden w-full rounded-md border border-gray-300 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={name} onChange={onChange} name='name' type="text" id="name" placeholder="name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Name
                        </span>
                    </label>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="customers" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={customers} onChange={onChange} type="number" id="customers" name='customers'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Customers
                        </span>
                    </label>
                    <label htmlFor="suppliers" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={suppliers} onChange={onChange} type="number" id="suppliers" name='suppliers' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Suppliers
                        </span>
                    </label>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="categories" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={categories} onChange={onChange} type="number" id="categories" name='categories'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Categories
                            </span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="brands" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={brands} onChange={onChange} type="number" id="brands" name='brands'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Brands
                            </span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="products" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={products} onChange={onChange} type="number" id="products" name='products'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Products
                            </span>
                        </label>
                    </div>
                </div>

                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="employees" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={employees} onChange={onChange} type="number" id="employees" name='employees'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Employees
                        </span>
                    </label>
                    <label htmlFor="expenses" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={expenses} onChange={onChange} type="number" id="expenses" name='expenses' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Expenses
                        </span>
                    </label>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="innerInvoices" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={innerInvoices} onChange={onChange} type="number" id="innerInvoices" name='innerInvoices'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Innner Invoices
                            </span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <label htmlFor="outerInvoices" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={outerInvoices} onChange={onChange} type="number" id="outerInvoices" name='outerInvoices'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute capitalize start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                outer invoices
                            </span>
                        </label>
                    </div>
                </div>

                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="price" className="relative block overflow-hidden w-full rounded-md border-2 border-[#ffa347] px-3 pt-3 shadow-sm focus-within:border-[#ff7045] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={price} onChange={onChange} type="number" id="price" name='price'  placeholder='' className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Price
                        </span>
                    </label>
                    <label htmlFor="salePrice" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={salePrice} onChange={onChange} disabled={!onSale} type="number" id="salePrice" name='salePrice' placeholder=''  className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Sale Price
                        </span>
                    </label>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <span>On Sale?</span>
                        <label htmlFor="onSale" className="relative h-8 w-14 cursor-pointer">
                            <input checked={onSale} onChange={onChange} type="checkbox" name='onSale' id="onSale" className="peer sr-only" />
                            <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
                            <span className="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
                        </label>
                    </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <textarea value={description} onChange={onChange} id="description" name='description' className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-3 focus:outline-none" rows="4" placeholder="Description..."></textarea>
                </div>

                <button type='submit' disabled={isLoading || isEditLoading} className="flex items-center justify-center gap-3 rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none active:bg-green-500 text-[1.3rem]">
                    { isLoading || isEditLoading  && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ?'Edit Plan' :'Add Plan'}
                </button>
            </form>
        </section>
    )
}
