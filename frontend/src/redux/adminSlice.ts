import { createSlice } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";

type InitStateType = {
    token: string
}

const initialState: InitStateType = {
    token: ''
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setAdminToken(state, action) {
            state.token = action.payload
        }
    }
})

export const {
    setAdminToken
} = adminSlice.actions

export default adminSlice.reducer