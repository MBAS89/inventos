import React from 'react'

//react router
import { useParams } from 'react-router-dom'

//reusable components 
import { Breadcrumb } from '../../../components/Breadcrumb';
import { AdminHeader } from '../../../components/admin/AdminHeader';

//redux
import { useReadPlanQuery } from '../../../features/api/plnas/plansApiSlice';

//date fns
import { format, parseISO } from 'date-fns';


export const PlanView = () => {
    const { planId } = useParams();

    const {data, isLoading, isFetching, isError, error } = useReadPlanQuery({planId:planId},'readPlan')

    return (
        <div className='bg-slate-200 min-h-screen pb-10'>
            <AdminHeader/>
            <div>
                {data ? 
                    <div>
                        <Breadcrumb from="Plans" current={data.plan.name} width="w-[80%]"/>
                    </div>
                :
                    <div className='w-[80%] mx-auto pt-20'>
                        <div className='bg-slate-500 animate-pulse h-[32px] w-[400px] rounded-lg'></div>
                    </div> 
                }

                <div className="w-[80%] mx-auto text-zinc-900 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: "Plan Name", value: data?.plan.name },
                            { label: "Price", value: data ? `$${data.plan.price}` : null },
                            { label: "Sale Price", value: data ? (data.plan.on_sale ? `$${data.plan.sale_price}` : "Not On Sale") : null },
                            { label: "Customers", value: data?.plan.customers },
                            { label: "Products", value: data?.plan.products },
                            { label: "Suppliers", value: data?.plan.suppliers },
                            { label: "Categories", value: data?.plan.categories },
                            { label: "Brands", value: data?.plan.brands },
                            { label: "Employees", value: data?.plan.employees },
                            { label: "Expenses", value: data?.plan.expenses },
                            { label: "Inner Invoices", value: data?.plan.inner_invoices },
                            { label: "Outer Invoices", value: data?.plan.outer_invoices },
                            { label: "Created At", value: data ? format(parseISO(data.plan.createdAt), "dd/MM/yyyy h:mmaaa") : null },
                            { label: "Updated At", value: data ? format(parseISO(data.plan.updatedAt), "dd/MM/yyyy h:mmaaa") : null },
                        ].map((item, index) => (
                            <div key={index} className="bg-zinc-50 p-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold mb-2">{item.label}</h2>
                                {item.value ? (
                                    <p className="text-[#50B426] font-bold">{item.value}</p>
                                ) : (
                                    <div className='bg-slate-500 animate-pulse h-[24px] w-[150px] rounded-lg'></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-zinc-50 p-4 rounded-lg shadow w-[80%] mx-auto mt-6">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    {data ? 
                        <p className="text-[#50B426] font-bold ">{data.plan.description}</p>
                        :
                        <div className='bg-slate-500 animate-pulse h-[20px] w-[400px] rounded-lg'></div>
                    }   
                </div>
            </div>
        </div>
    )
}
