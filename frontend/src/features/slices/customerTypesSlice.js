import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customersTypesData:[]
}

const customerTypesSlice = createSlice({
    name:'customersTypes',
    initialState,
    reducers: {
        setCustomerTypes: (state, action) => {
            state.customersTypesData = Object.values(action.payload);
        }
    }
})


export const { setCustomerTypes } = customerTypesSlice.actions
export default customerTypesSlice.reducer

