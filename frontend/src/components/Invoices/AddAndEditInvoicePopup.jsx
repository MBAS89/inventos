import React from 'react'

//icons
import { BiSearch } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";

import { TableHead } from '../TableHead'

export const AddAndEditInvoicePopup = ({ setOpenPopup }) => {

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

    const data = [
        {
            image:"https://img.icons8.com/dusk/64/kawaii-cupcake.png",
            name:"Takuma Asahi",
            price:200,
            salePrice:180,
            sale:true
           
        },{
            image:"https://img.icons8.com/dusk/64/kawaii-cupcake.png",
            name:"Takuma Asahi",
            price:200,
            salePrice:180,
            sale:true
           
        },{
            image:"https://img.icons8.com/dusk/64/kawaii-cupcake.png",
            name:"Takuma Asahi",
            price:200,
            salePrice:180,
            sale:false
           
        },{
            image:"https://img.icons8.com/dusk/64/kawaii-cupcake.png",
            name:"Takuma Asahi",
            price:200,
            salePrice:180,
            sale:true
           
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

    const items = [
        {
            title:"kakuma organic tutmeric immune booster",
            img:"https://img.icons8.com/dusk/64/peach.png"

        },{
            title:"poped rice special chocolte",
            img:"https://img.icons8.com/dusk/64/tomato.png"
        },{
            title:"halal whole chicken",
            img:"https://img.icons8.com/dusk/64/eggplant.png"
        },{
            title:"flower mushroom",
            img:"https://img.icons8.com/dusk/64/peach.png"
        }
    ]


    return (
        <section className="overflow-auto bg-white left-[32%] top-[7%] h-[50rem] w-[45rem] border-gray-500 border-solid border-[1px] absolute rounded-lg shadow-2xl">
            <div className='relative w-full bg-black'>
                <AiOutlineCloseCircle onClick={() => setOpenPopup(false)} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
            </div>
            <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>Add Invoice</h2>
            <form className='flex flex-col gap-10 w-[70%] mx-auto mt-5 relative'>
                <div className='w-full'>
                        <label htmlFor="Casher" className="block text-sm font-medium text-gray-900">
                        Casher
                        </label>
                        <select name="Casher" id="Casher" className="mt-1.5 h-16 w-full border-[2px] rounded-md border-solid focus:border-[#50B426] text-gray-700 sm:text-sm">
                            <option value="">Please select</option>
                            <option value="JM">John Mayer</option>
                            <option value="SRV">Stevie Ray Vaughn</option>
                            <option value="JH">Jimi Hendrix</option>
                            <option value="BBK">B.B King</option>
                            <option value="AK">Albert King</option>
                            <option value="BG">Buddy Guy</option>
                            <option value="EC">Eric Clapton</option>
                        </select>
                </div>
                <label htmlFor="Sku" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input type="text" id="Sku" placeholder="Full Name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Search item
                    </span>
                    <BiSearch className='text-[2rem] text-gray-500 absolute top-4 right-3 cursor-pointer'/>
                </label>
                {false && 
                    <div className="rounded-2xl border border-blue-100 bg-white absolute top-16 right-0 z-10 p-4 shadow-lg h-[20rem] w-full">
                        <div className="overflow-x-auto px-4">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                                <TableHead headItems={headItems} selectAll={true} dont={true}/>
                                <tbody className="divide-y divide-gray-200">
                                    {data.map((item, index) => (
                                        <tr key={index} className=' cursor-pointer hover:bg-slate-100'>
                                            <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                                <div className=' bg-gray-100 p-1 rounded-md flex items-center justify-center'>
                                                    <img width="40" height="40" src={item.image} alt="nut"/>
                                                </div>
                                                <div>
                                                    <span className='capitalize'>{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-[#0070E0] font-bold">${item.price}</td>
                                            <td className="px-4 py-2 text-gray-700">
                                                {handleOnSaleStatus(item.sale)}
                                            </td>
                                            <td className="px-4 py-2 text-[#35ad25] font-bold">${item.salePrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                <table className="min-w-[94%] divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead>
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
                        Delete
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {items.map((item, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                    <img width="40" height="40" src={item.img} alt="nut"/>
                                </div>
                                <div className='w-[80%]'>
                                    <span className='capitalize'>{item.title}</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <div className="inline-flex items-center justify-center rounded border-[1.8px] border-solid border-gray-300">
                                    <button className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                        <AiOutlineMinus/>
                                    </button>
                                    <span className="h-4 w-px bg-gray-300"></span>
                                    <div>
                                        <input type="number"className="h-8 w-7 rounded border-none bg-transparent font-medium p-0 text-center text-s [-moz-appearance:_textfield] focus:outline-none-inset-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" min="1" value="2" id="PaginationPage"/>
                                    </div>
                                    <span className="h-4 w-px bg-gray-300"></span>
                                    <button className="inline-flex h-8 w-8 items-center justify-center rtl:rotate-180">
                                        <AiOutlinePlus/>
                                    </button>
                                </div>
                            </td>
                            <td className="px-4 py-2 font-bold text-[#50B426]">$150.70</td>
                            <td className="px-4 py-2 text-red-500 cursor-pointer text-xl">
                                <div className='flex justify-center'>
                                    <MdOutlineDelete/>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="SubTotal" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="SubTotal" placeholder="SubTotal" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Sub Total
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
                            Extra Discount
                        </span>
                    </label>
                </div>
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="TotalAmount" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="TotalAmount" placeholder="Total Amount" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Amount
                        </span>
                    </label>
                    <label htmlFor="Totalpaid" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="Totalpaid" placeholder="Totalpaid" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total paid
                        </span>
                    </label>
                    <label htmlFor="TotalDue" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input type="text" id="TotalDue" placeholder="TotalDue" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Total Due	
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

