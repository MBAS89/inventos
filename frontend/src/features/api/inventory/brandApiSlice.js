import { apiSlice } from "../apiSlice";

const BRAND_URL = '/api/v1/store/inventory/brand'


export const brandApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readBrands: builder.query({
            query: (data) => ({//
                url: `${BRAND_URL}/read?page=${data.page}&sort=${data.sortBy.sort}&column=${data.sortBy.column}&searchQuery=${data.searchQuery ? data.searchQuery : ''}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Brands'],
            providesTags: (result) =>
            result? [
                  ...result.brands.map(({ id }) => ({ type: 'Brands', id })),
                  { type: 'Brands' },
                ]
              : [{ type: 'Brands', id }],

        }),

        readBrand: builder.query({
            query: (data) => ({
                url: `${BRAND_URL}/read/single?brandId=${data.brandId}&withProducts=${data.products}&page=${data.page ? data.page : 1}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Brands', id: arg }]

        }),
        addBrand: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'brands');
                formData.append('brandName', data.brandName);
                formData.append('image', data.file.file);

                return {
                    url: `${BRAND_URL}/add/${data.brandName}`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Brands']

        }),
        editBrand: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'brands');
                formData.append('brandName', data.brandName);
                formData.append('image', data.file.file);

                return {
                    url: `${BRAND_URL}/edit/${data.brandId}/${data.brandName}`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Brands']
        }),
        removeBrand: builder.mutation({
            query: (data) => ({
                url: `${BRAND_URL}/remove/${data.brandId}?imageId=${data.imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brands']
        }),

    })
})

export const { useAddBrandMutation, useEditBrandMutation, useRemoveBrandMutation, useReadBrandsQuery, useReadBrandQuery } = brandApiSlice