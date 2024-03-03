import { apiSlice } from "../apiSlice";

const SALARY_URL = '/api/v1/store/employees/salary-types'


export const salaryTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readSalaryTypes: builder.query({
            query: (data) => ({
                url: `${SALARY_URL}/read`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['SalaryTypes'],
            providesTags: (result) =>
            result? [
                  ...result.salaryTypes.map(({ id }) => ({ type: 'SalaryTypes', id })),
                  { type: 'SalaryTypes' },
                ]
              : [{ type: 'SalaryTypes', id }],

        }),
    })
})

export const { useReadSalaryTypesQuery } = salaryTypesApiSlice