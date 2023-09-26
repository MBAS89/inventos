import React from 'react'
import { BsPeopleFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import {AiOutlineMinus, AiOutlinePlus, AiOutlineCheckCircle, AiOutlineEye, AiOutlinePoweroff} from "react-icons/ai";
import { GrEdit } from 'react-icons/gr'
import { CustomersPopup } from './CustomersPopup';
export const BilingSection = () => {

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
    <div>
        
        <div className='flex justify-between p-5 relative'>
            <h1 className='capitalize font-bold text-lg'>biling section</h1>
            <button className='flex items-center gap-2 text-[#50B426] border-[#50B426] border-solid border-[1px] py-2 px-3 text-sm font-medium rounded capitalize hover:bg-[#50B426] hover:text-white'>
                <BsPeopleFill/>
                <p>customer</p>
            </button>
            {false && 
                <CustomersPopup />
            }
        </div>
        <div className='flex justify-between py-2 px-5'>
            <div className='flex items-center gap-3 font-bold '>
                <div className=' bg-gray-100 p-1 rounded-md flex items-center justify-center'>
                    <img width="40" height="40" src="https://img.icons8.com/dusk/64/administrator-male.png" alt="nut"/>
                </div>
                <div>
                    <span className='capitalize'>Narek Svetlana</span>
                    <div className='flex items-center gap-3'>
                        <AiOutlineEye className='cursor-pointer text-[1.2rem] hover:scale-110'/>
                        <AiOutlinePoweroff className=' cursor-pointer text-red-500 hover:scale-110'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex gap-3 px-5 pt-1 pb-3'>
            <div className="relative">
                <input type="text" id="Search" placeholder="Add by Item Code" autoFocus className="w-[416px] rounded-md border-gray-200 py-2.5 ps-3 pe-5 shadow-sm sm:text-sm"/>
                <button type="button" className="text-gray-600 hover:text-gray-700 absolute right-2 top-2">
                    <BiSearch className='text-[1.5rem]'/>
                </button>
            </div>
            <button className='bg-[#50B426] text-white py-2 px-2 text-sm font-medium rounded-md capitalize'>add item</button>
            <button className='border border-red-500  text-red-500 py-2 px-1 text-sm font-medium rounded-md capitalize'>clear cart</button>
        </div>
        <div className="overflow-x-auto w-[94%] mx-auto">
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
            <div className='flex flex-col gap-3 mt-10'>
                <div className='flex justify-between items-center capitalize'>
                    <div>Sub total:</div>
                    <div>1200$</div>
                </div>
                <div className='flex justify-between items-center capitalize'>
                    <div>product discount:</div>
                    <div>1200$</div>
                </div>
                <div className='flex justify-between items-center capitalize'>
                    <div>extra discount:</div>
                    <div className='flex items-center gap-1'>
                        <span className='cursor-pointer'><GrEdit /></span>
                        <span>1200$</span>
                    </div>
                </div>
                <div className='flex justify-between items-center capitalize'>
                    <div>coupon discount:</div>
                    <div className='flex items-center gap-1'>
                        <span className='cursor-pointer'><GrEdit /></span>
                        <span>1200$</span>
                    </div>
                </div>
                <div className='flex justify-between items-center capitalize font-bold'>
                    <div>total:</div>
                    <div>1200$</div>
                </div>
            </div>
            <div className='flex justify-between mt-4 gap-5'>
                <button className="w-full inline-block rounded border border-[#50B426] px-12 py-3 text-sm font-medium text-[#50B426] hover:bg-[#50B426] hover:text-white focus:outline-none active:bg-green-500">
                    Partially Order
                </button>
                <button className="w-full flex justify-center items-center gap-4 rounded border border-[#50B426] bg-[#50B426] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#50B426] focus:outline-none active:bg-green-500 active:text-white">
                    <span>Order Done</span> 
                    <AiOutlineCheckCircle className='text-lg'/>
                </button>
            </div>
        </div>
    </div>
  )
}
