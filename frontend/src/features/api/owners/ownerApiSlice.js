import { apiSlice } from "../apiSlice";

const OWNERS_URL = '/api/v1/stores/owners'


export const ownerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readOwners: builder.query({
            query: (data) => ({//
                url: `${OWNERS_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Owners'],
            providesTags: (result) =>
            result? [
                  ...result.owners.map(({ id }) => ({ type: 'Owners', id })),
                  { type: 'Owners' },
                ]
              : [{ type: 'Owners', id }],

        }),
        readOwner: builder.query({
            query: (data) => ({
                url: `${OWNERS_URL}/read-single?ownerId=${data.ownerId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Owners', id: arg }]

        }),
        deleteOwner: builder.mutation({
            query: (data) => ({
                url: `${OWNERS_URL}/delete?ownerId=${data.ownerId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Owners']
        }),
        editOwner: builder.mutation({
            query: (data) => ({
                url: `${OWNERS_URL}/edit?ownerId=${data.ownerId}`,
                method: 'PUT',
                body:{
                    email:data.email,
                    first_name: data.firstName, 
                    last_name:data.lastName,
                    phone_number:data.phoneNumber
                }
            }),
            invalidatesTags: ['Owners']
        }),
    })
})

export const { 
    useReadOwnersQuery,
    useReadOwnerQuery,
    useDeleteOwnerMutation,
    useEditOwnerMutation
} = ownerApiSlice