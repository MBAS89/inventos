import React from 'react'
import millify from 'millify'

export const CustomersProfileStatus = ({customer, isLoading}) => {
    return (
    <div>
        {isLoading ? (
            <div>
                loading ...
            </div>
        ):(
        <div className="mt-8 sm:mt-5 w-[80%] mx-auto">
            <dl className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2">
                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Total Debts
                    </dt>

                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                        ${millify(customer.total_debt)}
                    </dd>
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Total Paid
                    </dt>

                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                        ${millify(customer.total_paid)}
                    </dd>
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Discount
                    </dt>

                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">%{customer.customerType.discount_value}</dd>
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Type
                    </dt>

                    <dd className="text-2xl uppercase font-extrabold text-[#50B426] md:text-2xl">{customer.customerType.type_name}</dd>
                </div>
            </dl>
        </div>
        )}
    </div>
  )
}
