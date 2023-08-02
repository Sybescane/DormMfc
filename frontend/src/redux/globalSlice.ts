import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
    userData: {
        email: string | null,
        college: string | null,
        dormitory: string | null,
        dateSelected: string,
        timeSelected: string | null,
        token: string | null
    },
    serviceData: {
        isLoading: boolean,
        isError: boolean,
        isShowCalendar: boolean,
        enrollStep: number,
        isEmployeeLogin: boolean
    }
}

const initialState: InitialStateType = {
    userData: {
        email: null,
        token: null,
        college: 'ИНМИН',
        dormitory: 'М-3',
        dateSelected: '25 августа, пт',
        timeSelected: null
    },
    serviceData: {
        isError: false,
        isLoading: false,
        isShowCalendar: true,
        enrollStep: 1,
        isEmployeeLogin: false
    }
}

const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        hideCalendar(state) {
            state.serviceData.isShowCalendar = false
        },
        showCalendar(state, action: PayloadAction<{ event: React.MouseEvent<HTMLDivElement> }>) {
            action.payload.event.stopPropagation()
            state.serviceData.isShowCalendar = true
        },
        selectDate(state, action) {
            state.userData.dateSelected = action.payload
        },
        selectTime(state, action) {
            state.userData.timeSelected = action.payload
        },
        switchStep(state, action) {
            state.serviceData.enrollStep = action.payload
        },
        showEmployeeLogin(state) {
            state.serviceData.isEmployeeLogin = true
        },
        hideEmployeeLogin(state) {
            state.serviceData.isEmployeeLogin = false
        },
        saveUserBasics(state, action) {
            state.userData.token = action.payload.token
            state.userData.email = action.payload.email
            console.log('data')
            console.log(state.userData.token)
            console.log(state.userData.email)
        }
    }
})

export const { hideCalendar, showCalendar, selectDate, selectTime, switchStep, showEmployeeLogin,
    hideEmployeeLogin,
    saveUserBasics
} = globalSlice.actions

export default globalSlice.reducer