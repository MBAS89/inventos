import { apiSlice } from "../apiSlice";

const CUSTOMERS_URL = '/api/v1/store/customers'


export const customersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
                    url: `${CUSTOMERS_URL}/add?cutomerName=${data.fullName}`,
                    method: 'POST',
                    body: formData
                };
            }
        }),
        editCustomer: builder.mutation({
            query: (data) => ({
                url: `${CUSTOMERS_URL}/edit/${data.customerId}?cutomerName=${data.fullName}`,
                method: 'PUT',
                body:{
                    storeName:data.storeName,
                    folderName:data.folderName,
                    full_name:data.fullName,
                    email:data.email,
                    phone_number:data.phone,
                    address:data.address,
                    cutomer_type:data.customerType,
                    image:data.file
                }
            })
        }),
        removeCustomer: builder.mutation({
            query: (data) => ({
                url: `${CUSTOMERS_URL}/remove/${data.customerId}?imageId=${data.imageId}`,
                method: 'DELETE',
            })
        }),

    })
})

export const { useAddCustomerMutation, useEditCustomerMutation, useRemoveCustomerMutation } = customersApiSlice