import { apiSlice } from "../apiSlice";

const EXPENSES_TYPES_URL = '/api/v1/store/expenses/types'


export const expensesTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readExpensesTypes: builder.query({
            query: (data) => ({
                url: `${EXPENSES_TYPES_URL}/read`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['ExpensesTypes'],
            providesTags: (result) =>
            result? [
                  ...result.expensesTypes.map(({ id }) => ({ type: 'ExpensesTypes', id })),
                  { type: 'ExpensesTypes' },
                ]
              : [{ type: 'ExpensesTypes', id }],

        }),
        readExpenseType: builder.query({
            query: (data) => ({
                url: `${EXPENSES_TYPES_URL}/read/single?typeId=${data.typeId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'ExpensesTypes', id: arg }]

        }),
        addExpenseType: builder.mutation({
            query: (data) => ({
                url: `${EXPENSES_TYPES_URL}/add`,
                method: 'POST',
                body:{
                    type_name: data.typeName
                }
            }),
            invalidatesTags: ['ExpensesTypes']

        }),
        editExpenseType: builder.mutation({
            query: (data) => ({
                url: `${EXPENSES_TYPES_URL}/edit?typeId=${data.typeId}`,
                method: 'PUT',
                body:{
                    type_name: data.typeName
                }
            }),
            invalidatesTags: ['ExpensesTypes']
        }),
        removeExpenseType: builder.mutation({
            query: (data) => ({
                url: `${EXPENSES_TYPES_URL}/remove?typeId=${data.typeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ExpensesTypes']
        })
    })
})

export const { 
    useReadExpensesTypesQuery,
    useReadExpenseTypeQuery,
    useAddExpenseTypeMutation, 
    useEditExpenseTypeMutation, 
    useRemoveExpenseTypeMutation,
} = expensesTypesApiSlice