import { apiSlice } from "../apiSlice";

const PLANS_URL = '/api/v1/plans'


export const plansApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readPlans: builder.query({
            query: (data) => ({
                url: `${PLANS_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Plans'],
            providesTags: (result) =>
            result? [
                  ...result.plans.map(({ id }) => ({ type: 'Plans', id })),
                  { type: 'Plans' },
                ]
              : [{ type: 'Plans', id }],

        }),
        readPlan: builder.query({
            query: (data) => ({
                url: `${PLANS_URL}/read-single?planId=${data.planId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Plans', id: arg }]

        }),
        deletePlan: builder.mutation({
            query: (data) => ({
                url: `${PLANS_URL}/remove?planId=${data.planId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Plans']
        }),
        addPlan: builder.mutation({
            query: (data) => ({
                url: `${PLANS_URL}/add`,
                method: 'POST',
                body:{
                    name:data.name,
                    description:data.description,
                    customers:data.customers,
                    suppliers:data.suppliers,
                    categories:data.categories,
                    brands:data.brands,
                    products:data.products,
                    employees:data.employees,
                    expenses:data.expenses,
                    inner_invoices:data.innerInvoices,
                    outer_invoices:data.outerInvoices,
                    price:data.price,
                    on_sale:data.onSale,
                    sale_price:data.salePrice
                }
            }),
            invalidatesTags: ['Plans']
        }),
        editPlan: builder.mutation({
            query: (data) => ({
                url: `${PLANS_URL}/edit?planId=${data.planId}`,
                method: 'PUT',
                body:{
                    name:data.name,
                    description:data.description,
                    customers:data.customers,
                    suppliers:data.suppliers,
                    categories:data.categories,
                    brands:data.brands,
                    products:data.products,
                    employees:data.employees,
                    expenses:data.expenses,
                    inner_invoices:data.innerInvoices,
                    outer_invoices:data.outerInvoices,
                    price:data.price,
                    on_sale:data.onSale,
                    sale_price:data.salePrice
                
                }
            }),
            invalidatesTags: ['Plans']
        }),
    })
})

export const { 
    useReadPlanQuery,
    useReadPlansQuery,
    useDeletePlanMutation,
    useEditPlanMutation,
    useAddPlanMutation
} = plansApiSlice