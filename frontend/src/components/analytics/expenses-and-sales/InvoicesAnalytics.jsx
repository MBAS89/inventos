import React from 'react'
import { TableHead } from '../../TableHead'

export const InvoicesAnalytics = () => {

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
            <h2 className='font-bold text-[1.6rem]'>Latest Employee Payments</h2>
            <table className="min-w-full divide-y-2 divide-gray-1700 bg-white text-sm rounded-md mt-10">
                <TableHead headItems={headItems} selectAll={true} dont={true} withoutSelecthead={true}/>
                <tbody className="divide-y divide-gray-1700">
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900 flex flex-col gap-2">
                            <div className='flex items-center gap-3'>
                                <div className='font-bold w-[10%]'>{item.qty} X</div>
                                <div className=' bg-gray-100 p-1 rounded-md w-[10%] flex items-center justify-center'>
                                    <img width="40" height="40" src={item.product.image} alt="nut"/>
                                </div>
                                <div className='w-[80%] flex flex-col gap-2'>
                                    <span className='capitalize'>{item.product.name}</span>
                                    <span className='font-bold text-[#4454DC]'>${item.price}</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">$222</td>
                        <td className={`px-4 py-2 ${false ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>22</td>
                        <td className="px-4 py-2 text-[#952db4] font-bold">2222</td>
                        <td className="px-4 py-2 text-gray-700">
                            {handleOnclaimedStatus('paid')}
                        </td>
                        <td>
                            <div className='flex gap-3'>
                                <MdOutlineEdit className='text-[1.5rem] text-[#322197] cursor-pointer hover:scale-110'/>
                                {false ? (
                                    <BiLoaderCircle className='text-[1.4rem] animate-spin'/>
                                ) : (
                                    <MdDeleteOutline  className='text-[1.5rem] text-[#c83a3a] cursor-pointer hover:scale-110'/>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
