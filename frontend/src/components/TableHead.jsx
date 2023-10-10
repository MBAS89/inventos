import React from 'react'

export const TableHead = ({ headItems, invoice, selectAll, dont }) => {
  return (
    <thead className=' text-left'>
        <tr>
            {selectAll ? <></>:(
            <th className="px-4 py-2">
                <input type="checkbox" id="SelectAll" className="h-5 w-5 rounded border-gray-300"/>
            </th>)}
            {headItems.map((item, index) => (
                <th className={`px-4 py-2 text-gray-900 capitalize font-bold ${dont ? '' : index === 0 ? invoice ? 'w-[30%]':'w-[15%]' : ''}`}>{item.title}</th>
            ))}
        </tr>
    </thead>
  )
}
