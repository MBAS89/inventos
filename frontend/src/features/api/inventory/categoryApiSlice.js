import { apiSlice } from "../apiSlice";

const INVENTORY_URL = '/api/v1/store/inventory/category'


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readCategories: builder.query({
            query: (data) => ({
                url: `${INVENTORY_URL}/read?storeId=${data.storeId}&page=${data.page}&sort=${data.sortBy.sort}&column=${data.sortBy.column}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Categories'],
            providesTags: (result) =>
            result? [
                  ...result.categories.map(({ id }) => ({ type: 'Categories', id })),
                  { type: 'Categories' },
                ]
              : [{ type: 'Categories', id }],

        }),

        readCategory: builder.query({
            query: (data) => ({
                url: `${INVENTORY_URL}/read/single?storeId=${data.storeId}&customerId=${data.customerId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Customers', id: arg }]

        }),
        addCategory: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('storeName', data.storeName);
                formData.append('folderName', 'categories');
                formData.append('store_id', data.storeId);
                formData.append('categoryName', data.categoryName);
                formData.append('image', data.file.file);

                return {
                    url: `${INVENTORY_URL}/add/${data.categoryName}`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Categories']

        }),
        editCategory: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('storeName', data.storeName);
                formData.append('folderName', 'customers');
                formData.append('full_name', data.fullName);
                formData.append('email', data.email);
                formData.append('phone_number', data.phone);
                formData.append('address', data.address);
                formData.append('cutomer_type', data.customerType);
                formData.append('oldImage', data.oldImage);
                formData.append('total_transactions', data.totalTransaction);
                formData.append('total_debt', data.totalDebt);
                formData.append('total_paid', data.totalPaid);
                formData.append('image', data.file.file);

                return {
                    url: `${INVENTORY_URL}/edit/${data.customerId}?cutomerName=${data.fullName}&storeId=${data.storeId}`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Customers']
        }),
        removeCategory: builder.mutation({
            query: (data) => ({
                url: `${INVENTORY_URL}/remove/${data.customerId}?imageId=${data.imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Customers']
        }),

    })
})

export const { useAddCategoryMutation, useEditCategoryMutation, useRemoveCategoryMutation, useReadCategoriesQuery, useReadCategoryQuery } = categoryApiSlice