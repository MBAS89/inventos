import { apiSlice } from "../apiSlice";

const DEPARMENTS_URL = '/api/v1/store/employees/departments'
const PERMISSION_URL = '/api/v1/store/employees/permissions'

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

        }),
        addDepartment: builder.mutation({
            query: (data) => ({
                url: `${DEPARMENTS_URL}/add`,
                method: 'POST',
                body:{
                    departmentName: data.departmentName
                }
            }),
            invalidatesTags: ['Departments']
        }),
        editDepartment: builder.mutation({
            query: (data) => ({
                url: `${DEPARMENTS_URL}/edit/${data.departmentId}`,
                method: 'PUT',
                body:{
                    departmentName: data.departmentName
                }
            }),
            invalidatesTags: ['Departments']
        }),
        removeDepartment: builder.mutation({
            query: (data) => ({
                url: `${DEPARMENTS_URL}/remove/${data.departmentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Departments']
        }),
        addPermissionToDepartment: builder.mutation({
            query: (data) => ({
                url: `${PERMISSION_URL}/add`,
                method: 'POST',
                body:{
                    permissionName: data.permissionName,
                    departmentId:data.departmentId
                }
            }),
            invalidatesTags: ['Departments']
        }),
        removePermissionFromDepartment: builder.mutation({
            query: (data) => ({
                url: `${PERMISSION_URL}/remove/${data.permissionId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Departments']
        }),
    })
})

export const { 
    useReadDepartmentsQuery, 
    useAddDepartmentMutation, 
    useEditDepartmentMutation, 
    useRemoveDepartmentMutation,
    useAddPermissionToDepartmentMutation,
    useRemovePermissionFromDepartmentMutation 
} = departmentsApiSlice