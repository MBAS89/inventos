import React from 'react'

export const InvoiceNumbers = ({ data }) => {
    const GridItem = ({ label, value }) => (
        <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center items-center">
            <dt className="order-last text-lg font-medium text-gray-500">{label}</dt>
            {data ? (
                <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">${value}</dd>
            ) : (
                <dd className="bg-slate-500 animate-pulse h-[48px] w-[140px] rounded-lg"></dd>
            )}
        </div>
    );

    return (
        <div className="mt-8 sm:mt-5 w-[80%] mx-auto flex flex-col gap-5">
            <dl className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2">
                <GridItem label="Total Amount" value={data ? data.total_amount : ''} />
                <GridItem label="Total Items Discount" value={data ? data.items_discount : ''} />
                <GridItem label="Customer Discount" value={data ? data.customer_discount : ''} />
                <GridItem label="Extra Discount" value={data ? (data.extra_discount ? data.extra_discount : 0) : ''} />
            </dl>
            <dl className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2">
                <GridItem label="Total Discount" value={data ? data.total_discount : ''} />
                <GridItem label="Total Paid" value={data ? data.total_paid : ''} />
                <GridItem label="Total Due" value={data ? data.total_due : ''} />
                <GridItem label="Total Discount Percent" value={`${data ? ((data.total_discount / data.total_amount) * 100).toFixed(1) : 0}%`} />
            </dl>
        </div>
    );
};

