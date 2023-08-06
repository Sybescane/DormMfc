import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type usersDataType = {
    [key: string]: Array<{
        email: string,
        fullname: string,
        gender: string,
        citizenship: string,
        educationLevel: string,
        recordDatetime: string
    }>
}

type InitStateType = {
    token: string,
    usersData: usersDataType,
    adminLogin: string
}

const initialState: InitStateType = {
    token: '',
    adminLogin: '',
    usersData: {}
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setAdminData(state, action: PayloadAction<{ token: string, usersData: usersDataType, adminLogin: string }>) {
            state.token = action.payload.token
            state.usersData = action.payload.usersData
            state.adminLogin = action.payload.adminLogin
        },
        cleanupAdminStore(state) {
            state = initialState
        }
    }
})

export const {
    setAdminData,
    cleanupAdminStore
} = adminSlice.actions

export default adminSlice.reducer