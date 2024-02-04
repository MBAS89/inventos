import { apiSlice } from "../apiSlice";

const CUSTOMERSTYPES_URL = '/api/v1/store/customers/types'


export const customersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomersTypes: builder.mutation({
            query: (storeId) => ({
                url: `${CUSTOMERSTYPES_URL}/get?storeId=${storeId}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response;
            }
        }),
        addCustomersTypes: builder.mutation({
            query: (data) => ({
                url:`${CUSTOMERSTYPES_URL}/add`,
                method: 'POST',
                body:{
                    store_id:data.storeId,
                    type_name:data.typeName,
                    discount_value:data.discountValue
                }
            })
        }),
        editCustomersTypes: builder.mutation({
            query: (data) => ({
                url:`${CUSTOMERSTYPES_URL}/edit/${data.typeId}`,
                method:'PUT',
                body:{
                    type_name:data.typeName,
                    discount_value:data.discountValue
                }
            })
        }),
        removeCustomersTypes: builder.mutation({
            query: (data) => ({
                url: `${CUSTOMERSTYPES_URL}/remove/${data.typeId}`
            })
        })
    })
})

export const { useGetCustomersTypesMutation, useAddCustomersTypesMutation, useEditCustomersTypesMutation, useRemoveCustomersTypesMutation } = customersApiSlice