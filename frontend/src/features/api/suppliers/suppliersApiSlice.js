import { apiSlice } from "../apiSlice";

const SUPPLIERS_URL = '/api/v1/store/suppliers'


export const suppliersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readSuppliers: builder.query({
            query: (data) => ({
                url: `${SUPPLIERS_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Suppliers'],
            providesTags: (result) =>
            result? [
                  ...result.suppliers.map(({ id }) => ({ type: 'Suppliers', id })),
                  { type: 'Suppliers' },
                ]
              : [{ type: 'Suppliers', id }],

        }),

        readSupplier: builder.query({
            query: (data) => ({
                url: `${SUPPLIERS_URL}/read/single?supplierId=${data.supplierId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Suppliers', id: arg }]

        }),
        addSupplier: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'suppliers');
                formData.append('supplier_name', data.supplierName);
                formData.append('address', data.address);
                formData.append('email', data.email);
                formData.append('phone_number', data.phone);
                formData.append('supplier_type', data.supplierType);
                formData.append('image', data.file.file);

                return {
                    url: `${SUPPLIERS_URL}/add?supplierName=${data.supplierName}`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Suppliers']

        }),
        editSupplier: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'suppliers');
                formData.append('supplier_name', data.supplierName);
                formData.append('address', data.address);
                formData.append('email', data.email);
                formData.append('phone_number', data.phone);
                formData.append('supplier_type', data.supplierType);
                formData.append('oldImage', data.oldImage);
                formData.append('image', data.file.file);

                return {
                    url: `${SUPPLIERS_URL}/edit/${data.supplierId}?supplierName=${supplierName}`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Suppliers']
        }),
        removeSupplier: builder.mutation({
            query: (data) => ({
                url: `${SUPPLIERS_URL}/remove/${data.supplierId}?supplierName=${data.supplierName}&imageId=${data.imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Suppliers']
        })
    })
})

export const { 
    useReadSuppliersQuery,
    useReadSupplierQuery,
    useAddSupplierMutation, 
    useRemoveSupplierMutation, 
    useEditSupplierMutation,
} = suppliersApiSlice