import { apiSlice } from "../apiSlice";

const CASHER_URL = '/api/v1/store/casher'


export const casherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readSingleBrandOrCategory: builder.query({
            query: (data) => ({
                url: `${CASHER_URL}/search?page=${data.page}&brandId=${data.brandId || ''}&categoryId=${data.categoryId || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Casher'],
        }),

        readBrandAndCategory: builder.query({
            query: (data) => ({
                url: `${CASHER_URL}/read`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Casher']
        })
    })
})

export const { 
    useReadBrandAndCategoryQuery, 
    useReadSingleBrandOrCategoryQuery
} = casherApiSlice