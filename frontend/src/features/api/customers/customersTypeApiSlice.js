import { apiSlice } from "../apiSlice";

const CUSTOMERSTYPES_URL = '/api/v1/store/customers/types'


export const customersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readCustomersTypes: builder.query({
            query: (storeId) => ({
                url: `${CUSTOMERSTYPES_URL}/get`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags:['CustomerTypes']
        }),
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
                    type_name:data.typeName,
                    discount_value:data.discountValue,
                    wholeSalePrice:data.wholeSalePrice
                }
            }),
            invalidatesTags: ['CustomerTypes']
        }),
        editCustomersTypes: builder.mutation({
            query: (data) => ({
                url:`${CUSTOMERSTYPES_URL}/edit/${data.typeId}`,
                method:'PUT',
                body:{
                    type_name:data.typeName,
                    discount_value:data.discountValue,
                    wholeSalePrice:data.wholeSalePrice
                }
            }),
            invalidatesTags: ['CustomerTypes']
        }),
        removeCustomersTypes: builder.mutation({
            query: (data) => ({
                url: `${CUSTOMERSTYPES_URL}/remove/${data.typeId}`,
                method:'DELETE',
            }),
            invalidatesTags: ['CustomerTypes']
        })
    })
})

export const { 
    useGetCustomersTypesMutation, 
    useAddCustomersTypesMutation, 
    useEditCustomersTypesMutation, 
    useRemoveCustomersTypesMutation,
    useReadCustomersTypesQuery
} = customersApiSlice