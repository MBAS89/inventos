import React from 'react'

export const InvoiceCalculation = ({data}) => {

    return (
        <div className='w-[80%] mx-auto min-h-[10rem] bg-white rounded-lg mt-5 p-5'>
            <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Invoice Calculation</h2>
            <div className='w-[95%] mx-auto flex gap-4 flex-wrap'>
                <div className='p-5 bg-slate-200 rounded-lg w-[24.1%]'>
                    <h3 className='font-bold text-[1.5rem]'>Total Amount</h3>
                    <div className='p-2 flex flex-col gap-4'>
                        {data && (
                            data.items.map((item, index) => (
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold text-[1.2rem]'>Item <span className='text-blue-500 font-bold'>{index +1}</span> Calculation</h4>
                                    <span className='ml-5 text-[#50B426] font-bold'><span className='font-bold text-black mr-1'>Total Amount:</span>{item.qty} * {(item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit)} = {item.qty * (item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit)}</span>
                                </div>
                            )
                        ))}
                    </div>
                    <div className='flex items-center'>
                        <h4 className='font-bold'>Total Amount = </h4>
                        <div className='flex'>
                            {data && (
                                data.items.map((item, index) => (
                                    <span className='ml-1 text-[#50B426] font-bold'>{item.qty * (item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit)} {index === data.items.length - 1 ? '' : '+'}</span>
                                )
                            ))}
                            <span className='ml-1 text-[#50B426] font-bold'>= {data.total_amount}</span>
                        </div>
                    </div>
                </div>
                <div className='p-5 bg-slate-200 rounded-lg w-[24.1%]'>
                    <h3 className='font-bold text-[1.5rem]'>Total Items Discount</h3>
                    <div className='p-2 flex flex-col gap-4'>
                        {data && (
                            data.items.map((item, index) => (
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold text-[1.2rem]'>Item <span className='text-blue-500 font-bold'>{index +1}</span> Calculation</h4>
                                    <span className='ml-5 text-[#50B426] font-bold'><span className='font-bold text-black'>Total Disount:</span> {item.qty} * {(item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit)} = {item.qty * (item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit)} - {item.product.sale_price_piece ? item.product.sale_price_piece : item.product.sale_price_unit} =   {(item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit) - (item.product.sale_price_piece ? item.product.sale_price_piece : item.product.sale_price_unit)}</span>
                                </div>
                            )
                        ))}
                    </div>
                    <div className='flex items-center'>
                        <h4 className='font-bold'>Total Amount = </h4>
                        <div className='flex'>
                            {data && (
                                data.items.map((item, index) => (
                                    <span className='ml-1 text-[#50B426] font-bold'>{(item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit) - (item.product.sale_price_piece ? item.product.sale_price_piece : item.product.sale_price_unit)} {index === data.items.length - 1 ? '' : '+'}</span>
                                )
                            ))}
                            <span className='ml-1 text-[#50B426] font-bold'>= {data.items_discount}</span>
                        </div>
                    </div>
                    <div className='text-center mt-4'>{(data.items_discount === 0 && data.customer_discount > 0) && 'When a customer has a discount, the discount applied to individual items will not be factored into the calculation.'}</div>
                </div>
                <div className='p-5 bg-slate-200 rounded-lg w-[24.1%]'>
                    <h3 className='font-bold text-[1.5rem]'>Customer Discount</h3>
                    {data.customerId ? (
                        <div>
                            <div className='p-2 flex flex-col gap-4'>
                                {data && (
                                    data.items.map((item, index) => (
                                        <div className='flex flex-col gap-2'>
                                            <h4 className='font-bold text-[1.2rem]'>Item <span className='text-blue-500 font-bold'>{index +1}</span> Calculation</h4>
                                            <span className='ml-5 text-[#50B426] font-bold'>
                                                <span className='font-bold text-black'>Total Disount:</span> 
                                                {item.qty} * 
                                                {(item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit)} 
                                                = {item.qty * (item.product.retail_price_piece ? item.product.retail_price_piece : item.product.retail_price_unit)}
                                                {data.customer.customerType.wholeSalePrice ? '-' : '*'} 
                                                {data.customer.customerType.wholeSalePrice ? 
                                                `(${item.qty} * ${item.product.wholesale_price_piece ? item.product.wholesale_price_piece:item.product.wholesale_price_unit})`:
                                                `${data.customer.customerType.discount_value}%`
                                                }
                                                = {data.customer.customerType.wholeSalePrice ?
                                                item.qty * (item.product.retail_price_piece ? item.product.retail_price_piece:item.product.retail_price_unit) - 
                                                item.qty * (item.product.wholesale_price_piece ? item.product.wholesale_price_piece:item.product.wholesale_price_unit)
                                                : (item.qty * (item.product.retail_price_piece ? item.product.retail_price_piece:item.product.retail_price_unit)* (data.customer.customerType.discount_value /100))}
                                            </span>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className='flex items-center'>
                                <h4 className='font-bold'>Total Disount = </h4>
                                <div className='flex'>
                                    {data && (
                                        data.items.map((item, index) => (
                                            <span className='ml-1 text-[#50B426] font-bold'>{data.customer.customerType.wholeSalePrice ?
                                                item.qty * (item.product.retail_price_piece ? item.product.retail_price_piece:item.product.retail_price_unit) - 
                                                item.qty * (item.product.wholesale_price_piece ? item.product.wholesale_price_piece:item.product.wholesale_price_unit)
                                                : (item.qty * (item.product.retail_price_piece ? item.product.retail_price_piece:item.product.retail_price_unit)* (data.customer.customerType.discount_value /100))} {index === data.items.length - 1 ? '' : '+'}</span>
                                        )
                                    ))}
                                    <span className='ml-1 text-[#50B426] font-bold'>= {data.customer_discount}</span>
                                </div>
                            </div>
                            <div className='text-center mt-4'>{data.customer_extra_info ? data.customer_extra_info : ''}</div>
                        </div>
                    ) : (
                        <div className='text-center flex items-center justify-center h-full'>Customer Discount: 0</div>
                    )}
                </div>
                <div className='p-5 bg-slate-200 rounded-lg w-[24.1%]'>
                    <h3 className='font-bold text-[1.5rem]'>Total Discount</h3>
                    <div className='p-2 flex flex-col gap-4'>
                        <div className='flex items-center'>
                            <h4 className='font-bold'>Total Disount:</h4>
                            <div className='ml-2 font-bold text-[#50B426]'>
                                {data.items_discount} + {data.customer_discount} + {data.extra_discount} = {data.total_discount}
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-4'>Total Discount = Customer Discount + Total Items Discount + Extra Discount</div>
                </div>
                <div className='p-5 bg-slate-200 rounded-lg w-[24.1%]'>
                    <h3 className='font-bold text-[1.5rem]'>Total To Pay</h3>
                    <div className='p-2 flex flex-col gap-4'>
                        <div className='flex items-center'>
                            <h4 className='font-bold'>Total To Pay:</h4>
                            <div className='ml-2 font-bold text-[#50B426]'>
                                {data.total_amount} + {data.total_discount} = {data.total_to_pay}
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-4'>Total To Pay = Total Amount - Total Discount</div>
                </div>
                <div className='p-5 bg-slate-200 rounded-lg w-[24.1%]'>
                    <h3 className='font-bold text-[1.5rem]'>Total Paid</h3>
                    <div className='p-2 flex flex-col gap-4'>
                        <div className='flex items-center'>
                            <h4 className='font-bold'>Total Paid:</h4>
                            <div className='ml-2 font-bold text-[#50B426]'>
                                {data.total_paid}
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-4'>Total To Pay Is The Amount That Customer Paid</div>
                </div>
                <div className='p-5 bg-slate-200 rounded-lg w-[24.1%]'>
                    <h3 className='font-bold text-[1.5rem]'>Extra Discount</h3>
                    <div className='p-2 flex flex-col gap-4'>
                        <div className='flex items-center'>
                            <h4 className='font-bold'>Extra Discount:</h4>
                            <div className='ml-2 font-bold text-[#50B426]'>
                                {data.extra_discount}
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-4'>Extra Discount The Amount That Cahser </div>
                </div>
                <div className='p-5 bg-slate-200 rounded-lg w-[24.1%]'>
                    <h3 className='font-bold text-[1.5rem]'>Total Due</h3>
                    <div className='p-2 flex flex-col gap-4'>
                        <div className='flex items-center'>
                            <h4 className='font-bold'>Total Due:</h4>
                            <div className='ml-2 font-bold text-[#50B426]'>
                                {data.total_due}
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-4'>Total Due = Total To Pay - Total Pay</div>
                </div>
            </div>
        </div>
    )
}
