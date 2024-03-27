import { apiSlice } from "../apiSlice";

const INVOICE_URL = '/api/v1/store/sales/invoices'


export const innerInvoicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readInvoices:builder.query({
            query: (data) => ({
                url: `${INVOICE_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                response.invoices.sort((a, b) => a.id - b.id)
                return response;
            },
            providesTags: ['InnerInvoices'],
            providesTags: (result) =>
            result? [
                  ...result.invoices.map(({ id }) => ({ type: 'InnerInvoices', id })),
                  { type: 'InnerInvoices' },
                ]
              : [{ type: 'InnerInvoices', id }],

        }),
        readInvoice:builder.query({
            query: (data) => ({
                url: `${INVOICE_URL}/read-snigle?invoiceId=${data.invoiceId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'InnerInvoices', id: arg }]
        }),
        addInvoice: builder.mutation({
            query: (data) => ({
                url: `${INVOICE_URL}/create`,
                method: 'POST',
                body:{
                    total_amount: data.totalAmount,
                    items_discount: data.itemsDiscount, 
                    customer_discount:data.customerDiscount,
                    extra_discount:data.extraDiscount,
                    total_discount: data.totalDiscount, 
                    total_to_pay: data.totalToPay, 
                    total_paid: data.totalPaid, 
                    total_due:data.totalDue,
                    status: data.status, 
                    employeeId: data.employeeId, 
                    customerId:data.customerId,
                    items:data.items,
                    customer_extra_info:data.customerExtraInfo,
                    includeItemsDiscount:data.includeItemsDiscount
                }
            }),
            invalidatesTags: ['InnerInvoices', 'Products']
        }),
        editInvoice: builder.mutation({
            query: (data) => ({
                url: `${INVOICE_URL}/edit/${data.invoiceId}`,
                method: 'PUT',
                body:{
                    total_amount: data.totalAmount,
                    items_discount: data.itemsDiscount, 
                    customer_discount:data.customerDiscount,
                    extra_discount:data.extraDiscount,
                    total_discount: data.totalDiscount, 
                    total_to_pay: data.totalToPay, 
                    total_paid: data.totalPaid, 
                    total_due:data.totalDue,
                    status: data.status, 
                    employeeId: data.employeeId, 
                    customerId:data.customerId,
                    items:data.items
                }
            }),
            invalidatesTags: ['InnerInvoices']
        }),
        removeInvoice: builder.mutation({
            query: (data) => ({
                url: `${INVOICE_URL}/remove/${data.invoiceId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['InnerInvoices']
        }),
        addInvoiceHelper: builder.query({
            query: (data) => ({
                url: `${INVOICE_URL}/helper`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags:['Customers', 'Employees']
        }),
        productSearchHelper:builder.query({
            query: (data) => ({
                url: `${INVOICE_URL}/casher/search?searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags:['Products', 'InnerInvoices']
        })

    })
})

export const { 
    useReadInvoiceQuery, 
    useReadInvoicesQuery, 
    useAddInvoiceMutation, 
    useAddInvoiceHelperQuery,
    useProductSearchHelperQuery,
    useEditInvoiceMutation,
    useRemoveInvoiceMutation
} = innerInvoicesApiSlice