import { apiSlice } from "../apiSlice";

const PAYMENTS_URL = '/api/v1/store/employees/payments'


export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readPayments: builder.query({
            query: (data) => ({//
                url: `${PAYMENTS_URL}/read?employeeId=${data.employeeId}${data.status ? '&status=' : ''}${data.status || ''}&page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Payments'],
            providesTags: (result) =>
            result? [
                  ...result.payments.map(({ id }) => ({ type: 'Payments', id })),
                  { type: 'Payments' },
                ]
              : [{ type: 'Payments', id }],
        }),
        readPayment:builder.query({
            query: (data) => ({
                url: `${PAYMENTS_URL}/read-single?paymentId=${data.paymentId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Payments', id: arg }]
        }),
        addPayment:builder.mutation({
            query: (data) => ({
                url: `${PAYMENTS_URL}/add`,
                method: 'POST',
                body:{
                    employeeId:data.employeeId,
                    amount:data.amount,
                    status:data.status,
                    paidDate:data.paidDate,
                    paymentDate:data.paymentDate,
                    hoursWorked:data.hoursWorked
                }
            }),
            invalidatesTags: ['Payments']
        }),
        editPayment:builder.mutation({
            query: (data) => ({
                url: `${PAYMENTS_URL}/edit?paymentId=${data.paymentId}`,
                method: 'PUT',
                body:{
                    amount:data.amount,
                    status:data.status,
                    paidDate:data.paidDate,
                    paymentDate:data.paymentDate,
                    hoursWorked:data.hoursWorked
                }
            }),
            invalidatesTags: ['Payments']
        }),
        payPayment:builder.mutation({
            query: (data) => ({
                url: `${PAYMENTS_URL}/pay-or-cancel?paymentId=${data.paymentId}`,
                method: 'PUT',
                body:{
                    paid:data.paid
                }
            }),
            invalidatesTags: ['Payments']
        }),
        removePayment:builder.mutation({
            query: (data) => ({
                url: `${PAYMENTS_URL}/remove?paymentId=${data.paymentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Payments']
        }),
    })
})

export const { 
    useReadPaymentsQuery,
    useAddPaymentMutation,
    useEditPaymentMutation,
    usePayPaymentMutation,
    useRemovePaymentMutation,
    useReadPaymentQuery
} = paymentApiSlice