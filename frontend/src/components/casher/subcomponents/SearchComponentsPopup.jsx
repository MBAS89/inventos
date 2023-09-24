import React from 'react'

import { TableHead } from '../../TableHead'

export const SearchComponentsPopup = () => {
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

    return (
        <div className="rounded-2xl border border-blue-100 bg-white absolute top-12 right-[12.5rem] p-4 shadow-lg h-[20rem] w-full">
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
    )
}
