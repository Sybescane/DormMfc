import CalendarComp from '../../components/CalendarComp/CalendarComp'
import classes from './EnrollmentPage.module.scss'
import DormDescriptionComp from '../../components/DormDescription/DormDescriptionComp'
import { useEffect, useState, useRef } from 'react'
import { createTimes } from '../../utils/timesCreation'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectTime } from '../../redux/globalSlice'

export default function EnrollmentPage() {
    const [timesArr, setTimesArr] = useState<Array<string>>([])
    const selectedTime = useRef<HTMLDivElement | null>(null)
    const registeredTime = useAppSelector(state => state.globalSlice.userData.timeSelected)
    const selectedDate = useAppSelector(state => state.globalSlice.userData.dateSelected)
    const dispatch = useAppDispatch()

    function checkTime(e: React.MouseEvent<HTMLDivElement, MouseEvent>, time: string) {
        if (selectedTime.current) selectedTime.current.classList.remove(`${classes.SelectedTime}`)
        if (e.currentTarget == selectedTime.current) {
            selectedTime.current = null
            dispatch(selectTime(null))
        }
        else {
            e.currentTarget.classList.add(`${classes.SelectedTime}`)
            selectedTime.current = e.currentTarget
            dispatch(selectTime(time))
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/getTimes', {
            withCredentials: true
        }).then(({ data }) => {
            setTimesArr(createTimes(data))
        })
    }, [])
    useEffect(() => {
        if (selectedTime.current) {
            selectedTime.current.classList.remove(`${classes.SelectedTime}`)
            selectedTime.current = null
        }
    }, [selectedDate])

    return (
        <div className={classes.GridContainer}>
            <div className={classes.EnrollBlock}>
                <h1 className={classes.Title}>Выберите день и время регистрации на заселение</h1>
                <CalendarComp adminPanel={false} />
                <div className={classes.TimesBlock}>
                    {timesArr.map(time => {
                        return (
                            <div key={time} className={time === registeredTime ? `${classes.Time} ${classes.SelectedTime}` : classes.Time} onClick={(e) => checkTime(e, time)}>
                                <span>{time}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <DormDescriptionComp />
        </div >
    )
}