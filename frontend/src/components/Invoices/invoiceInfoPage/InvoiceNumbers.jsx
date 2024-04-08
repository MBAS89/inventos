import { format, parseISO } from 'date-fns';
import React from 'react'


export const InvoiceNumbers = ({ data }) => {

    const GridItem = ({ label, value, notCash, date }) => (
        <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center items-center">
            <dt className="order-last text-lg font-medium text-gray-500">{label}</dt>
            {data ? (
                <dd className={`${date ? 'text-[1.5rem]' : 'text-[2rem]'} font-extrabold text-[#50B426]`}>{notCash ? '' : '$' }{value}</dd>
            ) : (
                <dd className="bg-slate-500 animate-pulse h-[48px] w-[140px] rounded-lg"></dd>
            )}
        </div>
    );

    return (
        <div className="mt-8 sm:mt-5 w-[80%] mx-auto flex flex-col gap-5">
            <dl className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2">
                <GridItem label="Total Amount" value={data ? data.total_amount.toFixed(1) : ''} />
                <GridItem label="Total Items Discount" value={data ? data.items_discount.toFixed(1) : ''} />
                <GridItem label="Customer Discount" value={data ? data.customer_discount.toFixed(1) : ''} />
                <GridItem label="Extra Discount" value={data ? (data.extra_discount ? data.extra_discount.toFixed(1) : 0) : ''} />
            </dl>
            <dl className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2">
                <GridItem label="Total Discount" value={data ? data.total_discount.toFixed(1) : ''} />
                <GridItem label="Total Paid" value={data ? data.total_paid.toFixed(1) : ''} />
                <GridItem label="Total Due" value={data ? data.total_due.toFixed(1) : ''} />
                <GridItem notCash={true} label="Total Discount Percent" value={`${data ? ((data.total_discount / data.total_amount) * 100).toFixed(1) : 0}%`} />
            </dl>
            <dl className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2">
                <GridItem label="Total Cost" value={data ? data.total_cost.toFixed(1) : ''} />
                <GridItem label="Total Profit Now" value={data ? data.total_profit_now.toFixed(1) : ''} />
                <GridItem label="Total Estimated Profit" value={data ? data.total_profit_estimated.toFixed(1) : ''} />
                <GridItem notCash={true} label="Total Estimated Profit Percent" value={`${data ? (((data.total_amount - data.total_cost) / data.total_cost) * 100).toFixed(1) : 0}%`} />
            </dl>
            <dl className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2">
                <GridItem date={true} notCash={true} label="Created At" value={data && data.createdAt ? format(parseISO(data.createdAt), "dd/MM/yyyy h:mmaaa") : '-'} />
                <GridItem date={true} notCash={true} label="Updated At" value={data && data.updatedAt ? format(parseISO(data.updatedAt), "dd/MM/yyyy h:mmaaa") : '-'}/>
                <GridItem date={true} notCash={true} label="Fully Paid At" value={data && data.fully_paid_date ? format(parseISO(data.fully_paid_date), "dd/MM/yyyy h:mmaaa") : 'Not Fully Paid Yet'} />
                <GridItem date={true} notCash={true} label="Last Payment At" value={data && data.last_paid_date ? format(parseISO(data.last_paid_date), "dd/MM/yyyy h:mmaaa") : 'No Last Payment'} />
            </dl>
        </div>
    );
};

