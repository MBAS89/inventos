import React from 'react'
import { TableHead } from '../TableHead'
import { TablePagination } from '../TablePagination'

//icons
import { AiOutlineCheckCircle } from "react-icons/ai"
import { HiOutlineReceiptRefund } from "react-icons/hi"
import { CiWarning } from "react-icons/ci"

export const InvoicesTable = ({headItems}) => {
    const data = [
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:3,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                }
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"paid",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:1,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                }
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"refunded",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"partially",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"paid",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"partially",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"refunded",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"paid",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"paid",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"paid",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
        {
            items:[
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
                {
                    qty:2,
                    name:"Kakuma Organic Tutmeric Immune Booster",
                    price:22,
                    image:"https://img.icons8.com/dusk/64/hair-dryer.png"
                },
            ],
            invoiceId:"000001374",
            totalAmount:120,
            totalPaid:120,
            totalDue:0,
            status:"paid",
            casher:{
                name:"Farouk Sa'id",
                image:"https://img.icons8.com/dusk/64/manager.png"
            },
            createdDate:"24/05/1995",
            updatedDate:"24/05/1995"
        },
    ]

    const handleStatus = (status) => {
        if(status === "paid"){
            return(
                <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    <AiOutlineCheckCircle />
                    <p className="whitespace-nowrap text-sm">Paid</p>
                </span>
            )
        }else if(status === "partially"){
            return(
                <span className="inline-flex items-center justify-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                    <HiOutlineReceiptRefund />
                    <p className="whitespace-nowrap text-sm">Partially</p>
                </span>
            )
        }else if(status === "refunded"){
            return(
                <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                    <HiOutlineReceiptRefund />
                    <p className="whitespace-nowrap text-sm">Refunded</p>
                </span>
            )
        }else{
            return(
                <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-200 px-2.5 py-0.5 text-gray-700">
                    <CiWarning />
                    <p className="whitespace-nowrap text-sm">Unknown</p>
                </span>
            )
        }

    } 


    return (
        <div className='px-6 mt-2'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md">
                    <TableHead headItems={headItems} invoice={true} />
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index} className='h-16'>
                                <td className="px-4 py-2">
                                    <input className="h-5 w-5 rounded border-gray-300" type="checkbox" id="Row1"/>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex flex-col gap-2">
                                    {item.items.map((product, index) => (
                                        <div key={index} className='flex items-center gap-3'>
                                            <div className='font-bold'>{product.qty} X</div>
                                            <div className=' bg-gray-100 p-1 rounded-md w-[10%] flex items-center justify-center'>
                                                <img width="40" height="40" src={product.image} alt="nut"/>
                                            </div>
                                            <div className='w-[80%] flex flex-col gap-2'>
                                                <span className='capitalize'>{product.name}</span>
                                                <span className='font-bold text-[#4454DC]'>${product.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-4 py-2 font-bold">{item.invoiceId}</td>
                                <td className="px-4 py-2 font-bold text-[#362993]">${item.totalAmount}</td>
                                <td className="px-4 py-2 font-bold text-[#50B426]">${item.totalPaid}</td>
                                <td className="px-4 py-2 font-bold text-[#f14f4f]">${item.totalDue}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    {handleStatus(item.status)}
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900">
                                    <div className='flex items-center gap-4'>
                                        <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                            <img width="50" height="50" src={item.casher.image} alt="manager"/>
                                        </div>
                                        <div>{item.casher.name}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-700">{item.createdDate}</td>
                                <td className="px-4 py-2 text-gray-700">{item.updatedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <TablePagination />
            </div>
        </div>
    )
}

