import { apiSlice } from "../apiSlice";

const AUTH_ADMIN_URL = '/api/v1/admins'


export const authAdminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${AUTH_ADMIN_URL}/login`,
                method: 'POST',
                body:{
                    email:data.email,
                    password:data.password
                }
            })
        }),
        adminLogout: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/logout`,
                method: 'GET',
            })
        })
    })
})

export const { useAdminLoginMutation, useAdminLogoutMutation } = authAdminApiSlice