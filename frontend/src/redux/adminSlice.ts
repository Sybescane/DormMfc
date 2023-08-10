import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createTimes } from "../utils/timesCreation";
import { axiosRequest } from "../configs/axiosConfig";
import { requestErrorHandler } from "../utils/requestErrorsHandler";
import { getTimeDate } from "../utils/getTimeDate";

type SingleStudentType = {
    email: string,
    fullname: string,
    gender: string,
    citizenship: string,
    educationLevel: string,
    recordDatetime: string
}

export type usersDataType = {
    [key: string]: Array<SingleStudentType>
}

export type DormListType = 'М-1' | 'М-2' | 'М-3' | 'М-4' | 'Г-1' | 'Г-2' | 'ДСГ' | 'ДК'

type TimeDetailsType = Record<DormListType, {
    [keyof: string]: Array<{
        time: string,
        isBusy: boolean
    }>
}>

type InitStateType = {
    token: string,
    usersData: usersDataType,
    adminLogin: string,
    timeDetails: TimeDetailsType,
    checkedDorm: DormListType
}

const initialState: InitStateType = {
    token: '',
    adminLogin: '',
    usersData: {},
    timeDetails: {
        'М-1': {},
        'М-2': {},
        'М-3': {},
        'М-4': {},
        'Г-1': {},
        'Г-2': {},
        'ДСГ': {},
        'ДК': {}
    },
    checkedDorm: 'М-1'
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setAdminData(state, action: PayloadAction<{ token: string, usersData: usersDataType, adminLogin: string }>) {
            state.token = action.payload.token
            state.adminLogin = action.payload.adminLogin
            const normalizeUsersData: usersDataType = {
                'М-1': [],
                'М-2': [],
                'М-3': [],
                'М-4': [],
                'Г-1': [],
                'Г-2': [],
                'ДСГ': [],
                'ДК': []
            }
            for (let key in normalizeUsersData) {
                normalizeUsersData[key] = action.payload.usersData[key].map(studObj => {
                    return {
                        ...studObj,
                        recordDatetime: getTimeDate(studObj.recordDatetime).datetime
                    }
                })
            }
            state.usersData = normalizeUsersData
            for (let key in state.timeDetails) {
                const normalizeArray = state.usersData[key].map(enroll => {
                    return enroll.recordDatetime
                })
                state.timeDetails[key as keyof TimeDetailsType] = createTimes(normalizeArray)
            }
        },
        cleanupAdminStore(state) {
            state = initialState
        },
        changeDorm(state, action: PayloadAction<DormListType>) {
            state.checkedDorm = action.payload
        },
        addNewStudent(state, action: PayloadAction<SingleStudentType & {
            dorm: string
        }>) {
            const data = action.payload
            const dataObj = {
                email: data.email,
                fullname: data.fullname,
                citizenship: data.citizenship,
                gender: data.gender,
                educationLevel: data.educationLevel,
                recordDatetime: getTimeDate(data.recordDatetime).datetime
            }
            state.usersData[data.dorm].push(dataObj)
        },
        addBusyTime(state, action: PayloadAction<{
            datetime: string,
            dorm: DormListType
        }>) {
            const normalizedDatetime = getTimeDate(action.payload.datetime).datetime
            const time = normalizedDatetime.split(',')[1].slice(1, 6)
            const date = normalizedDatetime.slice(0, 2)
            const updatedArr = state.timeDetails[action.payload.dorm][date].map(timeObj => {
                if (timeObj.time === time) {
                    return {
                        time: timeObj.time,
                        isBusy: true
                    }
                }
                else return timeObj
            })
            state.timeDetails[action.payload.dorm][date] = updatedArr
        }
    }
})

export const {
    setAdminData,
    changeDorm,
    cleanupAdminStore,
    addNewStudent,
    addBusyTime
} = adminSlice.actions

export default adminSlice.reducer