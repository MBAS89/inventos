import { apiSlice } from "../apiSlice";

const PRODUCT_URL = '/api/v1/store/inventory/product'


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readProducts: builder.query({
            query: (data) => ({
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
                formData.append('name', data.productName);
                formData.append('sku', data.sku);
                formData.append('unit', data.unit);
                formData.append('unit_catergory', data.unitCatergory);
                formData.append('unit_value', data.unitValue);
                formData.append('cost_unit', data.costUnit);
                formData.append('retail_price_unit', data.retailUnitPrice);
                formData.append('wholesale_price_unit', data.wholesaleUnitPrice);
                formData.append('pieces_per_unit', data.piecesPerUnit);
                formData.append('cost_piece', data.pieceCost);
                formData.append('retail_price_piece', data.retailPiece);
                formData.append('wholesale_price_piece', data.wholesalePiece);
                formData.append('qty', data.qty);
                formData.append('sale_price_unit', data.unitSalePrice);
                formData.append('sale_price_piece', data.pieceSalePrice);
                formData.append('on_sale', data.onSale);
                formData.append('unit_of_measurement', JSON.stringify(data.unitOfMeasurement));
                formData.append('description', data.description);
                formData.append('category_id', data.category);
                formData.append('brand_id', data.brand);
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
                formData.append('name', data.productName);
                formData.append('sku', data.sku);
                formData.append('unit', data.unit);
                formData.append('unit_catergory', data.unitCatergory);
                formData.append('unit_value', data.unitValue);
                formData.append('cost_unit', data.costUnit);
                formData.append('retail_price_unit', data.retailUnitPrice);
                formData.append('wholesale_price_unit', data.wholesaleUnitPrice);
                formData.append('pieces_per_unit', data.piecesPerUnit);
                formData.append('cost_piece', data.pieceCost);
                formData.append('retail_price_piece', data.retailPiece);
                formData.append('wholesale_price_piece', data.wholesalePiece);
                formData.append('qty', data.qty);
                formData.append('sale_price_unit', data.unitSalePrice);
                formData.append('sale_price_piece', data.pieceSalePrice);
                formData.append('on_sale', data.onSale);
                formData.append('unit_of_measurement', JSON.stringify(data.unitOfMeasurement));
                formData.append('description', data.description);
                formData.append('category_id', data.category);
                formData.append('brand_id', data.brand);
                formData.append('image', data.file.file);

                return {
                    url: `${PRODUCT_URL}/edit/${data.productId}/${data.productName}`,
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
        }),
        generateSku: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/generate-sku`,
                method: 'GET',
            }),
            invalidatesTags: ['Products']
        }),

    })
})

export const { useAddProductMutation, useEditProductMutation, useRemoveProductMutation, useReadProductsQuery, useReadProductQuery, useReadBrandsAndCategoriesQuery, useGenerateSkuMutation } = productsApiSlice