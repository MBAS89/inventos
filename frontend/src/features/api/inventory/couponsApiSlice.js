import { apiSlice } from "../apiSlice";

const INVENTORY_URL = '/api/v1/store/inventory/coupon'


export const couponsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readCoupons: builder.query({
            query: (data) => ({//
                url: `${INVENTORY_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Coupon'],
            providesTags: (result) =>
            result? [
                  ...result.coupon.map(({ id }) => ({ type: 'Coupon', id })),
                  { type: 'Coupon' },
                ]
              : [{ type: 'Coupon', id }],

        }),
        checkCoupon: builder.mutation({
            query: (data) => ({
                url: `${INVENTORY_URL}/read/check?code=${data.code}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Coupon', id: arg }]

        }),
        readCoupon: builder.query({
            query: (data) => ({
                url: `${INVENTORY_URL}/read/single?couponId=${data.couponId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Coupon', id: arg }]

        }),
        addCoupon: builder.mutation({
            query: (data) => ({
                url: `${INVENTORY_URL}/add`,
                method: 'POST',
                body:{
                    code: data.code,
                    expires_in: data.expiresIn, 
                    used:data.used,
                    kind:data.kind,
                    value: data.value, 
                    can_be_used_times: data.usedTimes
                }
            }),
            invalidatesTags: ['Coupon']

        }),
        editCoupon: builder.mutation({
            query: (data) => ({
                url: `${INVENTORY_URL}/edit?couponId=${data.couponId}`,
                method: 'PUT',
                body:{
                    code: data.code,
                    expires_in: data.expiresIn, 
                    used:data.used,
                    kind:data.kind,
                    value: data.value, 
                    can_be_used_times: data.usedTimes
                }
            }),
            invalidatesTags: ['Coupon']
        }),
        removeCoupon: builder.mutation({
            query: (data) => ({
                url: `${INVENTORY_URL}/remove?couponId=${data.couponId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Coupon']
        }),

    })
})

export const { 
    useAddCouponMutation, 
    useEditCouponMutation, 
    useRemoveCouponMutation, 
    useCheckCouponMutation, 
    useReadCouponsQuery,
    useReadCouponQuery
} = couponsApiSlice