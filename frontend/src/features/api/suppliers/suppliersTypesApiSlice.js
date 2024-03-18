import { apiSlice } from "../apiSlice";

const SUPPLIERS_TYPES_URL = '/api/v1/store/suppliers/types'


export const suppliersTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readSuppliersTypes: builder.query({
            query: (data) => ({
                url: `${SUPPLIERS_TYPES_URL}/read`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['SupplierTypes'],
            providesTags: (result) =>
            result? [
                  ...result.supplierTypes.map(({ id }) => ({ type: 'SupplierTypes', id })),
                  { type: 'SupplierTypes' },
                ]
              : [{ type: 'SupplierTypes', id }],

        }),

        readSuppliersType: builder.query({
            query: (data) => ({
                url: `${SUPPLIERS_TYPES_URL}/read/single?typeId=${data.typeId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'SupplierTypes', id: arg }]

        }),
        addSuppliersType: builder.mutation({
            query: (data) => ({
                url: `${SUPPLIERS_TYPES_URL}/add`,
                method: 'POST',
                body:{
                    type_name: data.typeName
                }
            }),
            invalidatesTags: ['SupplierTypes']

        }),
        editSuppliersType: builder.mutation({
            query: (data) => ({
                url: `${SUPPLIERS_TYPES_URL}/edit/${data.supplierId}`,
                method: 'PUT',
                body:{
                    type_name: data.typeName
                }
            }),
            invalidatesTags: ['SupplierTypes']
        }),
        removeSuppliersType: builder.mutation({
            query: (data) => ({
                url: `${SUPPLIERS_TYPES_URL}/remove/${data.supplierId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SupplierTypes']
        })
    })
})

export const { 
    useAddSuppliersTypeMutation,
    useEditSuppliersTypeMutation,
    useRemoveSuppliersTypeMutation, 
    useReadSuppliersTypeQuery, 
    useReadSuppliersTypesQuery,
} = suppliersTypesApiSlice