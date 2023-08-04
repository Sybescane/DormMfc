import CalendarComp from '../../components/CalendarComp/CalendarComp'
import classes from './EnrollmentPage.module.scss'
import DormDescriptionComp from '../../components/DormDescription/DormDescriptionComp'
import { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectTime, showCheckInPopup } from '../../redux/globalSlice'

export default function EnrollmentPage() {
    const selectedTime = useRef<HTMLDivElement | null>(null)
    const registeredTime = useAppSelector(state => state.globalSlice.userData.timeSelected)
    const selectedDate = useAppSelector(state => state.globalSlice.userData.dateSelected)
    const freeTimesObj = useAppSelector(state => state.globalSlice.userData.freeTimes)
    const [timesArr, setTimesArr] = useState<Array<string>>([])
    const dispatch = useAppDispatch()
    const isShowCheckIn = useAppSelector(state => state.globalSlice.serviceData.isCheckInPopup)
    const [isAvalTime, setIsAvalTime] = useState<boolean>(true)

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
        const date = selectedDate.substring(0, 2)
        const freeTime = freeTimesObj[date]
        if (freeTime.length === 0) setIsAvalTime(false)
        else {
            setIsAvalTime(true)
            setTimesArr(freeTime)
        }
    }, [selectedDate])

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
                    {!isAvalTime &&
                        <h3 className={classes.NoTimeText}>Все время занято. Выберите другой день</h3>
                    }
                    {isAvalTime &&
                        <>
                            {timesArr.map(time => {
                                return (
                                    <div key={time} className={time === registeredTime ? `${classes.Time} ${classes.SelectedTime}` : classes.Time} onClick={(e) => checkTime(e, time)}>
                                        <span>{time}</span>
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
            </div>
            <DormDescriptionComp />
            {isShowCheckIn &&
                <div className={classes.NoCheckIn} onClick={(e) => dispatch(showCheckInPopup({ event: e, isShow: true }))}>
                    <h3>Заселение длится с 25 по 31 августа &#128521;</h3>
                </div>
            }
        </div >
    )
}