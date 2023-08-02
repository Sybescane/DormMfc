import { configureStore } from '@reduxjs/toolkit'
import globalSliceReducer from './globalSlice'

const store = configureStore({
    reducer: {
        globalSlice: globalSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['globalSlice/hideCalendar', 'globalSlice/showCalendar']
            }
        })
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch