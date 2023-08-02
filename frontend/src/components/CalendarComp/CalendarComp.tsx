import { useEffect, useRef, useState } from 'react';
import classes from './CalendarComp.module.scss'
import CalendarSVG from './assets/Calendar.svg'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hideCalendar, selectDate, selectTime, showCalendar } from '../../redux/globalSlice';

type Props = {
    adminPanel: boolean
}

export default function CalendarComp({ adminPanel }: Props) {
    const selectedDate = useAppSelector(state => state.globalSlice.userData.dateSelected)
    const isShowCalendar = useAppSelector(state => state.globalSlice.serviceData.isShowCalendar)
    const dispatch = useAppDispatch()
    const activeDate = useRef<HTMLDivElement | null>(null)

    const calendarDates: JSX.Element[] = []
    for (let i = 0; i <= 41; i++) {
        if (i <= 6) {
            switch (i) {
                case 0:
                    calendarDates.push(<>пн</>)
                    break;
                case 1:
                    calendarDates.push(<>вт</>)
                    break;
                case 2:
                    calendarDates.push(<>ср</>)
                    break
                case 3:
                    calendarDates.push(<>чт</>)
                    break
                case 4:
                    calendarDates.push(<>пт</>)
                    break;
                case 5:
                    calendarDates.push(<>сб</>)
                    break;
                case 6:
                    calendarDates.push(<>вс</>)
                    break
            }
        }
        else {
            if (i === 7 || i === 39 || i === 40 || i === 41) calendarDates.push(<></>)
            else calendarDates.push(<>{i - 7}</>)
        }
    }

    function checkDate(e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
        if (index <= 7) return
        else {
            dispatch(selectTime(null))
            if (activeDate.current) activeDate.current.classList.remove(`${classes.Selected}`)
            activeDate.current = e.currentTarget
            activeDate.current.classList.add(`${classes.Selected}`)
            const dayN = index % 7
            let weekDay = undefined
            switch (dayN) {
                case 0:
                    weekDay = 'пн'
                    break;
                case 1:
                    weekDay = 'вт'
                    break;
                case 2:
                    weekDay = 'ср'
                    break;
                case 3:
                    weekDay = 'чт'
                    break;
                case 4:
                    weekDay = 'пт'
                    break;
                case 5:
                    weekDay = 'сб'
                    break;
                case 6:
                    weekDay = 'вс'
                    break;
            }
            dispatch(selectDate(`${index - 7} августа, ${weekDay}`))
        }
    }

    return (
        <div className={adminPanel ? `${classes.Wrapper} ${classes.CalendarParts}` : `${classes.Wrapper}`}>
            <div className={adminPanel ? `${classes.WidthCalendar} ${classes.CalendarPreview}` : `${classes.CalendarPreview}`} onClick={(e) => isShowCalendar ? dispatch(hideCalendar()) : dispatch(showCalendar({ event: e }))}>
                <p>{selectedDate}</p>
                <img src={CalendarSVG} alt="calendar_icon" />
            </div>
            {
                isShowCalendar && <div className={adminPanel ? `${classes.FullWidthCalendar} ${classes.FullCalendar}` : `${classes.FullCalendar}`} onClick={(e) => dispatch(showCalendar({ event: e }))}>
                    <h6 className={classes.Month}>Август 2023</h6>
                    <div className={classes.Calendar}>
                        {calendarDates.map((el, index) => {
                            return (
                                <div key={index} className={index <= 7 ? classes.Weekdays : (index === parseInt(selectedDate) + 7 ? `${classes.Numbers} ${classes.Selected}` : `${classes.Numbers}`)}
                                    onClick={(e) => checkDate(e, index)} ref={index === 32 ? activeDate : null}>{el}</div>
                            )
                        })}
                    </div>
                </div>
            }
        </div >
    )
}