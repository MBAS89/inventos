import { apiSlice } from "../apiSlice";

const CUSTOMERS_URL = '/api/v1/store/customers'


export const customersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readCustomers: builder.query({
            query: (data) => ({
                url: `${CUSTOMERS_URL}/read?storeId=${data.storeId}&page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['customers'],
            providesTags: (result) =>
            result? [
                  ...result.customers.map(({ id }) => ({ type: 'Customers', id })),
                  { type: 'Customers' },
                ]
              : [{ type: 'Customers', id }],

        }),

        readCustomer: builder.query({
            query: (data) => ({
                url: `${CUSTOMERS_URL}/read/single?storeId=${data.storeId}&customerId=${data.customerId}&page=${data.page || '1'}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Customers', id: arg }]

        }),
        addCustomer: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('storeName', data.storeName);
                formData.append('folderName', 'customers');
                formData.append('store_id', data.storeId);
                formData.append('full_name', data.fullName);
                formData.append('email', data.email);
                formData.append('phone_number', data.phone);
                formData.append('address', data.address);
                formData.append('cutomer_type', data.customerType);
                formData.append('image', data.file.file);

                return {
                    url: `${CUSTOMERS_URL}/add?cutomerName=${data.fullName}&storeId=${data.storeId}`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Customers']

        }),
        editCustomer: builder.mutation({
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
                    url: `${CUSTOMERS_URL}/edit/${data.customerId}?cutomerName=${data.fullName}&storeId=${data.storeId}`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Customers']
        }),
        removeCustomer: builder.mutation({
            query: (data) => ({
                url: `${CUSTOMERS_URL}/remove/${data.customerId}?imageId=${data.imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Customers']
        }),

    })
})

export const { useReadCustomersQuery, useReadCustomerQuery ,useAddCustomerMutation, useEditCustomerMutation, useRemoveCustomerMutation } = customersApiSlice