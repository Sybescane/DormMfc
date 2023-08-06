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
            [key: string]: Array<{
                time: string,
                isBusy: boolean
            }>
        },
        faculty: string
    },
    serviceData: {
        isLoading: boolean,
        isError: boolean,
        isShowCalendar: boolean,
        enrollStep: number,
        isEmployeeLogin: boolean,
        isCheckInPopup: boolean,
        isBusyWarning: boolean
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
        freeTimes: {},
        faculty: ''
    },
    serviceData: {
        isError: false,
        isLoading: false,
        isShowCalendar: true,
        enrollStep: 1,
        isEmployeeLogin: false,
        isCheckInPopup: false,
        isBusyWarning: false
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
        },
        saveUserData(state, action) {
            state.userData.email = action.payload.email
            state.userData.dormitory = action.payload.dormitory
            state.userData.freeTimes = createTimes(action.payload.takenTime)
            state.userData.contacts = action.payload.contacts
        },
        showPopup(state, action: PayloadAction<{ event: React.MouseEvent, isShow: boolean, type: string }>) {
            const dataObj = action.payload
            switch (dataObj.type) {
                case 'checkInPopup':
                    if (dataObj.isShow) {
                        dataObj.event.stopPropagation()
                        state.serviceData.isCheckInPopup = true
                    }
                    else {
                        state.serviceData.isCheckInPopup = false
                    }
                    break;
                case 'busyWarning':
                    if (dataObj.isShow) {
                        dataObj.event.stopPropagation()
                        state.serviceData.isBusyWarning = true
                    }
                    else {
                        state.serviceData.isBusyWarning = false
                    }
                    break;
                default:
                    break;
            }
        },
        cleanupUserStore(state) {
            state = initialState
        },
        setFaculty(state, action) {
            state.userData.faculty = action.payload
        }
    }
})

export const { hideCalendar, showCalendar, selectDate, selectTime, switchStep, showEmployeeLogin,
    hideEmployeeLogin,
    saveUserBasics,
    saveUserData,
    showPopup,
    cleanupUserStore,
    setFaculty
} = globalSlice.actions

export default globalSlice.reducer