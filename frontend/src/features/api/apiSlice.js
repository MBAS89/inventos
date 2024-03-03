import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({baseUrl: ''})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Store', 'Customers', 'Categories', 'Brands', 'Products', 'Roles', 'Departments', 'Employees', 'SalaryTypes'],
    endpoints: (builder) => ({})
})