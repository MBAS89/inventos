import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authAdmin: localStorage.getItem('authAdmin') ? JSON.parse(localStorage.getItem('authAdmin')) : null
}

const authAdminSlice = createSlice({
    name:'admin',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.authAdmin = action.payload
            localStorage.setItem('authAdmin', JSON.stringify(action.payload))
        },
        clearCredentials: (state, action) => {
            state.authAdmin = null
            localStorage.removeItem('authAdmin')
        }
    }
})

export const  authAdminState  = (state) => state.admin

export const { setCredentials, clearCredentials } = authAdminSlice.actions
export default authAdminSlice.reducer