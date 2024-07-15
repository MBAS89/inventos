import React from 'react'

//resuable components
import { TableHead } from '../../TableHead'

export const LatestExpenses = () => {

    const headItems = [
        {
            title:"Information",
        },{
            title:"Date"
        },{
            title:"Amount"
        }
    ]


    return (
        <div className='bg-white h-[35rem] w-[35%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <h2 className='font-bold text-[1.6rem]'>Latest Expenses</h2>
            <table className="min-w-full divide-y-2 divide-gray-1700 bg-white text-sm rounded-md mt-10">
                <TableHead headItems={headItems} selectAll={true} dont={true} withoutSelecthead={true}/>
                <tbody className="divide-y divide-gray-1700">
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                            Employee Payment (full paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                           Outer Inoivce Payment (partial paid)
                        </td>
                        <td className="px-4 py-2 text-[#0070E0] font-bold">22-5-2024</td>
                        <td className={`px-4 py-2 ${true ? 'text-[#26c338] font-bold' : 'text-slate-300 italic'} `}>$20k</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
