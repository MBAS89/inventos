import React from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { handleStatus } from '../../../functions/handleStatus'

export const InvoiceItems = ({ data }) => {

    const negative = useNavigate()
    
    console.log(data)

    const handleInventoryQty = (oldInventory, item) => {
        if(oldInventory){

            console.log(oldInventory)
            const foundItem = item.product.old_inventories.find(item => item.id === oldInventory);

            return foundItem.qty
        }else{

        }
    }

    return (
        <div className='w-[80%] mx-auto min-h-[10rem] bg-white rounded-lg mt-5 p-5'>
            <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Invoice Items</h2>
            {data ? (
                <div className="overflow-x-auto">
                    <table className="w-[98%] mx-auto relative min-h-[5rem] divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    View
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Item
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Qty
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Sku
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Unit
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Unit Vlaue
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Unit Price 
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Pieces In Unit
                                </th>
                                {data && data.items.some(item => item.product.pieces_per_unit > 1) && (
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Piece Price 
                                </th>
                                )}
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Sale Price Unit
                                </th>
                                {data && data.items.some(item => item.product.pieces_per_unit > 1) && (
                                    <th className="px-4 py-2 font-medium text-gray-900">
                                        Sale Price Piece
                                    </th>
                                )}
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    WholeSale Price Unit
                                </th>
                                {data && data.items.some(item => item.product.pieces_per_unit > 1) && (
                                    <th className="px-4 py-2 font-medium text-gray-900">
                                        WholeSale Price Piece
                                    </th>
                                )}
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Old Inventory
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-900">
                                    Inventory Qty
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-center">
                            {data && data.items.map((item) => (
                            <tr>
                                <td className="px-4 py-2 font-bold text-[#50B426] text-center">
                                    <MdOutlineRemoveRedEye onClick={() => negative(`/dashboard/inventory/single-product/${item.product_id}`)} className='text-[1.5rem] cursor-pointer hover:scale-125 mx-auto'/>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 flex justify-center items-center gap-3 w-[100%]">
                                    <div className=' bg-gray-100 p-1 rounded-md w-16 h-16 flex items-center justify-center'>
                                        <img className='w-full h-full' src={item.product.image} />
                                    </div>
                                    <div className='w-32 break-words'>
                                        {item.product.name.length > 40 ? `${item.product.name.substring(0, 20)}...` : item.product.name}
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-bold text-[#6e3dff]">{item.qty}</td>
                                <td className="px-4 py-2 font-bold text-green-700">
                                    {item.product.sku}
                                </td>
                                <td className="px-4 py-2 font-bold text-blue-400 text-center">
                                    {item.product.unit}
                                </td>
                                <td className="px-4 py-2 font-bold">
                                    {item.product.unit_value}
                                </td>
                                <td className="px-4 py-2 font-bold text-[#50B426]">
                                    ${item.price * item.product.pieces_per_unit}
                                </td>
                                <td className="px-4 py-2 font-bold ">
                                    {item.product.pieces_per_unit}
                                </td>
                                {data && data.items.some(item => item.product.pieces_per_unit > 1) && (
                                    <td className="px-4 py-2 font-bold text-[#50B426]">
                                        {item.product.retail_price_piece ? `$${item.price}` : '-'}
                                    </td>
                                )}
                                <td className="px-4 py-2 font-bold text-[#50B426]">
                                    {item.product.sale_price_unit ? `$${item.product.sale_price_unit}` : 'No Sale'}
                                </td>
                                {data && data.items.some(item => item.product.pieces_per_unit > 1) && (
                                    <td className="px-4 py-2 font-bold text-[#50B426]">
                                        {item.product.sale_price_piece ? `$${item.product.sale_price_piece}` : 'No Sale'}
                                    </td>
                                )}
                                <td className="px-4 py-2 font-bold text-[#50B426]">
                                    {item.product.wholesale_price_unit ? `$${item.product.wholesale_price_unit}` : '-'}
                                </td>
                                {data && data.items.some(item => item.product.pieces_per_unit > 1) && (
                                    <td className="px-4 py-2 font-bold text-[#50B426]">
                                        {item.product.wholesale_price_piece ? `$${item.product.wholesale_price_piece}` : '-'}
                                    </td>
                                )}
                                <td className="px-4 py-2 font-bold">
                                    {handleStatus(item.oldInventory)}
                                </td>
                                <td className="px-4 py-2 font-bold">
                                    {handleInventoryQty(item.oldInventory, item)}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='flex flex-col gap-2 mt-9'>
                    <div className='bg-slate-500 animate-pulse h-[80px] w-[98%] mx-auto rounded-lg '></div>
                    <div className='bg-slate-500 animate-pulse h-[80px] w-[98%] mx-auto rounded-lg '></div>
                </div>
            )}
        </div>
    )
}
