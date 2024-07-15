import React, { useState } from 'react'

//Reusable components
import { TableHead } from '../../TableHead'
import { handleStatus } from '../../../functions/HandleInvoiceStatus'

export const InvoicesAnalytics = () => {

    const [invoicesType, setInvoicesType] = useState('Inner')

    const headItems = [
        {
            title:"Items",
        },{
            title:"ID"
        },{
            title:"Total Amount	"
        },{
            title:"Total Paid"
        },{
            title:"Total Due"
        },{
            title:"Status"
        },{
            title:"Casher"
        }
    ]


    return (
        <div className='bg-white h-[35rem] w-[65%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-[1.6rem]'>Latest {invoicesType} Invoices</h2>
                <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                    <button
                        onClick={() => setInvoicesType('Outer')}
                        className={`inline-block rounded-md ${invoicesType === 'Outer' ? 'bg-white text-[#50B426]' :  'text-gray-500 hover:text-gray-700'}  px-4 py-2 text-sm focus:relative`}
                    >
                        Outer Invoices
                    </button>

                    <button
                        onClick={() => setInvoicesType('Inner')}
                        className={`inline-block rounded-md ${invoicesType === 'Inner' ? 'bg-white text-[#50B426]' :  'text-gray-500 hover:text-gray-700'}  px-4 py-2 text-sm  shadow-sm focus:relative`}
                    >
                        Inner Invoices
                    </button>
                </div>
            </div>
            <table className="min-w-full divide-y-2 divide-gray-1700 bg-white text-sm rounded-md mt-10">
                <TableHead headItems={headItems} selectAll={true} dont={true} withoutSelecthead={true}/>
                <tbody className="divide-y divide-gray-1700">
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex flex-col gap-2">
                            <div className='flex items-center gap-3'>
                                <div className='font-bold w-[10%]'>10 X</div>
                                <div className=' bg-gray-100 p-1 rounded-md w-[30%] flex items-center justify-center'>
                                    <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <span className='capitalize'>apple juice </span>
                                    <span className='font-bold text-[#4454DC]'>$22</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='font-bold w-[10%]'>10 X</div>
                                <div className=' bg-gray-100 p-1 rounded-md w-[30%] flex items-center justify-center'>
                                    <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <span className='capitalize'>apple juice </span>
                                    <span className='font-bold text-[#4454DC]'>$22</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-2 font-bold">22</td>
                        <td className="px-4 py-2 font-bold text-[#362993]">$100</td>
                        <td className="px-4 py-2 font-bold text-[#50B426]">$50</td>
                        <td className="px-4 py-2 font-bold text-[#f14f4f]">$50</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleStatus('paid')}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            <div className='flex items-center gap-4'>
                                <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                    <img width="50" height="50" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div>Mohammed Abu Siam</div>
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex flex-col gap-2">
                            <div className='flex items-center gap-3'>
                                <div className='font-bold w-[10%]'>10 X</div>
                                <div className=' bg-gray-100 p-1 rounded-md w-[30%] flex items-center justify-center'>
                                    <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <span className='capitalize'>apple juice </span>
                                    <span className='font-bold text-[#4454DC]'>$22</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='font-bold w-[10%]'>10 X</div>
                                <div className=' bg-gray-100 p-1 rounded-md w-[30%] flex items-center justify-center'>
                                    <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <span className='capitalize'>apple juice </span>
                                    <span className='font-bold text-[#4454DC]'>$22</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-2 font-bold">22</td>
                        <td className="px-4 py-2 font-bold text-[#362993]">$100</td>
                        <td className="px-4 py-2 font-bold text-[#50B426]">$50</td>
                        <td className="px-4 py-2 font-bold text-[#f14f4f]">$50</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleStatus('paid')}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            <div className='flex items-center gap-4'>
                                <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                    <img width="50" height="50" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div>Mohammed Abu Siam</div>
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex flex-col gap-2">
                            <div className='flex items-center gap-3'>
                                <div className='font-bold w-[10%]'>10 X</div>
                                <div className=' bg-gray-100 p-1 rounded-md w-[30%] flex items-center justify-center'>
                                    <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <span className='capitalize'>apple juice </span>
                                    <span className='font-bold text-[#4454DC]'>$22</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='font-bold w-[10%]'>10 X</div>
                                <div className=' bg-gray-100 p-1 rounded-md w-[30%] flex items-center justify-center'>
                                    <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <span className='capitalize'>apple juice </span>
                                    <span className='font-bold text-[#4454DC]'>$22</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-2 font-bold">22</td>
                        <td className="px-4 py-2 font-bold text-[#362993]">$100</td>
                        <td className="px-4 py-2 font-bold text-[#50B426]">$50</td>
                        <td className="px-4 py-2 font-bold text-[#f14f4f]">$50</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleStatus('paid')}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            <div className='flex items-center gap-4'>
                                <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                    <img width="50" height="50" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                                </div>
                                <div>Mohammed Abu Siam</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
