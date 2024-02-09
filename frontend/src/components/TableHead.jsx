import React from 'react'

export const TableHead = ({ headItems, invoice, dont, withoutSelecthead }) => {
  return (
    <thead className=' text-left'>
        <tr>
            {withoutSelecthead ? (
              <></>
            ) : (
              <th className="px-4 py-2">
              </th>
            )}

            {headItems.map((item, index) => (
                <th key={index} className={`px-4 py-2 text-gray-900 capitalize font-bold ${dont ? '' : index === 0 ? invoice ? 'w-[30%]':'w-[15%]' : ''}`}>{item.title}</th>
            ))}
        </tr>
    </thead>
  )
}
