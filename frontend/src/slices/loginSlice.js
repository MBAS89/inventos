import { apiSlice } from "./apiSlice";

const LOGIN_URL = '/api/v1/stores/auth'


export const loginApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${LOGIN_URL}/login`,
                method: 'POST',
                body:data
            })
        })
    })
})

export const { useloginMutation } = loginApiSlice