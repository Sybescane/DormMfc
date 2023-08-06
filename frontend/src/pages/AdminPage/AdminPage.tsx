import classes from './AdminPage.module.scss'
import CalendarComp from '../../components/CalendarComp/CalendarComp'
import ViewEnrollComp from '../../components/ViewEnrollComp/ViewEnrollComp'
import { useAppSelector } from '../../hooks'
import { useState, useEffect } from 'react'

type StudentElem = {
    email: string,
    fullname: string,
    gender: string,
    citizenship: string,
    educationLevel: string,
    recordDatetime: string
}

export default function AdminPage() {
    const usersData = useAppSelector(state => state.adminSlice.usersData)
    console.log('USERS_DATA', usersData)
    const [dormList, setDormList] = useState<Array<StudentElem>>()
    const [checkedDorm, setCheckedDorm] = useState<string>('М-1')
    const selectedDate = useAppSelector(state => state.globalSlice.userData.dateSelected)
    const token = useAppSelector(state => state.adminSlice.token)

    useEffect(() => {
        if (token) {
            const dataSortArr = usersData[checkedDorm].filter(enroll => {
                if (enroll.recordDatetime.slice(0, 2) == selectedDate.slice(0, 2)) return true
                else return false
            })
            const normalizeArr = dataSortArr.map(enroll => {
                const time = enroll.recordDatetime.slice(-8, -3)
                return {
                    ...enroll,
                    gender: enroll.gender === 'Мужской' ? 'М' : 'Ж',
                    recordDatetime: time,
                }
            })
            setDormList(normalizeArr)
        }
    }, [checkedDorm, selectedDate])

    return (
        <div className={classes.Wrapper}>
            <h1>Список зарегестрированных студентов</h1>
            <div className={classes.Controls}>
                <div className={classes.InputsBlock}>
                    <CalendarComp />
                    <select name="dorm" id="dorm" onChange={(e) => setCheckedDorm(e.currentTarget.value)}>
                        <option value="М-1">М-1</option>
                        <option value="М-2">М-2</option>
                        <option value="М-3">М-3</option>
                        <option value="М-4">М-4</option>
                        <option value="Г-1">Г-1</option>
                        <option value="Г-2">Г-2</option>
                        <option value="ДСГ">ДСГ-5,6</option>
                        <option value="ДК"></option>
                    </select>
                </div>
                <button type='button' className={`${classes.AddStudent} DefaultButton_2`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H7M7 7H13M7 7V1M7 7V13" stroke="#1D92F8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>Добавить запись</p>
                </button>
            </div>
            <ViewEnrollComp students={dormList} />
        </div>
    )
}