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
            }),
            invalidatesTags: ['Store']
        }),
        fecthStores:builder.query({
            query: (data) => ({
                url: `${STORE_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Store']
        }),
        readStore: builder.query({
            query: (data) => ({
                url: `${STORE_URL}/read-single?storeId=${data.storeId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Store', id: arg }]

        }),
        createDash: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('store_name', data.storeName);
                formData.append('owner_first_name', data.ownerFirstName);
                formData.append('owner_last_name', data.ownerLastName);
                formData.append('owner_email', data.ownerEmail);
                formData.append('password', data.password);
                formData.append('confirm_password', data.confirmPassword);
                formData.append('phone_number', data.phoneNumber);
                formData.append('image', data.file ? data.file.file : '');

                return {
                    url: `${STORE_URL}/create-dash?storeDashCreate=true`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Store']
        }),
        editDash: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('store_name', data.storeName);
                formData.append('owner_first_name', data.ownerFirstName);
                formData.append('owner_last_name', data.ownerLastName);
                formData.append('owner_email', data.ownerEmail);
                formData.append('password', data.password);
                formData.append('confirm_password', data.confirmPassword);
                formData.append('phone_number', data.phoneNumber);
                formData.append('image', data.file ? data.file.file : '');

                return {
                    url: `${STORE_URL}/edit?storeId=${data.storeId}&storeDashCreate=true`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Store']
        }),
        removeStore: builder.mutation({
            query: (data) => ({
                url: `${STORE_URL}/remove/${data.storeId}?imageId=${data.imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Store']
        }),
    })
})

export const { 
    useCreateMutation, 
    useFecthStoresQuery, 
    useCreateDashMutation, 
    useReadStoreQuery, 
    useEditDashMutation, 
    useRemoveStoreMutation
} = storeApiSlice