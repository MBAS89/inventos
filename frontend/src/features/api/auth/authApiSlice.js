import { apiSlice } from "../apiSlice";

const AUTH_URL = '/api/v1/stores/auth'


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body:{
                    store_name:data.storeName,
                    email:data.email,
                    password:data.password
                }
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/logout`,
                method: 'GET',
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation } = authApiSlice