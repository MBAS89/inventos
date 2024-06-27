import React from 'react'

//resuable components
import { TableHead } from '../../TableHead'

import {truncateString} from '../../../functions/truncateString'

export const SuppliersStatus = () => {

    const headItems = [
        {
            title:"Suuplier",
        },{
            title:"Join Date"
        },{
            title:"Transactions"
        }
    ]


    return (
        <div className='bg-white h-[40rem] w-[35%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <h2 className='font-bold text-[1.6rem]'>Top Suupliers</h2>
            <table className="min-w-full divide-y-2 divide-gray-1700 bg-white text-sm rounded-md mt-10">
                <TableHead headItems={headItems} selectAll={true} dont={true} withoutSelecthead={true}/>
                <tbody className="divide-y divide-gray-1700">
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                            </div>
                            <div className='w-[80%] flex flex-col gap-1'>
                                <span className='capitalize'>{truncateString('Mohamemd Abu Siam', 17)}</span>
                                <span className='capitalize'>+9720569185068</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                            </div>
                            <div className='w-[80%] flex flex-col gap-1'>
                                <span className='capitalize'>{truncateString('Mohamemd Abu Siam', 17)}</span>
                                <span className='capitalize'>+9720569185068</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                            </div>
                            <div className='w-[80%] flex flex-col gap-1'>
                                <span className='capitalize'>{truncateString('Mohamemd Abu Siam', 17)}</span>
                                <span className='capitalize'>+9720569185068</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                            </div>
                            <div className='w-[80%] flex flex-col gap-1'>
                                <span className='capitalize'>{truncateString('Mohamemd Abu Siam', 17)}</span>
                                <span className='capitalize'>+9720569185068</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                            </div>
                            <div className='w-[80%] flex flex-col gap-1'>
                                <span className='capitalize'>{truncateString('Mohamemd Abu Siam', 17)}</span>
                                <span className='capitalize'>+9720569185068</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                            </div>
                            <div className='w-[80%] flex flex-col gap-1'>
                                <span className='capitalize'>{truncateString('Mohamemd Abu Siam', 17)}</span>
                                <span className='capitalize'>+9720569185068</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                            </div>
                            <div className='w-[80%] flex flex-col gap-1'>
                                <span className='capitalize'>{truncateString('Mohamemd Abu Siam', 17)}</span>
                                <span className='capitalize'>+9720569185068</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-3">
                            <div className=' bg-gray-100 p-1 rounded-md w-[20%] flex items-center justify-center'>
                                <img width="40" height="40" src="https://res.cloudinary.com/dagzd3ntq/image/upload/v1706776664/i03qtxih8xzvprfsl2z7.png" alt="nut"/>
                            </div>
                            <div className='w-[80%] flex flex-col gap-1'>
                                <span className='capitalize'>{truncateString('Mohamemd Abu Siam', 17)}</span>
                                <span className='capitalize'>+9720569185068</span>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
