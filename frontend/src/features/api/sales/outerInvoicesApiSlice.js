import { apiSlice } from "../apiSlice";

const OUTER_INVOICE_URL = '/api/v1/store/sales/outer-invoices'


export const outerInvoicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readOuterInvoices:builder.query({
            query: (data) => ({
                url: `${OUTER_INVOICE_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['OuterInvoices'],
            providesTags: (result) =>
            result? [
                  ...result.invoices.map(({ id }) => ({ type: 'OuterInvoices', id })),
                  { type: 'OuterInvoices' },
                ]
              : [{ type: 'OuterInvoices', id }],

        }),
        readOuterInvoice:builder.query({
            query: (data) => ({
                url: `${OUTER_INVOICE_URL}/read-snigle?invoiceId=${data.invoiceId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'OuterInvoices', id: arg }]
        }),
        addOuterInvoice: builder.mutation({
            query: (data) => ({
                url: `${OUTER_INVOICE_URL}/create`,
                method: 'POST',
                body:{
                    total_amount: data.totalAmount,
                    extra_discount:data.extraDiscount,
                    total_to_pay: data.totalToPay, 
                    total_paid: data.totalPaid, 
                    total_due:data.totalDue,
                    status: data.status, 
                    employeeId: data.employeeId, 
                    suppliersId:data.suppliersId,
                    items:data.items,
                    inventoryStatus:data.inventoryStatus
                }
            }),
            invalidatesTags: ['OuterInvoices']
        }),
        editOuterInvoice: builder.mutation({
            query: (data) => ({
                url: `${OUTER_INVOICE_URL}/edit?invoiceId=${data.invoiceId}`,
                method: 'PUT',
                body:{
                    total_amount: data.totalAmount,
                    extra_discount:data.extraDiscount,
                    total_to_pay: data.totalToPay, 
                    total_paid: data.totalPaid, 
                    total_due:data.totalDue,
                    status: data.status, 
                    employeeId: data.employeeId, 
                    suppliersId:data.suppliersId,
                    items:data.items,
                    inventoryStatus:data.inventoryStatus
                }
            }),
            invalidatesTags: ['OuterInvoices']
        }),
        removeOuterInvoice: builder.mutation({
            query: (data) => ({
                url: `${OUTER_INVOICE_URL}/remove/${data.invoiceId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['OuterInvoices']
        }),
        addOuterInvoiceHelper: builder.query({
            query: (data) => ({
                url: `${OUTER_INVOICE_URL}/helper`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags:['Suppliers', 'Employees']
        })
    })
})

export const { 
    useAddOuterInvoiceMutation,
    useAddOuterInvoiceHelperQuery,
    useReadOuterInvoicesQuery,
    useRemoveOuterInvoiceMutation,
    useReadOuterInvoiceQuery,
    useEditOuterInvoiceMutation
} = outerInvoicesApiSlice