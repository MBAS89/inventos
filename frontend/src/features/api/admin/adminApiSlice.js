import { apiSlice } from "../apiSlice";

const ADMIN_URL = '/api/v1/admins'


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readAdmins: builder.query({
            query: (data) => ({//
                url: `${ADMIN_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Admins'],
            providesTags: (result) =>
            result? [
                  ...result.admins.map(({ id }) => ({ type: 'Admins', id })),
                  { type: 'Admins' },
                ]
              : [{ type: 'Admins', id }],

        }),
        readAdmin: builder.query({
            query: (data) => ({
                url: `${ADMIN_URL}/read-single?adminId=${data.adminId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Admins', id: arg }]

        }),
        deleteAdmin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/remove?adminId=${data.adminId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Admins']
        }),
        addAdmin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/add`,
                method: 'POST',
                body:{
                    email:data.email,
                    first_name: data.firstName, 
                    last_name:data.lastName,
                    phone_number:data.phoneNumber,
                    password:data.password,
                    confirm_password:data.confirmPassword
                }
            }),
            invalidatesTags: ['Admins']
        }),
        editAdmin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/edit?adminId=${data.adminId}`,
                method: 'PUT',
                body:{
                    email:data.email,
                    first_name: data.firstName, 
                    last_name:data.lastName,
                    phone_number:data.phoneNumber,
                    password:data.password,
                    confirm_password:data.confirmPassword,
                    superAdmin:data.superAdmin
                }
            }),
            invalidatesTags: ['Admins']
        }),
    })
})

export const { 
    useReadAdminsQuery,
    useReadAdminQuery,
    useDeleteAdminMutation,
    useEditAdminMutation,
    useAddAdminMutation
} = adminApiSlice