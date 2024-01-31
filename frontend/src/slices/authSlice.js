import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginInfo: localStorage.getItem('loginInfo') ? JSON.parse(localStorage.getItem('loginInfo')) : null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.loginInfo = action.payload
            localStorage.setItem('loginInfo', JSON.stringify(action.payload))
        },
        clearCredentials: (state, action) => {
            state.loginInfo = null
            localStorage.removeItem('loginInfo')
        }
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer

