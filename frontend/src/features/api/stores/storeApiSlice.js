import { apiSlice } from "../apiSlice";

const STORE_URL = '/api/v1/stores'


export const storeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (data) => ({
                url: `${STORE_URL}/create`,
                method: 'POST',
                body:{
                    store_name:data.storeName,
                    owner_first_name:data.firstName,
                    owner_last_name:data.lastName,
                    owner_email:data.email,
                    password:data.password,
                    confirm_password:data.confirmPassword,
                    phone_number:data.phoneNumber
                }
            })
        }),
    })
})

export const { useCreateMutation } = storeApiSlice