import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createTimes } from "../utils/timesCreation";

type InitialStateType = {
    userData: {
        email: string | null,
        dormitory: {
            name: string | null,
            address: string | null,
            description: string | null
        },
        dateSelected: string,
        timeSelected: string | null,
        token: string | null,
        contacts: Array<string>
        freeTimes: {
            [key: string]: Array<string>
        }
    },
    serviceData: {
        isLoading: boolean,
        isError: boolean,
        isShowCalendar: boolean,
        enrollStep: number,
        isEmployeeLogin: boolean,
        isCheckInPopup: boolean,
    }
}

const initialState: InitialStateType = {
    userData: {
        email: null,
        token: null,
        dormitory: {
            name: null,
            address: null,
            description: null
        },
        dateSelected: '25 августа, пт',
        timeSelected: null,
        contacts: [],
        freeTimes: {}
    },
    serviceData: {
        isError: false,
        isLoading: false,
        isShowCalendar: true,
        enrollStep: 1,
        isEmployeeLogin: false,
        isCheckInPopup: false,
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
            console.log('date changed', state.userData.dateSelected)
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
        },
        saveUserData(state, action) {
            state.userData.email = action.payload.email
            state.userData.dormitory = action.payload.dormitory
            state.userData.freeTimes = createTimes(action.payload.takenTime)
            state.userData.contacts = action.payload.contacts
        },
        showCheckInPopup(state, action: PayloadAction<{ event: React.MouseEvent, isShow: boolean }>) {
            if (action.payload.isShow) {
                action.payload.event.stopPropagation()
                state.serviceData.isCheckInPopup = true
            }
            else {
                state.serviceData.isCheckInPopup = false
            }
        },
    }
})

export const { hideCalendar, showCalendar, selectDate, selectTime, switchStep, showEmployeeLogin,
    hideEmployeeLogin,
    saveUserBasics,
    saveUserData,
    showCheckInPopup,
} = globalSlice.actions

export default globalSlice.reducer