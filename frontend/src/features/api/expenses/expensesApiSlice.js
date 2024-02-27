import { apiSlice } from "../apiSlice";

const EXPENSES_URL = '/api/v1/store/expenses'


export const expensesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readExpenses: builder.query({
            query: (data) => ({//
                url: `${EXPENSES_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Expenses'],
            providesTags: (result) =>
            result? [
                  ...result.expenses.map(({ id }) => ({ type: 'Expenses', id })),
                  { type: 'Expenses' },
                ]
              : [{ type: 'Expenses', id }],

        }),
        readExpense: builder.query({
            query: (data) => ({
                url: `${EXPENSES_URL}/read/single?expenseId=${data.expenseId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Expenses', id: arg }]

        }),
        addExpense: builder.mutation({
            query: (data) => ({
                url: `${EXPENSES_URL}/add`,
                method: 'POST',
                body:{
                    expenses_title:data.expensesTitle,
                    amount:data.amount,
                    description: data.description, 
                    expenses_type_id: data.expensesTypeId
                }
            }),
            invalidatesTags: ['Expenses']

        }),
        editExpense: builder.mutation({
            query: (data) => ({
                url: `${EXPENSES_URL}/edit?expenseId=${data.expenseId}`,
                method: 'PUT',
                body:{
                    expenses_title:data.expensesTitle,
                    amount:data.amount,
                    description: data.description, 
                    expenses_type_id: data.expensesTypeId
                }
            }),
            invalidatesTags: ['Expenses']
        }),
        removeExpense: builder.mutation({
            query: (data) => ({
                url: `${EXPENSES_URL}/remove?expenseId=${data.expensesId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Expenses']
        }),

    })
})

export const { 
    useReadExpensesQuery, 
    useReadExpenseQuery, 
    useAddExpenseMutation, 
    useEditExpenseMutation, 
    useRemoveExpenseMutation
} = expensesApiSlice