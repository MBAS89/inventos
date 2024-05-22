import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
}

const adminAuthSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo' , JSON.stringify(action.payload))
        },
        clearAdminCredentials: (state, action) => {
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        }
    }
})

export const adminInfoState = (state) => state.admin

export const { setAdminCredentials, clearAdminCredentials } = adminAuthSlice.actions
export default adminAuthSlice.reducer