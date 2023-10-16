import React from 'react'

export const CustomersProfileStatus = () => {
    return (
    <div>
        <div className="mt-8 sm:mt-5 w-[80%] mx-auto">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Total Debts
                    </dt>

                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">
                        $4.8m
                    </dd>
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Discount
                    </dt>

                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">24</dd>
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                        Type
                    </dt>

                    <dd className="text-4xl font-extrabold text-[#50B426] md:text-5xl">86</dd>
                </div>
            </dl>
        </div>
    </div>
  )
}
