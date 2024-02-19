import { apiSlice } from "../apiSlice";

const DEPARMENTS_URL = '/api/v1/store/employees/departments'

export const departmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readDepartments: builder.query({
            query: (data) => ({
                url: `${DEPARMENTS_URL}/read`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Departments'],
            providesTags: (result) =>
            result? [
                  ...result.departments.map(({ id }) => ({ type: 'Departments', id })),
                  { type: 'Departments' },
                ]
              : [{ type: 'Departments', id }],

        })
    })
})

export const { useReadDepartmentsQuery } = departmentsApiSlice