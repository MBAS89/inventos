import { apiSlice } from "../apiSlice";

const PRODUCT_URL = '/api/v1/store/inventory/product'


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readProducts: builder.query({
            query: (data) => ({//
                url: `${PRODUCT_URL}/read?page=${data.page}&sort=${data.sortBy.sort}&column=${data.sortBy.column}&searchQuery=${data.searchQuery ? data.searchQuery : ''}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Products'],
            providesTags: (result) =>
            result? [
                  ...result.products.map(({ id }) => ({ type: 'Products', id })),
                  { type: 'Products' },
                ]
              : [{ type: 'Products', id }],

        }),

        readProduct: builder.query({
            query: (data) => ({
                url: `${PRODUCT_URL}/read/single?productId=${data.productId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Products', id: arg }]

        }),
        addProduct: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'products');
                formData.append('productName', data.productName);
                formData.append('sku', data.sku);
                formData.append('price', data.price);
                formData.append('retailPrice', data.retailPrice);
                formData.append('wholesalePrice', data.wholesalePrice);
                formData.append('qty', data.qty);
                formData.append('description', data.description);
                formData.append('salePrice', data.salePrice);
                formData.append('onSale', data.onSale);
                formData.append('unit', data.unit);
                formData.append('unit_catergory', data.unitCatergory);
                formData.append('image', data.file.file);

                return {
                    url: `${PRODUCT_URL}/add/${data.productName}`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Products']

        }),
        editProduct: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'products');
                formData.append('productName', data.productName);
                formData.append('sku', data.sku);
                formData.append('price', data.price);
                formData.append('retailPrice', data.retailPrice);
                formData.append('wholesalePrice', data.wholesalePrice);
                formData.append('qty', data.qty);
                formData.append('description', data.description);
                formData.append('salePrice', data.salePrice);
                formData.append('onSale', data.onSale);
                formData.append('unit', data.unit);
                formData.append('unit_catergory', data.unitCatergory);
                formData.append('image', data.file.file);

                return {
                    url: `${INVENTORY_URL}/edit/${data.productId}/${data.productName}`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Products']
        }),
        removeProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/remove/${data.productId}?imageId=${data.imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        }),
        readBrandsAndCategories: builder.query({
            query: (data) => ({
                url:`${PRODUCT_URL}/read/brands-categories`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
        })

    })
})

export const { useAddProductMutation, useEditProductMutation, useRemoveProductMutation, useReadProductsQuery, useReadProductQuery, useReadBrandsAndCategoriesQuery } = productsApiSlice