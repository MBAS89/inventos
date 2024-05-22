import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/slices/authSlice'
import { apiSlice } from '../features/api/apiSlice'
import customersTypesReducer from '../features/slices/customerTypesSlice'
import adminReducer from '../features/slices/adminAuthSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        customerTypes:customersTypesReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store