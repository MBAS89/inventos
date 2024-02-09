import { apiSlice } from "../apiSlice";

const INVENTORY_URL = '/api/v1/store/inventory/category'


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readCategories: builder.query({
            query: (data) => ({//
                url: `${INVENTORY_URL}/read?page=${data.page}&sort=${data.sortBy.sort}&column=${data.sortBy.column}&searchQuery=${data.searchQuery ? data.searchQuery : ''}`,
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
                url: `${INVENTORY_URL}/read/single?categoryId=${data.categoryId}&withProducts=${data.products}&page=${data.page ? data.page : 1}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Categories', id: arg }]

        }),
        addCategory: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'categories');
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
                formData.append('folderName', 'categories');
                formData.append('categoryName', data.categoryName);
                formData.append('image', data.file.file);

                return {
                    url: `${INVENTORY_URL}/edit/${data.categoryId}/${data.categoryName}`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Categories']
        }),
        removeCategory: builder.mutation({
            query: (data) => ({
                url: `${INVENTORY_URL}/remove/${data.categoryId}?imageId=${data.imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories']
        }),

    })
})

export const { useAddCategoryMutation, useEditCategoryMutation, useRemoveCategoryMutation, useReadCategoriesQuery, useReadCategoryQuery } = categoryApiSlice