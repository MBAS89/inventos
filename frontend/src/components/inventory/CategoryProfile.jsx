import React from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'

export const CategoryProfile = ({page}) => {
    const headItems = [
        {
            title:"product info"
        },
        {
            title:"Sku"
        },
        {
            title:"qty"
        },
        {
            title:"price"
        },
        {
            title:"retail price"
        },
        {
            title:"wholesale price"
        },
        {
            title:"on sale"
        },
        {
            title:"sale price"
        },
        {
            title:"created date"
        },
        {
            title:"updated date"
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

    const data = [
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:false,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:false,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:false,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:true,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            image:"https://img.icons8.com/dusk/64/spring.png",
            name:"kakuma organic tutmeric immune booster",
            sku:"000001374",
            qty:2,
            price:120,
            retailPrice:150,
            wholeSalePrice:130,
            sale:false,
            salePrice:100,
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        }
    ]
    return (
    <div className='w-[80%] mx-auto'>
        <div className='h-[15rem] mt-10 flex gap-5'>
            <div className='w-[60%] bg-white h-full rounded-md border-gray-200 border-2 p-4'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>{page} Information</h2>
                <div className='flex items-center gap-10 h-[90%] pr-16 pl-10'>
                    <div className=' bg-[#50B426] rounded-full w-[128px] h-[128px] p-1'>
                        <img  width="128" height="128"  src="https://res.cloudinary.com/dcbc4t7bq/image/upload/v1687997283/IMG_-o3dpre_tquqrs.jpg" className='rounded-full' alt='customer info image' />
                    </div>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <h5 className='text-gray-400'>{page} Name</h5>
                                <p className='font-bold'>Takuma Asahi</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white w-[40%] h-full rounded-md border-2 border-gray-200 p-4 text-center flex flex-col justify-center'>
                <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                    3000
                </dd>
                <dt className="text-lg font-medium text-gray-500">
                    Products
                </dt>
            </div>  
        </div>
        <div>
            <div className='mt-6'>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                        <TableHead headItems={headItems} />
                        <tbody className="divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">
                                        <input className="h-5 w-5 rounded border-gray-300" type="checkbox" id="Row1"/>
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                                        <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                            <img width="40" height="40" src={item.image} alt="nut"/>
                                        </div>
                                        <div className='w-[80%]'>
                                            <span className='capitalize'>{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">{item.sku}</td>
                                    <td className="px-4 py-2 text-gray-700">{item.qty}</td>
                                    <td className="px-4 py-2 text-[#0070E0] font-bold">${item.price}</td>
                                    <td className="px-4 py-2 text-[#50B426] font-bold">${item.retailPrice}</td>
                                    <td className="px-4 py-2 font-bold text-[#4454DC]">${item.wholeSalePrice}</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {handleOnSaleStatus(item.sale)}
                                    </td>
                                    <td className="px-4 py-2 font-bold text-orange-300">${item.salePrice}</td>
                                    <td className="px-4 py-2 text-gray-700">{item.createdDate}</td>
                                    <td className="px-4 py-2 text-gray-700">{item.updatedDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <TablePagination />
                </div>
            </div>
        </div>
    </div>
  )
}
